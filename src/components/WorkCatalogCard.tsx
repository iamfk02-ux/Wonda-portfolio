import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { PublicProject } from '../lib/cmsPublicQueries';

interface WorkCatalogCardProps {
  project: PublicProject;
  index?: number;
}

export const WorkCatalogCard: React.FC<WorkCatalogCardProps> = ({ project, index = 0 }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    // 1. GSAP smooth slight scaling of image preview
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        scale: 1.05,
        duration: 0.48,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // 2. GSAP smooth upward shift of the project title
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        y: -6,
        color: '#F05245',
        duration: 0.36,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // 3. Subtle action badge expansion
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        scale: 1.1,
        backgroundColor: '#F05245',
        borderColor: '#F05245',
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeave = () => {
    // 1. GSAP return image scale to normal
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        scale: 1,
        duration: 0.48,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // 2. GSAP return title position to normal
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        y: 0,
        color: '#111111',
        duration: 0.36,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // 3. Return action badge to default
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        scale: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const numberStr = String(index + 1).padStart(2, '0');
  const coverMedia = project.coverMedia;

  return (
    <motion.div
      id={project.slug || project.id}
      initial={{ opacity: 0, y: 55, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.8,
        delay: (index % 2) * 0.16,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full scroll-mt-24 sm:scroll-mt-32"
    >
      <Link
        ref={cardRef}
        to={`/work/${project.slug || project.id}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group flex flex-col cursor-pointer select-none"
      >
        {/* Media Card Preview */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E8E8E6] border border-black/10 group-hover:border-[#F05245]/50 transition-colors duration-300">
          {/* Scalable Media Layer (Driven by GSAP) */}
          <div
            ref={imageContainerRef}
            className="absolute inset-0 bg-[#E0E0DD] flex items-center justify-center will-change-transform overflow-hidden"
            style={{ transformOrigin: 'center center' }}
          >
            {coverMedia ? (
              coverMedia.type === 'video' ? (
                <video
                  src={coverMedia.url}
                  className="w-full h-full object-cover"
                  muted
                  autoPlay
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={coverMedia.url}
                  alt={coverMedia.alt || project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )
            ) : (
              <div className="text-center p-8 select-none">
                <span className="font-mono text-[11px] sm:text-[12px] tracking-widest uppercase text-black/50 block mb-1">
                  Case Study // {numberStr}
                </span>
                <h3 className="font-grotesk font-bold text-2xl sm:text-3xl md:text-4xl text-[#111111] tracking-tight">
                  {project.title}
                </h3>
              </div>
            )}
          </div>

          {/* Corner Quick Action Badge */}
          <div
            ref={badgeRef}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white will-change-transform shadow-md"
          >
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Editorial Metadata Row with Title Shift */}
        <div className="pt-5 sm:pt-6 flex items-baseline justify-between gap-4 border-b border-black/[0.08] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#F05245] font-semibold">
                {numberStr}
              </span>
              <h2
                ref={titleRef}
                className="font-grotesk font-bold text-xl sm:text-2xl text-[#111111] tracking-tight will-change-transform"
              >
                {project.title}
              </h2>
            </div>
            <p className="font-sans text-[13px] sm:text-[14px] text-[#71717A]">
              {project.industry || project.role || 'Brand Strategy & Design'}
            </p>
          </div>

          <div className="font-mono text-[12px] sm:text-[13px] text-black/50 tabular-nums shrink-0">
            {project.year}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
