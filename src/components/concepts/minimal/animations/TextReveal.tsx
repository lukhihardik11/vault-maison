'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotionPreference } from './useResponsiveMotion';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'bottom';
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

/**
 * TextReveal — GSAP ScrollTrigger clip-path headline reveal.
 * 
 * IMPORTANT: No inline hidden styles on initial render. Content is
 * visible by default. GSAP applies the clip only after hydration,
 * ensuring content is never permanently hidden if JS fails.
 */
export function TextReveal({
  children,
  className = '',
  delay = 0,
  duration = 600,
  direction = 'left',
  as = 'div',
}: TextRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotionPreference();
  const hiddenClip =
    direction === 'left' ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)';

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    const ctx = gsap.context(() => {
      // Apply clip ONLY after JS hydrates — never in SSR/inline
      gsap.set(el, { clipPath: hiddenClip, willChange: 'clip-path' });
      gsap.to(el, {
        clipPath: 'inset(0 0% 0 0)',
        duration: duration / 1000,
        delay: delay / 1000,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none none',
          once: true,
        },
        onComplete: () => {
          el.style.willChange = '';
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, direction, duration, hiddenClip, prefersReduced]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

/**
 * SplitTextReveal — Staggered word reveal.
 * Content visible by default; GSAP applies yPercent only after mount.
 */
interface SplitTextRevealProps {
  text: string;
  className?: string;
  stagger?: number;
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
  const ref = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotionPreference();

  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    const items = el.querySelectorAll('[data-split-word]');
    if (!items.length) return;

    const ctx = gsap.context(() => {
      // Apply hidden state only after JS mount
      gsap.set(items, { yPercent: 110 });
      gsap.to(items, {
        yPercent: 0,
        duration: duration / 1000,
        stagger: stagger / 1000,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [duration, prefersReduced, stagger]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <span data-split-word style={{ display: 'inline-block' }}>
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
