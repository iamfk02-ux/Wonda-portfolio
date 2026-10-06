import React from 'react';

export const MinimalStatement: React.FC = () => {
  return (
    <section
      id="statement"
      className="min-h-[85vh] bg-[#050505] flex items-center px-6 md:px-16 lg:px-24 py-24 border-t border-white/5"
    >
      <div className="max-w-4xl space-y-8">
        <div className="text-xs font-mono text-[#FF5712] uppercase tracking-widest">
          01 // Manifesto
        </div>

        <p className="font-sans text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.25]">
          One studio, no templates but essential form. Brand systems that have no business looking this refined, and founders who know great craft. Wonda is the multidisciplinary practice of Wonderful Blessed.
        </p>
      </div>
    </section>
  );
};
