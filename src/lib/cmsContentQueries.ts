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
import { CmsTestimonial, CmsSiteSetting, CmsSiteContent } from '../types/cms';
import { INITIAL_TESTIMONIALS } from './cmsDataSync';

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company?: string | null;
  sort_order: number;
  published: boolean;
}

export interface StudioSettings {
  designerName: string;
  studioName: string;
  founderTitle: string;
  email: string;
  phoneDisplay: string;
  whatsappLink: string;
  availability: string;
  tagline: string;
  resumeUrl: string;
  socials: {
    behance: string;
    instagram: string;
    linkedin: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

export interface HomepageContent {
  heroTagline: string;
  heroHeadline: string;
  heroStatus: string;
  introHeading: string;
  introParagraph1: string;
  introParagraph2: string;
  stats: {
    number: string;
    label: string;
  }[];
}

export const DEFAULT_SETTINGS: StudioSettings = {
  designerName: "Wonderful Blessed",
  studioName: "Wonda Design Studios",
  founderTitle: "Multidisciplinary Designer & Creative Director",
  email: "hello@wondadesign.com",
  phoneDisplay: "+1 (555) 019-4820",
  whatsappLink: "https://wa.me/15550194820?text=Hello%20Wonderful,%20I%20would%20like%20to%20discuss%20a%20new%20project%20with%20Wonda%20Design%20Studios.",
  availability: "Currently accepting commissions for Q3/Q4 2026",
  tagline: "Shaping brand systems, digital experiences, packaging, and art direction through disciplined strategy and daring visual execution.",
  resumeUrl: "/WonderfulB-CV-2026.pdf",
  socials: {
    behance: "https://behance.net/wondadesign",
    instagram: "https://instagram.com/wondadesignstudios",
    linkedin: "https://linkedin.com/in/wonderful-blessed",
  },
  seo: {
    metaTitle: "Wonda Design Studios — Multidisciplinary Design & Creative Direction",
    metaDescription: "Independent design practice led by Wonderful Blessed. Crafting future-forward brand identities, physical & digital product experiences, bespoke packaging, and cinematic motion graphics.",
  },
};

export const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  heroTagline: "Multidisciplinary Designer & Creative Director",
  heroHeadline: "Shaping brand systems, digital experiences, packaging, and art direction through disciplined strategy and daring visual execution.",
  heroStatus: "Currently accepting commissions for Q3/Q4 2026",
  introHeading: "Building identities, experiences, and visual systems that give ideas, shape, voice, and live beyond the first thought.",
  introParagraph1: "Operating at the intersection of brand identity, tactile packaging, digital experiences, and kinetic art direction, Wonda Design Studios crafts future-forward visual systems for visionary organizations worldwide.",
  introParagraph2: "Every engagement is anchored in rigorous conceptual strategy and uncompromising craft—delivering cohesive brand universes that resonate across physical and digital touchpoints.",
  stats: [
    { number: "8+", label: "Years experience" },
    { number: "35+", label: "Projects delivered" },
    { number: "3+", label: "Continents served" },
    { number: "6+", label: "Software mastered" },
    { number: "25%", label: "Revenue Boost" },
  ],
};

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = INITIAL_TESTIMONIALS.map((t) => ({
  id: t.id,
  quote: t.quote,
  name: t.name,
  role: t.role,
  company: t.company,
  sort_order: t.sort_order,
  published: t.published,
}));

/**
 * Fetches all global studio settings
 */
export async function getStudioSettings(): Promise<StudioSettings> {
  if (!isFirebaseConfigured) return DEFAULT_SETTINGS;

  try {
    const snap = await getDocs(collection(db, 'site_settings'));
    if (snap.empty) return DEFAULT_SETTINGS;

    const merged = { ...DEFAULT_SETTINGS };
    snap.forEach((docSnap) => {
      const data = docSnap.data() as CmsSiteSetting;
      const key = data.key || docSnap.id;
      const val = data.value;
      if (key && val !== undefined) {
        if (key === 'socials' && typeof val === 'object') {
          merged.socials = { ...merged.socials, ...(val as Record<string, string>) };
        } else if (key === 'seo' && typeof val === 'object') {
          merged.seo = { ...merged.seo, ...(val as Record<string, string>) };
        } else if (typeof val === 'string') {
          // @ts-ignore
          merged[key] = val;
        }
      }
    });

    return merged;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/**
 * Fetches editable homepage copy and stats
 */
export async function getHomepageContent(): Promise<HomepageContent> {
  if (!isFirebaseConfigured) return DEFAULT_HOMEPAGE_CONTENT;

  try {
    const snap = await getDocs(collection(db, 'site_content'));
    if (snap.empty) return DEFAULT_HOMEPAGE_CONTENT;

    const merged = { ...DEFAULT_HOMEPAGE_CONTENT };
    snap.forEach((docSnap) => {
      const data = docSnap.data() as CmsSiteContent;
      const key = data.content_key || docSnap.id;
      const val = data.content_value;
      if (key && val !== undefined) {
        if (key === 'stats' && Array.isArray(val)) {
          merged.stats = val;
        } else if (typeof val === 'string') {
          // @ts-ignore
          merged[key] = val;
        }
      }
    });

    return merged;
  } catch {
    return DEFAULT_HOMEPAGE_CONTENT;
  }
}

/**
 * Fetches published client testimonials
 */
export async function getPublishedTestimonials(): Promise<TestimonialItem[]> {
  if (!isFirebaseConfigured) return DEFAULT_TESTIMONIALS;

  try {
    const q = query(
      collection(db, 'testimonials'),
      where('published', '==', true),
      orderBy('sort_order', 'asc')
    );
    const snap = await getDocs(q);
    if (snap.empty) return DEFAULT_TESTIMONIALS;

    return snap.docs.map((d) => {
      const row = d.data() as CmsTestimonial;
      return {
        id: d.id,
        quote: row.quote || '',
        name: row.name || '',
        role: row.role || '',
        company: row.company || null,
        sort_order: row.sort_order || 0,
        published: Boolean(row.published),
      };
    });
  } catch {
    return DEFAULT_TESTIMONIALS;
  }
}

// Named function aliases
export const fetchStudioSettings = getStudioSettings;
export const fetchHomepageContent = getHomepageContent;
export const fetchPublicTestimonials = getPublishedTestimonials;
