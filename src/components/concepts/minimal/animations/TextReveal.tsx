'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Animation duration (ms). Default 600 */
  duration?: number;
  /** Direction of the wipe. Default 'left' (wipes from left to right) */
  direction?: 'left' | 'bottom';
  /** Tag to render. Default 'div' */
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

/**
 * TextReveal — Clip-path headline reveal animation
 * Text "wipes" in from left-to-right (or bottom-to-top) using clipPath.
 * Triggered when element enters viewport.
 * Respects prefers-reduced-motion (shows immediately).
 * 
 * Uses CSS transitions instead of Framer Motion initial={{ opacity: 0 }}
 * to avoid blank page issues.
 */
export function TextReveal({
  children,
  className = '',
  delay = 0,
  duration = 600,
  direction = 'left',
  as = 'div',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Clip-path values for different directions
  const clipHidden = direction === 'left'
    ? 'inset(0 100% 0 0)'
    : 'inset(100% 0 0 0)';
  const clipVisible = 'inset(0 0% 0 0)';

  const MotionTag = motion[as] as typeof motion.div;

  if (prefersReduced) {
    return (
      <MotionTag ref={ref} className={className}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={{
        clipPath: isInView ? clipVisible : clipHidden,
        transition: `clip-path ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        willChange: isInView ? 'auto' : 'clip-path',
      }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * SplitTextReveal — Staggered character/word reveal
 * Each word animates in from below with stagger timing.
 */
interface SplitTextRevealProps {
  text: string;
  className?: string;
  /** Stagger delay between words (ms). Default 40 */
  stagger?: number;
  /** Animation duration per word (ms). Default 500 */
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export function SplitTextReveal({
  text,
  className = '',
  stagger = 40,
  duration = 500,
  as: Tag = 'h2',
}: SplitTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const words = text.split(' ');

  if (prefersReduced) {
    return <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>{text}</Tag>;
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            transform: isInView ? 'translateY(0)' : 'translateY(110%)',
            opacity: isInView ? 1 : 0,
            transition: `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * stagger}ms, opacity ${duration}ms ease ${i * stagger}ms`,
            willChange: isInView ? 'auto' : 'transform',
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
