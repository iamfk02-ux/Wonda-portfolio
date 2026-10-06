import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ArrowUpRight, Printer } from 'lucide-react';
import { getStudioSettings, DEFAULT_SETTINGS, StudioSettings } from '../lib/cmsContentQueries';
import { EXPERIENCE_HISTORY, CAPABILITIES } from '../data/portfolioData';
import { BlurFadeText, BlurFade } from '../components/BlurFadeText';
import Particles from '../components/Particles';

export const ResumePage: React.FC = () => {
  const [settings, setSettings] = useState<StudioSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    let isMounted = true;
    getStudioSettings().then((res) => {
      if (isMounted) setSettings(res);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#111111] selection:bg-[#F05245] selection:text-white antialiased font-sans">
      {/* Particles Background Layer */}
      <div
        className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0 print:hidden"
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
      
      {/* Top Header / Action Bar */}
      <header className="pt-8 sm:pt-12 md:pt-14 pb-6 px-6 sm:px-10 md:px-14 lg:px-16 border-b border-black/[0.08] print:hidden">
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-[12px] sm:text-[13px] font-mono tracking-wider uppercase text-black/60 hover:text-black transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Home</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 border border-black/20 hover:border-black text-xs font-mono uppercase tracking-wider text-[#111111] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print CV</span>
            </button>
            <a
              href={`mailto:${settings.email}?subject=Job%20Inquiry%20/%20Contract`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#F05245] hover:bg-[#d53e32] text-xs font-mono uppercase tracking-wider text-white transition-colors cursor-pointer"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Resume Canvas */}
      <main className="py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-14 lg:px-16">
        <div className="w-full max-w-[1000px] mx-auto space-y-16 sm:space-y-20">
          
          {/* Header Identity Block */}
          <div className="border-b border-black/[0.08] pb-12 sm:pb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <BlurFade delay={0.05} blur="10px">
                <span className="font-mono text-xs uppercase tracking-widest text-[#F05245] block mb-3">
                  Curriculum Vitae // 2026 Edition
                </span>
              </BlurFade>

              <BlurFadeText
                as="h1"
                delay={0.12}
                duration={0.85}
                blur="16px"
                className="font-grotesk font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-[-0.04em] text-[#111111]"
              >
                Wonderful Blessed
              </BlurFadeText>

              <BlurFade delay={0.22} blur="10px">
                <p className="mt-4 text-base sm:text-lg text-[#52525B] font-normal">
                  {settings.tagline}
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.25} blur="12px">
              <div className="font-mono text-xs sm:text-sm text-black/60 space-y-2 text-left md:text-right">
                <div>{settings.email}</div>
                <div>{settings.socials.linkedin}</div>
                <div>{settings.socials.instagram}</div>
              </div>
            </BlurFade>
          </div>

          {/* Professional Experience Section */}
          <section className="space-y-8">
            <BlurFade delay={0.05} blur="10px">
              <h2 className="font-mono text-xs uppercase tracking-widest text-[#F05245]">
                // Professional Experience
              </h2>
            </BlurFade>

            <div className="divide-y divide-black/10">
              {EXPERIENCE_HISTORY.map((exp, idx) => (
                <BlurFade key={idx} delay={idx * 0.08} blur="12px">
                  <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    <div className="md:col-span-3 font-mono text-xs sm:text-sm text-black/50 tabular-nums">
                      {exp.period}
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="font-grotesk font-bold text-lg sm:text-xl text-[#111111]">
                        {exp.role}
                      </h3>
                      <div className="text-sm text-[#F05245] font-medium">
                        {exp.company}
                      </div>
                    </div>
                    <div className="md:col-span-5 text-sm text-[#52525B] leading-relaxed">
                      {exp.description}
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </section>

          {/* Education & Honours */}
          <section className="space-y-8 border-t border-black/[0.08] pt-12">
            <BlurFade delay={0.05} blur="10px">
              <h2 className="font-mono text-xs uppercase tracking-widest text-[#F05245]">
                // Core Capabilities & Disciplines
              </h2>
            </BlurFade>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {CAPABILITIES.map((cap, idx) => (
                <BlurFade key={idx} delay={idx * 0.06} blur="12px">
                  <div className="p-6 bg-[#F9F9F8] border border-black/10 space-y-2 shadow-sm">
                    <span className="font-mono text-xs text-[#F05245]">{cap.number}</span>
                    <h3 className="font-grotesk font-bold text-base text-[#111111]">{cap.title}</h3>
                    <p className="text-xs text-[#71717A] leading-relaxed">{cap.subtitle}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </section>

          {/* Resume PDF Download Bar */}
          {settings.resumeUrl && (
            <div className="p-6 bg-[#F9F9F8] border border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden shadow-sm">
              <div>
                <strong className="block font-grotesk font-bold text-base text-[#111111]">
                  Download Full Formal CV
                </strong>
                <span className="text-xs text-black/50 font-sans">
                  Official PDF résumé formatted for executive review.
                </span>
              </div>

              <a
                href={settings.resumeUrl}
                download
                className="px-5 py-2.5 bg-[#111111] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#F05245] transition-colors inline-flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            </div>
          )}

        </div>
      </main>

    </div>
  );
};

export default ResumePage;
