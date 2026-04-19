'use client';

import { useRef, useEffect, useState, ReactNode, createElement } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
 * Text wipes in from left-to-right (or bottom-to-top) when it enters the viewport.
 * Powered by gsap.fromTo + ScrollTrigger (toggleActions: play none none none).
 * Respects prefers-reduced-motion (shows immediately, no animation).
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
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    const fromClip = direction === 'left' ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)';
    const toClip = 'inset(0 0% 0 0)';

    const ctx = gsap.context(() => {
      gsap.set(el, { clipPath: fromClip, willChange: 'clip-path' });
      gsap.to(el, {
        clipPath: toClip,
        duration: duration / 1000,
        delay: delay / 1000,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          if (el) el.style.willChange = 'auto';
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, duration, direction, prefersReduced]);

  return createElement(as, { ref, className }, children);
}

interface SplitTextRevealProps {
  text: string;
  className?: string;
  stagger?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

/**
 * SplitTextReveal — Word-by-word stagger reveal using GSAP ScrollTrigger.
 * Each word slides up from below with stagger timing.
 */
export function SplitTextReveal({
  text,
  className = '',
  stagger = 40,
  duration = 700,
  as = 'h2',
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll<HTMLSpanElement>('[data-word]');
      if (!words.length) return;

      gsap.set(words, { yPercent: 110, autoAlpha: 0 });
      gsap.to(words, {
        yPercent: 0,
        autoAlpha: 1,
        duration: duration / 1000,
        stagger: stagger / 1000,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, duration, prefersReduced]);

  const words = text.split(' ');

  return createElement(
    as,
    {
      ref,
      className,
      style: {
        overflow: 'hidden',
        display: 'flex',
        flexWrap: 'wrap' as const,
        gap: '0 0.3em',
      },
    },
    words.map((word, i) => (
      <span
        key={i}
        data-word
        style={{ display: 'inline-block', willChange: 'transform, opacity' }}
      >
        {word}
      </span>
    ))
  );
}
