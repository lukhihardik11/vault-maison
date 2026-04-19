'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay between children (ms). Default 80 */
  stagger?: number;
  /** Animation duration per child (ms). Default 500 */
  duration?: number;
  /** Direction children animate from. Default 'up' */
  direction?: 'up' | 'left' | 'right';
}

/**
 * StaggerReveal — Staggered child element reveals
 * Wraps children and animates them in with staggered timing.
 * Each direct child slides in from the specified direction.
 * Respects prefers-reduced-motion (shows immediately).
 * 
 * Does NOT use initial={{ opacity: 0 }} — uses CSS transitions only.
 */
export function StaggerReveal({
  children,
  className = '',
  stagger = 80,
  duration = 800,
  direction = 'up',
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const items = Array.from(el.children);
    if (!items.length) return;

    const fromVars =
      direction === 'left'
        ? { x: -40, y: 0, autoAlpha: 0 }
        : direction === 'right'
          ? { x: 40, y: 0, autoAlpha: 0 }
          : { x: 0, y: 40, autoAlpha: 0 };

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
  }, [direction, duration, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
  stagger?: number;
  duration?: number;
  direction?: 'up' | 'left' | 'right';
  isInView?: boolean;
  prefersReduced?: boolean;
}

/**
 * StaggerItem — Individual stagger-animated item
 * Use when you need more control over the grid layout (e.g., CSS Grid).
 * Parent must provide isInView and prefersReduced props.
 */
export function StaggerItem({
  children,
  className = '',
  index = 0,
  stagger = 80,
  duration = 500,
  direction = 'up',
  isInView = false,
  prefersReduced = false,
}: StaggerItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const fromVars =
      direction === 'left'
        ? { x: -40, y: 0, autoAlpha: 0 }
        : direction === 'right'
          ? { x: 40, y: 0, autoAlpha: 0 }
          : { x: 0, y: 40, autoAlpha: 0 };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        fromVars,
        {
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration: duration / 1000,
          delay: (index * stagger) / 1000,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [direction, duration, index, stagger, isInView]);

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}
