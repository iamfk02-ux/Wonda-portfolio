import React, { useState } from 'react';
import { Project } from '../types';

interface InteractiveCircuitProps {
  projects: Project[];
  onSelectProject: (p: Project) => void;
}

export const InteractiveCircuit: React.FC<InteractiveCircuitProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeNode, setActiveNode] = useState(0);

  const circuitNodes = [
    {
      id: '01',
      title: 'MIVA AI HACKATHON',
      discipline: 'Visual Identity & Packaging',
      note: 'No noise. Only essential form. Architectural flacons and blind-debossed unbleached paper.',
      coord: { x: '25%', y: '22%' },
      projectIndex: 0,
    },
    {
      id: '02',
      title: 'Kronos Spatial',
      discipline: 'Digital Experience',
      note: 'Monolithic Brutalist web architecture. Spatial transitions that reject template conventions.',
      coord: { x: '75%', y: '35%' },
      projectIndex: 1,
    },
    {
      id: '03',
      title: 'Solis Ceramics',
      discipline: 'Packaging & Art Direction',
      note: 'Tactile stoneware homeware, molded post-consumer pulp packaging, letterpressed seals.',
      coord: { x: '35%', y: '70%' },
      projectIndex: 2,
    },
    {
      id: '04',
      title: 'The Nelo Okeke Foundation',
      discipline: 'Brand Identity & Visual Language',
      note: 'Brand identity, logo design, and conceptualization for community outreach and empowerment.',
      coord: { x: '68%', y: '82%' },
      projectIndex: 3,
    },
  ];

  return (
    <section
      id="circuit"
      className="relative min-h-screen bg-[#050505] flex flex-col justify-between p-6 md:p-12 border-t border-white/5 overflow-hidden select-none"
    >
      {/* Background Halftone / Dither */}
      <div className="absolute inset-0 bg-dither-subtle opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="text-xs font-mono text-[#FF5712] uppercase tracking-widest">
          02 // Spatial Discipline Track
        </div>
        <div className="text-xs font-mono text-stone-500 uppercase">
          Select node to inspect
        </div>
      </div>

      {/* Center Circuit Arena */}
      <div className="relative my-auto w-full max-w-5xl mx-auto min-h-[520px] flex items-center justify-center">
        {/* Large Subtle Circuit Oval Track (matches video 00:03) */}
        <div className="absolute w-[320px] h-[320px] sm:w-[500px] sm:h-[420px] border border-white/10 rounded-full pointer-events-none" />
        <div className="absolute w-[240px] h-[240px] sm:w-[380px] sm:h-[300px] border border-dashed border-white/10 rounded-full pointer-events-none" />

        {/* Center Graphic / Grid */}
        <div className="absolute flex flex-col items-center justify-center text-center p-6 pointer-events-none">
          <span className="text-xs font-mono text-[#FF5712] uppercase tracking-widest mb-1">
            CIRCUIT ACTIVE
          </span>
          <span className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
            {circuitNodes[activeNode].title}
          </span>
          <span className="text-xs font-mono text-stone-400 mt-1">
            {circuitNodes[activeNode].discipline}
          </span>
        </div>

        {/* Interactive Nodes scattered around circuit */}
        <div className="relative w-full h-full min-h-[500px]">
          {circuitNodes.map((node, index) => {
            const isActive = activeNode === index;
            return (
              <div
                key={node.id}
                onClick={() => {
                  setActiveNode(index);
                  if (projects[node.projectIndex]) {
                    onSelectProject(projects[node.projectIndex]);
                  }
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20 max-w-[240px] sm:max-w-[280px]"
                style={{ left: node.coord.x, top: node.coord.y }}
              >
                {/* Node pin badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`w-3 h-3 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-[#FF5712] ring-4 ring-[#FF5712]/25 scale-125'
                        : 'bg-stone-700 group-hover:bg-[#FF5712]'
                    }`}
                  />
                  <span className="text-[10px] font-mono text-[#FF5712] tracking-widest uppercase">
                    {node.id}
                  </span>
                </div>

                {/* Burnt orange pointer line */}
                <div className="w-12 h-[1px] bg-[#FF5712] mb-2" />

                {/* Concise Punchy Note Text */}
                <p className="font-sans text-xs sm:text-sm text-stone-300 font-light leading-relaxed group-hover:text-white transition-colors">
                  {node.note}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 flex items-center justify-end text-[11px] font-mono text-stone-500 pt-6 border-t border-white/5">
        <div className="text-stone-300">CLICK ANY NODE TO EXPAND CASE STUDY</div>
      </div>
    </section>
  );
};
