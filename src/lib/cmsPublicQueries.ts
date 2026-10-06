import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { getPublicMediaUrl } from './storageHelper';
import {
  CmsProject,
  CmsProjectSection,
  CmsProjectMedia,
  CmsMediaLibraryItem,
  CmsService,
} from '../types/cms';
import {
  INITIAL_PUBLIC_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_MEDIA_LIBRARY,
} from './cmsDataSync';

export type PublicMedia = {
  id: string;
  url: string;
  type: 'image' | 'video' | 'document' | 'audio';
  alt: string;
  width?: number | null;
  height?: number | null;
};

export type PublicProject = {
  id: string;
  slug: string;
  title: string;
  year: string;
  client: string | null;
  industry: string | null;
  discipline: string | null;
  role: string | null;
  shortDescription: string | null;
  tagline: string | null;
  overview: string | null;
  challenge: string | null;
  concept: string | null;
  strategy: string | null;
  outcome: string | null;
  artDirection: string | null;
  accentColor: string | null;
  bgGradient: string | null;
  textColor: string | null;
  layoutVariant: 'full' | 'split-left' | 'split-right' | 'offset';
  aspectRatio: string | null;
  deliverables: string[];
  typographyDetails: {
    heading: string;
    body: string;
    character: string;
  } | null;
  colorPalette: {
    name: string;
    hex: string;
  }[];
  featured: boolean;
  published: boolean;
  sortOrder: number;
  coverMedia: PublicMedia | null;
};

export type PublicSection = {
  id: string;
  sectionType: string;
  heading: string;
  body: string;
  sortOrder: number;
};

export type PublicGalleryMedia = {
  id: string;
  caption: string;
  altText: string;
  layout: 'full' | 'half' | 'third' | 'portrait' | 'landscape' | 'video';
  sortOrder: number;
  media: PublicMedia | null;
};

export type PublicService = {
  id: string;
  number: string;
  title: string;
  subtitle?: string | null;
  summary?: string | null;
  disciplines?: string[];
  deliverables?: string[];
  highlightMetric?: string | null;
  sortOrder: number;
  active: boolean;
  previewMedia: PublicMedia | null;
};

// Helper: Convert initial static project to PublicProject
function mapStaticToPublicProject(p: CmsProject): PublicProject {
  const mediaItem = INITIAL_MEDIA_LIBRARY.find((m) => m.id === p.cover_media_id);
  const coverMedia: PublicMedia | null = mediaItem
    ? {
        id: mediaItem.id,
        url: mediaItem.public_url || '',
        type: mediaItem.file_type || 'image',
        alt: mediaItem.alt_text || p.title,
      }
    : null;

  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    year: p.year,
    client: p.client || null,
    industry: p.industry || null,
    discipline: p.discipline || p.industry || null,
    role: p.role || null,
    shortDescription: p.short_description || null,
    tagline: p.tagline || p.short_description || null,
    overview: p.overview || null,
    challenge: p.challenge || null,
    concept: p.concept || null,
    strategy: p.strategy || null,
    outcome: p.outcome || null,
    artDirection: p.art_direction || null,
    accentColor: p.accent_color || '#F05245',
    bgGradient: p.bg_gradient || 'from-[#171717] to-[#0a0a0a]',
    textColor: p.text_color || '#F2F2EF',
    layoutVariant: (p.layout_variant as any) || 'full',
    aspectRatio: p.aspect_ratio || '16:9',
    deliverables: p.deliverables || [],
    typographyDetails: p.typography_details || null,
    colorPalette: p.color_palette || [],
    featured: p.featured,
    published: p.published,
    sortOrder: p.sort_order,
    coverMedia,
  };
}

const FALLBACK_PUBLIC_PROJECTS: PublicProject[] = INITIAL_PUBLIC_PROJECTS.map(mapStaticToPublicProject);

