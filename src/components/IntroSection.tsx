import React, { useState, useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getHomepageContent, DEFAULT_HOMEPAGE_CONTENT } from '../lib/cmsContentQueries';
import Particles from './Particles';

// Register GSAP ScrollTrigger plugin for pinning
gsap.registerPlugin(ScrollTrigger);

interface IntroSectionProps {
  onViewWork: () => void;
}

interface HeadlineWordItem {
  text: string;
  lineBreakAfter?: boolean;
}

function parseHeadingToWords(heading: string): HeadlineWordItem[] {
  let normalized = (heading || "").trim().replace(/^I build\b/i, "Building");
  // Add comma after ideas and change life to live
  normalized = normalized.replace(/\bideas\b(?!,)/gi, "ideas,").replace(/\blife\b/gi, "live");

  if (!normalized) {
    return [
      { text: "Building", lineBreakAfter: false },
      { text: "identities,", lineBreakAfter: false },
      { text: "experiences,", lineBreakAfter: false },
      { text: "and", lineBreakAfter: true },
      { text: "visual", lineBreakAfter: false },
      { text: "systems", lineBreakAfter: false },
      { text: "that", lineBreakAfter: false },
      { text: "give", lineBreakAfter: false },
      { text: "ideas,", lineBreakAfter: false },
      { text: "shape,", lineBreakAfter: true },
      { text: "voice,", lineBreakAfter: false },
      { text: "and", lineBreakAfter: false },
      { text: "live", lineBreakAfter: false },
      { text: "beyond", lineBreakAfter: false },
      { text: "the", lineBreakAfter: false },
      { text: "first", lineBreakAfter: false },
      { text: "thought.", lineBreakAfter: false },
    ];
  }

  const rawWords = normalized.split(/\s+/);
  return rawWords.map((word, idx) => ({
    text: word,
    lineBreakAfter: idx === 3 || idx === 9 || idx === 15,
  }));
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onViewWork }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const [headlineWords, setHeadlineWords] = useState<HeadlineWordItem[]>(() =>
    parseHeadingToWords(DEFAULT_HOMEPAGE_CONTENT.introHeading)
  );

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    getHomepageContent().then((content) => {
      if (isMounted && content.introHeading) {
        setHeadlineWords(parseHeadingToWords(content.introHeading));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // GSAP ScrollTrigger Pinning:
  // - Stops the site's vertical scroll when the section hits top of viewport.
  // - Syncs the reading text effect directly with mouse wheel / trackpad scroll.
  // - Only releases and continues scrolling once the last word 'thought.' has been read.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=1050', // 1050px pinned scroll distance perfectly calibrated for the 18 words
        pin: true,
        pinSpacing: true,
        scrub: 0.1, // Silky smooth 1:1 real-time sync with mouse scroll
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [headlineWords]);

  const totalWords = headlineWords.length;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#FFFFFF] text-[#111111] select-none flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-20 pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-6 md:pb-8"
      aria-label="Studio Overview and Statement"
    >

      {/* Particles Background Layer */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <Particles
          particleColors={["#353535"]}
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

      <div className="relative z-10 w-full max-w-[1280px] mx-auto">
        {/* Large Asymmetrical Headline Statement:
            Exact video stop-text read effect:
            - Unread words: light muted grey (#c5c5c5)
            - Current reading words: illuminated vibrant red (#F05245)
            - Read words: solid deep black (#111111)
            - Vertically pinned until 'thought.' is finished, then resumes downward scroll
        */}
        <div className="max-w-4xl lg:max-w-5xl relative">
          <h2
            ref={headlineRef}
            className="font-grotesk text-3xl sm:text-4xl md:text-[44px] lg:text-[52px] xl:text-[56px] font-medium tracking-[-0.035em] leading-[1.18]"
          >
            {headlineWords.map((item, idx) => {
              // Cursor travels across words based on scrollProgress
              // When progress = 0: cursor = 0
              // When progress = 1: cursor = totalWords + 1.2
              const cursor = scrollProgress * (totalWords + 1.2);
              const diff = cursor - idx;

              let wordColor = '#c5c5c5'; // Unread light grey (matching video)

              if (scrollProgress <= 0.002) {
                wordColor = '#c5c5c5';
              } else if (scrollProgress >= 1.0) {
                // Entire sentence complete at last word 'thought.'
                wordColor = '#111111';
              } else if (diff < 0) {
                // Word is ahead of reading cursor
                wordColor = '#c5c5c5';
              } else if (diff >= 0 && diff <= 2.2) {
                // Active reading window: illuminated vibrant red
                wordColor = '#F05245';
              } else {
                // Word is behind reading cursor: solid black
                wordColor = '#111111';
              }

              const isActiveWord = scrollProgress > 0.002 && scrollProgress < 1.0 && diff >= 0 && diff <= 2.2;

              return (
                <React.Fragment key={idx}>
                  <span
                    style={{
                      color: wordColor,
                      transition: 'color 0.14s ease-out',
                    }}
                    className={`inline-block select-none transition-colors ${
                      isActiveWord ? 'font-semibold' : ''
                    }`}
                  >
                    {item.text}
                  </span>{' '}
                  {item.lineBreakAfter && <br className="hidden sm:inline" />}
                </React.Fragment>
              );
            })}
          </h2>
        </div>

        {/* Supporting Narrative */}
        <div className="mt-8 sm:mt-12 md:mt-14 max-w-2xl">
          <p className="text-[15px] sm:text-[16px] md:text-[17px] leading-[1.62] text-[#52525B] font-normal tracking-normal">
            Wonda Design Studios — a creative practice by Wonderful Blessed.{' '}
            8+ years bringing ideas to life through visual creative design. You deserve better than generic, let's help you elevate.
          </p>
        </div>

      </div>
    </section>
  );
};

export default IntroSection;
