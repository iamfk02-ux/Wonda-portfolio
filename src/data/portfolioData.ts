import { Project, Capability, ExperienceItem } from '../types';

export const STUDIO_INFO = {
  designerName: "Wonderful Blessed",
  studioName: "Wonda Design Studios",
  founderTitle: "Multidisciplinary Designer & Creative Director",
  email: "hello@wondadesign.com",
  phoneDisplay: "+1 (555) 019-4820",
  whatsappNumber: "15550194820",
  whatsappLink: "https://wa.me/15550194820?text=Hello%20Wonderful,%20I%20would%20like%20to%20discuss%20a%20new%20project%20with%20Wonda%20Design%20Studios.",
  socials: {
    behance: "https://behance.net/wondadesign",
    instagram: "https://instagram.com/wondadesignstudios",
    linkedin: "https://linkedin.com/in/wonderful-blessed",
  },
  availability: "Currently accepting commissions for Q3/Q4 2026",
  tagline: "Shaping brand systems, digital experiences, packaging, and art direction through disciplined strategy and daring visual execution."
};

export const PROJECTS: Project[] = [
  {
    id: "lumina-botanique",
    number: "01",
    title: "MIVA AI HACKATHON",
    client: "MIVA",
    discipline: "Visual Identity & Packaging",
    year: "2025",
    role: "Creative Direction, Identity, Packaging System",
    tagline: "An ethereal botanical fragrance and apothecary system rooted in architectural glass and blind-debossed tactile paper.",
    overview: "Lumina Botanique required a comprehensive brand transformation to transition from an artisanal apothecary into an international luxury fragrance house. The challenge was to embody organic alchemy without relying on predictable green or botanical tropes.",
    challenge: "Balancing pharmaceutical precision with high-fashion restraint. The packaging needed to feel weightless yet monumental in the hand, communicating the potency of rare botanical extracts.",
    strategy: "We engineered a dual visual language: a mathematical grid system echoing apothecary cataloging paired with expressive, sculptural typography. The physical identity relies on custom heavy-base frosted flacons, raw travertine-hued unbleached cotton papers, and subtle blind debossing.",
    artDirection: "Direction emphasized tactile warmth against architectural geometry. High-contrast natural morning light, long shadows across rough stone, and extreme macro focus on embossed paper textures.",
    accentColor: "#C2A87E",
    bgGradient: "from-[#1a1815] to-[#0d0c0a]",
    textColor: "#f4ede2",
    layoutVariant: "full",
    aspectRatio: "16:9",
    deliverables: [
      "Brand Identity & Wordmark",
      "Bespoke Flacon Industrial Dielines",
      "Secondary Rigid Box Packaging",
      "Art Direction & Studio Photography System",
      "Digital Flagship E-Commerce Experience",
      "Brand Guidelines Monograph (140 pages)"
    ],
    typographyDetails: {
      heading: "Cormorant Garamond Display (Semibold Italic)",
      body: "Plus Jakarta Sans (Light 300 / Regular 400)",
      character: "Refined, high-contrast serif balanced against quiet geometric sans numerals."
    },
    colorPalette: [
      { name: "Raw Travertine", hex: "#E6DEC8" },
      { name: "Smoked Obsidian", hex: "#161513" },
      { name: "Deep Lichen", hex: "#3A3F36" },
      { name: "Warm Parchment", hex: "#FAF6EE" }
    ],
    gallery: [
      {
        caption: "Architectural Flacon & Heavy-Base Glass Geometry",
        type: "packaging",
        subtext: "Bespoke 100ml heavy-base flacon with custom cylindrical closure and blind-embossed paper label."
      },
      {
        caption: "Rigid Box Packaging & Unbleached Cotton Substrate",
        type: "packaging",
        subtext: "Tactile FSC-certified uncoated paperboard with deep debossed type and zero synthetic inks."
      },
      {
        caption: "Editorial Print Collateral & Scent Cards",
        type: "editorial",
        subtext: "Typographic scent specimen cards utilizing micro-perforations and botanical extraction coordinates."
      },
      {
        caption: "Digital Experience & Scent Selector Architecture",
        type: "digital",
        subtext: "Immersive web flagship featuring interactive note hierarchies and seamless checkout flow."
      }
    ]
  },
  {
    id: "kronos-spatial",
    number: "02",
    title: "SMAK",
    client: "SMAK Hospitality",
    discipline: "Digital Experience & Web Architecture",
    year: "2025",
    role: "Art Direction, UI/UX Design, Creative Coding",
    tagline: "A monolithic, editorial web platform designed to mirror the spatial tension of Brutalist and contemporary architecture.",
    overview: "Kronos Spatial is a progressive architectural atelier operating at the intersection of monolithic concrete structures and ecological landscaping. They needed a digital presence that avoided the typical cookie-cutter architecture portfolio template.",
    challenge: "Creating an interactive web environment that conveys the physical weight, spatial scale, and tactile acoustic atmosphere of monumental concrete spaces through a screen.",
    strategy: "We built the digital experience around an asymmetric column grid that expands and contracts based on scroll velocity. Rather than standard card grids, projects are treated as spatial pavilions, allowing visitors to navigate through high-resolution architectural plates, floor plans, and ambient soundscapes.",
    artDirection: "Strict monochromatic palette accented by raw titanium tones. Generous negative space, uncompromising typographic scale, and seamless page transitions that evoke walking through concrete corridors.",
    accentColor: "#9BA1A6",
    bgGradient: "from-[#141517] to-[#0a0a0c]",
    textColor: "#f0f2f5",
    layoutVariant: "split-left",
    aspectRatio: "16:9",
    deliverables: [
      "Digital Experience Strategy & Information Architecture",
      "Bespoke Responsive Layout System",
      "Interactive Project Blueprint Viewer",
      "Motion Choreography & Viewport Transitions",
      "Custom Typography Guidelines & Specimen",
      "CMS Architecture & Case Study Structure"
    ],
    typographyDetails: {
      heading: "Syne (Extra Bold 800)",
      body: "Plus Jakarta Sans (Regular 400)",
      character: "Tectonic, structural sans-serif with wide proportions and extreme glyph contrast."
    },
    colorPalette: [
      { name: "Poured Concrete", hex: "#2E3136" },
      { name: "Titanium White", hex: "#F3F5F7" },
      { name: "Deep Charcoal", hex: "#121315" },
      { name: "Industrial Zinc", hex: "#787F86" }
    ],
    gallery: [
      {
        caption: "Full Viewport Spatial Index & Navigation",
        type: "digital",
        subtext: "Fluid horizontal-to-vertical perspective transitions that reframe projects as architectural rooms."
      },
      {
        caption: "Blueprint & Elevation Micro-Viewer",
        type: "digital",
        subtext: "Interactive CAD overlay allowing clients to toggle between finished photography and construction schematics."
      },
      {
        caption: "Typographic Scale & Editorial Manifesto Layout",
        type: "editorial",
        subtext: "Hero statement set in 96pt Syne with deliberate character spacing and balanced line breaks."
      }
    ]
  },
  {
    id: "solis-atelier",
    number: "03",
    title: "Echofarms Africa",
    client: "Echofarms Africa",
    discipline: "Brand Identity & UI/UX",
    year: "2026",
    role: "Brand Identity, Logo Design, UI/UX Design, Editorial and Presentation",
    tagline: "Coming Soon",
    overview: "Coming Soon.",
    challenge: "Packaging fragile, irregularly shaped ceramic art pieces with sustainable, biodegradable materials while maintaining an unboxing experience worthy of a gallery exhibition.",
    strategy: "We devised an identity system centered around the stamp of the potter’s mark. Every box uses molded paper pulp trays wrapped in unbleached Japanese Kozo paper, sealed with a single wax-dipped cotton cord and letterpressed seal.",
    artDirection: "Warm, low-angle afternoon sunlight highlighting the granular texture of raw grog clay and uneven wood-ash glazes. Compositions feature deliberate stillness and quiet negative space.",
    accentColor: "#C97A52",
    bgGradient: "from-[#1d1612] to-[#0c0a09]",
    textColor: "#f7eee8",
    layoutVariant: "offset",
    aspectRatio: "4:3",
    deliverables: [
      "Brand Strategy & Origin Manifesto",
      "Visual Identity & Artisan Seal System",
      "Sustainable Molded Pulp Packaging System",
      "Handmade Cotton Paper Certificates of Authenticity",
      "Editorial Lookbook & Exhibition Catalog",
      "Art Direction for Studio & Still Life Photography"
    ],
    typographyDetails: {
      heading: "Cormorant Garamond (Medium 500)",
      body: "Plus Jakarta Sans (Light 300)",
      character: "Organic, classical warmth that speaks to timeless hand-craftsmanship."
    },
    colorPalette: [
      { name: "Terra Cotta", hex: "#B86644" },
      { name: "Wood Ash Grey", hex: "#7A736E" },
      { name: "Raw Clay Sand", hex: "#D6C7B2" },
      { name: "Kiln Black", hex: "#1C1917" }
    ],
    gallery: [
      {
        caption: "Molded Pulp Packaging & Letterpress Sleeve",
        type: "packaging",
        subtext: "100% post-consumer recycled pulp casing fitted perfectly to each unique vessel silhouette."
      },
      {
        caption: "Artisan Maker Seal & Authenticity Certificate",
        type: "identity",
        subtext: "Blind debossed signature chop on deckle-edged cotton paper with handwritten edition numbering."
      },
      {
        caption: "Exhibition Monograph & Photography Spreads",
        type: "editorial",
        subtext: "Hardcover Smyth-sewn publication documenting the 72-hour wood firing cycle."
      }
    ]
  },
  {
    id: "majora",
    number: "04",
    title: "Majora",
    client: "Majora Events",
    discipline: "Entertainment & Brand Movement",
    year: "2025",
    role: "Brand Strategy, Logo Design, Campaign Design, UI/UX",
    tagline: "Movement platform built for creators, organizers, and fans",
    overview: "Majora is more than an app — it’s a movement platform built for the creators, organizers, and fans that drive the entertainment world forward.",
    challenge: "Creating an identity that never stays static, but remains instantaneously recognizable across extreme scales — from a 50-meter public digital billboard to a micro-scale mobile ticket pass.",
    strategy: "We built a generative kinetic typographic engine where letterforms react in real-time to pedestrian motion and environmental sound. The kinetic rules ensure that every frame maintains structural typographic balance while constantly shifting in weight, compression, and shear.",
    artDirection: "Stark contrast between deep monochromatic black and iridescent kinetic vectors. High-velocity kinetic rhythms balanced with sudden freeze-frames of pristine typographic clarity.",
    accentColor: "#3B82F6",
    bgGradient: "from-[#0d1424] to-[#070b14]",
    textColor: "#eff6ff",
    layoutVariant: "split-right",
    aspectRatio: "16:9",
    deliverables: [
      "Generative Kinetic Identity System",
      "Motion Design Guidelines & Animation Choreography",
      "Architectural LED Façade Projections",
      "Exhibition Wayfinding & Environmental Graphics",
      "Interactive Digital Passes & Program Guide",
      "Campaign Teaser Film & Title Sequence Direction"
    ],
    typographyDetails: {
      heading: "Syne (Bold 700 / Variable Stretch)",
      body: "JetBrains Mono (Regular 400)",
      character: "Experimental, dynamic, and hyper-modern with mathematical kinetic precision."
    },
    colorPalette: [
      { name: "Deep Void", hex: "#080C14" },
      { name: "Kinetic Cobalt", hex: "#2563EB" },
      { name: "Phosphor White", hex: "#F8FAFC" },
      { name: "Iridescent Silver", hex: "#94A3B8" }
    ],
    gallery: [
      {
        caption: "Kinetic Typographic Screen Choreography",
        type: "motion",
        subtext: "Fluid interpolation between ultra-condensed and extended glyph variations responding to data feeds."
      },
      {
        caption: "Architectural Wayfinding & Spatial Graphics",
        type: "identity",
        subtext: "High-contrast directional typography applied to brushed aluminum and glass museum partitions."
      },
      {
        caption: "Digital Pass & Interactive Exhibition App",
        type: "digital",
        subtext: "Micro-interactions and haptic feedback accompanying the visitor journey through 14 gallery pavilions."
      }
    ]
  },
  {
    id: "verve-monograph",
    number: "05",
    title: "The Nelo Okeke Foundation",
    client: "Nelo Okeke",
    discipline: "Brand Identity & Visual Language",
    year: "2025",
    role: "Logo Design & Conceptualization",
    tagline: "The Nelo Okeke Outreach Foundation sought to establish a strong, recognizable brand identity that accurately reflected its mission and values. The goal was to create a visual language that would resonate with donors, partners, and beneficiaries alike, fostering trust and support.",
    overview: "The Nelo Okeke Outreach Foundation sought to establish a strong, recognizable brand identity that accurately reflected its mission and values. The goal was to create a visual language that would resonate with donors, partners, and beneficiaries alike, fostering trust and support.",
    challenge: "Orchestrating 300+ archival photographs with complex architectural essays while maintaining an effortless, rhythmic reading pace across double-page spreads.",
    strategy: "We instituted a 12-column architectural grid with generous margins that act as gallery white walls for each photographic plate. Spreads deliberately alternate between massive full-bleed imagery and quiet, single-column essays set with generous leading.",
    artDirection: "Documentary realism with deep duotone black-and-silver printing. Heavy linen clothbound cover with precision blind embossing and silver foil-stamped spine.",
    accentColor: "#A3A3A3",
    bgGradient: "from-[#171717] to-[#0a0a0a]",
    textColor: "#f5f5f5",
    layoutVariant: "full",
    aspectRatio: "16:9",
    deliverables: [
      "Book Architecture & 12-Column Grid System",
      "Typography Hierarchy & Essay Editorial Design",
      "Clothbound Hardcover & Slipcase Specifications",
      "Silver Duotone Print Supervision & Proofing",
      "Promotional Ephemera & Collector Slipcase",
      "Launch Exhibition Poster Series"
    ],
    typographyDetails: {
      heading: "Cormorant Garamond (Italic 400)",
      body: "Plus Jakarta Sans (Regular 400)",
      character: "Timeless academic elegance merged with uncompromising modern layout restraint."
    },
    colorPalette: [
      { name: "Obsidian Ink", hex: "#0A0A0A" },
      { name: "Brushed Foil Silver", hex: "#D4D4D8" },
      { name: "Linen Grey", hex: "#71717A" },
      { name: "Warm Gallery White", hex: "#FAFAFA" }
    ],
    gallery: [
      {
        caption: "Clothbound Hardcover & Foil-Stamped Spine",
        type: "editorial",
        subtext: "Heavyweight bookcloth with blind-embossed typography and silver foil spine details."
      },
      {
        caption: "Interior Double-Page Spreads & Duotone Plates",
        type: "editorial",
        subtext: "Printed on 170gsm Arctic Volume high-bulk paper for tactile ink holdout and velvety texture."
      },
      {
        caption: "Typographic Detail & 12-Column Editorial Grid",
        type: "editorial",
        subtext: "Carefully calibrated measure of 68 characters per line ensuring optimal legibility across essays."
      }
    ]
  }
];

