'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** Speed multiplier. 0 = no parallax, positive = slower (background), negative = faster/opposite. Default 0.3 */
  speed?: number;
  /** Kept for backward compatibility — no longer used by GSAP implementation. */
  offset?: [string, string];
}

/**
 * ParallaxSection — GSAP ScrollTrigger scroll-linked parallax depth layer.
 * Moves children at a different speed than scroll using scrub.
 * Disabled on mobile (< 768px) and when prefers-reduced-motion is set.
 */
export function ParallaxSection({
  children,
  className = '',
  speed = 0.3,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkDisabled = () =>
      setDisabled(mq.matches || window.innerWidth < 768);
    checkDisabled();
    const handleMq = () => checkDisabled();
    mq.addEventListener('change', handleMq);
    window.addEventListener('resize', checkDisabled);
    return () => {
      mq.removeEventListener('change', handleMq);
      window.removeEventListener('resize', checkDisabled);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner || disabled) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { y: -100 * speed },
        {
          y: 100 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed, disabled]);

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <div ref={innerRef}>{children}</div>
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
 * ParallaxImage — Image with GSAP-driven parallax scroll effect.
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
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkDisabled = () =>
      setDisabled(mq.matches || window.innerWidth < 768);
    checkDisabled();
    const handleMq = () => checkDisabled();
    mq.addEventListener('change', handleMq);
    window.addEventListener('resize', checkDisabled);
    return () => {
      mq.removeEventListener('change', handleMq);
      window.removeEventListener('resize', checkDisabled);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    const img = imgRef.current;
    if (!el || !img || disabled) return;

    const ctx = gsap.context(() => {
      gsap.set(img, { scale });
      gsap.fromTo(
        img,
        { y: -100 * speed },
        {
          y: 100 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed, scale, disabled]);

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transform: disabled ? 'none' : `scale(${scale})`,
        }}
      />
    </div>
  );
}
