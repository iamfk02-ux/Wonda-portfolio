import React, { useState, useEffect } from 'react';
import { STUDIO_INFO } from '../data/portfolioData';

interface HeaderProps {
  onOpenMenu: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0c0c0d]/90 backdrop-blur-md border-b border-stone-800/80 py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-left font-display text-base md:text-lg font-bold tracking-tight text-white hover:text-stone-300 transition-colors uppercase whitespace-nowrap"
          aria-label="Wonda Design Studios Homepage"
        >
          {STUDIO_INFO.studioName}
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-stone-400">
          <button
            onClick={() => onNavigate('work')}
            className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Work
          </button>
          <button
            onClick={() => onNavigate('capabilities')}
            className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Capabilities
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            About
          </button>
          <button
            onClick={() => onNavigate('experience')}
            className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Experience
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-mono tracking-wider uppercase text-white bg-stone-900 border border-stone-700 hover:border-white rounded-xs transition-colors whitespace-nowrap"
          >
            Start a Project
          </button>

          <button
            onClick={onOpenMenu}
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-mono tracking-widest uppercase text-stone-200 hover:text-white border border-stone-800 hover:border-stone-600 rounded-xs transition-colors group"
            aria-label="Open Fullscreen Navigation Menu"
          >
            <span>Menu</span>
            <div className="flex flex-col gap-1 w-3.5">
              <span className="w-full h-[1px] bg-stone-300 group-hover:bg-white transition-colors" />
              <span className="w-2.5 h-[1px] bg-stone-300 group-hover:w-full group-hover:bg-white transition-all" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