export const CAPABILITIES: Capability[] = [
  {
    number: "01",
    title: "Visual Identity Systems",
    subtitle: "Enduring, distinctive brand marks, comprehensive design guidelines, and cohesive visual languages.",
    summary: "Visual identity is not merely an ornament; it is the visual operating system of an organization. We build scalable, expressive brand worlds that command respect across both physical touchpoints and digital interfaces.",
    disciplines: ["Brand Architecture", "Wordmarks & Logotypes", "Design Guidelines & Design Systems", "Iconography & Graphic Assets", "Stationery & Corporate Collateral"],
    deliverables: ["Full Vector Logo Suite", "Comprehensive 120+ Page Brand Bible", "Custom Color & Typography Guidelines", "Digital Asset Repository", "Application Templates"],
    highlightMetric: "Every identity built to scale effortlessly from 16px favicons to 40-foot architectural signage."
  },
  {
    number: "02",
    title: "Brand Strategy & Positioning",
    subtitle: "Clarifying purpose, defining distinct market space, and articulating core creative conviction.",
    summary: "Before drawing a single glyph, we establish what makes a brand irreplaceable. We unpack market landscape, user psychology, and founder vision to articulate a positioning foundation that guides all future creative execution.",
    disciplines: ["Market & Competitor Audits", "Core Positioning & Value Proposition", "Verbal Identity & Brand Voice", "Brand Naming & Taxonomy", "Creative Direction Manifesto"],
    deliverables: ["Strategic Brand Platform Document", "Verbal Style & Tone Playbook", "Messaging Matrix & Elevator Narrative", "Audience Persona Architectures"],
    highlightMetric: "Eliminating ambiguity to give founders and creative teams absolute clarity."
  },
  {
    number: "03",
    title: "Art Direction & Editorial Design",
    subtitle: "Evocative visual storytelling, photography curation, and luxury publishing systems.",
    summary: "From high-concept lookbooks and hardbound monographs to campaign shoots and digital storytelling, we curate every visual nuance — lighting, texture, spatial pacing, and typographic composition.",
    disciplines: ["Photography & Film Direction", "Book & Editorial Publishing", "Exhibition Catalogs & Lookbooks", "Campaign Concept & Visual Styling", "Print Finishing & Production Supervision"],
    deliverables: ["Print-Ready Monograph Dielines", "Shoot Production Call Sheets & Moodboards", "Print Production Color Proofing", "Limited-Edition Collector Collateral"],
    highlightMetric: "Treating every printed page and digital layout with the precision of a gallery exhibition."
  },
  {
    number: "04",
    title: "Web Design & Digital Experiences",
    subtitle: "Custom-crafted, editorial web flagships that reject generic template tropes.",
    summary: "We design bespoke digital environments that feel like natural extensions of a brand’s physical presence. Fluid scroll pacing, intentional whitespace, sculptural typography, and frictionless usability.",
    disciplines: ["Digital Flagships & Portfolio Platforms", "Information Architecture & User Journeys", "Interactive Prototyping & Micro-animations", "Responsive Mobile Choreography", "Design Systems for Engineering"],
    deliverables: ["Figma Component Libraries & Tokens", "Production-Ready Responsive Layouts", "Motion & Transition Prototypes", "Developer Handoff Specifications"],
    highlightMetric: "Crafted for effortless speed, WCAG AA legibility, and unmistakable aesthetic distinction."
  },
  {
    number: "05",
    title: "Packaging & Tactile Systems",
    subtitle: "Sensory physical unboxing experiences, sustainable materials, and sculptural containers.",
    summary: "Packaging is the most intimate physical dialogue between customer and brand. We prioritize the feel of weight, the resistance of custom closures, the grain of uncoated papers, and sustainable material innovation.",
    disciplines: ["Custom Structural Dieline Engineering", "Luxury Rigid Box & Flacon Systems", "Sustainable & Molded Pulp Packaging", "Substrate Selection & Print Finishes", "Foil Stamping, Debossing & Specialty Varnishes"],
    deliverables: ["Production-Ready CAD Packaging Dielines", "Supplier Material & Finish Specifications", "3D Photorealistic Packaging Mockups", "Sample Prototype Review Reports"],
    highlightMetric: "Engineered to spark emotional delight the instant hands make contact."
  },
  {
    number: "06",
    title: "Motion Design & Kinetic Systems",
    subtitle: "Bringing brands to life through intentional motion choreography and kinetic typography.",
    summary: "In an increasingly kinetic world, static brands feel incomplete. We develop kinetic systems that establish rhythm, pacing, and behavior — turning typography into movement and giving digital products organic vitality.",
    disciplines: ["Kinetic Typography & Variable Fonts", "Brand Idents & Logo Animation", "Interface Motion Systems & Pacing", "Campaign Teaser & Title Sequences", "Social Kinetic Design Toolkits"],
    deliverables: ["Lottie / After Effects Motion Files", "Kinetic Timing Curves & Easing Specs", "Campaign Video Assets (4K Prores)", "Interactive Code Animation Directives"],
    highlightMetric: "Choreographed with purpose: never gratuitous flash, always reinforcing brand character."
  }
];

