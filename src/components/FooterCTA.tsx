import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { fetchStudioSettings, DEFAULT_SETTINGS, StudioSettings } from '../lib/cmsContentQueries';
import Particles from './Particles';
import { BlurFadeText, BlurFade } from './BlurFadeText';

export const FooterCTA: React.FC = () => {
  const [settings, setSettings] = useState<StudioSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    let isMounted = true;
    fetchStudioSettings().then((data) => {
      if (isMounted) setSettings(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer
      id="footer-cta"
      className="relative z-20 w-full h-screen min-h-[580px] max-h-screen bg-[#111111] text-[#F2F2EF] flex flex-col justify-between pt-8 sm:pt-12 md:pt-14 pb-6 sm:pb-8 md:pb-10 overflow-hidden select-none snap-start"
    >
      {/* Inverted White Particles Background Layer for Dark Mode Footer */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <Particles
          particleColors={["#FFFFFF", "#D4D4D0"]}
          particleCount={200}
          particleSpread={10}
          speed={0.3}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 flex-1 flex flex-col justify-between">
        
        {/* Top/Middle Area: Centered Headline & Red "Get in touch" Button */}
        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto px-4">
          <BlurFadeText
            as="h2"
            delay={0.1}
            duration={0.85}
            blur="16px"
            className="font-grotesk font-medium text-3xl sm:text-5xl md:text-6xl lg:text-[66px] tracking-[-0.035em] leading-[1.12] text-white"
          >
            Have a cool idea? <br />
            Let’s Collaborate<span className="text-[#F05245]">.</span>
          </BlurFadeText>

          <BlurFade delay={0.25} blur="10px">
            <div className="mt-5 sm:mt-7 md:mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 bg-[#F05245] hover:bg-[#d94438] text-white text-[13px] sm:text-[14px] font-medium transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer rounded-none group"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </BlurFade>
        </div>

        {/* Bottom Metadata & Social Row */}
        <BlurFade delay={0.3} blur="12px" className="w-full flex flex-col mb-1 sm:mb-2">
          {/* 4 Social/Contact Channels horizontally distributed */}
          <div className="w-full grid grid-cols-4 gap-2 sm:gap-6 text-[12px] sm:text-[13px] md:text-[14px] font-normal text-white/85 py-1.5 sm:py-2">
            <div className="text-left">
              <a
                href={`mailto:${settings.email}`}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Email
              </a>
            </div>
            <div className="text-center">
              <a
                href={settings.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Whatsapp
              </a>
            </div>
            <div className="text-center">
              <a
                href={settings.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Instagram
              </a>
            </div>
            <div className="text-right">
              <a
                href={settings.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Copyright Information */}
          <div className="w-full flex items-center justify-between text-[11px] sm:text-[12px] font-mono text-white/50 border-t border-white/[0.08] pt-2 pb-2 sm:pb-3">
            <div className="tracking-wider uppercase">
              © {new Date().getFullYear()} {settings.studioName}. All rights reserved.
            </div>
          </div>
        </BlurFade>

      </div>
    </footer>
  );
};
