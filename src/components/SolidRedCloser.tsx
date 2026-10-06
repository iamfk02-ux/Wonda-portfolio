import React, { useState } from 'react';
import { STUDIO_INFO } from '../data/portfolioData';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

interface SolidRedCloserProps {
  onStartProject: () => void;
  onOpenResume: () => void;
}

export const SolidRedCloser: React.FC<SolidRedCloserProps> = ({
  onStartProject,
  onOpenResume,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(STUDIO_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="closer"
      className="min-h-screen bg-[#FF5712] text-black flex flex-col justify-between p-6 md:p-16 lg:p-20 select-none relative"
    >
      {/* Top Meta */}
      <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-black/80">
        <span>05 // INITIATE</span>
      </div>

      {/* Main Massive Editorial Text (High contrast black on #FF5712 burnt orange) */}
      <div className="my-auto py-12 max-w-5xl space-y-8">
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.95] text-black">
          No templates, no pitch decks, no filler. <br />
          Someone who knows great work told you where. Pull up.
        </h2>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button
            onClick={onStartProject}
            className="px-6 py-3.5 bg-black text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors flex items-center gap-2 shadow-lg"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-4 h-4 text-[#FF5712]" />
          </button>

          <button
            onClick={handleCopyEmail}
            className="px-6 py-3.5 bg-black/10 hover:bg-black/20 text-black font-mono text-xs uppercase tracking-wider rounded-xs border border-black/30 transition-colors flex items-center gap-2"
          >
            <span>{STUDIO_INFO.email}</span>
            {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <a
            href={STUDIO_INFO.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 bg-black/10 hover:bg-black/20 text-black font-mono text-xs uppercase tracking-wider rounded-xs border border-black/30 transition-colors flex items-center gap-2"
          >
            <span>WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="pt-8 border-t border-black/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-black/80">
        <div>
          Wonda. — multidisciplinary design practice of Wonderful Blessed ©2026
        </div>

        <div className="flex flex-wrap items-center gap-6 text-black font-semibold">
          <a
            href={STUDIO_INFO.socials.behance}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Behance
          </a>
          <a
            href={STUDIO_INFO.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Instagram
          </a>
          <a
            href={STUDIO_INFO.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <button
            onClick={onOpenResume}
            className="hover:underline"
          >
            Résumé
          </button>
        </div>
      </div>
    </section>
  );
};
