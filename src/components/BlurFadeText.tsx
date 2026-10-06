import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export interface BlurFadeTextProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'li';
  delay?: number;
  duration?: number;
  blur?: string;
  yOffset?: number;
  stagger?: number;
  once?: boolean;
  animateBy?: 'words' | 'characters' | 'none';
}

/**
 * BlurFadeText: Cinematic Gaussian-blur text reveal matching the reference video.
 * Elements transition from blur(12px) + opacity 0 + translateY into crisp blur(0px) focus.
 */
export const BlurFadeText: React.FC<BlurFadeTextProps> = ({
  text,
  children,
  className = '',
  as: Component = 'div',
  delay = 0,
  duration = 0.75,
  blur = '12px',
  yOffset = 20,
  stagger = 0.035,
  once = false,
  animateBy = 'words',
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, amount: 0.15 });
  const shouldReduceMotion = useReducedMotion();

  // If text is provided and splitting is requested
  const rawText = text || (typeof children === 'string' ? children : null);

  if (rawText && animateBy === 'words' && !shouldReduceMotion) {
    const words = rawText.split(' ');

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    };

    const wordVariants = {
      hidden: {
        opacity: 0,
        y: yOffset,
        filter: `blur(${blur})`,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      },
    };

    // Use motion[Component] for semantic markup
    const MotionComponent = motion[Component] as any;

    return (
      <MotionComponent
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className={className}
        aria-label={rawText}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="inline-block whitespace-pre will-change-[transform,filter,opacity]"
          >
            {word}
            {i !== words.length - 1 && ' '}
          </motion.span>
        ))}
      </MotionComponent>
    );
  }

  // Block-level whole text / children blur fade
  const MotionComponent = motion[Component] as any;

  if (shouldReduceMotion) {
    return (
      <MotionComponent ref={ref} className={className}>
        {text || children}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      ref={ref}
      initial={{
        opacity: 0,
        y: yOffset,
        filter: `blur(${blur})`,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }
          : {
              opacity: 0,
              y: yOffset,
              filter: `blur(${blur})`,
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className={`will-change-[transform,filter,opacity] ${className}`}
    >
      {text || children}
    </MotionComponent>
  );
};

export interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  blur?: string;
  yOffset?: number;
  once?: boolean;
  as?: 'div' | 'li' | 'span' | 'article' | 'section';
}

/**
 * BlurFade: Container wrapper for list items, stat cards, and UI blocks
 * that gracefully reveals children with a gaussian blur fade into focus.
 */
export const BlurFade: React.FC<BlurFadeProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.75,
  blur = '12px',
  yOffset = 22,
  once = false,
  as: Component = 'div',
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, amount: 0.15 });
  const shouldReduceMotion = useReducedMotion();

  const MotionComponent = motion[Component] as any;

  if (shouldReduceMotion) {
    return (
      <MotionComponent ref={ref} className={className}>
        {children}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      ref={ref}
      initial={{
        opacity: 0,
        y: yOffset,
        filter: `blur(${blur})`,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }
          : {
              opacity: 0,
              y: yOffset,
              filter: `blur(${blur})`,
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className={`will-change-[transform,filter,opacity] ${className}`}
    >
      {children}
    </MotionComponent>
  );
};

export default BlurFadeText;