const FALLBACK_PUBLIC_SERVICES: PublicService[] = INITIAL_SERVICES.map((s) => {
  const mediaItem = INITIAL_MEDIA_LIBRARY.find((m) => m.id === s.preview_media_id);
  return {
    id: s.id,
    number: s.number,
    title: s.title,
    subtitle: s.subtitle,
    summary: s.summary,
    disciplines: s.disciplines,
    deliverables: s.deliverables,
    highlightMetric: s.highlight_metric,
    sortOrder: s.sort_order,
    active: s.active,
    previewMedia: mediaItem
      ? {
          id: mediaItem.id,
          url: mediaItem.public_url || '',
          type: mediaItem.file_type || 'image',
          alt: mediaItem.alt_text || s.title,
        }
      : null,
  };
});

/**
 * Resolves media item from Firestore media_library
 */
async function resolveMedia(mediaId?: string | null): Promise<PublicMedia | null> {
  if (!mediaId) return null;

  // Check initial static library first for instant response
  const staticItem = INITIAL_MEDIA_LIBRARY.find((m) => m.id === mediaId);

  if (!isFirebaseConfigured) {
    if (staticItem) {
      return {
        id: staticItem.id,
        url: staticItem.public_url || '',
        type: staticItem.file_type,
        alt: staticItem.alt_text || staticItem.file_name,
        width: staticItem.width,
        height: staticItem.height,
      };
    }
    return null;
  }

  try {
    const snap = await getDoc(doc(db, 'media_library', mediaId));
    if (!snap.exists()) {
      if (staticItem) {
        return {
          id: staticItem.id,
          url: staticItem.public_url || '',
          type: staticItem.file_type,
          alt: staticItem.alt_text || staticItem.file_name,
          width: staticItem.width,
          height: staticItem.height,
        };
      }
      return null;
    }

    const data = snap.data() as CmsMediaLibraryItem;
    return {
      id: data.id,
      url: getPublicMediaUrl(data),
      type: data.file_type || 'image',
      alt: data.alt_text || data.file_name || '',
      width: data.width,
      height: data.height,
    };
  } catch {
    if (staticItem) {
      return {
        id: staticItem.id,
        url: staticItem.public_url || '',
        type: staticItem.file_type,
        alt: staticItem.alt_text || staticItem.file_name,
        width: staticItem.width,
        height: staticItem.height,
      };
    }
    return null;
  }
}

/**
 * Transforms a Firestore document into a full PublicProject
 */
async function transformFirestoreProject(row: CmsProject, docId: string): Promise<PublicProject> {
  const coverMedia = await resolveMedia(row.cover_media_id);
  const staticFallback = INITIAL_PUBLIC_PROJECTS.find((p) => p.slug === row.slug || p.id === docId);

  return {
    id: docId,
    slug: row.slug || staticFallback?.slug || docId,
    title: row.title || staticFallback?.title || 'Untitled Project',
    year: row.year || staticFallback?.year || '2026',
    client: row.client ?? staticFallback?.client ?? null,
    industry: row.industry ?? staticFallback?.industry ?? null,
    discipline: row.discipline ?? staticFallback?.discipline ?? row.industry ?? null,
    role: row.role ?? staticFallback?.role ?? null,
    shortDescription: row.short_description ?? staticFallback?.short_description ?? null,
    tagline: row.tagline ?? staticFallback?.tagline ?? row.short_description ?? null,
    overview: row.overview ?? staticFallback?.overview ?? null,
    challenge: row.challenge ?? staticFallback?.challenge ?? null,
    concept: row.concept ?? staticFallback?.concept ?? null,
    strategy: row.strategy ?? staticFallback?.strategy ?? null,
    outcome: row.outcome ?? staticFallback?.outcome ?? null,
    artDirection: row.art_direction ?? staticFallback?.art_direction ?? null,
    accentColor: row.accent_color ?? staticFallback?.accent_color ?? '#F05245',
    bgGradient: row.bg_gradient ?? staticFallback?.bg_gradient ?? 'from-[#171717] to-[#0a0a0a]',
    textColor: row.text_color ?? staticFallback?.text_color ?? '#F2F2EF',
    layoutVariant: (row.layout_variant || staticFallback?.layout_variant || 'full') as any,
    aspectRatio: row.aspect_ratio || staticFallback?.aspect_ratio || '16:9',
    deliverables: row.deliverables || staticFallback?.deliverables || [],
    typographyDetails: row.typography_details || staticFallback?.typography_details || null,
    colorPalette: row.color_palette || staticFallback?.color_palette || [],
    featured: Boolean(row.featured !== undefined ? row.featured : staticFallback?.featured),
    published: Boolean(row.published !== undefined ? row.published : true),
    sortOrder: row.sort_order ?? staticFallback?.sort_order ?? 0,
    coverMedia,
  };
}

