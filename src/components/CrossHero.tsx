import React, { useState, useEffect } from 'react';
import { SilkRibbonShader } from './SilkRibbonShader';
import { FloatingKeycaps } from './FloatingKeycaps';

interface CrossHeroProps {
  onStartProject?: () => void;
  onViewPortfolio?: () => void;
}

const STATS = [
  { value: '8', suffix: '+', label: 'Years experience' },
  { value: '50', suffix: '+', label: 'Projects delivered' },
  { value: '4', suffix: '', label: 'Continents served' },
  { value: '10', suffix: '+', label: 'Software mastered' },
];

export const CrossHero: React.FC<CrossHeroProps> = ({ onStartProject, onViewPortfolio }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ['LIVE', 'SEE', 'BUILD', 'FORM', 'FEEL'];
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setIsFlipping(false);
      }, 280);
    }, 2400);

    return () => clearInterval(interval);
  }, [words.length]);

  const handleViewPortfolio = () => {
    if (onViewPortfolio) {
      onViewPortfolio();
    } else {
      const el = document.getElementById('visual-slide') || document.getElementById('work');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[75vh] md:min-h-[82vh] bg-[#050505] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background: Fluted Glass & Burnt Orange Fluid Gradient Shader */}
      <div className="absolute inset-0 z-0">
        <SilkRibbonShader />
      </div>

      {/* Deep pitch black gradients ensuring the top-left text area is crisp & legible */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 to-transparent w-full md:w-3/5 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]/70 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,rgba(5,5,5,0.95)_0%,rgba(5,5,5,0.6)_45%,transparent_100%)] pointer-events-none" />

      {/* Halftone analog dither overlay for gritty tactile depth */}
      <div className="absolute inset-0 bg-dither-subtle opacity-20 pointer-events-none z-0" />

      {/* Main Viewport Content: Tightened layout with BOLDLY removed */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 flex-1 flex flex-col justify-center">
        
        {/* Top-Left Quadrant: Massive [WORD] IDEAS Title + Paragraph + Keycap Buttons */}
        <div className="text-left max-w-xl md:max-w-2xl space-y-5 sm:space-y-6">
          
          {/* Massive Headline with burnt orange accent */}
          <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-black uppercase tracking-tight leading-[0.92] text-white">
            <span className="block whitespace-nowrap overflow-visible">
              <span
                className={`inline-block text-[#FF5712] transition-all duration-300 transform origin-left will-change-transform ${
                  isFlipping
                    ? 'opacity-0 -translate-y-3 scale-95'
                    : 'opacity-100 translate-y-0 scale-100'
                }`}
              >
                {words[wordIndex]}
              </span>{' '}
              IDEAS
            </span>
          </h1>

          {/* Strategic Paragraph Placement */}
          <div className="max-w-md sm:max-w-lg">
            <p className="text-xs sm:text-sm font-sans text-stone-300 font-light leading-relaxed">
              Some ideas need clarity. Others need character, movement, and a world of their own. I build identities, experiences, and visual systems that give ideas shape, voice, and life beyond the first thought.
            </p>
          </div>

          {/* Floating Keycap Buttons in Burnt Orange ('Start a project' & 'View portfolio') */}
          <div className="pt-2 sm:pt-4">
            <FloatingKeycaps
              onStartProject={onStartProject}
              onViewPortfolio={handleViewPortfolio}
            />
          </div>
        </div>
      </div>

      {/* Infinite Scroll Ticker Carousel along the bottom edge of the hero */}
      <div className="relative z-20 w-full border-t border-white/[0.08] bg-[#050505]/80 backdrop-blur-xs py-3.5 sm:py-4 overflow-hidden select-none">
        {/* Subtle horizontal edge feather gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#050505] to-transparent z-10" />

        {/* Continuous ticker track with seamless duplication */}
        <div className="animate-ticker-marquee flex items-center">
          {[...Array(4)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center shrink-0">
              {STATS.map((stat, idx) => (
                <div
                  key={`${setIdx}-${idx}`}
                  className="flex flex-col items-start justify-center px-8 sm:px-12 md:px-16 border-r border-white/[0.07] shrink-0 min-w-[180px] sm:min-w-[220px] opacity-75 hover:opacity-100 transition-opacity"
                >
                  <div className="flex items-baseline font-display font-extrabold text-xl sm:text-2xl lg:text-[2rem] text-white/90 tracking-tight leading-none">
                    <span>{stat.value}</span>
                    {stat.suffix && (
                      <span className="text-[#FF5712] text-base sm:text-lg font-medium ml-0.5">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <div className="font-sans text-[10px] sm:text-[11px] text-stone-400 font-normal tracking-wide whitespace-nowrap mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
