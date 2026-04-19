'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  /** Number of panels — used as fallback when measuring scrollWidth. */
  panelCount?: number;
  /** Kept for backward compatibility — no longer affects GSAP pin behavior. */
  heightPerPanel?: number;
  title?: string;
  subtitle?: string;
}

/**
 * HorizontalScroll — GSAP ScrollTrigger pinned horizontal scroll showcase.
 * Section pins to viewport while content translates horizontally based on scroll progress.
 * Uses scrub for smooth tween linked to scroll velocity.
 *
 * Mobile fallback: standard vertical layout (no pin, no transform).
 * Respects prefers-reduced-motion (skips the pinned scroll, falls back to vertical).
 */
export function HorizontalScroll({
  children,
  className = '',
  title,
  subtitle,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    setPrefersReduced(mq.matches);
    checkMobile();
    const handleMq = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handleMq);
    window.addEventListener('resize', checkMobile);
    return () => {
      mq.removeEventListener('change', handleMq);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || isMobile || prefersReduced) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [isMobile, prefersReduced]);

  // Mobile / reduced-motion fallback: vertical stack
  if (isMobile || prefersReduced) {
    return (
      <section className={className}>
        {(title || subtitle) && (
          <div style={{ padding: '60px 20px 30px' }}>
            {title && (
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '28px',
                  fontWeight: 200,
                  color: '#050505',
                  letterSpacing: '-0.02em',
                  marginBottom: subtitle ? '12px' : 0,
                }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  color: '#6B6B6B',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase' as const,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '0 20px 60px',
          }}
        >
          {children}
        </div>
      </section>
    );
  }

  // Desktop: GSAP pinned horizontal scroll
  return (
    <section
      ref={containerRef}
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {(title || subtitle) && (
          <div style={{ padding: '40px 60px 20px', flexShrink: 0 }}>
            {title && (
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 200,
                  color: '#050505',
                  letterSpacing: '-0.02em',
                  marginBottom: subtitle ? '12px' : 0,
                }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  color: '#6B6B6B',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase' as const,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            gap: '40px',
            paddingLeft: '60px',
            paddingRight: '60px',
            willChange: 'transform',
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

interface HorizontalPanelProps {
  children: ReactNode;
  className?: string;
  /** Panel width. Default '80vw' */
  width?: string;
}

/**
 * HorizontalPanel — Individual panel within HorizontalScroll.
 */
export function HorizontalPanel({
  children,
  className = '',
  width = '80vw',
}: HorizontalPanelProps) {
  return (
    <div
      className={className}
      style={{
        minWidth: width,
        width,
        flexShrink: 0,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
}
