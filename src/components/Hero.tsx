import React, { useState, useEffect, useRef } from 'react';
import { Linkedin, Instagram, ArrowDown } from 'lucide-react';
import { ASSET_CONFIG } from '../config/assets';

interface HeroProps {
  onExploreWork?: () => void;
  onStartProject?: () => void;
  onNavigate?: (sectionId: string) => void;
  onOpenContact?: () => void;
}

interface ShardScatterData {
  char: string;
  globalIndex: number;
  x: number;       // horizontal distance in vw (-45 to +45)
  y: number;       // vertical distance in vh (+30 to +60, DOWNWARDS ONLY)
  z: number;       // 3D depth in px (-110 to +90)
  rotZ: number;    // sharp 2D spin (-220 to +220)
  rotX: number;    // 3D pitch (-65 to +65)
  rotY: number;    // 3D yaw (-65 to +70)
  scale: number;   // shard scale (0.38 to 1.25)
  stagger: number; // irregular fracture trigger
}

// 16 shards for "WONDERFUL BLESSED" - ALL SCATTER DOWNWARDS ONLY
const WONDERFUL_SHARDS: ShardScatterData[] = [
  // W - Explodes down-left with sharp backward spin
  { char: 'W', globalIndex: 0,  x: -36, y: 38, z: -70, rotZ: -145, rotX: 55,  rotY: -45, scale: 0.55, stagger: 0.03 },
  // O - Tumbles down-left, spins forward toward camera
  { char: 'O', globalIndex: 1,  x: -28, y: 48, z: 75,  rotZ: 175,  rotX: -45, rotY: 60,  scale: 1.15, stagger: 0.01 },
  // N - Steep downward fracture shard
  { char: 'N', globalIndex: 2,  x: -22, y: 34, z: -40, rotZ: -110, rotX: 50,  rotY: -35, scale: 0.65, stagger: 0.08 },
  // D - Downward lateral drop
  { char: 'D', globalIndex: 3,  x: -16, y: 52, z: -60, rotZ: 135,  rotX: -55, rotY: 45,  scale: 0.50, stagger: 0.04 },
  // E - Forward spinning shard dropping left
  { char: 'E', globalIndex: 4,  x: -11, y: 36, z: 85,  rotZ: -160, rotX: 40,  rotY: -55, scale: 1.20, stagger: 0.09 },
  // R - Rapid diagonal drop
  { char: 'R', globalIndex: 5,  x: -6,  y: 46, z: -90, rotZ: 195,  rotX: -35, rotY: 30,  scale: 0.45, stagger: 0.02 },
  // F - Plunges straight down
  { char: 'F', globalIndex: 6,  x: -2,  y: 56, z: 40,  rotZ: -190, rotX: 65,  rotY: 25,  scale: 0.90, stagger: 0.11 },
  // U - Deep downward plunge shard
  { char: 'U', globalIndex: 7,  x: 3,   y: 58, z: -110,rotZ: 165,  rotX: -60, rotY: -40, scale: 0.40, stagger: 0.05 },
  // L - Downward right glancing slice
  { char: 'L', globalIndex: 8,  x: 7,   y: 38, z: 60,  rotZ: -125, rotX: 35,  rotY: 50,  scale: 1.10, stagger: 0.07 },
];

