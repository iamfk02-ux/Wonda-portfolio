import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCE_HISTORY } from '../data/portfolioData';

interface ExperienceSectionProps {
  onOpenCV: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenCV }) => {
  const [isLight, setIsLight] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleTransition = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Transitions smoothly to white when entering viewport
      setIsLight(rect.top <= vh * 0.65);
    };

    const observer = new IntersectionObserver(
      () => handleTransition(),
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
        rootMargin: '0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('scroll', handleTransition, { passive: true });
    window.addEventListener('resize', handleTransition, { passive: true });
    handleTransition();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleTransition);
      window.removeEventListener('resize', handleTransition);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`w-full min-h-screen flex flex-col justify-center transition-colors duration-300 ease-out py-8 sm:py-12 md:py-16 px-5 sm:px-8 md:px-12 lg:px-16 select-none ${
        isLight
          ? 'bg-[#FFFFFF] text-[#0A0A0A]'
          : 'bg-[#111111] text-[#F2F2EF]'
      }`}
    >
      <div className="w-full max-w-5xl mx-auto my-auto px-1 sm:px-2">
        
        {/* Standardized Section Marker: // Experience */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <span className="font-mono text-[13px] sm:text-[14px] font-normal tracking-tight text-[#F05245] select-none">
            // Experience
          </span>
        </div>

        {/* Experience Rows based on Grid and Line System - Every item fully loaded & visible */}
        <div className={`border-t transition-colors duration-300 ease-out ${isLight ? 'border-black/[0.12]' : 'border-white/[0.12]'}`}>
          {EXPERIENCE_HISTORY.map((item, index) => (
            <div
              key={index}
              className={`py-3.5 sm:py-4 md:py-4.5 border-b grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline transition-colors duration-300 ease-out ${
                isLight ? 'border-black/[0.08]' : 'border-white/[0.10]'
              }`}
            >
              {/* Role */}
              <div
                className={`sm:col-span-5 font-grotesk text-base sm:text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300 ease-out ${
                  isLight ? 'text-[#0A0A0A]' : 'text-[#F2F2EF]'
                }`}
              >
                {item.role}
              </div>

              {/* Studio / Company */}
              <div
                className={`sm:col-span-4 text-xs sm:text-sm md:text-[15px] font-normal transition-colors duration-300 ease-out ${
                  isLight ? 'text-[#333330]' : 'text-[#D4D4D0]'
                }`}
              >
                {item.company}
              </div>

              {/* Years / Period */}
              <div
                className={`sm:col-span-3 text-left sm:text-right font-mono text-[11px] sm:text-xs md:text-[13px] tabular-nums transition-colors duration-300 ease-out ${
                  isLight ? 'text-[#52524E]' : 'text-[#A3A3A0]'
                }`}
              >
                {item.period}
              </div>
            </div>
          ))}
        </div>

        {/* Link: View Full CV → */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <button
            onClick={onOpenCV}
            className={`group inline-flex items-center gap-2 text-xs sm:text-sm md:text-[15px] font-medium transition-colors duration-300 ease-out cursor-pointer ${
              isLight ? 'text-[#0A0A0A] hover:text-[#F05245]' : 'text-[#F2F2EF] hover:text-[#F05245]'
            }`}
          >
            <span>View Full CV</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-[-2px] text-[#F05245]" />
          </button>
        </div>

      </div>
    </section>
  );
};
