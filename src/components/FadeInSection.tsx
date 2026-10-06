import React, { useEffect, useRef, useState } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number | number[];
  rootMargin?: string;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  threshold = [0, 0.05, 0.1],
  rootMargin = '140px 0px -5% 0px', // Proactive pre-calculation to completely prevent scroll lag
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [threshold, rootMargin]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-500 ease-out will-change-transform ${
        isVisible
          ? 'opacity-100 transform-none'
          : 'opacity-0 translate-y-3 pointer-events-none transform-gpu'
      } ${className}`}
    >
      {children}
    </div>
  );
};