const BLESSED_SHARDS: ShardScatterData[] = [
  // B - Drops down-right and spins
  { char: 'B', globalIndex: 9,  x: 12,  y: 44, z: -50, rotZ: 140,  rotX: -45, rotY: -30, scale: 0.60, stagger: 0.04 },
  // L - Upper-right projectile shard descending down
  { char: 'L', globalIndex: 10, x: 17,  y: 35, z: 70,  rotZ: -170, rotX: 50,  rotY: 40,  scale: 1.18, stagger: 0.10 },
  // E - Down-right spinning fracture
  { char: 'E', globalIndex: 11, x: 22,  y: 52, z: -85, rotZ: 205,  rotX: -40, rotY: 65,  scale: 0.45, stagger: 0.02 },
  // S - Forward tumbling glass plate dropping right
  { char: 'S', globalIndex: 12, x: 27,  y: 36, z: 90,  rotZ: -155, rotX: 45,  rotY: -60, scale: 1.25, stagger: 0.08 },
  // S - Deep downward-right sliver
  { char: 'S', globalIndex: 13, x: 33,  y: 48, z: -100,rotZ: 180,  rotX: -55, rotY: 35,  scale: 0.38, stagger: 0.05 },
  // E - Diagonal right downward explosion
  { char: 'E', globalIndex: 14, x: 39,  y: 40, z: 50,  rotZ: -210, rotX: 60,  rotY: -50, scale: 0.85, stagger: 0.07 },
  // D - Extreme far-right downward burst
  { char: 'D', globalIndex: 15, x: 45,  y: 54, z: -70, rotZ: 220,  rotX: -65, rotY: 45,  scale: 0.48, stagger: 0.03 },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreWork,
  onStartProject,
  onNavigate,
  onOpenContact,
}) => {
  const [imgSrc, setImgSrc] = useState('/assets/wonderful-portrait.png');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [entranceComplete, setEntranceComplete] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [scatterProgress, setScatterProgress] = useState<number>(0);

  // Mouse parallax state — ON THE NAME LAYER ALONE
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });
  const mouseFrameRef = useRef<number | null>(null);

  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    const entranceTimer = setTimeout(() => {
      setEntranceComplete(true);
    }, 1300);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(entranceTimer);
    };
  }, []);

  useEffect(() => {
    let isLoopRunning = false;

    const smoothStep = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0004) {
        currentProgressRef.current += diff * 0.14;
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

      const heroH = window.innerHeight || 800;
      const progress = Math.min(1, Math.max(0, curScroll / (heroH * 0.68)));
      targetProgressRef.current = progress;

      if (!isLoopRunning) {
        isLoopRunning = true;
        animFrameRef.current = requestAnimationFrame(smoothStep);
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

  const portraitParallax = scrollY * 0.12;
  const lensParallax = scrollY * 0.18;
  const uiFade = Math.max(0, 1 - scrollY / 360);

  // Mouse parallax displacements on the NAME LAYER ALONE
  const textMouseX = mouseOffset.x * -14;
  const textMouseY = mouseOffset.y * -9;
  const textTiltY = mouseOffset.x * 3.2;
  const textTiltX = -mouseOffset.y * 2.2;

  const whiteCompX = textMouseX;
  const whiteCompY = textMouseY - portraitParallax;

  const handleNavigate = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else if (onExploreWork && sectionId === 'projects') {
      onExploreWork();
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContact = () => {
    if (onOpenContact) {
      onOpenContact();
    } else if (onStartProject) {
      onStartProject();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getLetterStyle = (item: ShardScatterData) => {
    if (!isLoaded) {
      return {
        opacity: 0,
        transform: 'translate3d(0, 32px, 0) scale(0.94)',
      };
    }

    if (!entranceComplete && scatterProgress <= 0.001) {
      const delay = item.globalIndex * 42;
      return {
        opacity: 1,
        transform: 'none',
        transition: `transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 0.75s ease-out ${delay}ms`,
      };
    }

    if (scatterProgress <= 0.001) {
      return {
        opacity: 1,
        transform: 'none',
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease-out',
      };
    }

    const p = Math.max(0, Math.min(1, (scatterProgress - item.stagger) / (1 - item.stagger)));
    const ease = Math.pow(p, 0.85);

    const tx = item.x * ease;
    const ty = item.y * ease; // y is always positive (downward only)
    const tz = item.z * ease;
    const rz = item.rotZ * ease;
    const rx = item.rotX * ease;
    const ry = item.rotY * ease;
    const s = 1 + (item.scale - 1) * ease;
    const opacity = Math.max(0, 1 - ease * 1.35);

    return {
      opacity,
      transform: `translate3d(${tx.toFixed(2)}vw, ${ty.toFixed(2)}vh, ${tz.toFixed(1)}px) rotateZ(${rz.toFixed(1)}deg) rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg) scale(${s.toFixed(3)})`,
      willChange: 'transform, opacity',
    };
  };

  const renderScatterWord = (
    letters: ShardScatterData[],
    textColor: 'text-black' | 'text-white'
  ) => {
    return (
      <span className="inline-flex items-center flex-nowrap">
        {letters.map((item) => (
          <span
            key={item.globalIndex}
            className={`relative inline-block transform-gpu ${textColor}`}
            style={getLetterStyle(item)}
          >
            {item.globalIndex === 4 && (
              <span
                className="absolute bottom-full mb-1.5 sm:mb-2 md:mb-2.5 left-1/2 -translate-x-1/2 font-sans font-medium text-[clamp(11px,1.2vw,16px)] tracking-normal normal-case leading-none whitespace-nowrap select-none pointer-events-none text-current opacity-90"
                style={{
                  textTransform: 'none',
                  letterSpacing: 'normal',
                }}
                aria-hidden="true"
              >
                Hi, my name is
              </span>
            )}
            {item.char}
          </span>
        ))}
      </span>
    );
  };

  const renderScatterText = (textColor: 'text-black' | 'text-white') => {
    return (
      <div className="font-grotesk font-bold uppercase tracking-[-0.035em] leading-[0.85] text-[clamp(24px,5.8vw,88px)] flex items-center justify-center flex-nowrap [perspective:1200px] select-none">
        {renderScatterWord(WONDERFUL_SHARDS, textColor)}
        <span className="inline-block w-[0.26em] sm:w-[0.3em]">&nbsp;</span>
        {renderScatterWord(BLESSED_SHARDS, textColor)}
      </div>
    );
  };

  return (
    <section
      id="hero"
      className="relative w-full h-[100svh] min-h-[640px] bg-[#D2D2D0] text-[#111111] overflow-hidden select-none"
      style={{ minHeight: '100svh' }}
    >
      {/* 1. TOP NAVIGATION BAR */}
      <header
        style={{ opacity: isLoaded ? uiFade : 0 }}
        className="absolute top-0 left-0 right-0 z-20 pt-7 sm:pt-8 md:pt-10 px-6 sm:px-10 md:px-14 lg:px-16 flex items-center justify-between text-[13px] sm:text-[14px] font-normal tracking-tight text-[#111111] transition-opacity duration-700 ease-out"
      >
        <div className="select-none flex items-center gap-1.5 font-normal">
          <span>© Wonda Design & Strategy</span>
        </div>

        <nav className="flex items-center gap-8 sm:gap-14 md:gap-24 lg:gap-32 text-[#111111]">
          <button
            onClick={() => handleNavigate('projects')}
            className="hover:opacity-70 transition-opacity cursor-pointer font-normal"
          >
            Projects
          </button>
          <button
            onClick={() => handleNavigate('intro')}
            className="hover:opacity-70 transition-opacity cursor-pointer font-normal"
          >
            About
          </button>
          <button
            onClick={handleContact}
            className="hover:opacity-70 transition-opacity cursor-pointer font-normal"
          >
            Contact
          </button>
        </nav>
      </header>

      {/* 2. GIANT NAME TYPOGRAPHY — BEHIND PORTRAIT LAYER */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${textMouseX.toFixed(2)}px, ${textMouseY.toFixed(2)}px, 0) rotateY(${textTiltY.toFixed(2)}deg) rotateX(${textTiltX.toFixed(2)}deg)`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className="absolute left-0 right-0 top-[59%] -translate-y-1/2 z-[2] pointer-events-none select-none w-full text-center px-4 sm:px-6 md:px-8 max-w-[96vw] mx-auto"
      >
        {renderScatterText('text-black')}
      </div>

      {/* 3. LARGE EDITORIAL PORTRAIT — FOREGROUND SUBJECT (Portrait mouse parallax removed) */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-[3]"
        style={{
          transform: `translate3d(0, ${portraitParallax.toFixed(2)}px, 0)`,
          willChange: 'transform',
        }}
      >
        <div
          className={`hero-portrait absolute bottom-0 left-1/2 -translate-x-[48%] h-[86vh] sm:h-[90vh] md:h-[93vh] w-auto max-w-none flex items-end justify-center select-none overflow-hidden origin-bottom transition-all duration-[1100ms] delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isLoaded
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.98]'
          }`}
        >
          <img
            src={imgSrc}
            alt="Wonderful Blessed portrait cutout"
            onError={() => {
              if (imgSrc !== '/wonderful-portrait.png') {
                setImgSrc('/wonderful-portrait.png');
              } else if (imgSrc !== ASSET_CONFIG.heroPortrait) {
                setImgSrc(ASSET_CONFIG.heroPortrait);
              }
            }}
            className="h-full w-auto max-w-none object-contain object-bottom filter contrast-[1.05] brightness-[1.0] select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* 4. TEXT & IMAGE INTERACTION — WHITE ONLY WHERE IT INTERACTS WITH THE IMAGE */}
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
            <div className="absolute left-0 right-0 top-[59%] -translate-y-1/2 w-full text-center px-4 sm:px-6 md:px-8 max-w-[96vw] mx-auto">
              {renderScatterText('text-white')}
            </div>
          </div>
        </div>
      </div>

      {/* Circular Glass Refraction Lens */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(0, ${lensParallax.toFixed(2)}px, 0)`,
          willChange: 'transform',
        }}
        className="absolute left-1/2 translate-x-[4.5vw] top-[43%] -translate-y-1/2 pointer-events-none z-[5]"
      >
        <div
          className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-white/40 shadow-[inset_0_0_15px_rgba(255,255,255,0.35)] backdrop-blur-[1px] transition-all duration-1000 delay-300 ease-out ${
            isLoaded ? 'opacity-70 scale-100' : 'opacity-0 scale-75'
          }`}
        />
      </div>

      {/* 5. SOCIAL MEDIA LINKS (Bottom Left) */}
      <div
        style={{ opacity: isLoaded ? uiFade : 0 }}
        className={`absolute left-[4.5vw] bottom-[4.5vh] z-10 flex flex-col space-y-2 text-[13px] sm:text-[14px] font-normal tracking-tight text-[#111111] transition-all duration-1000 delay-200 ease-out ${
          isLoaded ? 'translate-y-0' : 'translate-y-4'
        }`}
      >
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <Linkedin className="w-3.5 h-3.5 stroke-[1.8]" />
          <span>Linkedin</span>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <Instagram className="w-3.5 h-3.5 stroke-[1.8]" />
          <span>Instagram</span>
        </a>
      </div>

      {/* 6. HERO ROLE TYPOGRAPHY (Bottom Right) */}
      <div
        style={{ opacity: isLoaded ? uiFade : 0 }}
        className={`absolute right-[4.5vw] bottom-[4.5vh] z-10 text-right pointer-events-none select-none transition-all duration-1000 delay-200 ease-out ${
          isLoaded ? 'translate-y-0' : 'translate-y-4'
        }`}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-bold font-grotesk tracking-[-0.035em] text-[#111111] leading-[1.05]">
          <div>
            <span className="text-[#F05245] mr-1.5 select-none">//</span>Brand Designer
          </div>
          <div>Art Director</div>
        </h2>
      </div>

      {/* 7. SCROLL DOWN PROMPT MESSAGE (Bottom Center) */}
      <button
        type="button"
        onClick={() => handleNavigate('intro')}
        style={{ opacity: isLoaded ? uiFade : 0 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-[3.6vh] sm:bottom-[4.2vh] z-20 flex flex-col items-center gap-1.5 group cursor-pointer select-none transition-opacity duration-700 ease-out focus:outline-none"
        aria-label="Scroll down to explore"
      >
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase text-[#111111]/70 group-hover:text-[#111111] transition-colors flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F05245] animate-pulse" />
          <span>Scroll down</span>
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-[#111111]/60 group-hover:text-[#F05245] group-hover:translate-y-0.5 transition-all duration-300 animate-bounce" />
      </button>
    </section>
  );
};
