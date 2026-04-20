'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile, useReducedMotionPreference } from './useResponsiveMotion';

gsap.registerPlugin(ScrollTrigger);

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
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionPreference();
  const isMobile = useIsMobile();

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || prefersReduced || isMobile) return;

    const ctx = gsap.context(() => {
      const getDistance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getDistance() || panelCount * window.innerWidth * 0.6}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [isMobile, panelCount, prefersReduced]);

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

  return (
    <section
      ref={containerRef}
      className={className}
      style={{
        height: `${panelCount * heightPerPanel}vh`,
        position: 'relative',
      }}
    >
      {/*
        Inner wrapper used to be \`position: sticky\` here, which was
        fighting GSAP ScrollTrigger's \`pin: true\` (they both want to
        hold the element in place). GSAP now does the pinning on its
        own \`pinSpacer\`; the wrapper just needs to clip the track and
        size to 100vh. No sticky, no transform on this element.
      */}
      <div style={{
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
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            gap: '40px',
            paddingLeft: '60px',
            paddingRight: '60px',
            width: 'max-content',
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
