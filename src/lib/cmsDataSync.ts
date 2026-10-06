import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import {
  CmsProject,
  CmsService,
  CmsTestimonial,
  CmsMediaLibraryItem,
} from '../types/cms';

export const INITIAL_MEDIA_LIBRARY: CmsMediaLibraryItem[] = [
  {
    id: 'media_lumina_cover',
    file_name: 'lumina-botanique-cover.jpg',
    file_path: 'projects/lumina-botanique-cover.jpg',
    file_type: 'image',
    mime_type: 'image/jpeg',
    alt_text: 'Lumina Botanique Architectural Flacon & Packaging',
    file_size: 245000,
    public_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: 'media_kronos_cover',
    file_name: 'kronos-spatial-cover.jpg',
    file_path: 'projects/kronos-spatial-cover.jpg',
    file_type: 'image',
    mime_type: 'image/jpeg',
    alt_text: 'Kronos Spatial Concrete Monolith Architecture Interface',
    file_size: 218000,
    public_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1400&auto=format&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: 'media_solis_cover',
    file_name: 'solis-ceramics-cover.jpg',
    file_path: 'projects/solis-ceramics-cover.jpg',
    file_type: 'image',
    mime_type: 'image/jpeg',
    alt_text: 'Solis Ceramics Hand-thrown Stoneware & Molded Pulp Packaging',
    file_size: 260000,
    public_url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1400&auto=format&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: 'media_hyperion_cover',
    file_name: 'hyperion-biennial-cover.jpg',
    file_path: 'projects/hyperion-biennial-cover.jpg',
    file_type: 'image',
    mime_type: 'image/jpeg',
    alt_text: 'Hyperion Biennial Generative Kinetic Visual Identity',
    file_size: 280000,
    public_url: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=1400&auto=format&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: 'media_verve_cover',
    file_name: 'verve-monograph-cover.jpg',
    file_path: 'projects/verve-monograph-cover.jpg',
    file_type: 'image',
    mime_type: 'image/jpeg',
    alt_text: 'Verve Monograph Clothbound Hardcover & Duotone Book',
    file_size: 310000,
    public_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1400&auto=format&fit=crop',
    created_at: new Date().toISOString(),
  },
  // Service Previews
  {
    id: 'media_service_01',
    file_name: 'service-visual-identity.jpg',
    file_path: 'services/service-visual-identity.jpg',
    file_type: 'image',
    mime_type: 'image/jpeg',
    alt_text: 'Visual Identity Systems Preview',
    file_size: 190000,
    public_url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: 'media_service_02',
    file_name: 'service-brand-strategy.jpg',
    file_path: 'services/service-brand-strategy.jpg',
    file_type: 'image',
    mime_type: 'image/jpeg',
    alt_text: 'Brand Strategy & Positioning Preview',
    file_size: 195000,
    public_url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: 'media_service_03',
    file_name: 'service-art-direction.jpg',
    file_path: 'services/service-art-direction.jpg',
    file_type: 'image',
    mime_type: 'image/jpeg',
    alt_text: 'Art Direction & Editorial Design Preview',
    file_size: 210000,
    public_url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200&auto=format&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: 'media_service_04',
    file_name: 'service-web-design.jpg',
    file_path: 'services/service-web-design.jpg',
    file_type: 'image',
    mime_type: 'image/jpeg',
    alt_text: 'Web Design & Digital Experiences Preview',
    file_size: 220000,
    public_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: 'media_service_05',
    file_name: 'service-packaging.jpg',
    file_path: 'services/service-packaging.jpg',
    file_type: 'image',
    mime_type: 'image/jpeg',
    alt_text: 'Packaging & Tactile Systems Preview',
    file_size: 230000,
    public_url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop',
    created_at: new Date().toISOString(),
  },
  {
    id: 'media_service_06',
    file_name: 'service-motion.jpg',
    file_path: 'services/service-motion.jpg',
    file_type: 'image',
    mime_type: 'image/jpeg',
    alt_text: 'Motion Design & Kinetic Systems Preview',
    file_size: 240000,
    public_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_PUBLIC_PROJECTS: CmsProject[] = [
  {
    id: 'lumina-botanique',
    slug: 'lumina-botanique',
    title: 'MIVA AI HACKATHON',
    year: '2025',
    client: 'MIVA',
    industry: 'Visual Identity & Digital Platform',
    discipline: 'Visual Identity & Digital Platform',
    role: 'Creative Direction, Identity, Platform System',
    short_description: 'Brand identity, creative direction, and digital platform system for the MIVA AI Hackathon.',
    tagline: 'Brand identity, creative direction, and digital platform system for the MIVA AI Hackathon.',
    overview: 'MIVA AI HACKATHON required a comprehensive brand transformation and digital presence to unite top AI engineers and designers.',
    challenge: 'Balancing pharmaceutical precision with high-fashion restraint. The packaging needed to feel weightless yet monumental in the hand, communicating the potency of rare botanical extracts.',
    strategy: 'We engineered a dual visual language: a mathematical grid system echoing apothecary cataloging paired with expressive, sculptural typography. The physical identity relies on custom heavy-base frosted flacons, raw travertine-hued unbleached cotton papers, and subtle blind debossing.',
    concept: 'We engineered a dual visual language: a mathematical grid system echoing apothecary cataloging paired with expressive, sculptural typography.',
    art_direction: 'Direction emphasized tactile warmth against architectural geometry. High-contrast natural morning light, long shadows across rough stone, and extreme macro focus on embossed paper textures.',
    outcome: 'Successful international flagship retail launch across 14 markets with a 65% increase in direct-to-consumer apothecary volume.',
    accent_color: '#C2A87E',
    bg_gradient: 'from-[#1a1815] to-[#0d0c0a]',
    text_color: '#f4ede2',
    layout_variant: 'full',
    aspect_ratio: '16:9',
    deliverables: [
      'Brand Identity & Wordmark',
      'Bespoke Flacon Industrial Dielines',
      'Secondary Rigid Box Packaging',
      'Art Direction & Studio Photography System',
      'Digital Flagship E-Commerce Experience',
      'Brand Guidelines Monograph (140 pages)',
    ],
    typography_details: {
      heading: 'Cormorant Garamond Display (Semibold Italic)',
      body: 'Plus Jakarta Sans (Light 300 / Regular 400)',
      character: 'Refined, high-contrast serif balanced against quiet geometric sans numerals.',
    },
    color_palette: [
      { name: 'Raw Travertine', hex: '#E6DEC8' },
      { name: 'Smoked Obsidian', hex: '#161513' },
      { name: 'Deep Lichen', hex: '#3A3F36' },
      { name: 'Warm Parchment', hex: '#FAF6EE' },
    ],
    cover_media_id: 'media_lumina_cover',
    featured: true,
    published: true,
    sort_order: 1,
  },
  {
    id: 'kronos-spatial',
    slug: 'kronos-spatial',
    title: 'SMAK',
    year: '2025',
    client: 'SMAK Hospitality',
    industry: 'Brand Identity',
    discipline: 'Brand Identity',
    role: 'Art Direction, Visual Identity, Packaging',
    short_description: 'Identity, reimagined (concept)',
    tagline: 'Identity, reimagined (concept)',
    overview: 'A bold, sensorial gastronomy identity system.',
    challenge: 'Crafting a culinary brand identity that stands out in high-density urban environments with sensory tactile materials.',
    strategy: 'We built a dynamic typography system and distinctive packaging suite celebrating craft and flavor.',
    concept: 'Sensory gastronomy identity system.',
    art_direction: 'Rich contrast, warm textures, and bold modern typography.',
    outcome: 'Successful concept rollout with widespread culinary and design press acclaim.',
    accent_color: '#F05245',
    bg_gradient: 'from-[#141517] to-[#0a0a0c]',
    text_color: '#f0f2f5',
    layout_variant: 'split-left',
    aspect_ratio: '4:3',
    deliverables: [
      'Brand Identity & Wordmark',
      'Packaging Suite & Dielines',
      'Sensory Menu Architecture',
      'Art Direction & Photography',
    ],
    typography_details: {
      heading: 'Syne (Extra Bold 800)',
      body: 'Plus Jakarta Sans (Regular 400)',
      character: 'Bold, sensorial sans-serif with vibrant contemporary energy.',
    },
    color_palette: [
      { name: 'Flame Red', hex: '#F05245' },
      { name: 'Warm Cream', hex: '#FAF6EE' },
      { name: 'Charcoal Black', hex: '#111111' },
    ],
    cover_media_id: 'media_kronos_cover',
    featured: true,
    published: true,
    sort_order: 2,
  },
  {
    id: 'solis-atelier',
    slug: 'solis-ceramics',
    title: 'Echofarms Africa',
    year: '2026',
    client: 'Echofarms Africa',
    industry: 'Brand Identity & UI/UX',
    discipline: 'Brand Identity & UI/UX',
    role: 'Brand Identity, Logo Design, UI/UX Design, Editorial and Presentation',
    short_description: 'Coming Soon',
    tagline: 'Coming Soon',
    overview: 'Coming Soon.',
    challenge: 'Developing an agricultural and sustainable food ecosystem brand across African agricultural centers.',
    strategy: 'Unified visual identity connecting modern agronomy with accessible mobile digital systems.',
    concept: 'Regenerative agriculture and digital ecosystem.',
    art_direction: 'Warm earth tones, modern minimalism, and human-centered documentary visuals.',
    outcome: 'Brand platform slated for continental debut in 2026.',
    accent_color: '#111111',
    bg_gradient: 'from-[#1d1612] to-[#0c0a09]',
    text_color: '#f7eee8',
    layout_variant: 'offset',
    aspect_ratio: '4:5',
    deliverables: [
      'Brand Identity System',
      'Digital Web & App Platform',
      'Agronomy Guidelines',
      'Stakeholder Presentations',
    ],
    typography_details: {
      heading: 'Grotesk (Bold 700)',
      body: 'Plus Jakarta Sans (Regular 400)',
      character: 'Clear, modern, and enduring.',
    },
    color_palette: [
      { name: 'Core Black', hex: '#111111' },
      { name: 'Earth Ochre', hex: '#C97A52' },
      { name: 'Warm White', hex: '#F9F9F8' },
    ],
    cover_media_id: 'media_solis_cover',
    featured: true,
    published: true,
    sort_order: 3,
  },
  {
    id: 'majora',
    slug: 'majora',
    title: 'Majora',
    year: '2025',
    client: 'Majora Events',
    industry: 'Entertainment & Brand Movement',
    discipline: 'Entertainment & Brand Movement',
    role: 'Brand Strategy, Logo Design, Campaign Design, UI/UX',
    short_description: 'Movement platform built for creators, organizers, and fans',
    tagline: 'Movement platform built for creators, organizers, and fans',
    overview: 'Majora is more than an app — it’s a movement platform built for the creators, organizers, and fans that drive the entertainment world forward.',
    challenge: 'Connecting artists, event organizers, and fans through a high-energy, scalable brand system.',
    strategy: 'Dynamic motion language, responsive digital interfaces, and striking campaign collateral.',
    concept: 'Movement platform for the modern entertainment economy.',
    art_direction: 'Electric accents, high-contrast typography, and fluid movement choreography.',
    outcome: 'Empowering communities and live events across premier cultural scenes.',
    accent_color: '#3B82F6',
    bg_gradient: 'from-[#0d1424] to-[#070b14]',
    text_color: '#eff6ff',
    layout_variant: 'split-right',
    aspect_ratio: '1:1',
    deliverables: [
      'Brand Strategy & Platform Identity',
      'Mobile App UI/UX Architecture',
      'Campaign Visual Design',
      'Event Wayfinding & Digital Passes',
    ],
    typography_details: {
      heading: 'Grotesk (Bold 700)',
      body: 'Plus Jakarta Sans (Regular 400)',
      character: 'Sensory, dynamic, and forward-moving.',
    },
    color_palette: [
      { name: 'Majora Blue', hex: '#3B82F6' },
      { name: 'Deep Space', hex: '#0B0F19' },
      { name: 'Pure White', hex: '#FFFFFF' },
    ],
    cover_media_id: 'media_hyperion_cover',
    featured: true,
    published: true,
    sort_order: 4,
  },
  {
    id: 'verve-monograph',
    slug: 'verve-monograph',
    title: 'The Nelo Okeke Foundation',
    year: '2025',
    client: 'Nelo Okeke',
    industry: 'Brand Identity & Visual Language',
    discipline: 'Brand Identity & Visual Language',
    role: 'Logo Design & Conceptualization',
    short_description: 'The Nelo Okeke Outreach Foundation sought to establish a strong, recognizable brand identity that accurately reflected its mission and values. The goal was to create a visual language that would resonate with donors, partners, and beneficiaries alike, fostering trust and support.',
    tagline: 'The Nelo Okeke Outreach Foundation sought to establish a strong, recognizable brand identity that accurately reflected its mission and values. The goal was to create a visual language that would resonate with donors, partners, and beneficiaries alike, fostering trust and support.',
    overview: 'The Nelo Okeke Outreach Foundation sought to establish a strong, recognizable brand identity that accurately reflected its mission and values. The goal was to create a visual language that would resonate with donors, partners, and beneficiaries alike, fostering trust and support.',
    challenge: 'Creating a unified visual identity that communicates both empathy and institutional prestige across digital platforms, print materials, and outreach initiatives.',
    strategy: 'We built a modern, iconic brandmark paired with a refined typographic palette and human-centered editorial storytelling, creating an approachable yet enduring institution.',
    concept: 'A symbolic mark reflecting hope, empowerment, and community upliftment.',
    art_direction: 'Warm, refined minimalism with authentic photography and disciplined neo-grotesk typography.',
    outcome: 'A transformative brand foundation that established immediate credibility and connection across all stakeholders.',
    accent_color: '#111111',
    bg_gradient: 'from-[#171717] to-[#0a0a0a]',
    text_color: '#f5f5f5',
    layout_variant: 'full',
    aspect_ratio: '16:9',
    deliverables: [
      'Brand Identity & Mark Design',
      'Typography System & Hierarchy',
      'Color Palette & Visual Guidelines',
      'Outreach Materials & Presentation Templates',
      'Digital & Social Media Identity',
      'Editorial Stationery Suite',
    ],
    typography_details: {
      heading: 'Grotesk (Bold 700)',
      body: 'Plus Jakarta Sans (Regular 400)',
      character: 'Clear, modern, and compassionate with timeless design balance.',
    },
    color_palette: [
      { name: 'Core Black', hex: '#111111' },
      { name: 'Warm Paper White', hex: '#F9F9F8' },
      { name: 'Charcoal Grey', hex: '#27272A' },
      { name: 'Accent Ochre', hex: '#C2A87E' },
    ],
    cover_media_id: 'media_verve_cover',
    featured: true,
    published: true,
    sort_order: 5,
  },
];

export const INITIAL_SERVICES: CmsService[] = [
  {
    id: 'service_01',
    number: '01',
    title: 'Visual Identity Systems',
    subtitle: 'Enduring, distinctive brand marks, comprehensive design guidelines, and cohesive visual languages.',
    summary: 'Visual identity is not merely an ornament; it is the visual operating system of an organization. We build scalable, expressive brand worlds that command respect across both physical touchpoints and digital interfaces.',
    disciplines: ['Brand Architecture', 'Wordmarks & Logotypes', 'Design Guidelines & Design Systems', 'Iconography & Graphic Assets', 'Stationery & Corporate Collateral'],
    deliverables: ['Full Vector Logo Suite', 'Comprehensive 120+ Page Brand Bible', 'Custom Color & Typography Guidelines', 'Digital Asset Repository', 'Application Templates'],
    highlight_metric: 'Every identity built to scale effortlessly from 16px favicons to 40-foot architectural signage.',
    preview_media_id: 'media_service_01',
    sort_order: 1,
    active: true,
  },
  {
    id: 'service_02',
    number: '02',
    title: 'Brand Strategy & Positioning',
    subtitle: 'Clarifying purpose, defining distinct market space, and articulating core creative conviction.',
    summary: 'Before drawing a single glyph, we establish what makes a brand irreplaceable. We unpack market landscape, user psychology, and founder vision to articulate a positioning foundation that guides all future creative execution.',
    disciplines: ['Market & Competitor Audits', 'Core Positioning & Value Proposition', 'Verbal Identity & Brand Voice', 'Brand Naming & Taxonomy', 'Creative Direction Manifesto'],
    deliverables: ['Strategic Brand Platform Document', 'Verbal Style & Tone Playbook', 'Messaging Matrix & Elevator Narrative', 'Audience Persona Architectures'],
    highlight_metric: 'Eliminating ambiguity to give founders and creative teams absolute clarity.',
    preview_media_id: 'media_service_02',
    sort_order: 2,
    active: true,
  },
  {
    id: 'service_03',
    number: '03',
    title: 'Art Direction & Editorial Design',
    subtitle: 'Evocative visual storytelling, photography curation, and luxury publishing systems.',
    summary: 'From high-concept lookbooks and hardbound monographs to campaign shoots and digital storytelling, we curate every visual nuance — lighting, texture, spatial pacing, and typographic composition.',
    disciplines: ['Photography & Film Direction', 'Book & Editorial Publishing', 'Exhibition Catalogs & Lookbooks', 'Campaign Concept & Visual Styling', 'Print Finishing & Production Supervision'],
    deliverables: ['Print-Ready Monograph Dielines', 'Shoot Production Call Sheets & Moodboards', 'Print Production Color Proofing', 'Limited-Edition Collector Collateral'],
    highlight_metric: 'Treating every printed page and digital layout with the precision of a gallery exhibition.',
    preview_media_id: 'media_service_03',
    sort_order: 3,
    active: true,
  },
  {
    id: 'service_04',
    number: '04',
    title: 'Web Design & Digital Experiences',
    subtitle: 'Custom-crafted, editorial web flagships that reject generic template tropes.',
    summary: 'We design bespoke digital environments that feel like natural extensions of a brand’s physical presence. Fluid scroll pacing, intentional whitespace, sculptural typography, and frictionless usability.',
    disciplines: ['Digital Flagships & Portfolio Platforms', 'Information Architecture & User Journeys', 'Interactive Prototyping & Micro-animations', 'Responsive Mobile Choreography', 'Design Systems for Engineering'],
    deliverables: ['Figma Component Libraries & Tokens', 'Production-Ready Responsive Layouts', 'Motion & Transition Prototypes', 'Developer Handoff Specifications'],
    highlight_metric: 'Crafted for effortless speed, WCAG AA legibility, and unmistakable aesthetic distinction.',
    preview_media_id: 'media_service_04',
    sort_order: 4,
    active: true,
  },
  {
    id: 'service_05',
    number: '05',
    title: 'Packaging & Tactile Systems',
    subtitle: 'Sensory physical unboxing experiences, sustainable materials, and sculptural containers.',
    summary: 'Packaging is the most intimate physical dialogue between customer and brand. We prioritize the feel of weight, the resistance of custom closures, the grain of uncoated papers, and sustainable material innovation.',
    disciplines: ['Custom Structural Dieline Engineering', 'Luxury Rigid Box & Flacon Systems', 'Sustainable & Molded Pulp Packaging', 'Substrate Selection & Print Finishes', 'Foil Stamping, Debossing & Specialty Varnishes'],
    deliverables: ['Production-Ready CAD Packaging Dielines', 'Supplier Material & Finish Specifications', '3D Photorealistic Packaging Mockups', 'Sample Prototype Review Reports'],
    highlight_metric: 'Engineered to spark emotional delight the instant hands make contact.',
    preview_media_id: 'media_service_05',
    sort_order: 5,
    active: true,
  },
  {
    id: 'service_06',
    number: '06',
    title: 'Motion Design & Kinetic Systems',
    subtitle: 'Bringing brands to life through intentional motion choreography and kinetic typography.',
    summary: 'In an increasingly kinetic world, static brands feel incomplete. We develop kinetic systems that establish rhythm, pacing, and behavior — turning typography into movement and giving digital products organic vitality.',
    disciplines: ['Kinetic Typography & Variable Fonts', 'Brand Idents & Logo Animation', 'Interface Motion Systems & Pacing', 'Campaign Teaser & Title Sequences', 'Social Kinetic Design Toolkits'],
    deliverables: ['Lottie / After Effects Motion Files', 'Kinetic Timing Curves & Easing Specs', 'Campaign Video Assets (4K Prores)', 'Interactive Code Animation Directives'],
    highlight_metric: 'Choreographed with purpose: never gratuitous flash, always reinforcing brand character.',
    preview_media_id: 'media_service_06',
    sort_order: 6,
    active: true,
  },
];

export const INITIAL_TESTIMONIALS: CmsTestimonial[] = [
  {
    id: 't1',
    quote: "Wonderful possesses an extraordinary ability to distill complex architectural software into an identity that feels both mathematically pure and emotionally resonant.",
    name: "Elena Rostova",
    role: "VP of Product",
    company: "Lumina Laboratories",
    sort_order: 1,
    published: true,
  },
  {
    id: 't2',
    quote: "The visual system developed for Kronos completely reset industry expectations for modern architectural flagships. Flawless craft, spatial tension, and uncompromising typographic execution.",
    name: "Marcus Sterling",
    role: "Founding Partner & Architect",
    company: "Kronos Architecture & Interiors",
    sort_order: 2,
    published: true,
  },
  {
    id: 't3',
    quote: "Wonda transformed our ceramic unboxing into an award-winning tactile journey. The attention to sustainable molded pulp material innovation was world-class.",
    name: "Kaelen Voss",
    role: "Lead Ceramist & Studio Founder",
    company: "Solis Ceramics",
    sort_order: 3,
    published: true,
  },
  {
    id: 't4',
    quote: "The generative kinetic identity created for Hyperion adapted seamlessly across 50-meter museum LED facades down to individual mobile attendee passes.",
    name: "Dr. Aris Thorne",
    role: "Curatorial Director",
    company: "Institute for Contemporary Culture",
    sort_order: 4,
    published: true,
  },
  {
    id: 't5',
    quote: "Designing a 420-page monograph with 300+ archival duotone plates requires extreme typographic discipline. Wonda delivered a timeless collector masterpiece.",
    name: "Siobhan Laurent",
    role: "Managing Editor",
    company: "Verve Edition Press",
    sort_order: 5,
    published: true,
  },
];

export const INITIAL_SITE_CONTENT = [
  {
    id: 'home_hero_tagline',
    page: 'home',
    section: 'hero',
    content_key: 'heroTagline',
    content_value: 'Multidisciplinary Designer & Creative Director',
  },
  {
    id: 'home_hero_headline',
    page: 'home',
    section: 'hero',
    content_key: 'heroHeadline',
    content_value: 'Shaping brand systems, digital experiences, packaging, and art direction through disciplined strategy and daring visual execution.',
  },
  {
    id: 'home_hero_status',
    page: 'home',
    section: 'hero',
    content_key: 'heroStatus',
    content_value: 'Currently accepting commissions for Q3/Q4 2026',
  },
  {
    id: 'home_intro_heading',
    page: 'home',
    section: 'intro',
    content_key: 'introHeading',
    content_value: 'I build identities, experiences, and visual systems that give ideas shape, voice, and life beyond the first thought.',
  },
  {
    id: 'home_intro_paragraph1',
    page: 'home',
    section: 'intro',
    content_key: 'introParagraph1',
    content_value: 'Operating at the intersection of brand identity, tactile packaging, digital experiences, and kinetic art direction, Wonda Design Studios crafts future-forward visual systems for visionary organizations worldwide.',
  },
  {
    id: 'home_intro_paragraph2',
    page: 'home',
    section: 'intro',
    content_key: 'introParagraph2',
    content_value: 'Every engagement is anchored in rigorous conceptual strategy and uncompromising craft—delivering cohesive brand universes that resonate across physical and digital touchpoints.',
  },
  {
    id: 'home_intro_stats',
    page: 'home',
    section: 'intro',
    content_key: 'stats',
    content_value: [
      { number: '8+', label: 'Years experience' },
      { number: '35+', label: 'Projects delivered' },
      { number: '3+', label: 'Continents served' },
      { number: '6+', label: 'Software mastered' },
      { number: '25%', label: 'Revenue Boost' },
    ],
  },
];

export const INITIAL_SITE_SETTINGS = [
  { key: 'designerName', value: 'Wonderful Blessed' },
  { key: 'studioName', value: 'Wonda Design Studios' },
  { key: 'founderTitle', value: 'Multidisciplinary Designer & Creative Director' },
  { key: 'email', value: 'hello@wondadesign.com' },
  { key: 'phoneDisplay', value: '+1 (555) 019-4820' },
  { key: 'whatsappLink', value: 'https://wa.me/15550194820?text=Hello%20Wonderful,%20I%20would%20like%20to%20discuss%20a%20new%20project%20with%20Wonda%20Design%20Studios.' },
  { key: 'availability', value: 'Currently accepting commissions for Q3/Q4 2026' },
  { key: 'tagline', value: 'Shaping brand systems, digital experiences, packaging, and art direction through disciplined strategy and daring visual execution.' },
  { key: 'resumeUrl', value: '/WonderfulB-CV-2026.pdf' },
  {
    key: 'socials',
    value: {
      behance: 'https://behance.net/wondadesign',
      instagram: 'https://instagram.com/wondadesignstudios',
      linkedin: 'https://linkedin.com/in/wonderful-blessed',
    },
  },
  {
    key: 'seo',
    value: {
      metaTitle: 'Wonda Design Studios — Multidisciplinary Design & Creative Direction',
      metaDescription: 'Independent design practice led by Wonderful Blessed. Crafting future-forward brand identities, physical & digital product experiences, bespoke packaging, and cinematic motion graphics.',
    },
  },
];

let syncExecuted = false;

/**
 * Ensures Firestore is populated with the complete public website data.
 * Checks for missing records and automatically migrates them into Firestore.
 */
export async function seedFirestoreWithPublicData(force = false): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured) {
    return { success: false, message: 'Firebase is not configured.' };
  }

  if (syncExecuted && !force) {
    return { success: true, message: 'Already synced in current session.' };
  }

  try {
    const batch = writeBatch(db);

    // 1. Media Library
    for (const media of INITIAL_MEDIA_LIBRARY) {
      const ref = doc(db, 'media_library', media.id);
      batch.set(ref, media, { merge: true });
    }

    // 2. Projects
    for (const project of INITIAL_PUBLIC_PROJECTS) {
      const ref = doc(db, 'projects', project.id);
      batch.set(ref, {
        ...project,
        updated_at: new Date().toISOString(),
      }, { merge: true });
    }

    // 3. Services
    for (const service of INITIAL_SERVICES) {
      const ref = doc(db, 'services', service.id);
      batch.set(ref, service, { merge: true });
    }

    // 4. Testimonials
    for (const test of INITIAL_TESTIMONIALS) {
      const ref = doc(db, 'testimonials', test.id);
      batch.set(ref, test, { merge: true });
    }

    // 5. Site Content (Homepage texts & Stats)
    for (const item of INITIAL_SITE_CONTENT) {
      const ref = doc(db, 'site_content', item.id);
      batch.set(ref, {
        ...item,
        updated_at: new Date().toISOString(),
      }, { merge: true });
    }

    // 6. Site Settings (Studio info, socials, CV link)
    for (const setting of INITIAL_SITE_SETTINGS) {
      const ref = doc(db, 'site_settings', setting.key);
      batch.set(ref, {
        id: setting.key,
        key: setting.key,
        value: setting.value,
        updated_at: new Date().toISOString(),
      }, { merge: true });
    }

    await batch.commit();
    syncExecuted = true;
    return { success: true, message: 'Successfully synced all live public data into Firestore.' };
  } catch (error: unknown) {
    const err = error as Error;
    console.warn('[DataSync] Firestore sync failed or restricted:', err.message);
    return { success: false, message: err.message };
  }
}
