import React, { useState, useEffect, useRef } from 'react';
import { Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import wonderfulPortraitImg from '../assets/WonderfulB-portrait.png';
import { ASSET_CONFIG } from '../config/assets';
import Particles from './Particles';

interface EditorialHeroProps {
  onViewWork: () => void;
}

interface ShardScatterData {
  char: string;
  globalIndex: number;
  dropY: number;      // downward fall distance in vh (lands near hero bottom: 28 to 37vh)
  driftX: number;     // subtle horizontal drift in vw (-6 to +6vw)
  rotZ: number;       // natural 2D tilt/rotation (-32 to +32deg)
  stagger: number;    // start offset for gravity drop (0.0 to 0.11)
  gravityPow: number; // gravity acceleration power curve (1.55 to 1.85)
}

// 16 letters for "WONDERFUL BLESSED" - Natural 2D physics gravity fall exiting completely off-screen
const WONDERFUL_SHARDS: ShardScatterData[] = [
  { char: 'W', globalIndex: 0,  dropY: 72, driftX: -6.5, rotZ: -32, stagger: 0.00, gravityPow: 1.15 },
  { char: 'O', globalIndex: 1,  dropY: 75, driftX: -4.8, rotZ:  26, stagger: 0.01, gravityPow: 1.20 },
  { char: 'N', globalIndex: 2,  dropY: 70, driftX: -3.2, rotZ: -20, stagger: 0.02, gravityPow: 1.15 },
  { char: 'D', globalIndex: 3,  dropY: 76, driftX: -1.8, rotZ:  30, stagger: 0.01, gravityPow: 1.25 },
  { char: 'E', globalIndex: 4,  dropY: 71, driftX: -0.6, rotZ: -22, stagger: 0.02, gravityPow: 1.15 },
  { char: 'R', globalIndex: 5,  dropY: 74, driftX:  0.8, rotZ:  24, stagger: 0.01, gravityPow: 1.20 },
  { char: 'F', globalIndex: 6,  dropY: 78, driftX:  2.0, rotZ: -28, stagger: 0.025, gravityPow: 1.25 },
  { char: 'U', globalIndex: 7,  dropY: 69, driftX:  3.0, rotZ:  18, stagger: 0.015, gravityPow: 1.15 },
  { char: 'L', globalIndex: 8,  dropY: 75, driftX:  4.5, rotZ: -25, stagger: 0.02, gravityPow: 1.20 },
];

const BLESSED_SHARDS: ShardScatterData[] = [
  { char: 'B', globalIndex: 9,  dropY: 73, driftX: -3.0, rotZ:  28, stagger: 0.01, gravityPow: 1.20 },
  { char: 'L', globalIndex: 10, dropY: 70, driftX: -1.2, rotZ: -20, stagger: 0.02, gravityPow: 1.15 },
  { char: 'E', globalIndex: 11, dropY: 77, driftX:  0.6, rotZ:  24, stagger: 0.01, gravityPow: 1.25 },
  { char: 'S', globalIndex: 12, dropY: 69, driftX:  2.0, rotZ: -30, stagger: 0.025, gravityPow: 1.15 },
  { char: 'S', globalIndex: 13, dropY: 76, driftX:  3.4, rotZ:  26, stagger: 0.015, gravityPow: 1.20 },
  { char: 'E', globalIndex: 14, dropY: 72, driftX:  4.8, rotZ: -18, stagger: 0.02, gravityPow: 1.15 },
  { char: 'D', globalIndex: 15, dropY: 79, driftX:  6.5, rotZ:  34, stagger: 0.005, gravityPow: 1.25 },
];

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  onViewWork,
}) => {
  const [imgSrc, setImgSrc] = useState<string>('/WonderfulB-portrait.png');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [entranceComplete, setEntranceComplete] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [scatterProgress, setScatterProgress] = useState<number>(0);

  // Tech inspect hover state (mimics React Bits bounding box / CAD inspect)
  const [hoveredCharIndex, setHoveredCharIndex] = useState<number | null>(null);
  const [hoveredCharMetrics, setHoveredCharMetrics] = useState<{ width: number; height: number } | null>(null);

  // Mouse parallax state — ON THE NAME LAYER ALONE
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });
  const mouseFrameRef = useRef<number | null>(null);

  // GSAP entrance refs
  const entranceTlRef = useRef<gsap.core.Timeline | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  // Scroll lerp references
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // 1. SWIPE-IN TRANSITION ANIMATION: Synchronized with 100% preloader completion
  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const runEntranceSwipe = () => {
      setIsLoaded(true);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          delay: 0.05,
          onComplete: () => {
            setEntranceComplete(true);
            // Clear GSAP inline styles so scroll physics & hover inspector run purely
            gsap.set('.hero-letter', { clearProps: 'transform,opacity,filter' });
          },
        });
        entranceTlRef.current = tl;

        // 1. Staggered swipe-up for each letter of WONDERFUL BLESSED
        tl.fromTo(
          '.hero-letter',
          {
            opacity: 0,
            y: 80,
            rotateX: -18,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power4.out',
            stagger: 0.024,
          }
        );

        // 2. Staggered blur swipe-up for the bio snippet (role lines) on the bottom right
        tl.fromTo(
          '.hero-bio-item',
          {
            opacity: 0,
            y: 45,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
          },
          '-=0.75'
        );

        // 3. Staggered blur swipe-up for social media links on the bottom left
        tl.fromTo(
          '.hero-social-item',
          {
            opacity: 0,
            y: 35,
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.08,
          },
          '-=0.8'
        );

        // 4. Swipe-up for the fixed vertical scroll indicator
        if (scrollIndicatorRef.current) {
          tl.fromTo(
            scrollIndicatorRef.current,
            {
              opacity: 0,
              y: 28,
              filter: 'blur(6px)',
            },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              ease: 'power3.out',
            },
            '-=0.65'
          );
        }
      });
    };

    // If preloader has already finished, run immediately
    if ((window as any).__PRELOADER_FINISHED__) {
      runEntranceSwipe();
    } else {
      window.addEventListener('hero-swipe-in', runEntranceSwipe, { once: true });
      // Fail-safe timeout in case preloader is bypassed
      const fallbackTimer = setTimeout(() => {
        runEntranceSwipe();
      }, 1600);

      return () => {
        window.removeEventListener('hero-swipe-in', runEntranceSwipe);
        clearTimeout(fallbackTimer);
        ctx?.revert();
      };
    }

    return () => {
      ctx?.revert();
    };
  }, []);

  // Scroll loop with smooth exponential physics lerp
  useEffect(() => {
    let isLoopRunning = false;

    const smoothStep = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.28;
        setScatterProgress(currentProgressRef.current);
        animFrameRef.current = requestAnimationFrame(smoothStep);
      } else {
        currentProgressRef.current = targetProgressRef.current;
        setScatterProgress(targetProgressRef.current);
        isLoopRunning = false;
      }
    };

    const handleScroll = () => {
      const curScroll = window.scrollY;
      setScrollY(curScroll);

      // If user starts scrolling during initial entrance, fast-forward entrance
      if (entranceTlRef.current && entranceTlRef.current.isActive() && curScroll > 4) {
        entranceTlRef.current.progress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Subtle mouse-move parallax loop & MAGNETIC 'Scroll to view' cursor interaction
  useEffect(() => {
    let isMouseLoopRunning = false;

    const smoothMouse = () => {
      const dx = targetMouseRef.current.x - currentMouseRef.current.x;
      const dy = targetMouseRef.current.y - currentMouseRef.current.y;

      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        currentMouseRef.current.x += dx * 0.08;
        currentMouseRef.current.y += dy * 0.08;
        setMouseOffset({
          x: currentMouseRef.current.x,
          y: currentMouseRef.current.y,
        });
        mouseFrameRef.current = requestAnimationFrame(smoothMouse);
      } else {
        currentMouseRef.current.x = targetMouseRef.current.x;
        currentMouseRef.current.y = targetMouseRef.current.y;
        setMouseOffset({
          x: targetMouseRef.current.x,
          y: targetMouseRef.current.y,
        });
        isMouseLoopRunning = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight) return;

      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetMouseRef.current = { x: normX, y: normY };

      if (!isMouseLoopRunning) {
        isMouseLoopRunning = true;
        mouseFrameRef.current = requestAnimationFrame(smoothMouse);
      }
    };

    const handleMouseLeave = () => {
      targetMouseRef.current = { x: 0, y: 0 };
      if (!isMouseLoopRunning) {
        isMouseLoopRunning = true;
        mouseFrameRef.current = requestAnimationFrame(smoothMouse);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (mouseFrameRef.current) {
        cancelAnimationFrame(mouseFrameRef.current);
      }
    };
  }, []);

  // Parallax offsets from scroll
  const portraitParallax = scrollY * 0.12;
  const lensParallax = scrollY * 0.18;
  const uiFade = Math.max(0, 1 - scrollY / 360);

  // WONDERFUL BLESSED follows mouse pointer with positive magnetic tracking matching 'scroll to view'
  const textMouseX = mouseOffset.x * 28;
  const textMouseY = mouseOffset.y * 18;
  const textTiltY = mouseOffset.x * 3.8;
  const textTiltX = -mouseOffset.y * 2.4;

  // Compensation for white text inside portrait mask so it tracks 100% with the black text layer
  const whiteCompX = textMouseX;
  const whiteCompY = textMouseY - portraitParallax;

  // Compute individual letter style (GSAP entrance + fixed in place)
  const getLetterStyle = (_item: ShardScatterData): React.CSSProperties => {
    if (!isLoaded) {
      return {
        opacity: 0,
        transform: 'translate3d(0, 32px, 0) scale(0.94)',
      };
    }

    // Initial entrance: orchestrated by GSAP staggered timeline
    if (!entranceComplete) {
      return {
        transformStyle: 'preserve-3d' as const,
        willChange: 'transform, opacity',
      };
    }

    // Fixed in place — no falling or scattering on scroll
    return {
      opacity: 1,
      transform: 'none',
      transition: 'opacity 0.45s ease-out',
    };
  };

  const getFallbackDimensions = (char: string) => {
    const baseH = 96;
    switch (char) {
      case 'W': return { width: 104, height: baseH };
      case 'M': return { width: 98, height: baseH };
      case 'O': case 'D': case 'C': return { width: 88, height: baseH };
      case 'N': case 'U': case 'B': case 'R': case 'S': return { width: 80, height: baseH };
      case 'E': case 'F': case 'L': case 'P': case 'T': return { width: 70, height: baseH };
      case 'I': return { width: 38, height: baseH };
      default: return { width: 78, height: baseH };
    }
  };

  const renderScatterWord = (
    letters: ShardScatterData[],
    textColor: 'text-black' | 'text-white'
  ) => {
    return (
      <span className="inline-flex items-center flex-nowrap">
        {letters.map((item) => {
          const isHovered = hoveredCharIndex === item.globalIndex;
          const fallback = getFallbackDimensions(item.char);
          const dimWidth = hoveredCharMetrics && isHovered ? hoveredCharMetrics.width : fallback.width;
          const dimHeight = hoveredCharMetrics && isHovered ? hoveredCharMetrics.height : fallback.height;

          return (
            <span
              key={item.globalIndex}
              className={`hero-letter relative inline-block transform-gpu pointer-events-auto cursor-pointer hover:cursor-grab ${textColor}`}
              style={getLetterStyle(item)}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setHoveredCharIndex(item.globalIndex);
                setHoveredCharMetrics({
                  width: Math.round(rect.width),
                  height: Math.round(rect.height),
                });
              }}
              onMouseLeave={() => {
                setHoveredCharIndex(null);
                setHoveredCharMetrics(null);
              }}
            >
              {/* "HI, MY NAME IS" text in all caps on top of the letter W with red bold HI */}
              {item.globalIndex === 0 && (
                <span
                  className="absolute bottom-full mb-1 sm:mb-2 md:mb-2.5 left-0 sm:left-1/2 sm:-translate-x-1/2 font-grotesk text-[clamp(11px,1.15vw,15px)] tracking-[0.06em] uppercase leading-none whitespace-nowrap select-none pointer-events-none"
                  aria-hidden="true"
                >
                  <span className="font-black text-[#F05245]">HI</span>
                  <span className="font-semibold text-current opacity-85">, MY NAME IS</span>
                </span>
              )}

              {/* Base letter glyph: fades to 20% opacity on hover to reveal tech wireframe */}
              <span
                className={`inline-block transition-opacity duration-150 ${
                  isHovered ? 'opacity-20' : 'opacity-100'
                }`}
              >
                {item.char}
              </span>

              {/* Technical inspection bounding box & wireframe when hovered (mimicking React Bits video) */}
              {isHovered && (
                <>
                  {/* SVG dashed contour with technical blueprint hatched fill */}
                  <svg
                    className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                    viewBox={`0 0 ${dimWidth} ${dimHeight}`}
                    preserveAspectRatio="none"
                  >
                    <text
                      x="50%"
                      y="50%"
                      dominantBaseline="central"
                      textAnchor="middle"
                      fill="currentColor"
                      fillOpacity="0.18"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeDasharray="4 3"
                      style={{
                        fontFamily: 'inherit',
                        fontWeight: 'inherit',
                        fontSize: 'inherit',
                      }}
                    >
                      {item.char}
                    </text>
                  </svg>

                  {/* CAD / Figma Bounding Box with dashed border */}
                  <div
                    className="absolute -inset-x-1.5 -inset-y-2 border border-dashed border-current opacity-85 pointer-events-none z-10"
                    aria-hidden="true"
                  >
                    {/* 4 Corner Resize Handles */}
                    <span className="absolute -top-1 -left-1 w-[5px] h-[5px] bg-current ring-1 ring-white/70 dark:ring-black/70" />
                    <span className="absolute -top-1 -right-1 w-[5px] h-[5px] bg-current ring-1 ring-white/70 dark:ring-black/70" />
                    <span className="absolute -bottom-1 -left-1 w-[5px] h-[5px] bg-current ring-1 ring-white/70 dark:ring-black/70" />
                    <span className="absolute -bottom-1 -right-1 w-[5px] h-[5px] bg-current ring-1 ring-white/70 dark:ring-black/70" />

                    {/* 4 Edge Midpoint Handles */}
                    <span className="absolute -top-[2.5px] left-1/2 -translate-x-1/2 w-1 h-1 bg-current" />
                    <span className="absolute -bottom-[2.5px] left-1/2 -translate-x-1/2 w-1 h-1 bg-current" />
                    <span className="absolute top-1/2 -left-[2.5px] -translate-y-1/2 w-1 h-1 bg-current" />
                    <span className="absolute top-1/2 -right-[2.5px] -translate-y-1/2 w-1 h-1 bg-current" />

                    {/* Dimension / Tech Spec Floating Label (e.g. 'c · 78 × 84', 'B · 86 × 107') */}
                    <div
                      className="absolute -top-6 left-0 font-mono text-[9px] sm:text-[10px] tracking-wide leading-none whitespace-nowrap select-none pointer-events-none flex items-center gap-1 font-normal opacity-90"
                      style={{
                        color: 'currentColor',
                      }}
                    >
                      <span className="font-semibold">{item.char.toLowerCase()}</span>
                      <span className="opacity-40">·</span>
                      <span>
                        {dimWidth} × {dimHeight}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </span>
          );
        })}
      </span>
    );
  };

  const renderScatterText = (textColor: 'text-black' | 'text-white') => {
    return (
      <div className="font-grotesk font-bold uppercase tracking-[-0.03em] leading-[0.85] text-[clamp(32px,7.5vw,130px)] flex items-center justify-center gap-[0.22em] sm:gap-[0.26em] md:gap-[0.3em] [perspective:1200px] select-none whitespace-nowrap">
        <div className="inline-flex items-center flex-nowrap">
          {renderScatterWord(WONDERFUL_SHARDS, textColor)}
        </div>
        <div className="inline-flex items-center flex-nowrap">
          {renderScatterWord(BLESSED_SHARDS, textColor)}
        </div>
      </div>
    );
  };

  return (
    <section
      id="hero"
      className="relative w-full h-[100svh] min-h-[640px] bg-[#FFFFFF] text-[#111111] overflow-hidden select-none snap-section"
      style={{ minHeight: '100svh' }}
    >
      {/* =========================================================================
          0. PARTICLES BACKGROUND LAYER (React Bits OGL Particles)
             - WebGL points reacting to cursor movement and ambient drift
          ========================================================================= */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none select-none overflow-hidden"
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      >
        <Particles
          particleColors={["#353535"]}
          particleCount={200}
          particleSpread={10}
          speed={0.3}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* =========================================================================
          1. GIANT NAME TYPOGRAPHY — BEHIND PORTRAIT LAYER (Base Solid Black)
             - Centered across the chest with close, balanced word spacing
             - Positioned across upper chest area, below chin and neck
          ========================================================================= */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${textMouseX.toFixed(2)}px, ${textMouseY.toFixed(2)}px, 0) rotateY(${textTiltY.toFixed(2)}deg) rotateX(${textTiltX.toFixed(2)}deg)`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className="absolute left-0 right-0 top-[64%] sm:top-[65%] md:top-[66%] -translate-y-1/2 z-[2] pointer-events-none select-none w-full flex justify-center px-4 sm:px-6"
      >
        {renderScatterText('text-black')}
      </div>

      {/* =========================================================================
          2. LARGE EDITORIAL PORTRAIT — FOREGROUND SUBJECT
             - Grounded portrait: NO mouse-move parallax effect (mouse parallax removed).
             - Parallax solely from page scroll.
             - Centered precisely with left-1/2 -translate-x-1/2 for 1:1 mask alignment.
          ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-[3]"
        style={{
          transform: `translate3d(0, ${portraitParallax.toFixed(2)}px, 0)`,
          willChange: 'transform',
        }}
      >
        <div
          className={`hero-portrait absolute bottom-0 left-1/2 -translate-x-1/2 h-[86vh] sm:h-[90vh] md:h-[93vh] w-auto max-w-none flex items-end justify-center select-none overflow-hidden origin-bottom transition-all duration-[1050ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isLoaded
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-16 scale-[0.96]'
          }`}
        >
          <img
            src={imgSrc}
            alt="Wonderful Blessed portrait cutout"
            onError={() => {
              if (imgSrc === '/WonderfulB-portrait.png') {
                setImgSrc('/assets/WonderfulB-portrait.png');
              } else if (imgSrc === '/assets/WonderfulB-portrait.png' && wonderfulPortraitImg) {
                setImgSrc(wonderfulPortraitImg);
              } else if (imgSrc !== ASSET_CONFIG.heroPortrait) {
                setImgSrc(ASSET_CONFIG.heroPortrait);
              }
            }}
            className="block h-full w-auto max-w-none object-contain object-bottom align-bottom filter contrast-[1.05] brightness-[1.0] select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* =========================================================================
          3. TEXT & IMAGE INTERACTION — WHITE ONLY WHERE IT INTERACTS WITH THE IMAGE
             - Masked strictly to portrait cutout via .hero-portrait-mask.
             - Position compensated so white text tracks mouse-parallax of black text exactly.
          ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-[4]"
        style={{
          transform: `translate3d(0, ${portraitParallax.toFixed(2)}px, 0)`,
          willChange: 'transform',
        }}
      >
        <div
          aria-hidden="true"
          className={`hero-portrait-mask absolute inset-0 overflow-hidden origin-bottom transition-all duration-[1100ms] delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isLoaded
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.98]'
          }`}
        >
          <div
            style={{
              transform: `translate3d(${whiteCompX.toFixed(2)}px, ${whiteCompY.toFixed(2)}px, 0) rotateY(${textTiltY.toFixed(2)}deg) rotateX(${textTiltX.toFixed(2)}deg)`,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
            className="w-full h-full"
          >
            <div className="absolute left-0 right-0 top-[64%] sm:top-[65%] md:top-[66%] -translate-y-1/2 w-full flex justify-center px-4 sm:px-6">
              {renderScatterText('text-white')}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. SOCIAL MEDIA LINKS & BIO (Bottom Left)
             - Left edge strictly aligned with the 'W' of WONDERFUL BLESSED at left-[4.5vw]
             - Clean uppercase styling matching reference image (image.png)
             - Animated in with staggered GSAP fade-up
          ========================================================================= */}
      <div
        style={{ opacity: entranceComplete ? uiFade : undefined }}
        className="absolute left-[4.5vw] bottom-[4.5vh] z-10 flex flex-col space-y-2 text-[11px] sm:text-[12px] font-grotesk font-semibold tracking-wider uppercase text-[#111111] select-none"
      >
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-social-item inline-flex items-center gap-2 hover:text-[#F05245] transition-colors group"
        >
          <Linkedin className="w-3.5 h-3.5 stroke-[2] group-hover:scale-110 transition-transform shrink-0" />
          <span>LINKEDIN</span>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-social-item inline-flex items-center gap-2 hover:text-[#F05245] transition-colors group"
        >
          <Instagram className="w-3.5 h-3.5 stroke-[2] group-hover:scale-110 transition-transform shrink-0" />
          <span>INSTAGRAM</span>
        </a>
      </div>

      {/* =========================================================================
          6. HERO ROLE & BIO SNIPPET TYPOGRAPHY (Bottom Right)
             - Exact match to Screenshot 2026-09-26 155731.png:
                * Red "//" on top
                * "Brand & Product Designer"
                * "Founder & Creative Director"
             - Staggered GSAP fade-up entrance on page load
          ========================================================================= */}
      <div
        style={{ opacity: entranceComplete ? uiFade : undefined }}
        className="hero-bio-snippet absolute right-[4.5vw] bottom-[4.5vh] z-10 text-right pointer-events-none select-none space-y-1 sm:space-y-1.5"
      >
        <div className="hero-bio-item text-[#F05245] font-black text-2xl sm:text-3xl leading-none select-none tracking-tight">
          //
        </div>
        <div className="hero-bio-item font-grotesk font-semibold text-[13px] sm:text-[15px] md:text-[16px] text-[#111111] leading-snug">
          <div>Brand & Product Designer</div>
          <div>Founder & Creative Director</div>
        </div>
      </div>

      {/* =========================================================================
          7. VERTICAL SCROLL INDICATOR (Bottom Center)
             - Exact match to reference screenshot:
               "SCROLL" in uppercase tracked-out typography
               Thin vertical baseline line with animated inner thicker segment gliding up and down
             - Fixed in bottom center, does NOT follow the cursor
          ========================================================================= */}
      <div
        ref={scrollIndicatorRef}
        style={{ opacity: entranceComplete ? uiFade : undefined }}
        className="absolute left-1/2 -translate-x-1/2 bottom-[2.5vh] sm:bottom-[3.2vh] z-20 pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center">
          {/* Tracked uppercase 'SCROLL' label in pure white */}
          <span className="font-grotesk text-[10.5px] sm:text-[11.5px] font-semibold tracking-[0.28em] pl-[0.28em] uppercase text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] select-none">
            SCROLL
          </span>

          {/* Thin vertical line in white/45 with animated inner thicker line in solid white */}
          <div className="relative w-[1px] h-[38px] bg-white/45 mt-2 flex justify-center shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            <motion.div
              className="absolute top-0 w-[2.5px] h-[14px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)]"
              style={{ left: '-0.75px' }}
              animate={{
                y: [0, 24, 0],
                opacity: [0.75, 1, 0.75],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