/**
 * Fetches featured projects for homepage Selected Work
 */
export async function getFeaturedProjects(): Promise<PublicProject[]> {
  if (!isFirebaseConfigured) {
    return FALLBACK_PUBLIC_PROJECTS;
  }

  try {
    const q = query(
      collection(db, 'projects'),
      where('published', '==', true),
      orderBy('sort_order', 'asc')
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      return FALLBACK_PUBLIC_PROJECTS;
    }

    const items = await Promise.all(
      snap.docs.map((d) => transformFirestoreProject(d.data() as CmsProject, d.id))
    );

    const featured = items.filter((p) => p.featured);
    return featured.length > 0 ? featured : items;
  } catch (err) {
    console.warn('[Firebase] Projects fetch error, using live fallback:', err);
    return FALLBACK_PUBLIC_PROJECTS;
  }
}

/**
 * Fetches all published projects for /work catalog
 */
export async function getAllPublishedProjects(): Promise<PublicProject[]> {
  if (!isFirebaseConfigured) {
    return FALLBACK_PUBLIC_PROJECTS;
  }

  try {
    const q = query(
      collection(db, 'projects'),
      where('published', '==', true),
      orderBy('sort_order', 'asc')
    );
    const snap = await getDocs(q);
    if (snap.empty) return FALLBACK_PUBLIC_PROJECTS;

    const items = await Promise.all(
      snap.docs.map((d) => transformFirestoreProject(d.data() as CmsProject, d.id))
    );

    return items;
  } catch (err) {
    console.warn('[Firebase] Fallback all published projects used:', err);
    return FALLBACK_PUBLIC_PROJECTS;
  }
}

/**
 * Fetches a single project by slug for /work/:slug
 */
