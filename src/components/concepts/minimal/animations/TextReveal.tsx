'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotionPreference } from './useResponsiveMotion';

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
 * TextReveal — GSAP ScrollTrigger clip-path headline reveal.
 * Text wipes in from left-to-right (or bottom-to-top) using clipPath,
 * triggered when the element enters the viewport at `top 85%`.
 *
 * Honors prefers-reduced-motion (skips the animation entirely; shows
 * the element immediately without applying the initial clip).
 *
 * SSR: useReducedMotionPreference returns false on the server, so the
 * server-rendered markup matches the first client render — no hydration
 * mismatch. The initial clip is applied via inline style to prevent a
 * flash of unclipped content before the useEffect hydrates GSAP.
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
    if (!el) return;

    // Reduced-motion clients: clear any pre-applied clip so the text shows.
    if (prefersReduced) {
      el.style.clipPath = '';
      el.style.willChange = '';
      return;
    }

    const ctx = gsap.context(() => {
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
  // Apply initial clip inline to eliminate first-paint flash before useEffect.
  // On the server (and reduced-motion clients) this still renders the same
  // value — the post-mount effect clears it for reduced-motion users.
  const initialStyle: React.CSSProperties = { clipPath: hiddenClip };
  return (
    <Tag ref={ref as never} className={className} style={initialStyle}>
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
      gsap.set(items, { yPercent: 110, autoAlpha: 1 });
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
