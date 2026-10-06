import React, { useEffect } from 'react';
import { Project } from '../types';
import { ArtworkVisual } from './ArtworkVisual';
import { X, ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onNavigateProject: (direction: 'prev' | 'next') => void;
  onStartProject: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onNavigateProject,
  onStartProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigateProject('prev');
      if (e.key === 'ArrowRight') onNavigateProject('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose, onNavigateProject]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Case study for ${project.title}`}
      className="fixed inset-0 z-50 bg-[#111111] text-[#F2F2EF] overflow-y-auto"
    >
      {/* Sticky Case Study Top Bar */}
      <header className="sticky top-0 z-30 bg-[#111111]/90 backdrop-blur-md border-b border-white/[0.08] px-6 sm:px-10 md:px-14 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-[#F05245]">{project.number}</span>
          <span className="text-white/30">/</span>
          <span className="text-[#F2F2EF]/90 uppercase tracking-wider">{project.title}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1 border-r border-white/10 pr-4">
            <button
              onClick={() => onNavigateProject('prev')}
              className="p-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous project"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateProject('next')}
              className="p-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label="Next project"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-wider uppercase border border-white/20 hover:border-white text-white transition-colors cursor-pointer"
            aria-label="Close case study"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Case Study Content Container */}
      <main className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-20 sm:space-y-28">
        
        {/* Header Intro */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#F2F2EF]/50">
            <span>Client: {project.client}</span>
            <span aria-hidden="true">·</span>
            <span>Discipline: {project.discipline}</span>
            <span aria-hidden="true">·</span>
            <span>Year: {project.year}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-grotesk font-bold tracking-tight text-white leading-none">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl font-normal text-[#F2F2EF]/80 max-w-3xl leading-relaxed">
            {project.tagline}
          </p>
        </section>

        {/* Hero Scale Visual Plate */}
        <section className="overflow-hidden border border-white/[0.08]">
          <ArtworkVisual projectId={project.id} aspectRatio="aspect-[16/9]" />
        </section>

        {/* Project Metadata Matrix */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-white/[0.10] text-xs font-mono">
          <div>
            <span className="text-[#F2F2EF]/40 uppercase tracking-wider block mb-1">Role</span>
            <span className="text-[#F2F2EF] font-sans">{project.role}</span>
          </div>
          <div>
            <span className="text-[#F2F2EF]/40 uppercase tracking-wider block mb-1">Timeline</span>
            <span className="text-[#F2F2EF] font-sans">{project.year}</span>
          </div>
          <div>
            <span className="text-[#F2F2EF]/40 uppercase tracking-wider block mb-1">Discipline</span>
            <span className="text-[#F2F2EF] font-sans">{project.discipline}</span>
          </div>
          <div>
            <span className="text-[#F2F2EF]/40 uppercase tracking-wider block mb-1">Lead</span>
            <span className="text-[#F2F2EF] font-sans">Wonderful Blessed</span>
          </div>
        </section>

        {/* Narrative Section: Strategic Context & Challenge */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#F05245] sticky top-24 block">
              // Strategy & Craft
            </span>
          </div>

          <div className="md:col-span-8 space-y-8">
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-white">01 / The Challenge</h3>
              <p className="text-base sm:text-lg font-normal text-[#F2F2EF]/80 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-white">02 / The Strategic Idea</h3>
              <p className="text-base sm:text-lg font-normal text-[#F2F2EF]/80 leading-relaxed">
                {project.strategy}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-white">03 / Art Direction</h3>
              <p className="text-base sm:text-lg font-normal text-[#F2F2EF]/80 leading-relaxed">
                {project.artDirection}
              </p>
            </div>
          </div>
        </section>

        {/* Deliverables Checklist */}
        <section className="p-8 bg-[#161616] border border-white/[0.08]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#F05245] block mb-6">
            Key Scope & Deliverables
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.deliverables.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-xs text-[#F2F2EF]/80">
                <Check className="w-3.5 h-3.5 text-[#F05245] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Visual Moments */}
        <section className="space-y-8 pt-8 border-t border-white/[0.08]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#F2F2EF]/40 block">
            Visual Documentation & Specimen Details
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="border border-white/[0.08] overflow-hidden bg-[#161616]">
                  <ArtworkVisual projectId={project.id} aspectRatio="aspect-[4/3]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono text-[#F2F2EF]/50">
                    <span>{item.caption}</span>
                    <span className="uppercase text-[#F05245]">{item.type}</span>
                  </div>
                  <p className="text-xs text-[#F2F2EF]/70 leading-relaxed">
                    {item.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next Project Footer Bar */}
        <footer className="pt-16 border-t border-white/[0.10] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <button
            onClick={() => onNavigateProject('next')}
            className="group text-left cursor-pointer"
          >
            <span className="text-[10px] font-mono text-[#F2F2EF]/40 uppercase tracking-widest block mb-1">
              Next Project →
            </span>
            <span className="text-2xl font-grotesk font-semibold text-white group-hover:text-[#F05245] transition-colors">
              Continue Through Archives
            </span>
          </button>

          <button
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="px-6 py-3 bg-[#F2F2EF] text-[#111111] hover:bg-white text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
          >
            Commission a Project
          </button>
        </footer>

      </main>
    </div>
  );
};
