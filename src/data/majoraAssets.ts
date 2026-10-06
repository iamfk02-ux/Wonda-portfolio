// Automatically loads and sorts all media from src/assets/Projects/MAJORA
const rawMajoraMedia = import.meta.glob<{ default: string }>(
  '../assets/Projects/MAJORA/*',
  { eager: true }
);

export interface MajoraAssetItem {
  id: string;
  order: number;
  url: string;
  type: 'image';
  alt: string;
}

export const HYPERION_CASE_STUDY_MEDIA: MajoraAssetItem[] = Object.entries(rawMajoraMedia)
  .map(([path, mod]) => {
    const filename = path.split('/').pop() || '';
    const match = filename.match(/Z(\d+)/i);
    const order = match ? parseInt(match[1], 10) : 999;
    return {
      id: filename,
      order,
      url: typeof mod === 'string' ? mod : mod.default || (mod as unknown as string),
      type: 'image' as const,
      alt: `Majora – ${filename.replace(/\.[^/.]+$/, '')}`,
    };
  })
  .sort((a, b) => a.order - b.order);

export const MAJORA_CASE_STUDY_MEDIA = HYPERION_CASE_STUDY_MEDIA;
