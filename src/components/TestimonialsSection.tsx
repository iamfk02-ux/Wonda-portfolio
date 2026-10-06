import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Move, Quote } from 'lucide-react';
import { fetchPublicTestimonials, TestimonialItem, DEFAULT_TESTIMONIALS } from '../lib/cmsContentQueries';
import Particles from './Particles';
import { BlurFadeText, BlurFade } from './BlurFadeText';

interface TestimonialsSectionProps {
  isLightMode?: boolean;
}

const ROTATIONS = [
  '-rotate-[2.8deg]',
  'rotate-[2.6deg]',
  '-rotate-[1.8deg]',
  'rotate-[2.2deg]',
  '-rotate-[2.4deg]',
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  isLightMode = true,
}) => {
  const isLight = isLightMode;
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic z-index tracker for click/drag to front
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [cardZIndices, setCardZIndices] = useState<Record<string, number>>({});
  const topZRef = useRef(20);

  useEffect(() => {
    let isMounted = true;
    fetchPublicTestimonials().then((data) => {
      if (isMounted && data.length > 0) {
        setTestimonials(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const bringToFront = (id: string) => {
    topZRef.current += 1;
    setCardZIndices((prev) => ({
      ...prev,
      [id]: topZRef.current,
    }));
    setActiveCardId(id);
  };

  return (
    <section
      id="testimonials"
      data-theme={isLight ? 'light' : 'dark'}
      className={`relative w-full py-16 sm:py-20 md:py-24 overflow-hidden select-none snap-section transition-colors duration-700 ease-out ${
        isLight ? 'bg-[#FFFFFF] text-[#111111]' : 'bg-[#111111] text-[#F2F2EF]'
      }`}
    >
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
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <BlurFadeText
              as="h2"
              delay={0.12}
              duration={0.85}
              blur="14px"
              className="font-grotesk font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-[-0.035em]"
            >
              What Visionary Partners Say
            </BlurFadeText>
          </div>

          <BlurFade delay={0.2} blur="10px">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[10.5px] uppercase tracking-wider self-start sm:self-end border transition-colors duration-700 ${
                isLight
                  ? 'bg-black/[0.04] border-black/[0.08] text-[#52525B]'
                  : 'bg-white/[0.04] border-white/[0.08] text-[#A1A1AA]'
              }`}
            >
              <Move className={`w-3 h-3 ${isLight ? 'text-black/60' : 'text-white/60'}`} />
              <span>Interactive Cards</span>
            </div>
          </BlurFade>
        </div>

        {/* Draggable & Hoverable Floating Cards Area */}
        <div
          ref={containerRef}
          className="relative flex flex-wrap items-start justify-center gap-5 sm:gap-6 lg:gap-7"
        >
          {testimonials.map((item, idx) => {
            const isTop = activeCardId === item.id;
            const rotationClass = ROTATIONS[idx % ROTATIONS.length];

            return (
              <motion.div
                key={item.id}
                drag
                dragConstraints={containerRef}
                dragElastic={0.16}
                dragTransition={{ bounceStiffness: 500, bounceDamping: 25 }}
                onDragStart={() => bringToFront(item.id)}
                onMouseEnter={() => bringToFront(item.id)}
                onTouchStart={() => bringToFront(item.id)}
                initial={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(12px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  scale: 1.03,
                  rotate: 0,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                whileDrag={{
                  scale: 1.05,
                  rotate: 0,
                  cursor: 'grabbing',
                  boxShadow: isLight
                    ? '0 25px 60px rgba(0,0,0,0.22)'
                    : '0 25px 60px rgba(0,0,0,0.95)',
                }}
                style={{
                  zIndex: cardZIndices[item.id] || 10,
                  touchAction: 'none',
                }}
                className={`w-full max-w-[320px] sm:max-w-[340px] cursor-grab active:cursor-grabbing ${rotationClass} transition-shadow duration-300`}
              >
                <div
                  className={`rounded-[18px] p-5 sm:p-6 transition-all duration-500 ${
                    isLight
                      ? isTop
                        ? 'border border-[#F05245]/50 shadow-[0_20px_50px_rgba(0,0,0,0.14)] bg-white'
                        : 'border border-black/[0.07] hover:border-black/[0.18] bg-white shadow-[0_12px_36px_rgba(0,0,0,0.06)]'
                      : isTop
                      ? 'border border-white/[0.22] shadow-[0_24px_55px_rgba(0,0,0,0.9)] bg-[#191919]'
                      : 'border border-white/[0.08] hover:border-white/[0.18] bg-[#161616]/95 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.65)]'
                  }`}
                >
                  {/* Card Header: Quote Icon + Author Info */}
                  <div className="flex items-center gap-3 pointer-events-none mb-3">
                    <div className="w-9 h-9 rounded-full bg-[#F05245]/15 text-[#F05245] flex items-center justify-center shrink-0">
                      <Quote className="w-4 h-4" />
                    </div>
                    <div>
                      <h3
                        className={`font-sans font-semibold text-sm tracking-tight leading-tight transition-colors duration-700 ${
                          isLight ? 'text-[#111111]' : 'text-white'
                        }`}
                      >
                        {item.name}
                      </h3>
                      <p
                        className={`font-sans text-[11.5px] font-normal mt-0.5 leading-tight transition-colors duration-700 ${
                          isLight ? 'text-[#6B7280]' : 'text-[#888888]'
                        }`}
                      >
                        {item.role} {item.company ? `• ${item.company}` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Subtle Divider Line */}
                  <div
                    className={`w-full h-px my-3 pointer-events-none transition-colors duration-700 ${
                      isLight ? 'bg-black/[0.07]' : 'bg-white/[0.08]'
                    }`}
                  />

                  {/* Quote Body */}
                  <p
                    className={`font-sans text-[13px] leading-[1.6] font-normal tracking-normal pointer-events-none italic transition-colors duration-700 ${
                      isLight ? 'text-[#27272A]' : 'text-[#EDEDED]'
                    }`}
                  >
                    "{item.quote}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
