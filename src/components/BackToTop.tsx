import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      // Find the second section: #intro
      const introEl = document.getElementById('intro');
      if (introEl) {
        const introBottom = introEl.getBoundingClientRect().bottom;
        // Appears only after the user has scrolled past the second section (when #intro bottom is above viewport)
        setIsVisible(introBottom <= 80);
      } else {
        // Fallback: scrolled past 1.6 viewports
        setIsVisible(window.scrollY > window.innerHeight * 1.6);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-6 left-6 sm:bottom-8 sm:left-10 z-40 transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#161719]/90 hover:bg-[#F05245] text-white/90 hover:text-white backdrop-blur-md border border-white/15 hover:border-[#F05245] font-mono text-[12px] tracking-wider uppercase shadow-xl transition-all duration-300 cursor-pointer select-none"
        aria-label="Back to top"
      >
        <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
        <span>Top</span>
      </button>
    </div>
  );
};
