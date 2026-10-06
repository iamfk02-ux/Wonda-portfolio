import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EditorialPreloader } from './components/EditorialPreloader';
import { CustomCursor } from './components/CustomCursor';
import { BackToTop } from './components/BackToTop';
import { SiteNavigation } from './components/SiteNavigation';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { ContactPage } from './pages/ContactPage';
import { ResumePage } from './pages/ResumePage';

export function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#FFFFFF] text-[#111111] selection:bg-[#F05245] selection:text-white antialiased font-sans">
        
        {/* Automatic Scroll Reset on Route Change */}
        <ScrollToTop />

        {/* Hidden Editorial Preloader for High-Res Assets & Portrait */}
        <EditorialPreloader />

        {/* Universal Dynamic Custom Cursor */}
        <CustomCursor />

        {/* Persistent Inverting Navigation Bar (Logo + Menu + Fullscreen Overlay) */}
        <SiteNavigation />

        {/* Minimal Floating Back to Top Button */}
        <BackToTop />

        {/* Application Page Routes */}
        <Routes>
          {/* 1. Homepage: Hero → Selected Work → Services → Testimonials → Footer/CTA */}
          <Route path="/" element={<HomePage />} />

          {/* 2. Projects redirect to homepage projects section */}
          <Route path="/work" element={<Navigate to="/#selected-work" replace />} />

          {/* 3. Dedicated Project Case Study */}
          <Route path="/work/:slug" element={<CaseStudyPage />} />

          {/* 4. About redirects to homepage about section */}
          <Route path="/about" element={<Navigate to="/#about" replace />} />

          {/* 5. Dedicated Contact / Inquiry Page */}
          <Route path="/contact" element={<ContactPage />} />

          {/* 6. Dedicated Resume / CV Page */}
          <Route path="/resume" element={<ResumePage />} />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
