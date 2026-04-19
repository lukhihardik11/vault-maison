'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  // Convert speed to pixel range: speed * viewport height
  const yRange = speed * 200;
  const y = useTransform(scrollYProgress, [0, 1], [-yRange, yRange]);

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

  const disabled = prefersReduced || isMobile;

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        style={disabled ? undefined : { y }}
      >
        {children}
      </motion.div>
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
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yRange = speed * 200;
  const y = useTransform(scrollYProgress, [0, 1], [-yRange, yRange]);

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

  const disabled = prefersReduced || isMobile;

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.img
        src={src}
        alt={alt}
        style={disabled ? { width: '100%', height: '100%', objectFit: 'cover' } : {
          y,
          scale,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}
