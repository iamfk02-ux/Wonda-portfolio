import React, { useEffect, useState } from 'react';
import { X, ArrowUpRight, Download, Mail } from 'lucide-react';
import { getStudioSettings, DEFAULT_SETTINGS, StudioSettings } from '../lib/cmsContentQueries';
import { EXPERIENCE_HISTORY } from '../data/portfolioData';

interface DedicatedCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartProject: () => void;
}

export const DedicatedCVModal: React.FC<DedicatedCVModalProps> = ({
  isOpen,
  onClose,
  onStartProject,
}) => {
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Curriculum Vitae — Wonderful Blessed"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#FFFFFF] text-[#111111]"
    >
      {/* Top Bar with Minimal Header & Close Affordance */}
      <header className="sticky top-0 z-20 w-full bg-[#FFFFFF]/90 backdrop-blur-md border-b border-black/[0.08] px-6 sm:px-10 md:px-14 lg:px-16 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs font-mono text-black/60">
          <span className="text-[#F05245]">// CV</span>
          <span>{settings.studioName}</span>
        </div>

        <button
          onClick={onClose}
          className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-black/70 hover:text-black transition-colors cursor-pointer"
        >
          <span>Close</span>
          <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
        </button>
      </header>

      {/* Main Editorial CV Body */}
      <main className="w-full max-w-[1040px] mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-20">
        
        {/* Header Block */}
        <section className="space-y-4 border-b border-black/[0.08] pb-12">
          <div className="text-xs font-mono text-[#F05245] tracking-widest uppercase">
            Curriculum Vitae
          </div>
          <h1 className="font-grotesk text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111111]">
            {settings.designerName}
          </h1>
          <p className="text-lg sm:text-xl font-normal text-[#52525B] max-w-xl">
            {settings.founderTitle}. Founder of {settings.studioName}.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-black/60">
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center gap-1.5 hover:text-black transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#F05245]" />
              <span>{settings.email}</span>
            </a>
            <span>·</span>
            <a
              href={settings.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-black transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#F05245]" />
            </a>
            <span>·</span>
            <a
              href={settings.resumeUrl || '/WonderfulB-CV-2026.pdf'}
              download
              className="inline-flex items-center gap-1.5 text-[#F05245] hover:text-black transition-colors cursor-pointer font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Résumé</span>
            </a>
          </div>
        </section>

        {/* Experience Section */}
        <section className="space-y-10">
          <div className="text-xs font-mono text-[#F05245] tracking-widest uppercase">
            // Selected Experience
          </div>

          <div className="divide-y divide-black/10">
            {EXPERIENCE_HISTORY.map((item, idx) => (
              <div key={idx} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                <div className="md:col-span-3 font-mono text-xs sm:text-sm text-black/50 tabular-nums">
                  {item.period}
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-grotesk font-bold text-lg sm:text-xl text-[#111111]">
                    {item.role}
                  </h3>
                  <div className="text-sm text-[#F05245] font-medium">
                    {item.company}
                  </div>
                </div>
                <div className="md:col-span-5 text-sm text-[#52525B] leading-relaxed">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Action */}
        <section className="pt-8 border-t border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-xs font-mono text-black/50 uppercase tracking-wider">
            {settings.availability}
          </div>

          <button
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="px-6 py-3 bg-[#F05245] hover:bg-[#d94438] text-white font-grotesk font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </section>

      </main>
    </div>
  );
};

export default DedicatedCVModal;
