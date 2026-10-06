import React from 'react';

export const RedTypographicMask: React.FC = () => {
  return (
    <section className="bg-[#050505] py-24 md:py-36 px-6 md:px-12 border-t border-white/5 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="text-xs font-mono text-stone-500 uppercase tracking-widest">
          03 // Creative Conviction
        </div>
        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-[#FF5712] leading-[0.92]">
          Fourteen years. <br />
          What staved off the noise.
        </h2>
      </div>
    </section>
  );
};
