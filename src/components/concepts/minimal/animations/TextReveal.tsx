'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  duration = 1200,
  direction = 'left',
  as = 'div',
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const fromClip = direction === 'left' ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)';

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: fromClip },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: duration / 1000,
          ease: 'power3.out',
          delay: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, direction, duration]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
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
  duration = 700,
  as: Tag = 'h2',
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const wordEls = el.querySelectorAll('[data-split-word]');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordEls,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: duration / 1000,
          stagger: stagger / 1000,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [duration, stagger, words.length]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          data-split-word
          style={{ display: 'inline-block' }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
