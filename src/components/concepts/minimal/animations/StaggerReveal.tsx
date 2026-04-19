'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay between children (ms). Default 80 */
  stagger?: number;
  /** Animation duration per child (ms). Default 800 */
  duration?: number;
  /** Direction children animate from. Default 'up' */
  direction?: 'up' | 'left' | 'right';
}

/**
 * StaggerReveal — GSAP ScrollTrigger staggered child reveals.
 * Each direct child slides in from the specified direction with stagger timing.
 * Uses gsap.to with stagger and ScrollTrigger (toggleActions: play none none none).
 * Respects prefers-reduced-motion (shows immediately).
 */
export function StaggerReveal({
  children,
  className = '',
  stagger = 80,
  duration = 800,
  direction = 'up',
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
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
    const items = el.children;
    if (!items.length) return;

    const fromVars: gsap.TweenVars = { autoAlpha: 0 };
    if (direction === 'up') fromVars.y = 40;
    if (direction === 'left') fromVars.x = -40;
    if (direction === 'right') fromVars.x = 40;

    const ctx = gsap.context(() => {
      gsap.set(items, fromVars);
      gsap.to(items, {
        x: 0,
        y: 0,
        autoAlpha: 1,
        duration: duration / 1000,
        stagger: stagger / 1000,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, duration, direction, prefersReduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  /** Kept for backward compatibility — no longer used. GSAP handles staggering automatically. */
  index?: number;
  stagger?: number;
  duration?: number;
  direction?: 'up' | 'left' | 'right';
  /** Kept for backward compatibility — ignored. */
  isInView?: boolean;
  /** Kept for backward compatibility — ignored. */
  prefersReduced?: boolean;
}

/**
 * StaggerItem — Individual stagger-animated item (legacy compatibility).
 * Use this when you can't wrap children directly (e.g., grid layouts).
 * Each item self-registers a ScrollTrigger that triggers when it enters view.
 */
export function StaggerItem({
  children,
  className = '',
  index = 0,
  stagger = 80,
  duration = 800,
  direction = 'up',
}: StaggerItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    const fromVars: gsap.TweenVars = { autoAlpha: 0 };
    if (direction === 'up') fromVars.y = 40;
    if (direction === 'left') fromVars.x = -40;
    if (direction === 'right') fromVars.x = 40;

    const ctx = gsap.context(() => {
      gsap.set(el, fromVars);
      gsap.to(el, {
        x: 0,
        y: 0,
        autoAlpha: 1,
        duration: duration / 1000,
        delay: (index * stagger) / 1000,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, el);

    return () => ctx.revert();
  }, [index, stagger, duration, direction, prefersReduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
