import React from 'react';
import { ArtworkVisual } from './ArtworkVisual';

interface AboutSectionProps {
  onOpenResume: () => void;
  onStartProject: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume, onStartProject }) => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-800/80">
      <div className="grid grid-cols-12 gap-8 md:gap-16 items-start">
        {/* Left Column: Visual Atelier / Portrait Plate */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="border border-stone-800 rounded-xs overflow-hidden shadow-2xl">
            <ArtworkVisual projectId="atelier-portrait" aspectRatio="aspect-[3/4]" />
          </div>

          <div className="p-6 bg-[#131417] border border-stone-800/80 rounded-xs space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-500 block">
              Founder Profile
            </span>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-stone-400">PRACTICE</span>
              <span className="text-stone-200">WONDA DESIGN STUDIOS</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-stone-400">FOCUS</span>
              <span className="text-stone-200">STRATEGY & MULTIDISCIPLINARY DESIGN</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-stone-400">APPROACH</span>
              <span className="text-stone-200">RESTRAINT & TACTILE DEPTH</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Essay & Biography */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-stone-500 block mb-3">
              About Wonderful Blessed
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-white leading-none">
              Design with Conviction.
            </h2>
          </div>

          <div className="space-y-6 text-base sm:text-lg font-sans text-stone-300 font-light leading-relaxed">
            <p>
              I am <strong className="font-normal text-white">Wonderful Blessed</strong>, a multidisciplinary designer and the founder of <strong className="font-normal text-white">Wonda Design Studios</strong>. My work operates across the threshold where strategic clarity meets tactile, uncompromising visual execution.
            </p>
            <p>
              Rather than confining design to a single medium, I build comprehensive brand worlds. That spans establishing foundational brand architecture, drafting packaging dielines that feel substantial in the hand, directing photography with architectural patience, designing fluid digital flagships, and choreographing kinetic motion systems.
            </p>
            <p>
              My philosophy favors restraint over decorative noise. Every typographical scale, hairline rule, substrate weight, and interaction curve is chosen with deliberate intention. The goal is to build visual identities that outlast fleeting aesthetic cycles and command enduring authority.
            </p>
          </div>

          {/* Direct Quote Plate */}
          <div className="p-8 bg-[#121316] border-l-2 border-[#c2a87e] border-y border-r border-stone-800/60 rounded-r-xs space-y-3">
            <p className="font-editorial italic text-xl sm:text-2xl text-stone-200 leading-snug">
              "True luxury in design is not ornamentation; it is the confidence to strip away everything superfluous until only pure form and essential meaning remain."
            </p>
            <span className="text-xs font-mono uppercase tracking-widest text-[#c2a87e] block">
              — Wonderful Blessed
            </span>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onOpenResume}
              className="px-5 py-2.5 bg-stone-900 border border-stone-700 text-xs font-mono uppercase tracking-widest text-white hover:border-white transition-colors"
            >
              View Full Résumé & Credentials
            </button>
            <button
              onClick={onStartProject}
              className="px-5 py-2.5 bg-white text-black text-xs font-mono uppercase tracking-widest hover:bg-[#c2a87e] hover:text-black transition-colors"
            >
              Start a Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
