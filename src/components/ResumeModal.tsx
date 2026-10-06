import React, { useEffect } from 'react';
import { STUDIO_INFO, EXPERIENCE_HISTORY, CAPABILITIES } from '../data/portfolioData';
import { X, Printer, Download, Mail } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartProject: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  onStartProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
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

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Wonderful Blessed Professional Résumé"
      className="fixed inset-0 z-50 bg-[#09090b]/95 backdrop-blur-md text-[#ededed] overflow-y-auto p-4 sm:p-8 md:p-12 animate-in fade-in duration-300"
    >
      <div className="max-w-4xl mx-auto bg-[#111215] border border-stone-800 rounded-sm shadow-2xl overflow-hidden print:bg-white print:text-black print:border-none print:shadow-none">
        {/* Sticky Actions Bar */}
        <div className="sticky top-0 z-20 bg-[#111215]/95 backdrop-blur-md border-b border-stone-800 p-4 sm:px-8 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c2a87e]">
              Curriculum Vitae
            </span>
            <span className="text-xs font-mono text-stone-500">/</span>
            <span className="text-xs font-mono text-stone-400">Wonderful Blessed</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-stone-900 border border-stone-700 hover:border-white text-stone-200 transition-colors rounded-xs"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#c2a87e]" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white transition-colors"
              aria-label="Close résumé modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Editorial Résumé Document */}
        <div className="p-6 sm:p-10 md:p-14 space-y-12 print:p-0">
          {/* Header */}
          <div className="border-b border-stone-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 print:border-stone-300">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-white print:text-black">
                {STUDIO_INFO.designerName}
              </h1>
              <p className="text-base font-editorial italic text-stone-300 mt-1 print:text-stone-700">
                {STUDIO_INFO.founderTitle} · {STUDIO_INFO.studioName}
              </p>
            </div>

            <div className="text-xs font-mono text-stone-400 space-y-1 print:text-stone-600">
              <div>Email: {STUDIO_INFO.email}</div>
              <div>Portfolio: wondadesign.com</div>
              <div>Focus: Visual Identity, Strategy, Web, Packaging & Motion</div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c2a87e] block">
              Professional Summary
            </span>
            <p className="text-sm font-sans text-stone-300 leading-relaxed max-w-3xl print:text-stone-800">
              Multidisciplinary design director and founder with a track record of conceptualizing and executing high-impact brand systems, bespoke web platforms, structural packaging, and kinetic identities. Adept at steering early-stage positioning workshops with executive stakeholders as well as delivering pixel-precise typography, industrial dielines, and production code directives.
            </p>
          </div>

          {/* Core Competencies Matrix */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c2a87e] block">
              Core Competencies & Scope
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {CAPABILITIES.map((cap) => (
                <div key={cap.number} className="p-4 bg-[#151619] border border-stone-800 rounded-xs print:bg-stone-50 print:border-stone-300">
                  <div className="text-xs font-mono text-white font-semibold mb-1 print:text-black">{cap.title}</div>
                  <div className="text-[11px] font-sans text-stone-400 print:text-stone-600 leading-snug">
                    {cap.disciplines.slice(0, 3).join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c2a87e] block">
              Leadership & Career History
            </span>

            <div className="space-y-8 divide-y divide-stone-800/60 print:divide-stone-200">
              {EXPERIENCE_HISTORY.map((item, idx) => (
                <div key={idx} className={`space-y-2.5 ${idx > 0 ? 'pt-6' : ''}`}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex items-baseline gap-2">
                      <h4 className="text-base font-display font-bold text-white uppercase print:text-black">
                        {item.role}
                      </h4>
                      <span className="text-xs font-mono text-[#c2a87e]">· {item.company}</span>
                    </div>
                    <span className="text-xs font-mono text-stone-400">{item.period}</span>
                  </div>

                  <p className="text-xs sm:text-sm font-sans text-stone-300 print:text-stone-700 leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="space-y-1 pt-1">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="text-xs font-sans text-stone-400 print:text-stone-600 flex items-start gap-2">
                        <span className="text-[#c2a87e] print:text-black">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical & Software Agility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-800 print:border-stone-300 text-xs font-mono">
            <div>
              <span className="text-stone-500 uppercase tracking-widest block mb-2">Design & Craft Tools</span>
              <p className="text-stone-300 print:text-stone-800">
                Figma, Adobe Creative Suite (Illustrator, InDesign, Photoshop, After Effects), Glyphs 3, Cinema 4D, Blender, Keyshot, Packaging CAD.
              </p>
            </div>
            <div>
              <span className="text-stone-500 uppercase tracking-widest block mb-2">Digital & Prototyping</span>
              <p className="text-stone-300 print:text-stone-800">
                Modern Web Standards, React/TypeScript Architecture, Tailwind CSS, Motion / GSAP, WebGL, Design Systems Tokens, WCAG AA Accessibility.
              </p>
            </div>
          </div>

          {/* Footer Callout */}
          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <span className="text-xs font-mono text-stone-400">
              AVAILABLE FOR SELECT COMMISSIONS & STRATEGIC ROLES
            </span>
            <button
              onClick={() => {
                onClose();
                onStartProject();
              }}
              className="px-5 py-2 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-[#c2a87e] transition-colors rounded-xs"
            >
              Initiate Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
