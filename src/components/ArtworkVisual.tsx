import React from 'react';

interface ArtworkVisualProps {
  projectId: string;
  className?: string;
  variant?: 'hero' | 'thumbnail' | 'detail' | 'card' | 'expanded';
  aspectRatio?: string;
}

export const ArtworkVisual: React.FC<ArtworkVisualProps> = ({
  projectId,
  className = '',
  variant = 'card',
  aspectRatio = 'aspect-[16/10]'
}) => {
  switch (projectId) {
    case 'lumina-botanique':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#1c1915] via-[#12110e] to-[#0a0908] select-none ${aspectRatio} ${className}`}>
          {/* Subtle noise and radial warmth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(194,168,126,0.18),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,rgba(58,63,54,0.22),transparent_60%)]" />

          {/* Architectural travertine pedestal */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-gradient-to-t from-[#2a2620] to-[#1c1915] rounded-t-sm border-t border-[#c2a87e]/25 opacity-70" />

          {/* Frosted Glass Luxury Flacon Graphic */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="relative flex flex-col items-center">
              {/* Bottle Cap */}
              <div className="w-16 h-8 bg-gradient-to-b from-[#2e2a24] to-[#1a1713] rounded-t-sm border border-[#c2a87e]/40 shadow-2xl flex items-center justify-center">
                <span className="text-[7px] uppercase tracking-[0.3em] font-mono text-[#c2a87e]/80">N° 07</span>
              </div>
              {/* Bottle Neck */}
              <div className="w-8 h-4 bg-[#23201a] border-x border-[#c2a87e]/30" />
              {/* Bottle Shoulder & Body */}
              <div className="w-52 h-64 md:w-64 md:h-76 bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-black/60 backdrop-blur-md rounded-b-md border border-white/20 shadow-2xl relative overflow-hidden flex flex-col items-center justify-between p-6">
                {/* Glass reflections */}
                <div className="absolute top-0 left-4 w-2 h-full bg-gradient-to-b from-white/30 via-white/10 to-transparent blur-[1px]" />
                <div className="absolute top-0 right-4 w-1 h-full bg-gradient-to-b from-white/20 to-transparent" />

                {/* Inner Botanical Specimen Silhouette */}
                <div className="absolute inset-0 flex items-center justify-center opacity-25">
                  <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-[#c2a87e]" fill="none" strokeWidth="0.75">
                    <path d="M50 85 V 15 M50 30 Q35 25 30 35 Q40 45 50 40 M50 45 Q65 40 70 50 Q60 60 50 55 M50 60 Q30 55 25 68 Q40 75 50 70" />
                  </svg>
                </div>

                {/* Blind-debossed label plaque */}
                <div className="w-full bg-[#f4ede2] text-[#1c1915] p-4 rounded-xs shadow-lg flex flex-col items-center justify-center border border-[#e0d6c4] text-center my-auto z-10 transition-transform duration-700 group-hover:scale-105">
                  <span className="text-[8px] uppercase tracking-[0.25em] font-mono text-stone-500 mb-1">Extrait De Parfum</span>
                  <h4 className="font-editorial text-2xl md:text-3xl italic tracking-tight font-normal text-stone-900 leading-none">
                    Lumina Botanique
                  </h4>
                  <div className="w-8 h-[1px] bg-[#c2a87e] my-2" />
                  <span className="text-[7px] uppercase tracking-[0.2em] font-sans text-stone-600">
                    Vetiver · Hinoki · Ambergris
                  </span>
                  <span className="text-[6px] font-mono text-stone-400 mt-1">100 ML — 3.4 FL. OZ.</span>
                </div>

                {/* Bottle base mark */}
                <div className="w-full flex justify-between items-center text-[7px] font-mono text-[#c2a87e]/60 tracking-wider">
                  <span>LOT 25-08B</span>
                  <span>WONDA STUDIOS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial corner coordinates */}
          <div className="absolute top-5 left-6 text-[10px] font-mono tracking-widest text-[#c2a87e]/70 uppercase">
            Specimen 01 // Fragrance Architecture
          </div>
          <div className="absolute bottom-5 right-6 text-[10px] font-mono tracking-widest text-stone-400 uppercase">
            Artisan Packaging System
          </div>
        </div>
      );

    case 'kronos-spatial':
      return (
        <div className={`relative overflow-hidden bg-[#0d0e11] select-none ${aspectRatio} ${className}`}>
          {/* Subtle architectural grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />

          {/* Monolithic structural mockup view */}
          <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
            <div className="w-full max-w-xl h-full border border-stone-800 bg-[#121417]/90 rounded-sm p-6 flex flex-col justify-between relative shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              {/* Browser/Viewport header */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 text-[10px] font-mono text-stone-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-stone-700" />
                  <span className="tracking-widest uppercase text-stone-300">kronos-spatial.arch</span>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-stone-500">
                  <span>SCALE: 1:100</span>
                  <span>LAT 45.4642° N</span>
                </div>
              </div>

              {/* Monolithic center blueprint visualization */}
              <div className="my-auto py-6 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-12 sm:col-span-7 space-y-3">
                  <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-stone-400 block">
                    PROJECT MONOLITH // PHASE IV
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
                    Raw Concrete & Pure Void.
                  </h3>
                  <p className="text-xs text-stone-400 font-sans leading-relaxed">
                    Sculptural brutalist residence carved into volcanic basalt, framing uninterrupted coastal light.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-5 relative h-36 border border-stone-700 bg-black/40 overflow-hidden flex items-center justify-center">
                  {/* Isometric wireframe representation */}
                  <svg viewBox="0 0 120 120" className="w-28 h-28 stroke-stone-300 fill-none stroke-[0.8] opacity-80">
                    <polygon points="60,20 100,42 60,65 20,42" />
                    <polygon points="20,42 60,65 60,105 20,82" />
                    <polygon points="60,65 100,42 100,82 60,105" />
                    <line x1="60" y1="20" x2="60" y2="65" strokeDasharray="2,2" stroke="#787f86" />
                    <line x1="20" y1="42" x2="100" y2="42" strokeDasharray="1,2" stroke="#787f86" />
                  </svg>
                  <div className="absolute bottom-2 right-2 text-[8px] font-mono text-stone-500">AXONOMETRIC</div>
                </div>
              </div>

              {/* Viewport footer */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-800/80 text-[9px] font-mono text-stone-500">
                <span>GRID SYSTEM: 12-COL ASYMMETRIC</span>
                <span className="text-stone-300">INTERACTIVE BLUEPRINT →</span>
              </div>
            </div>
          </div>

          <div className="absolute top-5 right-6 text-[10px] font-mono tracking-widest text-stone-500 uppercase">
            System 02 // Web Architecture
          </div>
        </div>
      );

    case 'solis-atelier':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#1c1410] via-[#140e0b] to-[#0a0705] select-none ${aspectRatio} ${className}`}>
          {/* Warm earth glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,122,82,0.18),transparent_70%)]" />
          
          {/* Ceramic tactile plate and packaging preview */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="relative flex items-center justify-center w-full max-w-lg">
              {/* Ceramic stoneware silhouette */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-[#1f1a17] via-[#2d2520] to-[#3d322b] shadow-2xl border border-[#c97a52]/30 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                {/* Clay rings */}
                <div className="w-36 h-36 rounded-full border border-[#c97a52]/20 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-[#c97a52]/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#c97a52]/15 border border-[#c97a52]/40 flex items-center justify-center">
                      <span className="font-editorial italic text-lg text-[#e6b9a2]">S</span>
                    </div>
                  </div>
                </div>
                {/* Glaze texture speckles */}
                <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(circle_at_40%_30%,#fff_1px,transparent_1px)] bg-[size:12px_12px]" />
              </div>

              {/* Offset Kraft Box with Letterpressed band */}
              <div className="absolute -bottom-4 -right-2 md:right-4 w-44 md:w-52 bg-[#d6c7b2] text-[#1c1917] p-4 shadow-2xl rounded-xs border border-[#b8a78e] transform rotate-3 transition-transform duration-700 group-hover:rotate-0">
                <div className="border border-[#1c1917]/20 p-3 space-y-2">
                  <div className="flex justify-between items-center text-[7px] font-mono tracking-widest text-[#1c1917]/70 uppercase">
                    <span>EDITION 1/50</span>
                    <span>WOOD-FIRED</span>
                  </div>
                  <h4 className="font-editorial text-lg text-[#1c1917] italic font-semibold leading-tight">
                    Solis Stoneware
                  </h4>
                  <p className="text-[8px] font-sans text-[#1c1917]/80 leading-normal">
                    Fired at 1300°C with natural mountain pine ash. Unrepeatable surface.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-5 left-6 text-[10px] font-mono tracking-widest text-[#c97a52]/80 uppercase">
            Collection 03 // Tactile Packaging & Identity
          </div>
          <div className="absolute bottom-5 left-6 text-[10px] font-mono tracking-widest text-stone-500 uppercase">
            Artisan Stoneware System
          </div>
        </div>
      );

    case 'the-nelo-okeke-foundation':
    case 'hyperion-biennial':
      return (
        <div className={`relative overflow-hidden bg-[#07090e] select-none ${aspectRatio} ${className}`}>
          {/* Cobalt kinetic vectors */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.22),transparent_70%)]" />
          
          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
            {/* Kinetic header ticker */}
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-blue-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                BRAND IDENTITY
              </span>
              <span>FOUNDATION 2025</span>
            </div>

            {/* Kinetic Typography Poster Graphic */}
            <div className="my-auto space-y-1">
              <div className="overflow-hidden">
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase text-white tracking-tighter transform transition-transform duration-700 group-hover:translate-x-3">
                  NELO OKEKE
                </h3>
              </div>
              <div className="overflow-hidden flex items-center gap-4">
                <div className="h-[2px] flex-1 bg-gradient-to-r from-blue-500 to-transparent" />
                <span className="font-editorial italic text-2xl md:text-4xl text-blue-200">Outreach & Impact</span>
              </div>
              <div className="overflow-hidden">
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase text-transparent stroke-white stroke-[1px] tracking-tighter transform transition-transform duration-700 group-hover:-translate-x-3" style={{ WebkitTextStroke: '1px #94a3b8' }}>
                  FOUNDATION
                </h3>
              </div>
            </div>

            {/* Kinetic footer metrics */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-blue-900/40 text-[9px] font-mono text-slate-400">
              <div>60 ARTISTS / 14 PAVILIONS</div>
              <div className="text-center">GENERATIVE TYPOGRAPHY ENGINE</div>
              <div className="text-right text-blue-400 font-semibold">VIEW MOTION REEL →</div>
            </div>
          </div>

          <div className="absolute top-5 right-6 text-[10px] font-mono tracking-widest text-blue-400 uppercase">
            Kinetic System 04
          </div>
        </div>
      );

    case 'verve-monograph':
      return (
        <div className={`relative overflow-hidden bg-[#0e0e10] select-none ${aspectRatio} ${className}`}>
          {/* Subtle grid and silver highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,212,216,0.12),transparent_60%)]" />

          {/* Clothbound Book & Double-Spread Layout */}
          <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
            <div className="relative w-full max-w-xl aspect-[16/10] bg-[#17171a] border border-stone-700 shadow-2xl p-4 flex transition-transform duration-700 group-hover:scale-[1.02]">
              {/* Book Spine Shadow */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-r from-black/60 via-black/80 to-black/60 z-20" />

              {/* Left Page: Monograph Architectural Photo Plate */}
              <div className="w-1/2 h-full bg-[#111113] p-4 flex flex-col justify-between border-r border-stone-800/80">
                <div className="text-[7px] font-mono text-stone-500 uppercase tracking-widest">
                  Plate XIV // Barbican Brutalism
                </div>
                <div className="my-auto w-full h-3/5 bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-700 flex items-center justify-center border border-stone-800">
                  <span className="text-[8px] font-mono text-stone-400">170 GSM DUOTONE</span>
                </div>
                <div className="text-[7px] font-mono text-stone-500 flex justify-between">
                  <span>FIG. 42</span>
                  <span>P. 184</span>
                </div>
              </div>

              {/* Right Page: Typographic Essay */}
              <div className="w-1/2 h-full bg-[#141416] p-4 flex flex-col justify-between">
                <div className="text-[7px] font-mono text-stone-500 uppercase tracking-widest text-right">
                  Verve Editions Press
                </div>
                <div className="my-auto space-y-2">
                  <h4 className="font-editorial text-xl md:text-2xl text-stone-200 italic font-medium leading-tight">
                    The Weight of Concrete
                  </h4>
                  <div className="w-8 h-[1px] bg-stone-600" />
                  <p className="text-[8px] md:text-[9px] text-stone-400 font-sans leading-relaxed line-clamp-4">
                    In the post-war reconstruction, concrete ceased to be a hidden structural substrate and asserted itself as sculptural manifest reality.
                  </p>
                </div>
                <div className="text-[7px] font-mono text-stone-500 flex justify-between">
                  <span>ESSAY BY W. BLESSED</span>
                  <span>P. 185</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-5 left-6 text-[10px] font-mono tracking-widest text-stone-400 uppercase">
            Publication 05 // Editorial Monograph
          </div>
          <div className="absolute bottom-5 right-6 text-[10px] font-mono tracking-widest text-stone-400 uppercase">
            420 Pages / Hardcover
          </div>
        </div>
      );

    case 'atelier-portrait':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#181715] to-[#0c0c0d] select-none ${aspectRatio} ${className}`}>
          {/* Directional studio lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(245,244,240,0.12),transparent_60%)]" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            {/* Atelier Designer Monogram Emblem */}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-stone-600 bg-[#141312] flex items-center justify-center mb-6 shadow-2xl relative">
              <span className="font-editorial italic text-4xl text-stone-200">W</span>
              <div className="absolute -bottom-2 px-2 py-0.5 bg-stone-900 border border-stone-700 text-[8px] font-mono text-stone-400 uppercase tracking-widest">
                WONDA
              </div>
            </div>

            <span className="text-xs font-mono uppercase tracking-[0.3em] text-stone-400 mb-2">
              Creative Director & Founder
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-tight">
              Wonderful Blessed
            </h3>
            <p className="text-sm font-sans text-stone-400 max-w-sm mt-3 leading-relaxed">
              Leading Wonda Design Studios at the intersection of brand strategy, physical packaging, and digital spatial environments.
            </p>

            <div className="mt-6 flex items-center gap-4 text-[10px] font-mono text-stone-500">
              <span>EST. 2022</span>
              <span>·</span>
              <span>INDEPENDENT PRACTICE</span>
              <span>·</span>
              <span className="text-stone-300">GLOBAL COMMISSIONS</span>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className={`relative overflow-hidden bg-[#141416] flex items-center justify-center p-8 ${aspectRatio} ${className}`}>
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">Wonda Design Studios</span>
            <h4 className="text-xl font-display font-semibold text-white">Selected Commission</h4>
          </div>
        </div>
      );
  }
};
