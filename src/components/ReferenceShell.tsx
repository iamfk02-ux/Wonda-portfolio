import React, { useState } from 'react';
import { STUDIO_INFO } from '../data/portfolioData';
import { WondaLogo } from './WondaLogo';
import { ArrowUpRight, X } from 'lucide-react';

interface ReferenceShellProps {
  onStartProject: () => void;
  onOpenResume: () => void;
}

export const ReferenceShell: React.FC<ReferenceShellProps> = ({
  onStartProject,
  onOpenResume,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Navigation: Only the menu icon in the top right, matching the reference image layout */}
      <div className="fixed top-5 right-5 sm:top-7 sm:right-8 md:top-8 md:right-10 z-50 pointer-events-auto">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-11 h-11 flex flex-col items-end justify-center gap-1.5 p-2 focus:outline-none group cursor-pointer bg-black/30 backdrop-blur-sm rounded-sm hover:bg-black/50 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`h-[2px] bg-[#FF5712] transition-all duration-300 ${
              menuOpen ? 'w-6 rotate-45 translate-y-[5px]' : 'w-6 group-hover:w-7'
            }`}
          />
          <span
            className={`h-[2px] bg-[#FF5712] transition-all duration-300 ${
              menuOpen ? 'w-6 -rotate-45 -translate-y-[3px]' : 'w-4 group-hover:w-6'
            }`}
          />
        </button>
      </div>

      {/* Brutalist Minimalist Fullscreen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505] text-white flex flex-col justify-between p-8 md:p-16 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <button
              onClick={() => {
                setMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="focus:outline-none"
            >
              <WondaLogo size="sm" />
            </button>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-stone-400 hover:text-white p-2"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="my-auto space-y-6">
            <button
              onClick={() => scrollTo('hero')}
              className="block text-4xl sm:text-6xl font-display font-extrabold uppercase hover:text-[#FF5712] transition-colors text-left"
            >
              01 // Index
            </button>
            <button
              onClick={() => scrollTo('statement')}
              className="block text-4xl sm:text-6xl font-display font-extrabold uppercase hover:text-[#FF5712] transition-colors text-left"
            >
              02 // About
            </button>
            <button
              onClick={() => scrollTo('circuit')}
              className="block text-4xl sm:text-6xl font-display font-extrabold uppercase hover:text-[#FF5712] transition-colors text-left"
            >
              03 // What I Do
            </button>
            <button
              onClick={() => scrollTo('visual-slide')}
              className="block text-4xl sm:text-6xl font-display font-extrabold uppercase hover:text-[#FF5712] transition-colors text-left"
            >
              04 // Work
            </button>
            <button
              onClick={() => scrollTo('closer')}
              className="block text-4xl sm:text-6xl font-display font-extrabold uppercase text-[#FF5712] text-left"
            >
              05 // Contact
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs font-mono text-stone-500">
            <div>INDEX // ARCHIVE</div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenResume();
                }}
                className="text-stone-300 hover:text-white underline underline-offset-4"
              >
                Curriculum Vitae
              </button>
              <a
                href={STUDIO_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="text-[#FF5712] hover:underline"
              >
                WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
