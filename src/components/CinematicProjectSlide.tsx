import React, { useState } from 'react';
import { Project } from '../types';
import { ArtworkVisual } from './ArtworkVisual';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface CinematicProjectSlideProps {
  projects: Project[];
  onSelectProject: (p: Project) => void;
}

export const CinematicProjectSlide: React.FC<CinematicProjectSlideProps> = ({
  projects,
  onSelectProject,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeProject = projects[currentIndex] || projects[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      id="visual-slide"
      className="relative min-h-[90vh] bg-[#050505] flex flex-col justify-between p-6 md:p-12 border-t border-white/5 select-none scroll-mt-12"
    >
      <div id="work" className="absolute -top-12 left-0 pointer-events-none" />
      {/* Top Bar for Slide */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-xs font-mono text-[#FF5712] uppercase tracking-widest">
          04 // Visual Showcase
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
          <span>{activeProject.number} / 05</span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1 hover:text-white transition-colors"
              aria-label="Previous showcase"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 hover:text-white transition-colors"
              aria-label="Next showcase"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main High-Impact Visual Plate (Matches format in video 00:05) */}
      <div
        onClick={() => onSelectProject(activeProject)}
        className="relative my-auto w-full aspect-[16/9] md:aspect-[21/9] max-h-[640px] rounded-xs overflow-hidden border border-white/10 group cursor-pointer"
      >
        <ArtworkVisual projectId={activeProject.id} aspectRatio="aspect-full h-full w-full" />
        
        {/* Halftone texture overlay */}
        <div className="absolute inset-0 bg-dither opacity-20 pointer-events-none" />

        {/* Floating Bottom Left Caption Box (Exact style of video 00:05) */}
        <div className="absolute bottom-6 left-6 max-w-sm bg-black/85 backdrop-blur-md border border-white/15 p-4 rounded-xs text-xs font-mono space-y-1">
          <div className="text-white font-semibold flex items-center justify-between">
            <span>[{activeProject.number}] {activeProject.title}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FF5712] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <p className="text-stone-400 text-[11px] leading-relaxed">
            {activeProject.tagline}
          </p>
        </div>
      </div>

      {/* Project Switcher Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5 text-[11px] font-mono text-stone-500">
        <div className="flex gap-4">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-colors uppercase ${
                currentIndex === idx ? 'text-white font-semibold' : 'text-stone-600 hover:text-stone-300'
              }`}
            >
              {p.number}. {p.title}
            </button>
          ))}
        </div>
        <div className="hidden sm:block text-stone-400">
          CLICK IMAGE TO OPEN CASE STUDY
        </div>
      </div>
    </section>
  );
};