export async function getProjectBySlug(slug: string): Promise<PublicProject | null> {
  const isMivaSlug = slug === 'miva-ai-hackathon' || slug === 'lumina-botanique';
  const isMajoraSlug = slug === 'majora';
  const isEchofarmsSlug = slug === 'echofarms-africa' || slug === 'echofarms' || slug === 'solis-ceramics' || slug === 'solis-atelier';
  const isNeloSlug = slug === 'the-nelo-okeke-foundation' || slug === 'nelo' || slug === 'nelo-okeke-foundation' || slug === 'hyperion-biennial' || slug === 'verve-monograph' || slug === 'coatys-packaging';

  if (!isFirebaseConfigured) {
    const fallback = FALLBACK_PUBLIC_PROJECTS.find(
      (p) => p.slug === slug || 
        (isMivaSlug && (p.slug === 'lumina-botanique' || p.slug === 'miva-ai-hackathon')) || 
        (isMajoraSlug && (p.slug === 'majora' || p.slug === 'hyperion-biennial')) ||
        (isEchofarmsSlug && (p.slug === 'solis-ceramics' || p.slug === 'solis-atelier' || p.slug === 'echofarms-africa')) ||
        (isNeloSlug && (p.slug === 'the-nelo-okeke-foundation' || p.slug === 'hyperion-biennial' || p.slug === 'verve-monograph' || p.id === 'hyperion-biennial' || p.id === 'verve-monograph'))
    );
    return fallback || null;
  }

  try {
    const q = query(
      collection(db, 'projects'),
      where('slug', '==', slug),
      where('published', '==', true)
    );
    let snap = await getDocs(q);
    if (snap.empty && isMivaSlug) {
      const altSlug = slug === 'miva-ai-hackathon' ? 'lumina-botanique' : 'miva-ai-hackathon';
      const altQ = query(
        collection(db, 'projects'),
        where('slug', '==', altSlug),
        where('published', '==', true)
      );
      snap = await getDocs(altQ);
    } else if (snap.empty && isMajoraSlug) {
      const altSlug = 'majora';
      const altQ = query(
        collection(db, 'projects'),
        where('slug', '==', altSlug),
        where('published', '==', true)
      );
      snap = await getDocs(altQ);
    } else if (snap.empty && isEchofarmsSlug) {
      const altSlug = slug === 'echofarms-africa' ? 'solis-ceramics' : 'echofarms-africa';
      const altQ = query(
        collection(db, 'projects'),
        where('slug', '==', altSlug),
        where('published', '==', true)
      );
      snap = await getDocs(altQ);
    } else if (snap.empty && isNeloSlug) {
      const altSlug = slug === 'hyperion-biennial' ? 'verve-monograph' : 'hyperion-biennial';
      const altQ = query(
        collection(db, 'projects'),
        where('slug', '==', altSlug),
        where('published', '==', true)
      );
      snap = await getDocs(altQ);
    }

    if (snap.empty) {
      const fallback = FALLBACK_PUBLIC_PROJECTS.find(
        (p) => p.slug === slug || 
          (isMivaSlug && (p.slug === 'lumina-botanique' || p.slug === 'miva-ai-hackathon')) || 
          (isMajoraSlug && (p.slug === 'majora' || p.slug === 'hyperion-biennial')) ||
          (isEchofarmsSlug && (p.slug === 'solis-ceramics' || p.slug === 'solis-atelier' || p.slug === 'echofarms-africa')) ||
          (isNeloSlug && (p.slug === 'the-nelo-okeke-foundation' || p.slug === 'hyperion-biennial' || p.slug === 'verve-monograph' || p.id === 'hyperion-biennial' || p.id === 'verve-monograph'))
      );
      return fallback || null;
    }

    const docSnap = snap.docs[0];
    return await transformFirestoreProject(docSnap.data() as CmsProject, docSnap.id);
  } catch (err) {
    console.warn('[Firebase] Fallback single project used:', err);
    return (
      FALLBACK_PUBLIC_PROJECTS.find(
        (p) => p.slug === slug || 
          (isMivaSlug && (p.slug === 'lumina-botanique' || p.slug === 'miva-ai-hackathon')) || 
          (isMajoraSlug && (p.slug === 'majora' || p.slug === 'hyperion-biennial')) ||
          (isEchofarmsSlug && (p.slug === 'solis-ceramics' || p.slug === 'solis-atelier' || p.slug === 'echofarms-africa')) ||
          (isNeloSlug && (p.slug === 'the-nelo-okeke-foundation' || p.slug === 'hyperion-biennial' || p.slug === 'verve-monograph' || p.id === 'hyperion-biennial' || p.id === 'verve-monograph'))
      ) || null
    );
  }
}

/**
 * Fetches narrative case study sections
 */
export async function getProjectSections(projectId: string): Promise<PublicSection[]> {
  if (!isFirebaseConfigured) return [];
  try {
    const q = query(
      collection(db, 'project_sections'),
      where('project_id', '==', projectId),
      orderBy('sort_order', 'asc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const row = d.data() as CmsProjectSection;
      return {
        id: d.id,
        sectionType: row.section_type || 'narrative',
        heading: row.heading || '',
        body: row.body || '',
        sortOrder: row.sort_order || 0,
      };
    });
  } catch {
    return [];
  }
}

/**
 * Fetches gallery media items for a case study
 */
