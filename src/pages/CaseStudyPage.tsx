import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { 
  fetchCaseStudyBySlug, 
  PublicProject, 
  PublicSection, 
  PublicGalleryMedia,
  getCanonicalLiveTitle,
  getCanonicalLiveSlug
} from '../lib/cmsPublicQueries';
import { FooterCTA } from '../components/FooterCTA';
import { BlurFadeText, BlurFade } from '../components/BlurFadeText';
import Particles from '../components/Particles';
import { MIVA_CASE_STUDY_MEDIA } from '../data/mivaAssets';
import { HYPERION_CASE_STUDY_MEDIA } from '../data/majoraAssets';
import { VERVE_CASE_STUDY_MEDIA } from '../data/neloAssets';
import echofarmsSoonImg from '../assets/Projects/ECHOFARMS/soon.png';

// Supplementary high-res mockups & editorial plates per slug if Firebase gallery is empty
const SUPPLEMENTARY_MEDIA: Record<string, Array<{ url: string; caption?: string }>> = {
  'miva-ai-hackathon': [
    { url: '/M1.mp4' },
    { url: '/M8.mp4' },
  ],
  'kronos-spatial': [
    { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop', caption: 'Brutalist concrete architecture interface design system' },
    { url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop', caption: 'High-contrast responsive desktop and tablet platform choreography' },
    { url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop', caption: 'Interactive project archive grid & spatial typographic pacing' },
  ],
  'echofarms-africa': [
    { url: echofarmsSoonImg, caption: 'Echofarms Africa – Coming Soon' },
  ],
  'hyperion-biennial': [
    { url: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=1600&auto=format&fit=crop', caption: 'Generative kinetic typography & biennial festival poster identity' },
    { url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1600&auto=format&fit=crop', caption: 'Dynamic responsive exhibition wayfinding & architectural environmental graphics' },
    { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop', caption: 'Motion ident sequences & experimental kinetic type treatments' },
  ],
  'verve-monograph': [],
};

/**
 * Looping GIF-style video component for uploaded case study videos:
 * - autoplay automatically
 * - stays muted
 * - loops continuously
 * - playsInline
 * - shows no visible controls
 * - restarts seamlessly when it reaches the end
 * - requires no user interaction
 * - width: 100%, height: auto, uncropped
 */
const LoopingMediaVideo: React.FC<{ src: string; alt?: string }> = ({ src, alt }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const startPlay = () => {
      video.play().catch(() => {
        // Handled silently for browser policy
      });
    };

    if (video.readyState >= 2) {
      startPlay();
    } else {
      video.addEventListener('loadeddata', startPlay);
      video.addEventListener('canplay', startPlay);
    }

    return () => {
      video.removeEventListener('loadeddata', startPlay);
      video.removeEventListener('canplay', startPlay);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      aria-label={alt}
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      preload="auto"
      className="w-full h-auto block m-0 p-0 border-0 outline-none"
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        margin: 0,
        padding: 0,
        border: 'none',
        outline: 'none',
      }}
    />
  );
};

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<PublicProject | null>(null);
  const [sections, setSections] = useState<PublicSection[]>([]);
  const [gallery, setGallery] = useState<PublicGalleryMedia[]>([]);
  const [prevProject, setPrevProject] = useState<{ slug: string; title: string } | null>(null);
  const [nextProject, setNextProject] = useState<{ slug: string; title: string } | null>(null);
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  useEffect(() => {
    setShowFloatingNav(false);
  }, [slug]);

  useEffect(() => {
    const checkScrollThreshold = () => {
      const currentY = window.scrollY || window.pageYOffset || 0;
      const bottomNav = document.getElementById('case-study-bottom-nav');

      // Appears immediately when the user starts scrolling down through the project media (scrollY > 150px)
      const isScrollingMedia = currentY > 150;

      // Hide when bottom static footer nav comes into view
      let isBottomNavVisible = false;
      if (bottomNav) {
        const navRect = bottomNav.getBoundingClientRect();
        isBottomNavVisible = navRect.top <= window.innerHeight - 20;
      }

      setShowFloatingNav(isScrollingMedia && !isBottomNavVisible);
    };

    window.addEventListener('scroll', checkScrollThreshold, { passive: true });
    window.addEventListener('resize', checkScrollThreshold, { passive: true });
    checkScrollThreshold();

    return () => {
      window.removeEventListener('scroll', checkScrollThreshold);
      window.removeEventListener('resize', checkScrollThreshold);
    };
  }, [slug, loading]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    let isMounted = true;

    fetchCaseStudyBySlug(slug).then((res) => {
      if (isMounted) {
        setProject(res.project);
        setSections(res.sections);
        setGallery(res.gallery);
        setPrevProject(res.prevProject);
        setNextProject(res.nextProject);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] text-[#111111] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-8 h-8 animate-spin text-[#F05245]" />
        <span className="font-mono text-xs uppercase tracking-widest text-black/50 mt-4">
          Loading Case Study...
        </span>
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/#selected-work" replace />;
  }

  const coverMedia = project.coverMedia;

  // Build services list from project deliverables or disciplines
  const servicesList: string[] = 
    project.deliverables && project.deliverables.length > 0
      ? project.deliverables
      : [
          project.industry || project.discipline || 'Visual Identity',
          project.role || 'Creative Direction',
          'Design Strategy',
          'Art Direction',
          'Digital Experience',
        ];

  // Build the complete media sequence for the right column:
  // 1. Cover media
  // 2. Existing gallery plates from Firebase
  // 3. Fallback supplementary plates if gallery is empty
  const mediaSequence: Array<{
    id: string;
    url: string;
    type: string;
    alt: string;
    caption?: string;
  }> = [];

  if (coverMedia && coverMedia.url) {
    mediaSequence.push({
      id: coverMedia.id || 'cover',
      url: coverMedia.url,
      type: coverMedia.type || 'image',
      alt: coverMedia.alt || project.title,
      caption: undefined,
    });
  }

  if (gallery && gallery.length > 0) {
    gallery.forEach((g) => {
      if (g.media && g.media.url) {
        mediaSequence.push({
          id: g.id,
          url: g.media.url,
          type: g.media.type || 'image',
          alt: g.altText || g.caption || project.title,
          caption: g.caption || undefined,
        });
      }
    });
  } else if (slug && SUPPLEMENTARY_MEDIA[slug]) {
    SUPPLEMENTARY_MEDIA[slug].forEach((supp, idx) => {
      mediaSequence.push({
        id: `supp_${idx}`,
        url: supp.url,
        type: 'image',
        alt: `${project.title} - Visual plate ${idx + 1}`,
        caption: supp.caption,
      });
    });
  }

  const isMivaProject = Boolean(
    slug === 'lumina-botanique' ||
    slug === 'miva-ai-hackathon' ||
    project.id === 'lumina-botanique' ||
    project.id === 'miva-ai-hackathon' ||
    project.slug === 'lumina-botanique' ||
    project.slug === 'miva-ai-hackathon' ||
    project.title.toUpperCase().includes('MIVA')
  );

  const isMajoraProject = Boolean(
    slug === 'majora' ||
    project.id === 'majora' ||
    project.slug === 'majora' ||
    project.title.toLowerCase().includes('majora')
  );

  const isEchofarmsProject = Boolean(
    slug === 'solis-ceramics' ||
    slug === 'solis-atelier' ||
    slug === 'echofarms-africa' ||
    slug === 'echofarms' ||
    project.id === 'solis-ceramics' ||
    project.id === 'solis-atelier' ||
    project.id === 'echofarms-africa' ||
    project.id === 'echofarms' ||
    project.slug === 'solis-ceramics' ||
    project.slug === 'solis-atelier' ||
    project.slug === 'echofarms-africa' ||
    project.slug === 'echofarms' ||
    project.title.toLowerCase().includes('solis') ||
    project.title.toLowerCase().includes('echofarm')
  );

  const isNeloProject = Boolean(
    slug === 'the-nelo-okeke-foundation' ||
    slug === 'nelo-okeke-foundation' ||
    slug === 'nelo' ||
    slug === 'hyperion-biennial' ||
    slug === 'verve-monograph' ||
    slug === 'coatys-packaging' ||
    project.id === 'the-nelo-okeke-foundation' ||
    project.id === 'nelo-okeke-foundation' ||
    project.id === 'nelo' ||
    project.id === 'hyperion-biennial' ||
    project.id === 'verve-monograph' ||
    project.id === 'coatys-packaging' ||
    project.slug === 'the-nelo-okeke-foundation' ||
    project.slug === 'nelo-okeke-foundation' ||
    project.slug === 'nelo' ||
    project.slug === 'hyperion-biennial' ||
    project.slug === 'verve-monograph' ||
    project.slug === 'coatys-packaging' ||
    project.title.toLowerCase().includes('nelo') ||
    project.title.toLowerCase().includes('foundation') ||
    project.title.toLowerCase().includes('hyperion') ||
    project.title.toLowerCase().includes('verve')
  );

  const isVerveProject = isNeloProject;

  if (isEchofarmsProject) {
    mediaSequence.length = 0;
    mediaSequence.push({
      id: 'echofarms_soon_cover',
      url: echofarmsSoonImg,
      type: 'image',
      alt: 'Echofarms Africa – Coming Soon',
      caption: undefined,
    });
  }

  return (
    <article className="relative min-h-screen bg-[#FFFFFF] text-[#111111] selection:bg-[#F05245] selection:text-white antialiased font-sans">
      {/* Particles Background Layer */}
      <div
        className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0"
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

      {/* =========================================================================
          MAIN CASE STUDY BODY
          Exact split layout matching the reference video:
          - Left column: sticky/static project information (remains pinned while right scrolls)
          - Right column: vertically scrolling media sequence (images, videos, mockups)
          - Mobile: sticky split disabled; stacks information above media
          ========================================================================= */}
      <main className="relative z-10 w-full max-w-[1560px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
        <div className="flex flex-col lg:flex-row gap-12 sm:gap-14 lg:gap-16 xl:gap-20 items-start">
          
          {/* =====================================================================
              LEFT COLUMN: Sticky Project Information
              Contains: project title, year, client, role, services, short overview
              ===================================================================== */}
          <aside className="w-full lg:w-[380px] xl:w-[420px] lg:flex-shrink-0 lg:sticky lg:top-28 xl:lg:top-32 self-start space-y-8 sm:space-y-10">
            
            {/* 1. Project Title */}
            <div>
              <BlurFade delay={0.05} blur="10px">
                <h1 className="font-grotesk font-bold text-3xl sm:text-4xl md:text-5xl text-[#111111] tracking-tight leading-[1.08]">
                  {isMajoraProject ? 'Majora' : isEchofarmsProject ? 'Echofarms Africa' : isNeloProject ? 'The Nelo Okeke Foundation' : project.title}
                </h1>
              </BlurFade>
            </div>

            {/* 2. Metadata Grid (Year & Text next to Year) */}
            <BlurFade delay={0.1} blur="10px">
              <div className="flex items-start gap-6 sm:gap-8 pt-6 border-t border-black/[0.08]">
                {/* Year */}
                <div className="font-mono text-sm sm:text-base text-[#111111] font-normal whitespace-nowrap">
                  [{isMivaProject ? '2026' : (isMajoraProject ? '2025' : isEchofarmsProject ? '2026' : isNeloProject ? '2025' : (project.year || '2025'))}]
                </div>

                {/* Text next to Year */}
                <div className="space-y-1 font-sans text-sm sm:text-[14px] text-[#111111] leading-relaxed">
                  {isMivaProject ? (
                    <p className="font-sans text-sm sm:text-[14px] text-[#111111] leading-relaxed font-normal">
                      MIVA Open University’s annual MIVA AI Hackathon event bridges academic learning and real-world execution, challenging students to harness AI to solve Africa's unique socio-economic challenges
                    </p>
                  ) : isMajoraProject ? (
                    <p className="font-sans text-sm sm:text-[14px] text-[#111111] leading-relaxed font-normal">
                      Majora is more than an app — it’s a movement platform built for the creators, organizers, and fans that drive the entertainment world forward
                    </p>
                  ) : isEchofarmsProject ? (
                    <p className="font-sans text-sm sm:text-[14px] text-[#111111] leading-relaxed font-normal">
                      Coming Soon
                    </p>
                  ) : isNeloProject ? (
                    <p className="font-sans text-sm sm:text-[14px] text-[#111111] leading-relaxed font-normal">
                      The Nelo Okeke Outreach Foundation sought to establish a strong, recognizable brand identity that accurately reflected its mission and values. The goal was to create a visual language that would resonate with donors, partners, and beneficiaries alike, fostering trust and support.
                    </p>
                  ) : (
                    servicesList.slice(0, 6).map((service, idx) => (
                      <div key={idx} className="text-[#111111]">
                        {service}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </BlurFade>

            {/* 3. Client & Role Details */}
            <BlurFade delay={0.15} blur="10px">
              <div className="pt-6 border-t border-black/[0.08] space-y-4">
                {(project.client || isMajoraProject || isEchofarmsProject || isNeloProject) && (
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-black/40 block mb-0.5">
                      Client
                    </span>
                    <span className="font-sans text-sm sm:text-[15px] font-medium text-[#111111]">
                      {isMajoraProject ? 'Majora Events' : isEchofarmsProject ? 'Echofarms Africa' : isNeloProject ? 'Nelo Okeke' : project.client}
                    </span>
                  </div>
                )}

                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-black/40 block mb-0.5">
                    Role
                  </span>
                  <span className="font-sans text-sm sm:text-[15px] font-medium text-[#111111]">
                    {isMivaProject
                      ? 'Creative Direction, Branding, Presentation Design'
                      : isMajoraProject
                      ? 'Brand Strategy, Logo Design, Campaign Design, UI/UX'
                      : isEchofarmsProject
                      ? 'Brand Identity, Logo Design, UI/UX Design, Editorial and Presentation'
                      : isNeloProject
                      ? 'Logo Design & Conceptualization'
                      : (project.role || 'Logo Design & Conceptualization')}
                  </span>
                </div>
              </div>
            </BlurFade>

            {/* 4. Short Overview / Description (Removed for MIVA, Majora, Echofarms, and Nelo projects as requested) */}
            {!isMivaProject && !isMajoraProject && !isEchofarmsProject && !isNeloProject && (project.shortDescription || project.overview || project.tagline) && (
              <BlurFade delay={0.2} blur="10px">
                <div className="pt-6 border-t border-black/[0.08] space-y-2">
                  <p className="font-sans text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#52525B]">
                    {project.shortDescription || project.overview || project.tagline}
                  </p>
                </div>
              </BlurFade>
            )}

          </aside>

          {/* =====================================================================
              RIGHT COLUMN: Vertically Scrolling Project Media Sequence
              For MIVA AI HACKATHON & Majora:
              - Replace placeholder media with uploaded production files in ascending numeric order
              - 100% width of the right column, natural height, zero cropping
              - Exact gaps and margins template applied
              For all other projects:
              - Preserve existing card layout, captions, and spacing
              ===================================================================== */}
          {isMivaProject ? (
            <section
              id="project-media"
              className="w-full flex-1"
            >
              <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5">
                {MIVA_CASE_STUDY_MEDIA.map((item, index) => (
                  <div
                    key={item.id}
                    id={index === 9 ? 'media-item-threshold-10' : undefined}
                    className="w-full overflow-hidden block"
                  >
                    {item.type === 'video' ? (
                      <LoopingMediaVideo src={item.url} alt={item.alt} />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.alt}
                        className="w-full h-auto block"
                        loading={index <= 1 ? 'eager' : 'lazy'}
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : isMajoraProject ? (
            <section
              id="project-media"
              className="w-full flex-1"
            >
              <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5">
                {HYPERION_CASE_STUDY_MEDIA.map((item, index) => (
                  <div
                    key={item.id}
                    id={index === 9 ? 'media-item-threshold-10' : undefined}
                    className="w-full overflow-hidden block"
                  >
                    <img
                      src={item.url}
                      alt={item.alt}
                      className="w-full h-auto block"
                      loading={index <= 1 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : isEchofarmsProject ? (
            <section
              id="project-media"
              className="w-full flex-1"
            >
              <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5">
                <div className="w-full overflow-hidden block">
                  <div className="w-full overflow-hidden">
                    <img
                      src={echofarmsSoonImg}
                      alt="Echofarms Africa – Coming Soon"
                      className="w-full h-auto block"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </section>
          ) : isNeloProject ? (
            <section
              id="project-media"
              className="w-full flex-1"
            >
              <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5">
                {VERVE_CASE_STUDY_MEDIA.map((item, index) => (
                  <div
                    key={item.id}
                    id={index === 9 ? 'media-item-threshold-10' : undefined}
                    className="w-full overflow-hidden block"
                  >
                    {item.type === 'video' ? (
                      <LoopingMediaVideo src={item.url} alt={item.alt} />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.alt}
                        className="w-full h-auto block"
                        loading={index <= 1 ? 'eager' : 'lazy'}
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section id="project-media" className="w-full flex-1 space-y-8 sm:space-y-12 md:space-y-14">
              {mediaSequence.map((item, index) => (
                <BlurFade key={item.id} delay={0.05 + index * 0.05} blur="12px">
                  <div
                    id={index === 9 ? 'media-item-threshold-10' : undefined}
                    className="w-full space-y-3"
                  >
                    <div className="w-full bg-[#F4F4F3] border border-black/[0.08] overflow-hidden relative shadow-sm">
                      {item.type === 'video' ? (
                        <video
                          src={item.url}
                          className="w-full h-auto object-cover max-h-[85vh]"
                          muted
                          autoPlay
                          loop
                          playsInline
                          controls
                        />
                      ) : (
                        <img
                          src={item.url}
                          alt={item.alt || `${project.title} - Visual plate ${index + 1}`}
                          className="w-full h-auto object-cover max-h-[85vh]"
                          loading={index <= 1 ? 'eager' : 'lazy'}
                        />
                      )}
                    </div>

                    {item.caption && (
                      <p className="font-mono text-xs text-black/50 px-1 pt-1">
                        — {item.caption}
                      </p>
                    )}
                  </div>
                </BlurFade>
              ))}
            </section>
          )}

        </div>
      </main>

      {/* =========================================================================
          PAGINATION FOOTER: ← Previous Project | View All Work | Next Project →
          'View All Work' leads to the projects section on the home page (#selected-work)
          ========================================================================= */}
      <nav
        id="case-study-bottom-nav"
        aria-label="Case study navigation"
        className="py-14 sm:py-18 px-6 sm:px-10 md:px-14 lg:px-16 border-t border-black/[0.08] bg-[#F9F9F8]"
      >
        <div className="w-full max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Previous Project */}
          {prevProject ? (
            <Link
              to={`/work/${getCanonicalLiveSlug(prevProject.slug)}`}
              className="group flex items-center gap-3 text-[#111111] hover:text-[#F05245] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-black/40 block">
                  Previous Project
                </span>
                <span className="font-grotesk font-bold text-lg sm:text-xl">
                  {getCanonicalLiveTitle(prevProject.title)}
                </span>
              </div>
            </Link>
          ) : <div />}

          {/* View All Work Link: leads to #selected-work on the homepage */}
          <Link
            to="/#selected-work"
            className="px-6 py-2.5 border border-black/20 hover:border-[#F05245] text-[#111111] hover:text-[#F05245] font-mono text-xs uppercase tracking-widest transition-colors font-medium cursor-pointer"
          >
            View All Work
          </Link>

          {/* Next Project */}
          {nextProject ? (
            <Link
              to={`/work/${getCanonicalLiveSlug(nextProject.slug)}`}
              className="group flex items-center gap-3 text-[#111111] hover:text-[#F05245] transition-colors text-right"
            >
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-black/40 block">
                  Next Project
                </span>
                <span className="font-grotesk font-bold text-lg sm:text-xl">
                  {getCanonicalLiveTitle(nextProject.title)}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : <div />}
        </div>
      </nav>

      {/* Universal Footer CTA (Preserved in Dark Mode) */}
      <FooterCTA />

      {/* =========================================================================
          POP-UP QUICK PROJECT NAVIGATION (COMPACT TRANSLUCENT DOCK)
          - Triggers only after 10 scrolls on long-scrolling projects
          - Never shows when first entering the case study
          - Centered floating pill dock (avoids blocking sticky left sidebar)
          - Translucent background (bg-white/75) with backdrop-blur so text/media beneath are visible
          - Reduced delicate hairline border (border-black/[0.08])
          ========================================================================= */}
      <aside
        aria-label="Quick project navigation"
        className={`fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] sm:max-w-2xl lg:max-w-3xl transition-all duration-500 ease-out transform ${
          showFloatingNav
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-[#FFFFFF]/75 hover:bg-[#FFFFFF]/95 backdrop-blur-md border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-2 sm:py-2.5 px-4 sm:px-6 rounded-full transition-all">
          <div className="flex items-center justify-between gap-3 sm:gap-6 md:gap-8">
            
            {/* Previous Project */}
            {prevProject ? (
              <Link
                to={`/work/${getCanonicalLiveSlug(prevProject.slug)}`}
                className="group flex items-center gap-2 text-[#111111] hover:text-[#F05245] transition-colors min-w-0"
                aria-label={`Previous project: ${getCanonicalLiveTitle(prevProject.title)}`}
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 flex-shrink-0" />
                <div className="text-left hidden xs:block sm:block min-w-0">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-black/40 block leading-tight">
                    Previous
                  </span>
                  <span className="font-grotesk font-bold text-xs sm:text-sm truncate max-w-[140px] sm:max-w-[200px] md:max-w-[260px] block leading-tight">
                    {getCanonicalLiveTitle(prevProject.title)}
                  </span>
                </div>
              </Link>
            ) : null}

            {/* View All Work Link */}
            <div className="flex items-center flex-shrink-0">
              <Link
                to="/#selected-work"
                className="px-3.5 sm:px-4 py-1 sm:py-1.5 border border-black/15 hover:border-[#F05245] text-[#111111] hover:text-[#F05245] font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors font-medium cursor-pointer whitespace-nowrap bg-white/60 rounded-full"
              >
                View All Work
              </Link>
            </div>

            {/* Next Project */}
            {nextProject ? (
              <Link
                to={`/work/${getCanonicalLiveSlug(nextProject.slug)}`}
                className="group flex items-center gap-2 text-[#111111] hover:text-[#F05245] transition-colors text-right justify-end min-w-0"
                aria-label={`Next project: ${getCanonicalLiveTitle(nextProject.title)}`}
              >
                <div className="text-right hidden xs:block sm:block min-w-0">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-black/40 block leading-tight">
                    Next
                  </span>
                  <span className="font-grotesk font-bold text-xs sm:text-sm truncate max-w-[140px] sm:max-w-[200px] md:max-w-[260px] block leading-tight">
                    {getCanonicalLiveTitle(nextProject.title)}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 flex-shrink-0" />
              </Link>
            ) : null}

          </div>
        </div>
      </aside>

    </article>
  );
};

export default CaseStudyPage;
