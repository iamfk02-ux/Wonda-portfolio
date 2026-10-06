"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowDownRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { fetchPublicServices, PublicService } from "../lib/cmsPublicQueries";
import Particles from "./Particles";
import { BlurFadeText, BlurFade } from "./BlurFadeText";

function toSentenceCase(str: string): string {
  if (!str) return '';
  const trimmed = str.trim();
  if (trimmed.toUpperCase() === 'BRAND IDENTITY') return 'Brand identity';
  if (trimmed.toUpperCase() === 'WEB & UIUX DESIGN') return 'Web & UIUX design';
  if (trimmed.toUpperCase() === 'MOTION DESIGN') return 'Motion design';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

export const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
  },
};

export const THREE_CORE_SERVICES: PublicService[] = [
  {
    id: "service_01",
    number: "01",
    title: "Brand identity",
    subtitle: "Enduring, distinctive brand marks, comprehensive design guidelines, and cohesive visual languages.",
    summary: "Visual identity is not merely an ornament; it is the visual operating system of an organization.",
    sortOrder: 1,
    active: true,
    previewMedia: {
      id: "media_service_01",
      url: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
      type: "image",
      alt: "Brand Identity Systems Preview",
    },
  },
  {
    id: "service_02",
    number: "02",
    title: "Web & UIUX design",
    subtitle: "Custom-crafted, editorial web flagships, digital product architectures, and intuitive interfaces.",
    summary: "We design bespoke digital environments that feel like natural extensions of a brand’s presence.",
    sortOrder: 2,
    active: true,
    previewMedia: {
      id: "media_service_04",
      url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
      type: "image",
      alt: "Web & UIUX Design Preview",
    },
  },
  {
    id: "service_03",
    number: "03",
    title: "Motion design",
    subtitle: "Kinetic typography, expressive interaction choreography, and dynamic brand idents.",
    summary: "Bringing static brands to life through kinetic energy, intentional timing, and tactile spatial motion.",
    sortOrder: 3,
    active: true,
    previewMedia: {
      id: "media_service_06",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      type: "image",
      alt: "Motion Design & Kinetic Systems Preview",
    },
  },
];

export interface WhatIDoSectionProps {
  className?: string;
  isLightMode?: boolean;
}

