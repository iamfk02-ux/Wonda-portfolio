import React from 'react';
import { CAPABILITIES } from '../data/portfolioData';

interface StackedCapabilitiesProps {
  onStartProject: () => void;
}

export const StackedCapabilities: React.FC<StackedCapabilitiesProps> = ({ onStartProject }) => {
  return (
    <section id="capabilities" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-800/80">
      {/* Editorial Section Header */}
      <div className="pb-16 border-b border-stone-800/80 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-stone-500 block mb-3">
            Creative Disciplines
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-white leading-none">
            Capabilities
          </h2>
        </div>
        <p className="max-w-md text-sm font-sans text-stone-400 leading-relaxed">
          Disciplines operating as an interconnected creative ecosystem — from foundational brand strategy to tactile packaging and kinetic digital environments.
        </p>
      </div>

      {/* Stacked Cards Container:
          Each card uses sticky positioning with incremental top offsets so that as the user scrolls down,
          each card smoothly locks and the next one layers over it, creating an elegant architectural stacked depth. */}
      <div className="relative pt-12 space-y-12 md:space-y-16">
        {CAPABILITIES.map((cap, index) => {
          // Dynamic sticky top offset to create stacked tiered effect on scroll
          const stickyTop = 100 + index * 24;

          return (
            <div
              key={cap.number}
              style={{ top: `${stickyTop}px` }}
              className="sticky transition-all duration-300 rounded-sm border border-stone-800 bg-[#111215] shadow-[0_-8px_30px_rgba(0,0,0,0.6)] p-8 md:p-12 overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-stone-800/80 pb-6 mb-8">
                <div className="flex items-baseline gap-4">
                  <span className="text-sm md:text-base font-mono text-[#c2a87e]">
                    {cap.number}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-white">
                    {cap.title}
                  </h3>
                </div>

                <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
                  Wonda Studio Capability
                </span>
              </div>

              {/* Card Body Grid */}
              <div className="grid grid-cols-12 gap-8 items-start">
                <div className="col-span-12 lg:col-span-6 space-y-4">
                  <p className="font-editorial italic text-lg sm:text-xl text-stone-200 leading-snug">
                    "{cap.subtitle}"
                  </p>
                  <p className="text-sm font-sans text-stone-400 leading-relaxed">
                    {cap.summary}
                  </p>
                  <div className="pt-2 text-xs font-mono text-[#c2a87e] border-l-2 border-[#c2a87e]/40 pl-3">
                    {cap.highlightMetric}
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:border-l lg:border-stone-800/80 lg:pl-8">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-500 block">
                      Core Disciplines
                    </span>
                    <ul className="space-y-1.5 text-xs font-sans text-stone-300">
                      {cap.disciplines.map((d, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-stone-500 rounded-full" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-500 block">
                      Deliverables
                    </span>
                    <ul className="space-y-1.5 text-xs font-sans text-stone-300">
                      {cap.deliverables.map((del, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-[#c2a87e] rounded-full" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Capabilities CTA transition to contact */}
      <div className="pt-16 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-stone-800/80">
        <div className="text-xs font-mono text-stone-400">
          NEED A CUSTOM COMBINATION OF DISCIPLINES?
        </div>
        <button
          onClick={onStartProject}
          className="text-xs font-mono uppercase tracking-widest text-white border-b border-[#c2a87e] pb-1 hover:text-[#c2a87e] transition-colors"
        >
          Discuss Your Scope with Wonderful →
        </button>
      </div>
    </section>
  );
};