export const EXPERIENCE_HISTORY: ExperienceItem[] = [
  {
    period: "2022 — Present",
    role: "Founder & Creative Director",
    company: "Wonda Design Studios",
    type: "Independent Practice",
    description: "Leading creative direction, visual identity systems, digital flagships, and packaging for visionary brands, cultural institutions, and founders worldwide.",
    highlights: [
      "Directed 20+ comprehensive brand transformations spanning North America and Europe.",
      "Established Wonda’s multidisciplinary methodology bridging rigorous strategic positioning with tactile craftsmanship.",
      "Spearheaded award-winning digital experiences with custom typography and motion choreography."
    ]
  },
  {
    period: "2020 — 2022",
    role: "Senior Brand & Digital Designer",
    company: "Vanguard Studio Lab",
    type: "Design Agency",
    description: "Orchestrated brand identity, digital design, and art direction for high-growth tech ventures and luxury consumer goods.",
    highlights: [
      "Led multidisciplinary design teams across 8 major client identity rollouts.",
      "Standardized digital design token systems adopted across web and mobile ecosystems.",
      "Collaborated directly with studio partners and executive stakeholders on core positioning."
    ]
  },
  {
    period: "2018 — 2020",
    role: "Lead Identity & Editorial Designer",
    company: "Forma Creative Atelier",
    type: "Creative Studio",
    description: "Designed bespoke print monographs, packaging systems, and visual identities for architecture firms, galleries, and publishing houses.",
    highlights: [
      "Supervised print production, foil stamping, and specialty binding for 15+ limited-edition publications.",
      "Developed identity systems and guidelines for cultural exhibitions and design festivals."
    ]
  },
  {
    period: "2016 — 2018",
    role: "Designer & Art Director",
    company: "Independent Practice & Selected Collaborations",
    type: "Freelance",
    description: "Built foundational brand systems, typographic layouts, and digital prototypes for early-stage startups and creative founders.",
    highlights: [
      "Formed enduring relationships with emerging founders across design, fashion, and technology.",
      "Refined deep multidisciplinary agility across identity, packaging, and digital."
    ]
  }
];
