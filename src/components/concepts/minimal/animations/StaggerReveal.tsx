'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { useInView } from 'framer-motion';

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
  duration = 500,
  direction = 'up',
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const getTransform = (visible: boolean) => {
    if (visible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up': return 'translate3d(0, 40px, 0)';
      case 'left': return 'translate3d(-40px, 0, 0)';
      case 'right': return 'translate3d(40px, 0, 0)';
    }
  };

  if (prefersReduced) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  // Convert children to array for stagger indexing
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, i) => (
        <div
          key={i}
          style={{
            transform: isInView ? getTransform(true) : getTransform(false),
            opacity: isInView ? 1 : 0,
            transition: `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * stagger}ms, opacity ${duration}ms ease ${i * stagger}ms`,
            willChange: isInView ? 'auto' : 'transform, opacity',
          }}
        >
          {child}
        </div>
      ))}
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
  const getTransform = (visible: boolean) => {
    if (visible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up': return 'translate3d(0, 40px, 0)';
      case 'left': return 'translate3d(-40px, 0, 0)';
      case 'right': return 'translate3d(40px, 0, 0)';
    }
  };

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={className}
      style={{
        transform: isInView ? getTransform(true) : getTransform(false),
        opacity: isInView ? 1 : 0,
        transition: `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * stagger}ms, opacity ${duration}ms ease ${index * stagger}ms`,
        willChange: isInView ? 'auto' : 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}
