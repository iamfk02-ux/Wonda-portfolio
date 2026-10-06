import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'card' | 'pointer' | 'dragging'>('default');
  const [cursorText, setCursorText] = useState('More +');
  const [isClicking, setIsClicking] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);

      // Instant 1:1 direct tracking with ZERO delay
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if dragging
      if (document.body.classList.contains('is-dragging-portfolio')) {
        setCursorType('dragging');
        return;
      }

      // Check if hovering over project card (shows 'VIEW PROJECT' circular badge)
      const projectCard = target.closest('[data-cursor], .project-card, [data-project-card]');
      if (projectCard) {
        setCursorType('card');
        const text = projectCard.getAttribute('data-cursor') || 'VIEW PROJECT';
        setCursorText(text);
        return;
      }

      // Check interactive links, buttons, controls
      const interactive = target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer');
      if (interactive) {
        setCursorType('pointer');
        setCursorText('');
        return;
      }

      // Default: clean circular dot from video 00:01 & 00:02
      setCursorType('default');
      setCursorText('');
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform hidden md:block"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
        // No transitions on position for instant zero-latency tracking
        transition: 'none',
      }}
    >
      {/* 1. Project Card Mode: Vibrant red-orange circular disc with 'VIEW PROJECT' (No shadow, no glow) */}
      {cursorType === 'card' && (
        <div
          className={`-translate-x-1/2 -translate-y-1/2 w-[84px] h-[84px] sm:w-[90px] sm:h-[90px] rounded-full bg-[#FF3B14] text-black font-mono font-medium sm:font-semibold text-[10px] sm:text-[10.5px] tracking-wider uppercase shadow-none flex items-center justify-center select-none pointer-events-none transition-transform duration-150 ease-out ${
            isClicking ? 'scale-90' : 'scale-100'
          }`}
        >
          <span className="leading-none text-center select-none">VIEW PROJECT</span>
        </div>
      )}

      {/* 2. Dragging Mode: Grab indicator */}
      {cursorType === 'dragging' && (
        <div className="-translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-[#F05245] text-white font-mono text-[10px] tracking-widest uppercase font-bold shadow-xl">
          DRAG
        </div>
      )}

      {/* 3. Interactive Pointer Mode (Links / Buttons) */}
      {cursorType === 'pointer' && (
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference">
          <div
            className={`w-8 h-8 rounded-full border border-white/80 bg-white/20 transition-transform duration-100 ${
              isClicking ? 'scale-75' : 'scale-100'
            }`}
          />
          <div className="absolute w-2 h-2 rounded-full bg-white" />
        </div>
      )}

      {/* 4. Default Mode (Clean translucent circular disc with inversion across light and dark backgrounds) */}
      {cursorType === 'default' && (
        <div
          className={`-translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/80 border border-white/40 shadow-sm transition-transform duration-100 mix-blend-difference ${
            isClicking ? 'scale-75' : 'scale-100'
          }`}
        />
      )}
    </div>
  );
};