export async function getProjectGalleryMedia(projectId: string): Promise<PublicGalleryMedia[]> {
  if (!isFirebaseConfigured) return [];
  try {
    const q = query(
      collection(db, 'project_media'),
      where('project_id', '==', projectId),
      orderBy('sort_order', 'asc')
    );
    const snap = await getDocs(q);

    const items = await Promise.all(
      snap.docs.map(async (d) => {
        const row = d.data() as CmsProjectMedia;
        const media = await resolveMedia(row.media_id);
        return {
          id: d.id,
          caption: row.caption || '',
          altText: row.alt_text || '',
          layout: row.layout || 'full',
          sortOrder: row.sort_order || 0,
          media,
        };
      })
    );

    return items;
  } catch {
    return [];
  }
}

export const CANONICAL_LIVE_PROJECTS: Array<{
  id: string;
  slug: string;
  aliases: string[];
  title: string;
}> = [
  {
    id: 'miva-ai-hackathon',
    slug: 'lumina-botanique',
    aliases: ['miva-ai-hackathon', 'lumina-botanique', 'miva'],
    title: 'MIVA AI HACKATHON',
  },
  {
    id: 'smak',
    slug: 'kronos-spatial',
    aliases: ['kronos-spatial', 'smak', 'smak-identity'],
    title: 'SMAK',
  },
  {
    id: 'echofarms-africa',
    slug: 'solis-ceramics',
    aliases: ['solis-ceramics', 'solis-atelier', 'echofarms-africa', 'echofarms'],
    title: 'Echofarms Africa',
  },
  {
    id: 'majora',
    slug: 'majora',
    aliases: ['majora', 'hyperion-biennial'],
    title: 'Majora',
  },
  {
    id: 'the-nelo-okeke-foundation',
    slug: 'the-nelo-okeke-foundation',
    aliases: ['the-nelo-okeke-foundation', 'nelo-okeke-foundation', 'nelo', 'verve-monograph', 'coatys-packaging'],
    title: 'The Nelo Okeke Foundation',
  },
];

export function getCanonicalLiveTitle(slugOrTitle: string): string {
  const norm = (slugOrTitle || '').toLowerCase().trim();
  if (norm.includes('miva') || norm.includes('lumina')) return 'MIVA AI HACKATHON';
  if (norm.includes('smak') || norm.includes('kronos')) return 'SMAK';
  if (norm.includes('echofarm') || norm.includes('solis')) return 'Echofarms Africa';
  if (norm.includes('majora')) return 'Majora';
  if (norm.includes('nelo') || norm.includes('foundation') || norm.includes('hyperion') || norm.includes('verve')) return 'The Nelo Okeke Foundation';
  return slugOrTitle;
}

export function getCanonicalLiveSlug(slug: string): string {
  const norm = (slug || '').toLowerCase().trim();
  if (norm.includes('miva') || norm.includes('lumina')) return 'lumina-botanique';
  if (norm.includes('smak') || norm.includes('kronos')) return 'kronos-spatial';
  if (norm.includes('echofarm') || norm.includes('solis')) return 'solis-ceramics';
  if (norm.includes('majora')) return 'majora';
  if (norm.includes('nelo') || norm.includes('foundation') || norm.includes('hyperion') || norm.includes('verve')) return 'the-nelo-okeke-foundation';
  return slug;
}

/**
 * Finds adjacent projects for Previous / Next buttons
 */
