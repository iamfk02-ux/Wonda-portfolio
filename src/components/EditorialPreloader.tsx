import React, { useState, useEffect } from 'react';
import Particles from './Particles';

interface CountingLoaderProps {
  onLoaded?: () => void;
}

export const EditorialPreloader: React.FC<CountingLoaderProps> = ({ onLoaded }) => {
  const [count, setCount] = useState(0);
  const [isSlidingUp, setIsSlidingUp] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Lock body scroll during initial counting
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let current = 0;
    let timer: NodeJS.Timeout;

    // Smooth counting up to 100% over ~1.3s with realistic organic pacing matching the video
    const step = () => {
      let inc = 1;
      if (current < 25) {
        inc = Math.floor(Math.random() * 4) + 2; // 2 - 5
      } else if (current < 65) {
        inc = Math.floor(Math.random() * 5) + 3; // 3 - 7
      } else if (current < 90) {
        inc = Math.floor(Math.random() * 4) + 2; // 2 - 5
      } else {
        inc = Math.floor(Math.random() * 2) + 1; // 1 - 2
      }

      current = Math.min(100, current + inc);
      setCount(current);

      if (current < 100) {
        const delay = current > 85 && current < 98 ? Math.floor(Math.random() * 35) + 30 : Math.floor(Math.random() * 25) + 20;
        timer = setTimeout(step, delay);
      } else {
        // Reached 100% - brief pause then trigger the slide-up curtain transition
        setTimeout(() => {
          setIsSlidingUp(true);
          document.body.style.overflow = originalOverflow;
          (window as any).__PRELOADER_FINISHED__ = true;
          window.dispatchEvent(new CustomEvent('hero-swipe-in'));
          if (onLoaded) onLoaded();

          // Remove overlay after slide-up finishes (850ms)
          setTimeout(() => {
            setIsRemoved(true);
          }, 850);
        }, 160);
      }
    };

    // Small initial breath before counting starts
    const startDelay = setTimeout(step, 80);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onLoaded]);

  if (isRemoved) return null;

  return (
    <aside
      aria-label="Loading screen"
      aria-hidden={isSlidingUp}
      className={`fixed inset-0 z-[999999] bg-[#FFFFFF] flex items-center justify-center select-none pointer-events-auto border-b border-black/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.06)] will-change-transform overflow-hidden ${
        isSlidingUp ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{
        transition: 'transform 850ms cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      {/* Floating Particles Background Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      >
        <Particles
          particleColors={["#353535"]}
          particleCount={160}
          particleSpread={10}
          speed={0.25}
          particleBaseSize={95}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* 1. LOWER-LEFT LOADING COUNT: Large oversized percentage counter */}
      <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 md:bottom-10 md:left-10 z-20 pointer-events-none select-none">
        <span className="font-sans font-bold sm:font-extrabold text-[clamp(44px,7.5vw,100px)] leading-none tracking-[-0.04em] text-[#111111] tabular-nums select-none">
          {count}%
        </span>
      </div>

      {/* 2. LOWER-RIGHT STUDIO NAME: Clean typography aligned close to the lower-right edge */}
      <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 z-20 pointer-events-none select-none flex items-end">
        <span className="font-sans text-[13px] sm:text-[14px] md:text-[15px] font-medium tracking-tight text-[#111111] leading-none select-none">
          Wonda Design Studio
        </span>
      </div>
    </aside>
  );
};
