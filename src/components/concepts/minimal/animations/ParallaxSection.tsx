'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** Speed multiplier. 0 = no parallax, 0.5 = half speed, -0.3 = reverse. Default 0.3 */
  speed?: number;
  /** ScrollTrigger range. Default ['top bottom', 'bottom top'] */
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
  offset = ['top bottom', 'bottom top'],
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);

    // Check mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mq.removeEventListener('change', handler);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced || isMobile) return;
    const yDistance = -100 * speed;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: yDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: offset[0],
          end: offset[1],
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [isMobile, offset, prefersReduced, speed]);

  return <div ref={ref} className={className}>{children}</div>;
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
  const ref = useRef<HTMLImageElement>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mq.removeEventListener('change', handler);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced || isMobile) return;

    const yDistance = -100 * speed;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: yDistance,
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
  }, [isMobile, prefersReduced, speed]);

  return (
    <div className={className} style={{ overflow: 'hidden' }}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: prefersReduced || isMobile ? 'none' : `scale(${scale})`,
        }}
      />
    </div>
  );
}
