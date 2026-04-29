'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotionPreference } from './useResponsiveMotion';

gsap.registerPlugin(ScrollTrigger);

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  direction?: 'up' | 'left' | 'right';
}

export function StaggerReveal({
  children,
  className = '',
  stagger = 80,
  duration = 500,
  direction = 'up',
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionPreference();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    const items = Array.from(el.children);
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.set(items, {
        x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
        y: direction === 'up' ? 40 : 0,
        opacity: 0,
      });
      gsap.to(items, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: duration / 1000,
        stagger: stagger / 1000,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [direction, duration, prefersReduced, stagger]);

  return <div ref={ref} className={className}>{children}</div>;
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

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced || !isInView) return;

    const ctx = gsap.context(() => {
      gsap.set(el, {
        x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
        y: direction === 'up' ? 40 : 0,
        opacity: 0,
      });
      gsap.to(el, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: duration / 1000,
        delay: (index * stagger) / 1000,
        ease: 'power2.out',
      });
    }, el);

    return () => ctx.revert();
  }, [direction, duration, index, isInView, prefersReduced, stagger]);

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}
