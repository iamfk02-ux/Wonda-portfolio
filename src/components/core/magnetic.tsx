'use client';

import React, { useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from 'framer-motion';

const DEFAULT_SPRING_CONFIG: SpringOptions = {
  damping: 20,
  stiffness: 260,
  mass: 0.5,
};

export type MagneticProps = {
  children: React.ReactNode;
  intensity?: number;
  range?: number;
  actionArea?: 'self' | 'parent' | 'global';
  springOptions?: SpringOptions;
  className?: string;
  style?: React.CSSProperties;
};

export function Magnetic({
  children,
  intensity = 0.12,
  range = 120,
  actionArea = 'self',
  springOptions = DEFAULT_SPRING_CONFIG,
  className = '',
  style = {},
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const { clientX, clientY } = e;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      if (actionArea === 'self') {
        const isInside =
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom;

        if (isInside) {
          x.set((clientX - centerX) * intensity);
          y.set((clientY - centerY) * intensity);
        } else {
          x.set(0);
          y.set(0);
        }
      } else {
        const distance = Math.hypot(clientX - centerX, clientY - centerY);
        if (distance < range) {
          x.set((clientX - centerX) * intensity);
          y.set((clientY - centerY) * intensity);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const element = ref.current;
    if (!element) return;

    if (actionArea === 'self') {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    } else if (actionArea === 'parent') {
      const parent = element.parentElement;
      if (parent) {
        parent.addEventListener('mousemove', handleMouseMove);
        parent.addEventListener('mouseleave', handleMouseLeave);
        return () => {
          parent.removeEventListener('mousemove', handleMouseMove);
          parent.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    } else {
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [actionArea, intensity, range, x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        x: springX,
        y: springY,
      }}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
