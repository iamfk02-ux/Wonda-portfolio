export interface Project {
  id: string;
  number: string;
  title: string;
  client: string;
  discipline: string;
  year: string;
  role: string;
  tagline: string;
  overview: string;
  challenge: string;
  strategy: string;
  artDirection: string;
  accentColor: string;
  bgGradient: string;
  textColor: string;
  layoutVariant: 'full' | 'split-left' | 'split-right' | 'offset';
  aspectRatio: string;
  deliverables: string[];
  typographyDetails: {
    heading: string;
    body: string;
    character: string;
  };
  colorPalette: {
    name: string;
    hex: string;
  }[];
  gallery: {
    caption: string;
    type: 'packaging' | 'digital' | 'identity' | 'editorial' | 'motion';
    subtext: string;
  }[];
}

export interface Capability {
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  disciplines: string[];
  deliverables: string[];
  highlightMetric: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  type: string;
  description: string;
  highlights: string[];
}

export interface ProjectInquiry {
  name: string;
  email: string;
  brand: string;
  services: string[];
  budget: string;
  timeline: string;
  message: string;
}