export const WhatIDoSection: React.FC<WhatIDoSectionProps> = ({
  className = "",
  isLightMode: propIsLightMode,
}) => {
  const [services, setServices] = useState<PublicService[]>(THREE_CORE_SERVICES);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const isLight = propIsLightMode ?? true;

  const listRef = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;
    fetchPublicServices().then((data) => {
      if (isMounted && data.length > 0) {
        // Map dynamic media from CMS onto the 3 core services if available
        const updated = THREE_CORE_SERVICES.map((core) => {
          const match = data.find(
            (d) =>
              d.title.toUpperCase().includes(core.title) ||
              core.title.includes(d.title.toUpperCase()) ||
              d.number === core.number
          );
          if (match && match.previewMedia) {
            return { ...core, previewMedia: match.previewMedia };
          }
          return core;
        });
        setServices(updated);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync right-card height dynamically so it starts exactly where the first item starts and ends where the last item ends
  useEffect(() => {
    const updateHeight = () => {
      if (listRef.current) {
        setListHeight(listRef.current.offsetHeight);
      }
    };

    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    if (listRef.current) ro.observe(listRef.current);
    window.addEventListener("resize", updateHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [services]);

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(index);
  };

  const displayServices = services;

  return (
    <section
      id="what-i-do"
      data-theme={isLight ? "light" : "dark"}
      className={cn(
        "services-section relative w-full transition-colors duration-700 ease-out py-16 sm:py-24 md:py-28 overflow-hidden select-none snap-section",
        isLight ? "bg-[#FFFFFF] text-[#111111]" : "bg-[#111111] text-[#F2F2EF]",
        className
      )}
    >
      <span id="services" className="sr-only" aria-hidden="true">
        Services & What I Do
      </span>

      {/* Particles Background Layer */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <Particles
          particleColors={isLight ? ["#353535"] : ["#FFFFFF"]}
          particleCount={180}
          particleSpread={10}
          speed={0.25}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16">
        {/* Services Header matching reference image */}
        <div className="mb-10 sm:mb-14 md:mb-16">
          <BlurFade delay={0.05} blur="12px">
            <h2
              className={cn(
                "font-grotesk font-black text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] tracking-[-0.04em] leading-none select-none",
                isLight ? "text-[#111111]" : "text-[#FFFFFF]"
              )}
            >
              Services
            </h2>
          </BlurFade>

          <BlurFade delay={0.12} blur="8px">
            <p
              className={cn(
                "mt-3.5 sm:mt-4 text-[13.5px] sm:text-[14.5px] font-sans font-normal leading-relaxed max-w-md select-none",
                isLight ? "text-[#52525B]" : "text-white/70"
              )}
            >
              A tailored range of services that reflect thoughtful design, clear strategy, and attention to detail.
            </p>
          </BlurFade>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Services list with dividing lines + CTA button */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              ref={listRef}
              className={cn(
                "flex flex-col border-t transition-colors duration-300",
                isLight ? "border-black/15" : "border-white/15"
              )}
            >
              {displayServices.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <BlurFade
                    key={item.id}
                    delay={index * 0.08}
                    blur="14px"
                    duration={0.75}
                    yOffset={18}
                  >
                    <div
                      onMouseEnter={() => handleSelect(index)}
                      onClick={() => handleSelect(index)}
                      onTouchStart={() => handleSelect(index)}
                      className={cn(
                        "cursor-pointer select-none group w-full py-4.5 sm:py-5.5 md:py-6 lg:py-6.5 transition-all duration-200 border-b flex items-center justify-between",
                        isLight ? "border-black/15" : "border-white/15"
                      )}
                    >
                      <h3
                        className={cn(
                          "font-grotesk font-black text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] tracking-[-0.035em] leading-[1.08] transition-all duration-200",
                          isActive
                            ? isLight
                              ? "text-[#111111] opacity-100 group-hover:text-[#F05245]"
                              : "text-[#FFFFFF] opacity-100 group-hover:text-[#F05245]"
                            : isLight
                            ? "text-[#111111] opacity-35 group-hover:opacity-85 group-hover:text-[#F05245]"
                            : "text-[#F2F2EF] opacity-35 group-hover:opacity-85 group-hover:text-[#F05245]"
                        )}
                      >
                        {toSentenceCase(item.title)}
                      </h3>

                      <span
                        className={cn(
                          "font-mono text-xs sm:text-sm tracking-wider uppercase transition-colors duration-200",
                          isActive
                            ? "text-[#F05245] font-semibold"
                            : isLight
                            ? "text-black/35 group-hover:text-black/70"
                            : "text-white/35 group-hover:text-white/70"
                        )}
                      >
                        {item.number}
                      </span>
                    </div>
                  </BlurFade>
                );
              })}
            </div>

            {/* Text Button under Motion Design leading to contact page (no rectangle, matching image style) */}
            <BlurFade delay={0.3} blur="10px">
              <div className="pt-6 sm:pt-8 flex items-center">
                <Link
                  to="/contact"
                  className={cn(
                    "group inline-flex items-center gap-1.5 text-[15px] sm:text-[17px] font-bold tracking-tight transition-colors duration-200 select-none cursor-pointer",
                    isLight
                      ? "text-[#111111] hover:text-[#F05245]"
                      : "text-white hover:text-[#F05245]"
                  )}
                >
                  <span>Let’s get started</span>
                  <ArrowDownRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#F05245] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </Link>
              </div>
            </BlurFade>
          </div>

          {/* Right Column: Sized to start where the first item starts and end where the last item ends */}
          <div className="lg:col-span-5 flex items-start justify-center lg:justify-end">
            <div
              style={
                listHeight && window.innerWidth >= 1024
                  ? { height: `${listHeight}px`, width: `${(listHeight * 4) / 3}px`, maxWidth: "100%" }
                  : undefined
              }
              className="relative w-full max-w-[460px] lg:max-w-none aspect-[4/3] lg:aspect-auto overflow-hidden bg-[#161618] shadow-2xl select-none"
            >
              {displayServices.map((item, index) => {
                const isCurrent = activeIndex === index;
                const isPrev = prevIndex === index;
                const media = item.previewMedia;

                return (
                  <motion.div
                    key={item.id}
                    initial={index === 0 ? "visible" : "hidden"}
                    animate={isCurrent ? "visible" : "hidden"}
                    variants={clipPathVariants}
                    transition={{
                      duration: 0.55,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    style={{
                      zIndex: isCurrent ? 10 : isPrev ? 5 : 1,
                    }}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    {media ? (
                      media.type === "video" ? (
                        <video
                          src={media.url}
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls={false}
                          className="w-full h-full object-cover select-none pointer-events-none"
                        />
                      ) : (
                        <img
                          src={media.url}
                          alt={media.alt || item.title}
                          loading="eager"
                          className="w-full h-full object-cover select-none pointer-events-none"
                          draggable={false}
                        />
                      )
                    ) : (
                      <div className="w-full h-full bg-[#1A1A1D] flex items-center justify-center text-white/40 font-mono text-xs">
                        {toSentenceCase(item.title)}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDoSection;
