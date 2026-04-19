'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile, useReducedMotionPreference } from './useResponsiveMotion';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** Speed multiplier. 0 = no parallax, 0.5 = half speed, -0.3 = reverse. Default 0.3 */
  speed?: number;
  /** Scroll offset range. Default ['start end', 'end start'] */
  offset?: [string, string];
}

/**
 * ParallaxSection — Scroll-linked parallax depth layer
 * Moves children at a different speed than the scroll.
 * speed > 0: moves slower than scroll (background feel)
 * speed < 0: moves faster/opposite (foreground feel)
 * 
 * Respects prefers-reduced-motion (disables parallax, shows static).
 * Disabled on mobile (< 768px) for performance.
 */
export function ParallaxSection({
  children,
  className = '',
  speed = 0.3,
  offset = ['start end', 'end start'],
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionPreference();
  const isMobile = useIsMobile();

  const disabled = prefersReduced || isMobile;

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner || disabled) return;

    const [start, end] = offset;
    const ctx = gsap.context(() => {
      gsap.to(inner, {
        y: () => -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, offset, speed]);

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <div ref={innerRef}>
        {children}
      </div>
    </div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Speed multiplier. Default 0.2 */
  speed?: number;
  /** Extra scale to prevent gaps during parallax. Default 1.15 */
  scale?: number;
}

/**
 * ParallaxImage — Image with parallax scroll effect
 * Image moves at a different rate than scroll, creating depth.
 * Slightly scaled up to prevent white gaps at edges.
 */
export function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.2,
  scale = 1.15,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const prefersReduced = useReducedMotionPreference();
  const isMobile = useIsMobile();

  const disabled = prefersReduced || isMobile;

  useEffect(() => {
    const el = ref.current;
    const img = imgRef.current;
    if (!el || !img || disabled) return;

    const ctx = gsap.context(() => {
      gsap.set(img, { scale });
      gsap.to(img, {
        y: -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, scale, speed]);

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: disabled ? 'none' : `scale(${scale})`,
        }}
      />
    </div>
  );
}