export async function getAdjacentProjects(currentSlug: string): Promise<{
  prevProject: { slug: string; title: string } | null;
  nextProject: { slug: string; title: string } | null;
}> {
  const norm = (currentSlug || '').toLowerCase().trim();
  const currentIndex = CANONICAL_LIVE_PROJECTS.findIndex(
    (p) => p.slug === norm || p.id === norm || p.aliases.includes(norm)
  );

  if (currentIndex !== -1) {
    const prevIdx = currentIndex > 0 ? currentIndex - 1 : CANONICAL_LIVE_PROJECTS.length - 1;
    const nextIdx = currentIndex < CANONICAL_LIVE_PROJECTS.length - 1 ? currentIndex + 1 : 0;
    const prev = CANONICAL_LIVE_PROJECTS[prevIdx];
    const next = CANONICAL_LIVE_PROJECTS[nextIdx];
    return {
      prevProject: { slug: prev.slug, title: prev.title },
      nextProject: { slug: next.slug, title: next.title },
    };
  }

  const allProjects = await getAllPublishedProjects();
  if (!allProjects.length) return { prevProject: null, nextProject: null };

  const idx = allProjects.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) {
    return {
      prevProject: null,
      nextProject: allProjects.length > 0 ? { slug: getCanonicalLiveSlug(allProjects[0].slug), title: getCanonicalLiveTitle(allProjects[0].title) } : null,
    };
  }

  const prev = idx > 0 ? allProjects[idx - 1] : allProjects[allProjects.length - 1];
  const next = idx < allProjects.length - 1 ? allProjects[idx + 1] : allProjects[0];

  return {
    prevProject: prev && prev.slug !== currentSlug ? { slug: getCanonicalLiveSlug(prev.slug), title: getCanonicalLiveTitle(prev.title) } : null,
    nextProject: next && next.slug !== currentSlug ? { slug: getCanonicalLiveSlug(next.slug), title: getCanonicalLiveTitle(next.title) } : null,
  };
}

/**
 * Full case study composite fetcher
 */
export async function fetchCaseStudyBySlug(slug: string): Promise<{
  project: PublicProject | null;
  sections: PublicSection[];
  gallery: PublicGalleryMedia[];
  prevProject: { slug: string; title: string } | null;
  nextProject: { slug: string; title: string } | null;
}> {
  const project = await getProjectBySlug(slug);
  if (!project) {
    return {
      project: null,
      sections: [],
      gallery: [],
      prevProject: null,
      nextProject: null,
    };
  }

  const [sections, gallery, adjacent] = await Promise.all([
    getProjectSections(project.id),
    getProjectGalleryMedia(project.id),
    getAdjacentProjects(slug),
  ]);

  return {
    project,
    sections,
    gallery,
    prevProject: adjacent.prevProject,
    nextProject: adjacent.nextProject,
  };
}

/**
 * Fetches the active studio services
 */
export async function getPublicServices(): Promise<PublicService[]> {
  if (!isFirebaseConfigured) return FALLBACK_PUBLIC_SERVICES;

  try {
    const q = query(
      collection(db, 'services'),
      where('active', '==', true),
      orderBy('sort_order', 'asc')
    );
    const snap = await getDocs(q);
    if (snap.empty) return FALLBACK_PUBLIC_SERVICES;

    const items = await Promise.all(
      snap.docs.map(async (d) => {
        const row = d.data() as CmsService;
        const previewMedia = await resolveMedia(row.preview_media_id);
        const staticFallback = INITIAL_SERVICES.find((s) => s.id === d.id || s.number === row.number);

        return {
          id: d.id,
          number: row.number || staticFallback?.number || '01',
          title: row.title || staticFallback?.title || '',
          subtitle: row.subtitle || staticFallback?.subtitle,
          summary: row.summary || staticFallback?.summary,
          disciplines: row.disciplines || staticFallback?.disciplines,
          deliverables: row.deliverables || staticFallback?.deliverables,
          highlightMetric: row.highlight_metric || staticFallback?.highlight_metric,
          sortOrder: row.sort_order || staticFallback?.sort_order || 0,
          active: Boolean(row.active !== undefined ? row.active : true),
          previewMedia,
        };
      })
    );

    return items;
  } catch {
    return FALLBACK_PUBLIC_SERVICES;
  }
}

// Named function aliases
export const fetchFeaturedProjects = getFeaturedProjects;
export const fetchCatalogProjects = getAllPublishedProjects;
export const fetchPublicServices = getPublicServices;
