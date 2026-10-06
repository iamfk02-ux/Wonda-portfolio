import React from 'react';
import { BlurFade } from './BlurFadeText';
import Particles from './Particles';

interface StatItem {
  id: string;
  value: string;
  suffix: string;
  label: string;
  description: string;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'stat_years',
    value: '8',
    suffix: '+',
    label: 'YEARS',
    description: 'of designing, brainstorming, experimenting and solving creative problems.',
  },
  {
    id: 'stat_projects',
    value: '40',
    suffix: '+',
    label: 'PROJECTS',
    description: 'Delivered locally and across 4 different continents.',
  },
  {
    id: 'stat_tools',
    value: '12',
    suffix: '+',
    label: 'TOOLS',
    description: 'and software spans across industry standard tools to artificial intelligence to create a complete experience.',
  },
];

export const StudioStatsSection: React.FC = () => {
  return (
    <section
      id="studio-stats"
      className="relative w-full bg-[#FFFFFF] text-[#111111] pt-0 sm:pt-1 md:pt-2 pb-14 sm:pb-18 md:pb-20 overflow-hidden select-none"
    >
      {/* Particles Background Layer */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <Particles
          particleColors={["#353535"]}
          particleCount={90}
          particleSpread={10}
          speed={0.2}
          particleBaseSize={80}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1540px] mx-auto px-5 sm:px-8 md:px-12 lg:px-14 xl:px-16">
        {/* 3 Columns Grid with Hairline Dividers in Light Mode */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10">
          {STATS_DATA.map((item, index) => (
            <BlurFade
              key={item.id}
              delay={0.08 + index * 0.08}
              blur="10px"
              duration={0.65}
              className="flex flex-col justify-between py-6 sm:py-8 md:py-4 lg:py-6 md:px-8 lg:px-12 first:md:pl-0 last:md:pr-0"
            >
              <div>
                {/* Metric Number with Red Accent Plus (refined reduced font size) */}
                <div className="flex items-baseline font-grotesk font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] leading-none tracking-[-0.03em] text-[#111111]">
                  <span>{item.value}</span>
                  <span className="text-[#F05245] font-normal sm:font-medium text-[0.6em] sm:text-[0.65em] ml-1 sm:ml-1.5 select-none leading-none">
                    {item.suffix}
                  </span>
                </div>
              </div>

              {/* Category Label & Narrative Description */}
              <div className="mt-6 sm:mt-8 md:mt-10">
                <div className="font-grotesk font-bold text-xs sm:text-[13px] tracking-[0.16em] uppercase text-[#F05245] mb-2 sm:mb-2.5">
                  {item.label}
                </div>
                <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#52525B] leading-relaxed max-w-xs sm:max-w-sm">
                  {item.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioStatsSection;
