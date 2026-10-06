import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WondaMark } from './WondaMark';

export const SiteNavigation: React.FC = () => {
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const pathname = location.pathname;

  // Determine active route
  let activeNav = 'home';
  if (pathname === '/work' || pathname.startsWith('/work/')) {
    activeNav = 'work';
  } else if (pathname === '/about') {
    activeNav = 'about';
  } else if (pathname === '/contact') {
    activeNav = 'contact';
  }

  // The item currently underlined (hover takes precedence, falls back to active route)
  const currentHighlighted = hoveredNav !== null ? hoveredNav : activeNav;

  // Dynamic scroll detector: inverts between light and dark mode based on background under navbar
  useEffect(() => {
    const checkBackground = () => {
      setIsScrolled(window.scrollY > 20);

      // On non-home pages:
      if (!isHome) {
        // Check if navbar is scrolled down over the dark footer
        const footerEl = document.getElementById('footer-cta');
        if (footerEl) {
          const rFoot = footerEl.getBoundingClientRect();
          if (rFoot.top <= 50) {
            setIsDarkBg(true);
            return;
          }
        }

        setIsDarkBg(false);
        return;
      }

      const navY = 40; // center height of navbar
      const footerEl = document.getElementById('footer-cta');

      // The only dark section is the Footer CTA
      if (footerEl) {
        const rFoot = footerEl.getBoundingClientRect();
        if (rFoot.top <= navY) {
          setIsDarkBg(true);
          return;
        }
      }

      // Other content sections (Hero, About, Selected Work, What I Do) are light mode
      setIsDarkBg(false);
    };

    checkBackground();
    window.addEventListener('scroll', checkBackground, { passive: true });
    window.addEventListener('resize', checkBackground, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkBackground);
      window.removeEventListener('resize', checkBackground);
    };
  }, [isHome]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 w-full transition-all duration-300 select-none ${
        isScrolled
          ? isDarkBg
            ? 'bg-[#111111]/85 backdrop-blur-md'
            : 'bg-white/85 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1540px] mx-auto h-full px-5 sm:px-8 md:px-12 lg:px-14 xl:px-16 flex items-center justify-between">
        
        {/* Left: Logo with icon changed to all red & 'Studios' text placed closer */}
        <div className="shrink-0 flex items-center">
          <Link
            to="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center group cursor-pointer"
            aria-label="Wonda Design Studios Home"
          >
            {/* Logo icon changed to all red (#F05245) with Studios text removed */}
            <WondaMark
              className="h-4.5 sm:h-5 w-auto group-hover:scale-105 transition-transform"
              color="#F05245"
              slashColor="#F05245"
            />
          </Link>
        </div>

        {/* Center: Navigation Links with Tight Red Underline */}
        <nav
          role="navigation"
          aria-label="Main Navigation"
          onMouseLeave={() => setHoveredNav(null)}
          className="flex items-center gap-5 sm:gap-6 md:gap-8"
        >
          {/* Home Link */}
          <Link
            to="/"
            onMouseEnter={() => setHoveredNav('home')}
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`relative py-0.5 inline-flex items-center font-sans text-[13px] sm:text-[14px] md:text-[15px] font-medium transition-colors duration-200 ${
              currentHighlighted === 'home'
                ? isDarkBg
                  ? 'text-white'
                  : 'text-[#111111]'
                : isDarkBg
                ? 'text-white/60 hover:text-white'
                : 'text-[#111111]/70 hover:text-[#111111]'
            }`}
          >
            <span>Home</span>
            {currentHighlighted === 'home' && (
              <motion.span
                layoutId="navActiveUnderline"
                className="absolute left-0 bottom-0 w-full h-[1.5px] bg-[#F05245] rounded-full"
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 32,
                }}
              />
            )}
          </Link>

          {/* Work Link */}
          <Link
            to="/#selected-work"
            onMouseEnter={() => setHoveredNav('work')}
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                const el = document.getElementById('selected-work');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            className={`relative py-0.5 inline-flex items-center font-sans text-[13px] sm:text-[14px] md:text-[15px] font-medium transition-colors duration-200 ${
              currentHighlighted === 'work'
                ? isDarkBg
                  ? 'text-white'
                  : 'text-[#111111]'
                : isDarkBg
                ? 'text-white/60 hover:text-white'
                : 'text-[#111111]/70 hover:text-[#111111]'
            }`}
          >
            <span>Work</span>
            {currentHighlighted === 'work' && (
              <motion.span
                layoutId="navActiveUnderline"
                className="absolute left-0 bottom-0 w-full h-[1.5px] bg-[#F05245] rounded-full"
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 32,
                }}
              />
            )}
          </Link>

          {/* About Link */}
          <Link
            to="/#about"
            onMouseEnter={() => setHoveredNav('about')}
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                const el = document.getElementById('about');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            className={`relative py-0.5 inline-flex items-center font-sans text-[13px] sm:text-[14px] md:text-[15px] font-medium transition-colors duration-200 ${
              currentHighlighted === 'about'
                ? isDarkBg
                  ? 'text-white'
                  : 'text-[#111111]'
                : isDarkBg
                ? 'text-white/60 hover:text-white'
                : 'text-[#111111]/70 hover:text-[#111111]'
            }`}
          >
            <span>About</span>
            {currentHighlighted === 'about' && (
              <motion.span
                layoutId="navActiveUnderline"
                className="absolute left-0 bottom-0 w-full h-[1.5px] bg-[#F05245] rounded-full"
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 32,
                }}
              />
            )}
          </Link>
        </nav>

        {/* Right: Get in touch */}
        <div
          className="shrink-0 flex items-center"
          onMouseLeave={() => setHoveredNav(null)}
        >
          <Link
            to="/contact"
            onMouseEnter={() => setHoveredNav('contact')}
            className={`relative py-0.5 inline-flex items-center font-sans text-[13px] sm:text-[14px] md:text-[15px] font-medium transition-colors duration-200 ${
              currentHighlighted === 'contact'
                ? isDarkBg
                  ? 'text-white'
                  : 'text-[#111111]'
                : isDarkBg
                ? 'text-white/80 hover:text-white'
                : 'text-[#111111]/80 hover:text-[#111111]'
            }`}
          >
            <span>Get in touch</span>
            {currentHighlighted === 'contact' && (
              <motion.span
                layoutId="navActiveUnderline"
                className="absolute left-0 bottom-0 w-full h-[1.5px] bg-[#F05245] rounded-full"
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 32,
                }}
              />
            )}
          </Link>
        </div>

      </div>
    </header>
  );
};

export default SiteNavigation;
