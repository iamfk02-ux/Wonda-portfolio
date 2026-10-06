import React from 'react';
import { EditorialHero } from '../components/EditorialHero';
import { IntroSection } from '../components/IntroSection';
import { StudioStatsSection } from '../components/StudioStatsSection';
import { SelectedProjectsSection } from '../components/SelectedProjectsSection';
import { WhatIDoSection } from '../components/WhatIDoSection';
import { FooterCTA } from '../components/FooterCTA';

export const HomePage: React.FC = () => {
  const handleScrollToSelectedWork = () => {
    const el = document.getElementById('selected-work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#111111] selection:bg-[#F05245] selection:text-white antialiased font-sans">
      
      {/* 1. HERO (Light mode with OGL particles & cursor interaction) */}
      <EditorialHero
        onViewWork={handleScrollToSelectedWork}
      />

      {/* 2. ABOUT (Who I am & Statement with scroll text effect) */}
      <IntroSection
        onViewWork={handleScrollToSelectedWork}
      />

      {/* 3. STUDIO STATS (Metrics & Practice) */}
      <StudioStatsSection />

      {/* 4. SELECTED WORK (What I’ve done — Light Mode) */}
      <SelectedProjectsSection
        isLightMode={true}
      />

      {/* 5. SERVICES (What I do — Light Mode) */}
      <WhatIDoSection isLightMode={true} />

      {/* 6. FOOTER / CTA (Work with me) */}
      <FooterCTA />
    </div>
  );
};

export default HomePage;
