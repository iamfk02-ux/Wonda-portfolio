import React, { useState, useEffect } from 'react';
import { Check, Linkedin, Instagram, Mail } from 'lucide-react';
import { getStudioSettings, DEFAULT_SETTINGS, StudioSettings } from '../lib/cmsContentQueries';
import wonderfulPortraitImg from '../assets/WonderfulB-portrait.png';
import { ASSET_CONFIG } from '../config/assets';
import { BlurFade } from '../components/BlurFadeText';
import Particles from '../components/Particles';

export const ContactPage: React.FC = () => {
  const [settings, setSettings] = useState<StudioSettings>(DEFAULT_SETTINGS);
  const [imgSrc, setImgSrc] = useState<string>('/WonderfulB-portrait.png');

  useEffect(() => {
    let isMounted = true;
    getStudioSettings().then((res) => {
      if (isMounted) setSettings(res);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brandStory: '',
    services: {
      brandIdentity: false,
      webDesign: false,
      motionDesign: false,
    },
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      return;
    }
    setSubmitted(true);
  };

  const handleCheckboxToggle = (key: 'brandIdentity' | 'webDesign' | 'motionDesign') => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [key]: !prev.services[key],
      },
    }));
  };

  return (
    <div className="relative min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-[#FFFFFF] text-[#111111] selection:bg-[#F05245] selection:text-white antialiased font-sans flex flex-col justify-between">
      
      {/* Floating Particles Background Layer */}
      <div
        className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0"
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

      {/* Main Content Area: pb-0 on desktop ensures left portrait touches absolute bottom */}
      <main className="relative z-10 flex-1 w-full h-full max-w-[1540px] mx-auto px-6 sm:px-10 md:px-12 lg:px-14 xl:px-18 pt-20 sm:pt-22 lg:pt-16 pb-0 flex items-stretch">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-14 items-stretch">
          
          {/* =========================================================================
              LEFT COLUMN: HERO PORTRAIT CUTOUT ON PURE WHITE BACKGROUND
              - Bottom of person touches absolute bottom edge of viewport (0 white gap)
              - 3 White circular social icons visible on top of the portrait chest
              ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 relative w-full h-[460px] sm:h-[540px] lg:h-full flex items-end justify-center select-none overflow-hidden pb-0">
            {/* The Cutout Portrait Image from Hero Section anchored flush to bottom: 0 */}
            <img
              src={imgSrc}
              alt="Wonderful Blessed Portrait"
              onError={() => {
                if (imgSrc === '/WonderfulB-portrait.png') {
                  setImgSrc('/assets/WonderfulB-portrait.png');
                } else if (imgSrc === '/assets/WonderfulB-portrait.png' && wonderfulPortraitImg) {
                  setImgSrc(wonderfulPortraitImg);
                } else if (imgSrc !== ASSET_CONFIG.heroPortrait) {
                  setImgSrc(ASSET_CONFIG.heroPortrait);
                }
              }}
              className="block h-full max-h-[calc(100vh-4.5rem)] w-auto max-w-full object-contain object-bottom align-bottom filter contrast-[1.03] brightness-[1.0] select-none pointer-events-none mb-0"
              draggable={false}
            />

            {/* 3 Social Buttons floating comfortably on the lower chest of the portrait */}
            <div className="absolute bottom-8 sm:bottom-10 lg:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3.5 sm:gap-4 select-none">
              <a
                href={settings.socials.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 bg-white text-black hover:text-[#F05245] rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" />
              </a>

              <a
                href={settings.socials.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 bg-white text-black hover:text-[#F05245] rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="w-10 h-10 sm:w-11 sm:h-11 bg-white text-black hover:text-[#F05245] rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
              </a>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: EXACT FORM FROM FRAME 8.PNG
              - Generous multiline textarea for "Tell us about your brand"
              - Services checkboxes & Submit button moved lower down
              - Entire form fits inside 100vh with no scroll
              ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center w-full max-w-[540px] mx-auto lg:mx-0 lg:pl-4 xl:pl-8 pb-8 sm:pb-10 lg:pb-8">
            <BlurFade delay={0.08} blur="10px" className="w-full">
              
              {submitted ? (
                <div className="py-10 sm:py-14 text-center space-y-4 bg-white">
                  <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center mx-auto text-black">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-grotesk font-black text-2xl sm:text-3xl text-[#111111] uppercase tracking-tight">
                    Thank you!
                  </h3>
                  <p className="text-[13.5px] text-[#52525B] max-w-sm mx-auto leading-relaxed">
                    We received your project details and will be in touch within 2 business days.
                  </p>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          brandStory: '',
                          services: { brandIdentity: false, webDesign: false, motionDesign: false },
                        });
                      }}
                      className="font-mono text-xs uppercase tracking-widest text-black hover:text-[#F05245] transition-colors underline underline-offset-4 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  {/* Headline matching Frame 8.png exactly with Red Dot */}
                  <h1 className="font-grotesk font-black text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] text-[#111111] leading-[1.08] tracking-[-0.035em]">
                    Let’s create something <br />
                    extraordinary<span className="text-[#F05245]">.</span>
                  </h1>

                  {/* Subtitle matching Frame 8.png */}
                  <p className="mt-2 mb-3.5 lg:mb-4 text-[13px] sm:text-[13.5px] leading-relaxed text-[#444444] font-normal max-w-lg">
                    Tell us more about your project and let’s schedule a meeting.
                  </p>

                  {/* Form with generous multiline textarea */}
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                    
                    {/* Field 1: Your name* */}
                    <div className="space-y-0.5">
                      <label className="block text-[12px] font-normal text-[#111111]">
                        Your name*
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Smith"
                        className="w-full bg-transparent border-0 border-b border-black/85 focus:border-black rounded-none px-0 py-1 text-[13.5px] text-[#111111] placeholder:text-[#C5C5C5] outline-none focus:ring-0 transition-colors"
                      />
                    </div>

                    {/* Field 2: Your e-mail* */}
                    <div className="space-y-0.5">
                      <label className="block text-[12px] font-normal text-[#111111]">
                        Your e-mail*
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@email.com"
                        className="w-full bg-transparent border-0 border-b border-black/85 focus:border-black rounded-none px-0 py-1 text-[13.5px] text-[#111111] placeholder:text-[#C5C5C5] outline-none focus:ring-0 transition-colors"
                      />
                    </div>

                    {/* Field 3: Tell us about your brand* - Expanded Multiline Textarea */}
                    <div className="space-y-0.5">
                      <label className="block text-[12px] font-normal text-[#111111]">
                        Tell us about your brand*
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.brandStory}
                        onChange={(e) => setFormData({ ...formData, brandStory: e.target.value })}
                        placeholder="Here goes your story"
                        className="w-full bg-transparent border-0 border-b border-black/85 focus:border-black rounded-none px-0 py-1.5 text-[13.5px] text-[#111111] placeholder:text-[#C5C5C5] outline-none focus:ring-0 transition-colors resize-none h-20 sm:h-24 lg:h-24 leading-relaxed"
                      />
                    </div>

                    {/* Field 4: What service are you interested in* - Positioned below the larger textarea */}
                    <div className="space-y-1.5 pt-1">
                      <label className="block text-[12px] font-normal text-[#111111]">
                        What service are you interested in*
                      </label>

                      {/* 3 Checkboxes in single row in Title Case */}
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 pt-0.5">
                        {/* Checkbox 1: Brand Identity */}
                        <label className="flex items-center gap-2 cursor-pointer select-none group">
                          <button
                            type="button"
                            role="checkbox"
                            aria-checked={formData.services.brandIdentity}
                            onClick={() => handleCheckboxToggle('brandIdentity')}
                            className={`w-3.5 h-3.5 rounded-none border border-black/50 flex items-center justify-center transition-colors cursor-pointer ${
                              formData.services.brandIdentity ? 'bg-black border-black text-white' : 'bg-white hover:border-black'
                            }`}
                          >
                            {formData.services.brandIdentity && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </button>
                          <span
                            onClick={() => handleCheckboxToggle('brandIdentity')}
                            className="font-grotesk font-medium text-[12.5px] sm:text-[13px] text-[#111111] group-hover:text-black transition-colors"
                          >
                            Brand Identity
                          </span>
                        </label>

                        {/* Checkbox 2: Web & UIUX */}
                        <label className="flex items-center gap-2 cursor-pointer select-none group">
                          <button
                            type="button"
                            role="checkbox"
                            aria-checked={formData.services.webDesign}
                            onClick={() => handleCheckboxToggle('webDesign')}
                            className={`w-3.5 h-3.5 rounded-none border border-black/50 flex items-center justify-center transition-colors cursor-pointer ${
                              formData.services.webDesign ? 'bg-black border-black text-white' : 'bg-white hover:border-black'
                            }`}
                          >
                            {formData.services.webDesign && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </button>
                          <span
                            onClick={() => handleCheckboxToggle('webDesign')}
                            className="font-grotesk font-medium text-[12.5px] sm:text-[13px] text-[#111111] group-hover:text-black transition-colors"
                          >
                            Web & UIUX
                          </span>
                        </label>

                        {/* Checkbox 3: Motion */}
                        <label className="flex items-center gap-2 cursor-pointer select-none group">
                          <button
                            type="button"
                            role="checkbox"
                            aria-checked={formData.services.motionDesign}
                            onClick={() => handleCheckboxToggle('motionDesign')}
                            className={`w-3.5 h-3.5 rounded-none border border-black/50 flex items-center justify-center transition-colors cursor-pointer ${
                              formData.services.motionDesign ? 'bg-black border-black text-white' : 'bg-white hover:border-black'
                            }`}
                          >
                            {formData.services.motionDesign && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </button>
                          <span
                            onClick={() => handleCheckboxToggle('motionDesign')}
                            className="font-grotesk font-medium text-[12.5px] sm:text-[13px] text-[#111111] group-hover:text-black transition-colors"
                          >
                            Motion
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button (Full Width Red Button - comfortably positioned above bottom) */}
                    <div className="pt-2.5 sm:pt-3">
                      <button
                        type="submit"
                        className="w-full bg-[#F05245] hover:bg-[#d94438] text-white py-3 sm:py-3.5 rounded-none font-grotesk font-bold text-[13.5px] uppercase tracking-wider transition-colors cursor-pointer text-center shadow-sm hover:shadow active:scale-[0.99]"
                      >
                        SUBMIT
                      </button>
                    </div>

                  </form>
                </div>
              )}

            </BlurFade>
          </div>

        </div>
      </main>

    </div>
  );
};

export default ContactPage;
