export type MediaType = 'image' | 'video' | 'document' | 'audio';
export type MediaLayout = 'full' | 'half' | 'third' | 'portrait' | 'landscape' | 'video';

export interface CmsMediaLibraryItem {
  id: string;
  file_name: string;
  file_path: string;
  file_type: MediaType;
  mime_type: string;
  alt_text?: string | null;
  width?: number | null;
  height?: number | null;
  duration?: number | null;
  file_size: number;
  public_url?: string;
  created_at?: string;
}

export interface CmsProject {
  id: string;
  slug: string;
  title: string;
  year: string;
  client?: string | null;
  industry?: string | null;
  discipline?: string | null;
  role?: string | null;
  short_description?: string | null;
  tagline?: string | null;
  overview?: string | null;
  challenge?: string | null;
  concept?: string | null;
  strategy?: string | null;
  outcome?: string | null;
  art_direction?: string | null;
  accent_color?: string | null;
  bg_gradient?: string | null;
  text_color?: string | null;
  layout_variant?: 'full' | 'split-left' | 'split-right' | 'offset';
  aspect_ratio?: string | null;
  deliverables?: string[];
  typography_details?: {
    heading: string;
    body: string;
    character: string;
  };
  color_palette?: {
    name: string;
    hex: string;
  }[];
  cover_media_id?: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface CmsProjectSection {
  id: string;
  project_id: string;
  section_type: string;
  heading?: string | null;
  body?: string | null;
  sort_order: number;
}

export interface CmsProjectMedia {
  id: string;
  project_id: string;
  section_id?: string | null;
  media_id: string;
  caption?: string | null;
  alt_text?: string | null;
  layout: MediaLayout;
  sort_order: number;
}

export interface CmsService {
  id: string;
  number: string;
  title: string;
  subtitle?: string | null;
  summary?: string | null;
  disciplines?: string[];
  deliverables?: string[];
  highlight_metric?: string | null;
  preview_media_id?: string | null;
  sort_order: number;
  active: boolean;
}

export interface CmsTestimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company?: string | null;
  sort_order: number;
  published: boolean;
}

export interface CmsSiteContent {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: unknown;
  created_at?: string;
  updated_at?: string;
}

export interface CmsSiteSetting {
  id: string;
  key: string;
  value: unknown;
  updated_at?: string;
}
