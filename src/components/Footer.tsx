import React, { useState, useEffect } from 'react';
import { getStudioSettings, DEFAULT_SETTINGS, StudioSettings } from '../lib/cmsContentQueries';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenResume }) => {
  const [settings, setSettings] = useState<StudioSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    let isMounted = true;
    getStudioSettings().then((res) => {
      if (isMounted) setSettings(res);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-800/80 bg-[#09090b] text-stone-400 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tight text-white block">
              {settings.studioName}
            </span>
            <p className="text-sm font-editorial italic text-stone-300 mt-1">
              Personal Portfolio of {settings.designerName} · {settings.founderTitle}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-widest text-stone-400">
            <button
              onClick={() => onNavigate('work')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Work
            </button>
            <button
              onClick={() => onNavigate('capabilities')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Capabilities
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('experience')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Experience
            </button>
            <button
              onClick={onOpenResume}
              className="hover:text-white transition-colors text-[#c2a87e] cursor-pointer"
            >
              Résumé
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Bottom copyright and back-to-top */}
        <div className="pt-8 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-stone-500">
          <div>
            © {new Date().getFullYear()} {settings.studioName}. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span>MULTIDISCIPLINARY BRAND & DIGITAL DESIGN</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
