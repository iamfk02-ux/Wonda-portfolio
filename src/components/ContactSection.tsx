import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  onStartProject: () => void;
  onOpenCV: () => void;
  onNavigate: (sectionId: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onStartProject,
  onOpenCV,
  onNavigate,
}) => {
  return (
    <footer
      id="contact"
      className="relative z-20 w-full min-h-screen flex flex-col justify-between bg-[#F05245] text-white pt-20 sm:pt-28 md:pt-36 pb-12 sm:pb-16 px-6 sm:px-10 md:px-14 lg:px-16 shadow-none rounded-none border-none select-none snap-section"
    >
      <div className="w-full max-w-[1440px] mx-auto flex-1 flex flex-col justify-between">
        
        {/* Top: Editorial Label & Large Statement */}
        <div>
          {/* Standardized Section Marker: // Contact */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <span className="font-mono text-[13px] sm:text-[14px] font-normal tracking-tight text-white select-none">
              // Contact
            </span>
          </div>

          {/* Large Closing Statement in white */}
          <div className="max-w-4xl space-y-6">
            <h2 className="font-grotesk text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.08] text-white">
              Have an idea worth building? <br />
              Let’s make it{' '}
              <span className="text-[#111111] font-bold">unmistakable</span>.
            </h2>

            <div className="pt-6">
              <button
                onClick={onStartProject}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white hover:bg-black font-medium text-[13px] sm:text-[14px] tracking-tight transition-all cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:translate-y-[-2px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Area: Socials & Integrated Minimal Footer */}
        <div className="mt-16 sm:mt-20">
          {/* Social Direct Links */}
          <div className="pt-8 border-t border-white/20 flex flex-wrap items-center gap-6 sm:gap-10 text-[13px] sm:text-[14px] font-normal text-white/95">
            <a
              href={STUDIO_INFO.socials.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              Behance
            </a>
            <a
              href={STUDIO_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              Instagram
            </a>
            <a
              href={STUDIO_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={STUDIO_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              WhatsApp
            </a>
          </div>

          {/* Integrated Minimal Footer */}
          <div className="mt-10 sm:mt-14 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-[12px] sm:text-[13px] text-white/90">
            <div>
              <span className="text-white font-semibold mr-2">Wonderful Blessed</span>
              <span className="text-white/85">— Founder, Wonda Design Studios</span>
            </div>

            <div className="flex items-center gap-6 text-white/95">
              <button
                onClick={() => onNavigate('projects')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Work
              </button>
              <button
                onClick={() => onNavigate('intro')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                onClick={onOpenCV}
                className="hover:text-white transition-colors cursor-pointer"
              >
                CV
              </button>
              <button
                onClick={onStartProject}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>

            <div className="font-mono text-[11px] sm:text-[12px] text-white/75">
              © {new Date().getFullYear()} Wonda Design Studios. All rights reserved.
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
