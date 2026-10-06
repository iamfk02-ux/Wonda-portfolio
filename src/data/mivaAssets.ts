// Automatically loads and sorts all media from src/assets/Projects/MIVA AI HACKATHON
const rawMivaMedia = import.meta.glob<{ default: string }>(
  '../assets/Projects/MIVA AI HACKATHON/*',
  { eager: true }
);

export interface MivaAssetItem {
  id: string;
  order: number;
  url: string;
  type: 'video' | 'image';
  alt: string;
}

export const MIVA_CASE_STUDY_MEDIA: MivaAssetItem[] = Object.entries(rawMivaMedia)
  .map(([path, mod]) => {
    const filename = path.split('/').pop() || '';
    const match = filename.match(/M(\d+)/i);
    const order = match ? parseInt(match[1], 10) : 999;
    const isVideo = filename.toLowerCase().endsWith('.mp4') || filename.toLowerCase().endsWith('.webm');
    return {
      id: filename,
      order,
      url: typeof mod === 'string' ? mod : mod.default || (mod as unknown as string),
      type: isVideo ? ('video' as const) : ('image' as const),
      alt: `MIVA AI HACKATHON – ${filename.replace(/\.[^/.]+$/, '')}`,
    };
  })
  .sort((a, b) => a.order - b.order);
