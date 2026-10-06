import n0 from '../assets/Projects/NELO/N0.mp4';
import n1 from '../assets/Projects/NELO/N1.jpg';
import n2 from '../assets/Projects/NELO/N2.jpg';
import n3 from '../assets/Projects/NELO/N3.jpg';
import n4 from '../assets/Projects/NELO/N4.jpg';
import n5 from '../assets/Projects/NELO/N5.png';
import n6 from '../assets/Projects/NELO/N6.jpg';
import n7 from '../assets/Projects/NELO/N7.jpg';
import n8 from '../assets/Projects/NELO/N8.jpg';
import n9 from '../assets/Projects/NELO/N9.jpg';
import n10 from '../assets/Projects/NELO/N10 .mp4';
import n11 from '../assets/Projects/NELO/N11.jpg';
import n12 from '../assets/Projects/NELO/N12.png';
import n13 from '../assets/Projects/NELO/N13.png';
import n14 from '../assets/Projects/NELO/N14.jpg';
import n15 from '../assets/Projects/NELO/N15.jpg';

export interface NeloAssetItem {
  id: string;
  order: number;
  url: string;
  type: 'video' | 'image';
  alt: string;
}

export const NELO_CASE_STUDY_MEDIA: NeloAssetItem[] = [
  { id: 'N0', order: 0, url: n0, type: 'video', alt: 'The Nelo Okeke Foundation – N0' },
  { id: 'N1', order: 1, url: n1, type: 'image', alt: 'The Nelo Okeke Foundation – N1' },
  { id: 'N2', order: 2, url: n2, type: 'image', alt: 'The Nelo Okeke Foundation – N2' },
  { id: 'N3', order: 3, url: n3, type: 'image', alt: 'The Nelo Okeke Foundation – N3' },
  { id: 'N4', order: 4, url: n4, type: 'image', alt: 'The Nelo Okeke Foundation – N4' },
  { id: 'N5', order: 5, url: n5, type: 'image', alt: 'The Nelo Okeke Foundation – N5' },
  { id: 'N6', order: 6, url: n6, type: 'image', alt: 'The Nelo Okeke Foundation – N6' },
  { id: 'N7', order: 7, url: n7, type: 'image', alt: 'The Nelo Okeke Foundation – N7' },
  { id: 'N8', order: 8, url: n8, type: 'image', alt: 'The Nelo Okeke Foundation – N8' },
  { id: 'N9', order: 9, url: n9, type: 'image', alt: 'The Nelo Okeke Foundation – N9' },
  { id: 'N10', order: 10, url: n10, type: 'video', alt: 'The Nelo Okeke Foundation – N10' },
  { id: 'N11', order: 11, url: n11, type: 'image', alt: 'The Nelo Okeke Foundation – N11' },
  { id: 'N12', order: 12, url: n12, type: 'image', alt: 'The Nelo Okeke Foundation – N12' },
  { id: 'N13', order: 13, url: n13, type: 'image', alt: 'The Nelo Okeke Foundation – N13' },
  { id: 'N14', order: 14, url: n14, type: 'image', alt: 'The Nelo Okeke Foundation – N14' },
  { id: 'N15', order: 15, url: n15, type: 'image', alt: 'The Nelo Okeke Foundation – N15' },
];

export const THE_NELO_OKEKE_FOUNDATION_CASE_STUDY_MEDIA = NELO_CASE_STUDY_MEDIA;
export const VERVE_CASE_STUDY_MEDIA = NELO_CASE_STUDY_MEDIA;
