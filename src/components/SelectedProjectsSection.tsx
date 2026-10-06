import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from '@/components/core/magnetic';
import { fetchFeaturedProjects, PublicProject } from '../lib/cmsPublicQueries';
import Particles from './Particles';
import { BlurFadeText, BlurFade } from './BlurFadeText';
import mivaM11CoverImage from '../assets/Projects/MIVA AI HACKATHON/M11 COVER.png';
import hyperionCoverImage from '../assets/Projects/MAJORA/Z26.png';
import solisCoverImage from '../assets/Projects/ECHOFARMS/soon.png';
import verveCoverImage from '../assets/Projects/NELO/N1.jpg';

interface SelectedProjectsProps {
  isLightMode?: boolean;
}

// 5 Curated Editorial Projects matching the exact photography & typography of the reference image
const DEFAULT_EDITORIAL_PROJECTS: PublicProject[] = [
  {
    id: 'miva-ai-hackathon',
    slug: 'lumina-botanique',
    title: 'MIVA AI HACKATHON',
    year: '2026',
    client: 'MIVA',
    industry: 'AI & Digital Presence',
    discipline: 'AI & Digital Presence',
    role: 'Creative Direction, Branding, Presentation Design',
    shortDescription: 'Refining a digital presence',
    tagline: 'Refining a digital presence',
    overview: 'Editorial visual storytelling and digital platform architecture for the MIVA AI Hackathon.',
    challenge: null,
    concept: null,
    strategy: null,
    outcome: null,
    artDirection: null,
    accentColor: '#C2A87E',
    bgGradient: null,
    textColor: null,
    layoutVariant: 'full',
    aspectRatio: '4:5',
    deliverables: [],
    typographyDetails: { heading: 'Grotesk', body: 'Sans', character: 'Modern' },
    colorPalette: [],
    coverMedia: {
      id: 'miva_cover_1',
      url: mivaM11CoverImage,
      type: 'image',
      alt: 'MIVA AI HACKATHON – Refining a digital presence',
    },
    featured: true,
    published: true,
    sortOrder: 1,
  },
  {
    id: 'smak-identity',
    slug: 'kronos-spatial',
    title: 'SMAK',
    year: '2025',
    client: 'SMAK Hospitality',
    industry: 'Brand Identity',
    discipline: 'Brand Identity',
    role: 'Art Direction, Visual Identity, Packaging',
    shortDescription: 'Identity, reimagined (concept)',
    tagline: 'Identity, reimagined (concept)',
    overview: 'A bold, sensorial gastronomy identity system.',
    challenge: null,
    concept: null,
    strategy: null,
    outcome: null,
    artDirection: null,
    accentColor: '#F05245',
    bgGradient: null,
    textColor: null,
    layoutVariant: 'full',
    aspectRatio: '4:3',
    deliverables: [],
    typographyDetails: { heading: 'Grotesk', body: 'Sans', character: 'Bold' },
    colorPalette: [],
    coverMedia: {
      id: 'smak_cover_img',
      url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
      type: 'image',
      alt: 'SMAK – Identity, reimagined (concept)',
    },
    featured: true,
    published: true,
    sortOrder: 2,
  },
  {
    id: 'echofarms-africa',
    slug: 'solis-ceramics',
    title: 'Echofarms Africa',
    year: '2026',
    client: 'Echofarms Africa',
    industry: 'Brand Identity & UI/UX',
    discipline: 'Brand Identity & UI/UX',
    role: 'Brand Identity, Logo Design, UI/UX Design, Editorial and Presentation',
    shortDescription: 'Coming Soon',
    tagline: 'Coming Soon',
    overview: 'Coming Soon.',
    challenge: null,
    concept: null,
    strategy: null,
    outcome: null,
    artDirection: null,
    accentColor: '#111111',
    bgGradient: null,
    textColor: null,
    layoutVariant: 'full',
    aspectRatio: '4:5',
    deliverables: [],
    typographyDetails: { heading: 'Grotesk', body: 'Sans', character: 'Classic' },
    colorPalette: [],
    coverMedia: {
      id: 'echofarms_cover_img',
      url: solisCoverImage,
      type: 'image',
      alt: 'Echofarms Africa – Coming Soon',
    },
    featured: true,
    published: true,
    sortOrder: 3,
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
    shortDescription: 'Movement platform built for creators, organizers, and fans',
    tagline: 'Movement platform built for creators, organizers, and fans',
    overview: 'Majora is more than an app — it’s a movement platform built for the creators, organizers, and fans that drive the entertainment world forward.',
    challenge: null,
    concept: null,
    strategy: null,
    outcome: null,
    artDirection: null,
    accentColor: '#3B82F6',
    bgGradient: null,
    textColor: null,
    layoutVariant: 'full',
    aspectRatio: '1:1',
    deliverables: [],
    typographyDetails: { heading: 'Grotesk', body: 'Sans', character: 'Sensory' },
    colorPalette: [],
    coverMedia: {
      id: 'hyperion_cover_img',
      url: hyperionCoverImage,
      type: 'image',
      alt: 'Majora – Movement platform built for creators, organizers, and fans',
    },
    featured: true,
    published: true,
    sortOrder: 4,
  },
  {
    id: 'the-nelo-okeke-foundation',
    slug: 'the-nelo-okeke-foundation',
    title: 'The Nelo Okeke Foundation',
    year: '2025',
    client: 'Nelo Okeke',
    industry: 'Brand Identity & Visual Language',
    discipline: 'Brand Identity & Visual Language',
    role: 'Logo Design & Conceptualization',
    shortDescription: 'Brand identity & visual language',
    tagline: 'The Nelo Okeke Outreach Foundation sought to establish a strong, recognizable brand identity that accurately reflected its mission and values. The goal was to create a visual language that would resonate with donors, partners, and beneficiaries alike, fostering trust and support.',
    overview: 'The Nelo Okeke Outreach Foundation sought to establish a strong, recognizable brand identity that accurately reflected its mission and values. The goal was to create a visual language that would resonate with donors, partners, and beneficiaries alike, fostering trust and support.',
    challenge: null,
    concept: null,
    strategy: null,
    outcome: null,
    artDirection: null,
    accentColor: '#111111',
    bgGradient: null,
    textColor: null,
    layoutVariant: 'full',
    aspectRatio: '16:11',
    deliverables: [],
    typographyDetails: { heading: 'Grotesk', body: 'Sans', character: 'Sculptural' },
    colorPalette: [],
    coverMedia: {
      id: 'nelo_cover_img',
      url: verveCoverImage,
      type: 'image',
      alt: 'The Nelo Okeke Foundation – Brand identity & visual language',
    },
    featured: true,
    published: true,
    sortOrder: 5,
  },
];

