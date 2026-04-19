'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  /** Number of panels/cards. Used to calculate scroll height. */
  panelCount: number;
  /** Height multiplier per panel in vh. Default 100 */
  heightPerPanel?: number;
  /** Section title displayed above the scroll area */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

/**
 * HorizontalScroll — Pinned horizontal scroll showcase
 * Container sticks to viewport while content scrolls horizontally.
 * Vertical scroll is converted to horizontal translation.
 * 
 * Mobile fallback: standard vertical scroll with snap.
 * Respects prefers-reduced-motion (instant scroll, no spring).
 */
export function HorizontalScroll({
  children,
  className = '',
  panelCount,
  heightPerPanel = 100,
  title,
  subtitle,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform vertical scroll to horizontal translation
  // Move from 0% to -(panelCount - 1) * 100vw
  const xRaw = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `${-(panelCount - 1) * 100}%`]
  );

  const x = useSpring(xRaw, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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

  // Mobile: vertical scroll with snap
  if (isMobile) {
    return (
      <section className={className}>
        {(title || subtitle) && (
          <div style={{ padding: '60px 20px 30px', backgroundColor: '#FFFFFF' }}>
            {title && (
              <h2 style={{
                fontFamily: 'var(--font-heading, system-ui)',
                fontSize: '28px',
                fontWeight: 700,
                color: '#050505',
                letterSpacing: '-0.02em',
                marginBottom: subtitle ? '12px' : '0',
              }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p style={{
                fontFamily: 'var(--font-body, system-ui)',
                fontSize: '14px',
                color: '#6B6B6B',
                letterSpacing: '0.02em',
                textTransform: 'uppercase' as const,
              }}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '0 20px 60px',
        }}>
          {children}
        </div>
      </section>
    );
  }

  // Desktop: pinned horizontal scroll
  return (
    <section
      ref={containerRef}
      className={className}
      style={{
        height: `${panelCount * heightPerPanel}vh`,
        position: 'relative',
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        {(title || subtitle) && (
          <div style={{
            padding: '40px 60px 20px',
            flexShrink: 0,
          }}>
            {title && (
              <h2 style={{
                fontFamily: 'var(--font-heading, system-ui)',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 700,
                color: '#050505',
                letterSpacing: '-0.02em',
                marginBottom: subtitle ? '12px' : '0',
              }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p style={{
                fontFamily: 'var(--font-body, system-ui)',
                fontSize: '14px',
                color: '#6B6B6B',
                letterSpacing: '0.05em',
                textTransform: 'uppercase' as const,
              }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Scrolling track */}
        <motion.div
          style={{
            x: prefersReduced ? xRaw : x,
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            gap: '40px',
            paddingLeft: '60px',
            paddingRight: '60px',
          }}
        >
          {children}
        </motion.div>
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
 * HorizontalPanel — Individual panel within HorizontalScroll
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
        width: width,
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
