import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db, storage, isFirebaseConfigured } from './firebase';
import { CmsMediaLibraryItem } from '../types/cms';

export type MediaLibraryItem = CmsMediaLibraryItem;

/**
 * Maps file type to folder directory
 */
export function getTargetFolder(file: File): string {
  const mime = file.type.toLowerCase();
  if (mime.startsWith('image/')) return 'project-images';
  if (mime.startsWith('video/')) return 'project-videos';
  if (mime === 'application/pdf' || mime.includes('document')) return 'documents';
  return 'general-media';
}

/**
 * Extracts dimensions from an image file
 */
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth || img.width, height: img.naturalHeight || img.height });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ width: 0, height: 0 });
    };
    img.src = url;
  });
}

/**
 * Extracts duration and dimensions from a video file
 */
export function getVideoMetadata(file: File): Promise<{ duration: number; width: number; height: number }> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    const url = URL.createObjectURL(file);
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve({
        duration: Math.round(video.duration || 0),
        width: video.videoWidth || 0,
        height: video.videoHeight || 0,
      });
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ duration: 0, width: 0, height: 0 });
    };
    video.src = url;
  });
}

/**
 * Formats byte size to human readable string
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Gets direct download/public URL from stored item
 */
export function getPublicMediaUrl(media: CmsMediaLibraryItem | null | undefined): string {
  if (!media) return '';
  if (media.public_url) return media.public_url;
  return media.file_path || '';
}

/**
 * Uploads a file to Firebase Storage and saves metadata to Firestore
 */
export async function uploadMediaFile(
  file: File,
  customAltText?: string
): Promise<{ data: CmsMediaLibraryItem | null; error: Error | null }> {
  if (!isFirebaseConfigured) {
    return {
      data: null,
      error: new Error('Firebase is not configured. Please set up Firebase credentials.'),
    };
  }

  try {
    const folder = getTargetFolder(file);
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `${folder}/${timestamp}_${sanitizedName}`;

    // Extract metadata
    let width: number | null = null;
    let height: number | null = null;
    let duration: number | null = null;

    if (file.type.startsWith('image/')) {
      const dims = await getImageDimensions(file);
      width = dims.width || null;
      height = dims.height || null;
    } else if (file.type.startsWith('video/')) {
      const meta = await getVideoMetadata(file);
      duration = meta.duration || null;
      width = meta.width || null;
      height = meta.height || null;
    }

    // Upload to Firebase Storage
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file, {
      contentType: file.type,
    });

    const publicUrl = await getDownloadURL(storageRef);

    const docId = `media_${timestamp}_${Math.random().toString(36).substring(2, 8)}`;
    const mediaDocData: CmsMediaLibraryItem = {
      id: docId,
      file_name: file.name,
      file_path: storagePath,
      public_url: publicUrl,
      file_type: file.type.startsWith('image/')
        ? 'image'
        : file.type.startsWith('video/')
        ? 'video'
        : file.type.includes('pdf') || file.type.includes('document')
        ? 'document'
        : 'audio',
      mime_type: file.type,
      alt_text: customAltText || file.name.replace(/\.[^/.]+$/, ''),
      width,
      height,
      duration,
      file_size: file.size,
      created_at: new Date().toISOString(),
    };

    await setDoc(doc(db, 'media_library', docId), mediaDocData);

    return { data: mediaDocData, error: null };
  } catch (err: unknown) {
    console.error('[Firebase Storage] Upload error:', err);
    return { data: null, error: err instanceof Error ? err : new Error('Upload failed') };
  }
}

/**
 * Replaces a file in Firebase Storage while preserving or updating media metadata
 */
export async function replaceMediaFile(
  mediaId: string,
  newFile: File
): Promise<{ data: CmsMediaLibraryItem | null; error: Error | null }> {
  if (!isFirebaseConfigured) {
    return { data: null, error: new Error('Firebase not configured') };
  }

  try {
    const docRef = doc(db, 'media_library', mediaId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return { data: null, error: new Error('Media item not found') };
    }

    const existing = docSnap.data() as CmsMediaLibraryItem;
    const oldPath = existing.file_path;

    const folder = getTargetFolder(newFile);
    const timestamp = Date.now();
    const sanitizedName = newFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const newStoragePath = `${folder}/${timestamp}_${sanitizedName}`;

    let width: number | null = null;
    let height: number | null = null;
    let duration: number | null = null;

    if (newFile.type.startsWith('image/')) {
      const dims = await getImageDimensions(newFile);
      width = dims.width || null;
      height = dims.height || null;
    } else if (newFile.type.startsWith('video/')) {
      const meta = await getVideoMetadata(newFile);
      duration = meta.duration || null;
      width = meta.width || null;
      height = meta.height || null;
    }

    const storageRef = ref(storage, newStoragePath);
    await uploadBytes(storageRef, newFile, { contentType: newFile.type });
    const newPublicUrl = await getDownloadURL(storageRef);

    const updatedData: Partial<CmsMediaLibraryItem> = {
      file_name: newFile.name,
      file_path: newStoragePath,
      public_url: newPublicUrl,
      file_type: newFile.type.startsWith('image/') ? 'image' : 'video',
      mime_type: newFile.type,
      width,
      height,
      duration,
      file_size: newFile.size,
    };

    await updateDoc(docRef, updatedData);

    // Clean up old storage asset in background
    if (oldPath) {
      deleteObject(ref(storage, oldPath)).catch(() => {});
    }

    return { data: { ...existing, ...updatedData }, error: null };
  } catch (err: unknown) {
    console.error('[Firebase Storage] Replace file error:', err);
    return { data: null, error: err instanceof Error ? err : new Error('Replacement failed') };
  }
}

/**
 * Checks if a media item is in use by projects or services
 */
export async function checkMediaUsage(
  mediaId: string
): Promise<{ inUse: boolean; projectNames: string[]; serviceNames: string[] }> {
  if (!isFirebaseConfigured) {
    return { inUse: false, projectNames: [], serviceNames: [] };
  }

  try {
    const projectNames: string[] = [];
    const serviceNames: string[] = [];

    // Check cover_media_id in projects
    const pQuery = query(collection(db, 'projects'), where('cover_media_id', '==', mediaId));
    const pSnap = await getDocs(pQuery);
    pSnap.forEach((doc) => {
      const d = doc.data();
      projectNames.push(d.title || doc.id);
    });

    // Check preview_media_id in services
    const sQuery = query(collection(db, 'services'), where('preview_media_id', '==', mediaId));
    const sSnap = await getDocs(sQuery);
    sSnap.forEach((doc) => {
      const d = doc.data();
      serviceNames.push(d.title || doc.id);
    });

    return {
      inUse: projectNames.length > 0 || serviceNames.length > 0,
      projectNames,
      serviceNames,
    };
  } catch (err) {
    console.warn('[Firebase] Error checking media usage:', err);
    return { inUse: false, projectNames: [], serviceNames: [] };
  }
}

/**
 * Deletes media item from Firestore and Firebase Storage
 */
export async function deleteMediaItem(media: CmsMediaLibraryItem): Promise<{ error: Error | null }> {
  if (!isFirebaseConfigured) {
    return { error: new Error('Firebase not configured') };
  }

  try {
    await deleteDoc(doc(db, 'media_library', media.id));

    if (media.file_path) {
      deleteObject(ref(storage, media.file_path)).catch((e) => {
        console.warn('[Firebase Storage] Could not remove file:', e);
      });
    }

    return { error: null };
  } catch (err: unknown) {
    console.error('[Firebase Storage] Delete media error:', err);
    return { error: err instanceof Error ? err : new Error('Delete failed') };
  }
}
