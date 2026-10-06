import React, { useEffect } from 'react';
import { STUDIO_INFO } from '../data/portfolioData';
import { X, ArrowUpRight, Copy, Check } from 'lucide-react';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

export const FullScreenMenu: React.FC<FullScreenMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenResume,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(STUDIO_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems = [
    { number: '01', label: 'Selected Work', target: 'work' },
    { number: '02', label: 'Capabilities', target: 'capabilities' },
    { number: '03', label: 'About Wonderful', target: 'about' },
    { number: '04', label: 'Experience & Résumé', target: 'experience' },
    { number: '05', label: 'Contact & Inquiry', target: 'contact' },
  ];

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 bg-[#0a0a0b] text-[#f4f3ef] flex flex-col justify-between p-6 md:p-12 lg:p-16 overflow-y-auto animate-in fade-in duration-300"
    >
      {/* Top Bar inside menu */}
      <div className="flex items-center justify-between border-b border-stone-800/80 pb-6">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-lg tracking-tight uppercase">
            {STUDIO_INFO.studioName}
          </span>
          <span className="text-xs font-mono text-stone-500">/</span>
          <span className="text-xs font-mono text-stone-400">Wonderful Blessed</span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-stone-400 hover:text-white transition-colors p-2"
          aria-label="Close menu"
        >
          <span>Close</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Menu Grid: Dominant navigation on left, editorial info on right */}
      <div className="grid grid-cols-12 gap-8 my-auto py-12">
        {/* Left Column: Massive Menu Links */}
        <nav className="col-span-12 lg:col-span-8 flex flex-col space-y-4 md:space-y-6">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => {
                onNavigate(item.target);
                onClose();
              }}
              className="group text-left flex items-baseline gap-4 md:gap-6 py-2 transition-transform duration-300 hover:translate-x-3"
            >
              <span className="text-xs md:text-sm font-mono text-stone-500 group-hover:text-[#c2a87e] transition-colors">
                {item.number}
              </span>
              <span className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-stone-200 group-hover:text-white transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Right Column: Secondary Information & Contacts */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-between space-y-8 lg:border-l lg:border-stone-800/80 lg:pl-12">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-500 block mb-2">
                Creative Practice
              </span>
              <p className="text-sm font-sans text-stone-300 leading-relaxed">
                Multidisciplinary studio crafting visual identity systems, brand strategy, editorial art direction, packaging, web design, and motion design.
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-500 block mb-2">
                Availability
              </span>
              <p className="text-xs font-mono text-[#c2a87e]">
                {STUDIO_INFO.availability}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-500 block mb-2">
                Inquiries & Direct Dialogue
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  className="text-sm font-sans text-white hover:text-[#c2a87e] transition-colors underline underline-offset-4"
                >
                  {STUDIO_INFO.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-stone-800/80">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-500 block">
              Channels & Connect
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono uppercase tracking-wider">
              <a
                href={STUDIO_INFO.socials.behance}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 bg-stone-900/60 border border-stone-800 rounded-xs hover:border-stone-600 hover:text-white transition-colors"
              >
                <span>Behance</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={STUDIO_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 bg-stone-900/60 border border-stone-800 rounded-xs hover:border-stone-600 hover:text-white transition-colors"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={STUDIO_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 bg-stone-900/60 border border-stone-800 rounded-xs hover:border-stone-600 hover:text-white transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={STUDIO_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 bg-stone-900/60 border border-stone-800 rounded-xs hover:border-emerald-600 hover:text-emerald-400 transition-colors"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenResume();
                }}
                className="w-full py-3 px-4 border border-stone-700 text-stone-200 hover:text-white hover:border-white text-xs font-mono tracking-widest uppercase transition-colors text-center block"
              >
                View Professional Résumé
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-stone-800/80 text-[10px] font-mono text-stone-500 gap-2">
        <div>© 2026 WONDA DESIGN STUDIOS · WONDERFUL BLESSED</div>
        <div>EDITORIAL PORTFOLIO EDITION</div>
      </div>
    </div>
  );
};
