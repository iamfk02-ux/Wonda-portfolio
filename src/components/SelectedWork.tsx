import React, { useState } from 'react';
import { Project } from '../types';
import { ArtworkVisual } from './ArtworkVisual';
import { ArrowUpRight } from 'lucide-react';

interface SelectedWorkProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ projects, onSelectProject }) => {
  const [filter, setFilter] = useState<string>('all');

  const disciplines = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'identity', label: 'Brand & Identity' },
    { id: 'digital', label: 'Web & Digital' },
    { id: 'packaging', label: 'Packaging' },
    { id: 'motion', label: 'Motion & Editorial' },
  ];

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'identity') return project.discipline.toLowerCase().includes('identity');
    if (filter === 'digital') return project.discipline.toLowerCase().includes('digital') || project.discipline.toLowerCase().includes('web');
    if (filter === 'packaging') return project.discipline.toLowerCase().includes('packaging');
    if (filter === 'motion') return project.discipline.toLowerCase().includes('motion') || project.discipline.toLowerCase().includes('editorial');
    return true;
  });

  return (
    <section id="work" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-800/80">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-stone-800/80">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-stone-500 block mb-3">
            Portfolio Archive
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-white leading-none">
            Selected Work
          </h2>
        </div>

        {/* Interactive Filter Tabs (Zero-Pill compliant segmented controls) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#141416] border border-stone-800 rounded-sm">
          {disciplines.map((d) => (
            <button
              key={d.id}
              onClick={() => setFilter(d.id)}
              className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap rounded-xs ${
                filter === d.id
                  ? 'bg-stone-800 text-white font-medium shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Portfolio Showcase: Varied compositions, scale, and rhythms */}
      <div className="space-y-24 md:space-y-36 pt-16">
        {filteredProjects.map((project, index) => {
          // Asymmetric layout variations:
          // index 0: Massive Full-width hero project
          // index 1: Two-column split with dominant left visual
          // index 2: Offset layout with generous negative whitespace
          // index 3: Split with right-dominant visual
          // index 4: Full-width editorial plate

          if (index === 0) {
            return (
              <article
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer space-y-6"
              >
                {/* Visual Canvas */}
                <div className="relative overflow-hidden rounded-xs border border-stone-800/80 group-hover:border-stone-600 transition-all duration-500">
                  <ArtworkVisual projectId={project.id} aspectRatio="aspect-[16/9] md:aspect-[21/9]" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Floating Action Badge on Desktop */}
                  <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#0c0c0d]/90 backdrop-blur-md border border-stone-700 text-xs font-mono uppercase tracking-widest text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span>Explore Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Clean Unboxed Metadata and Title */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pt-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3 text-xs font-mono text-stone-400">
                      <span>{project.number}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.discipline}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white group-hover:text-[#c2a87e] transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="max-w-md text-sm font-sans text-stone-400 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>
              </article>
            );
          }

          if (index % 2 === 1) {
            // Split Left / Right layout
            return (
              <article
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer grid grid-cols-12 gap-8 md:gap-12 items-center"
              >
                <div className="col-span-12 lg:col-span-7 order-1 lg:order-1">
                  <div className="relative overflow-hidden rounded-xs border border-stone-800/80 group-hover:border-stone-600 transition-all duration-500">
                    <ArtworkVisual projectId={project.id} aspectRatio="aspect-[16/10]" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-5 order-2 lg:order-2 space-y-6 lg:pl-6">
                  <div className="flex items-center gap-3 text-xs font-mono text-stone-400">
                    <span>{project.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.discipline}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-white group-hover:text-[#c2a87e] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm md:text-base font-sans text-stone-300 leading-relaxed">
                    {project.tagline}
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white border-b border-stone-700 pb-1 group-hover:border-white transition-all">
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            );
          }

          // Offset layout with asymmetry
          return (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer grid grid-cols-12 gap-8 md:gap-12 items-center"
            >
              <div className="col-span-12 lg:col-span-5 order-2 lg:order-1 space-y-6 lg:pr-6">
                <div className="flex items-center gap-3 text-xs font-mono text-stone-400">
                  <span>{project.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.discipline}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-white group-hover:text-[#c2a87e] transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm md:text-base font-sans text-stone-300 leading-relaxed">
                  {project.tagline}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white border-b border-stone-700 pb-1 group-hover:border-white transition-all">
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-7 order-1 lg:order-2">
                <div className="relative overflow-hidden rounded-xs border border-stone-800/80 group-hover:border-stone-600 transition-all duration-500">
                  <ArtworkVisual projectId={project.id} aspectRatio="aspect-[16/10]" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