export const SelectedProjectsSection: React.FC<SelectedProjectsProps> = () => {
  const [projects, setProjects] = useState<PublicProject[]>(DEFAULT_EDITORIAL_PROJECTS);

  useEffect(() => {
    let isMounted = true;
    fetchFeaturedProjects().then((data) => {
      if (isMounted && data && data.length >= 5) {
        const updated = DEFAULT_EDITORIAL_PROJECTS.map((fallback, idx) => {
          const cmsItem = data[idx];
          if (!cmsItem) return fallback;
          const isMiva = fallback.id === 'miva-ai-hackathon' || fallback.title.toUpperCase().includes('MIVA') || cmsItem.title?.toUpperCase().includes('MIVA');
          const isMajora = fallback.id === 'majora' || fallback.slug === 'majora' || cmsItem.slug === 'majora';
          const isEchofarms = fallback.id === 'echofarms-africa' || fallback.id === 'solis-ceramics' || fallback.slug === 'solis-ceramics' || cmsItem.slug === 'solis-ceramics' || cmsItem.slug === 'echofarms-africa' || cmsItem.slug === 'solis-atelier';
          const isNelo = fallback.id === 'the-nelo-okeke-foundation' || fallback.id === 'verve-monograph' || fallback.slug === 'the-nelo-okeke-foundation' || fallback.slug === 'verve-monograph' || cmsItem.slug === 'the-nelo-okeke-foundation' || cmsItem.slug === 'verve-monograph' || cmsItem.slug === 'hyperion-biennial' || cmsItem.title?.toLowerCase().includes('nelo') || cmsItem.title?.toLowerCase().includes('hyperion');
          return {
            ...fallback,
            id: cmsItem.id,
            slug: fallback.slug,
            title: isMajora ? 'Majora' : isEchofarms ? 'Echofarms Africa' : isNelo ? 'The Nelo Okeke Foundation' : (cmsItem.title || fallback.title),
            shortDescription: isMajora ? fallback.shortDescription : isEchofarms ? 'Coming Soon' : isNelo ? fallback.shortDescription : (cmsItem.shortDescription || fallback.shortDescription),
            coverMedia: (isMiva || isMajora || isEchofarms || isNelo) ? fallback.coverMedia : (cmsItem.coverMedia?.url ? cmsItem.coverMedia : fallback.coverMedia),
          };
        });
        setProjects(updated);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const card1 = projects[0] || DEFAULT_EDITORIAL_PROJECTS[0];
  const card2 = projects[1] || DEFAULT_EDITORIAL_PROJECTS[1];
  const card3 = projects[2] || DEFAULT_EDITORIAL_PROJECTS[2];
  const card4 = projects[3] || DEFAULT_EDITORIAL_PROJECTS[3];
  const card5 = projects[4] || DEFAULT_EDITORIAL_PROJECTS[4];

  return (
    <section
      id="selected-work"
      className="relative w-full bg-[#FFFFFF] text-[#111111] pt-12 sm:pt-16 md:pt-24 pb-20 sm:pb-32 overflow-hidden select-none"
    >
      <span id="projects" className="sr-only" aria-hidden="true">
        Selected Projects
      </span>

      {/* Particles Background Layer */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <Particles
          particleColors={["#353535"]}
          particleCount={180}
          particleSpread={10}
          speed={0.25}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1540px] mx-auto px-5 sm:px-8 md:px-12 lg:px-14 xl:px-16">
        
        {/* Selected Works Header matching attached reference image */}
        <div className="w-full text-left mb-10 sm:mb-14 md:mb-16">
          <BlurFade delay={0.05} blur="12px">
            <h2 className="font-grotesk font-black text-[clamp(24px,4.4vw,80px)] tracking-[-0.04em] leading-none text-[#111111] select-none text-left whitespace-nowrap">
              Made some cool stuff
            </h2>
          </BlurFade>

          <BlurFade delay={0.12} blur="8px">
            <p className="mt-3.5 sm:mt-4 text-[13.5px] sm:text-[14.5px] font-sans font-normal leading-relaxed max-w-md text-[#52525B] select-none text-left">
              A curated collection of projects that reflect thoughtful design, strong execution, and attention to detail.
            </p>
          </BlurFade>
        </div>

        {/* =========================================================================
            TOP ROW: 3 Cards Spread across the width
            - Card 1: Top Left (Vertical portrait, aspect-[4/5])
            - Card 2: Top Center (Horizontal landscape, aspect-[4/3], staggered down)
            - Card 3: Top Right (Vertical portrait, aspect-[4/5], high up on right)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-14 items-start">
          
          {/* Card 1: Top Left Column */}
          <div className="md:col-span-4 lg:col-span-4">
            <BlurFade delay={0.1} blur="10px">
              <Magnetic intensity={0.12} className="w-full max-w-[380px]">
                <Link
                  to={`/work/${card1.slug}`}
                  className="group block w-full select-none cursor-pointer"
                  aria-label={`View Case Study: ${card1.title}`}
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#EAEAEA]">
                    {card1.coverMedia?.type === 'video' || card1.coverMedia?.url?.toLowerCase().endsWith('.mp4') ? (
                      <video
                        src={card1.coverMedia?.url}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <img
                        src={card1.coverMedia?.url}
                        alt={card1.coverMedia?.alt || card1.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        loading="eager"
                      />
                    )}
                    <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="font-mono text-[10.5px] tracking-wider uppercase bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1 shadow-md">
                        <span>view case</span>
                        <ArrowUpRight className="w-2.5 h-2.5 text-[#F05245]" />
                      </span>
                    </div>
                  </div>

                  {/* Minimal single-line supporting text as in reference image */}
                  <p className="font-sans text-[12px] sm:text-[13px] text-[#111111] font-normal mt-2 sm:mt-2.5 tracking-normal text-left">
                    <span className="font-bold">{card1.title}</span>
                    <span className="text-[#333333]"> – {card1.shortDescription}</span>
                  </p>
                </Link>
              </Magnetic>
            </BlurFade>
          </div>

          {/* Card 2: Top Center Column (Staggered lower, Landscape aspect-[4/3]) */}
          <div className="md:col-span-4 lg:col-span-4 flex justify-center md:pt-12 lg:pt-16 xl:pt-20">
            <BlurFade delay={0.15} blur="10px">
              <Magnetic intensity={0.12} className="w-full max-w-[400px]">
                <Link
                  to={`/work/${card2.slug}`}
                  className="group block w-full select-none cursor-pointer"
                  aria-label={`View Case Study: ${card2.title}`}
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#EAEAEA]">
                    {card2.coverMedia?.type === 'video' || card2.coverMedia?.url?.toLowerCase().endsWith('.mp4') ? (
                      <video
                        src={card2.coverMedia?.url}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <img
                        src={card2.coverMedia?.url}
                        alt={card2.coverMedia?.alt || card2.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        loading="eager"
                      />
                    )}
                    <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="font-mono text-[10.5px] tracking-wider uppercase bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1 shadow-md">
                        <span>view case</span>
                        <ArrowUpRight className="w-2.5 h-2.5 text-[#F05245]" />
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-[12px] sm:text-[13px] text-[#111111] font-normal mt-2 sm:mt-2.5 tracking-normal text-left">
                    <span className="font-bold">{card2.title}</span>
                    <span className="text-[#333333]"> – Identity, reimagined </span>
                    <span className="text-[#888888] font-normal">(concept)</span>
                  </p>
                </Link>
              </Magnetic>
            </BlurFade>
          </div>

          {/* Card 3: Top Right Column (Aligned high up, Vertical aspect-[4/5]) */}
          <div className="md:col-span-4 lg:col-span-4 flex justify-end">
            <BlurFade delay={0.2} blur="10px">
              <Magnetic intensity={0.12} className="w-full max-w-[430px]">
                <Link
                  to={`/work/${card3.slug}`}
                  className="group block w-full select-none cursor-pointer"
                  aria-label={`View Case Study: ${card3.title}`}
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#EAEAEA]">
                    {card3.coverMedia?.type === 'video' || card3.coverMedia?.url?.toLowerCase().endsWith('.mp4') ? (
                      <video
                        src={card3.coverMedia?.url}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <img
                        src={card3.coverMedia?.url}
                        alt={card3.coverMedia?.alt || card3.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        loading="eager"
                      />
                    )}
                    <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="font-mono text-[10.5px] tracking-wider uppercase bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1 shadow-md">
                        <span>view case</span>
                        <ArrowUpRight className="w-2.5 h-2.5 text-[#F05245]" />
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-[12px] sm:text-[13px] text-[#111111] font-normal mt-2 sm:mt-2.5 tracking-normal text-left">
                    <span className="font-bold">{card3.title}</span>
                    <span className="text-[#333333]"> – {card3.shortDescription}</span>
                  </p>
                </Link>
              </Magnetic>
            </BlurFade>
          </div>

        </div>

        {/* =========================================================================
            BOTTOM ROW: 2 Cards Spread with wide center negative space
            - Card 4: Indented Center-Left (Square aspect-[1/1])
            - Card 5: Bottom Right (Landscape aspect-[16/11])
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-14 items-start pt-16 sm:pt-24 md:pt-28 lg:pt-32">
          
          {/* Card 4: Indented Center-Left (md:col-start-2 to col-start-3 in reference) */}
          <div className="md:col-span-5 lg:col-span-5 md:col-start-2 lg:col-start-2 flex justify-start">
            <BlurFade delay={0.25} blur="10px">
              <Magnetic intensity={0.12} className="w-full max-w-[390px]">
                <Link
                  to={`/work/${card4.slug}`}
                  className="group block w-full select-none cursor-pointer"
                  aria-label={`View Case Study: ${card4.title}`}
                >
                  <div className="relative w-full aspect-[1/1] overflow-hidden bg-[#EAEAEA]">
                    {card4.coverMedia?.type === 'video' || card4.coverMedia?.url?.toLowerCase().endsWith('.mp4') ? (
                      <video
                        src={card4.coverMedia?.url}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <img
                        src={card4.coverMedia?.url}
                        alt={card4.coverMedia?.alt || card4.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="font-mono text-[10.5px] tracking-wider uppercase bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1 shadow-md">
                        <span>view case</span>
                        <ArrowUpRight className="w-2.5 h-2.5 text-[#F05245]" />
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-[12px] sm:text-[13px] text-[#111111] font-normal mt-2 sm:mt-2.5 tracking-normal text-left">
                    <span className="font-bold">{card4.title}</span>
                    <span className="text-[#333333]"> – {card4.shortDescription}</span>
                  </p>
                </Link>
              </Magnetic>
            </BlurFade>
          </div>

          {/* Card 5: Bottom Right Column (md:col-span-5 md:col-start-8 lg:col-start-8) */}
          <div className="md:col-span-5 lg:col-span-5 md:col-start-8 lg:col-start-8 flex justify-end">
            <BlurFade delay={0.3} blur="10px">
              <Magnetic intensity={0.12} className="w-full max-w-[440px]">
                <Link
                  to={`/work/${card5.slug}`}
                  className="group block w-full select-none cursor-pointer"
                  aria-label={`View Case Study: ${card5.title}`}
                >
                  <div className="relative w-full aspect-[16/11] overflow-hidden bg-[#F2F2F2]">
                    {card5.coverMedia?.type === 'video' || card5.coverMedia?.url?.toLowerCase().endsWith('.mp4') ? (
                      <video
                        src={card5.coverMedia?.url}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <img
                        src={card5.coverMedia?.url}
                        alt={card5.coverMedia?.alt || card5.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="font-mono text-[10.5px] tracking-wider uppercase bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1 shadow-md">
                        <span>view case</span>
                        <ArrowUpRight className="w-2.5 h-2.5 text-[#F05245]" />
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-[12px] sm:text-[13px] text-[#111111] font-normal mt-2 sm:mt-2.5 tracking-normal text-left">
                    <span className="font-bold">{card5.title}</span>
                    <span className="text-[#333333]"> – {card5.shortDescription}</span>
                  </p>
                </Link>
              </Magnetic>
            </BlurFade>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SelectedProjectsSection;
