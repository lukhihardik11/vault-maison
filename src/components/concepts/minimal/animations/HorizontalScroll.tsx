'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile, useReducedMotionPreference } from './useResponsiveMotion';
import { minimal } from '../design-system';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  /**
   * Number of panels/cards.
   *
   * Previously used as a vh multiplier for the outer section height
   * (`panelCount * heightPerPanel vh`), which caused a big empty block
   * after the section: the outer container was sized to, e.g., 500vh,
   * but GSAP's pin only ran for the horizontal translate distance
   * (a few thousand px). Anything past the pin end was empty runway.
   *
   * Now kept only for the mobile fallback (semantic count of items)
   * and retained in the type for backward compatibility.
   */
  panelCount: number;
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

      // Size the outer section = `distance + 100vh`. Combined with the
      // inner wrapper's `position: sticky; top: 0; height: 100vh`, this
      // means the inner sticks for `section.height - 100vh === distance`
      // pixels of scroll — exactly the amount we need to play the
      // horizontal translation. When the section ends, the next section
      // (Collections) starts immediately. No empty runway.
      //
      // Why not `pin: true`? GSAP's pin adds `padding-bottom = duration`
      // to its pinSpacer AND keeps the trigger's own height on top, so
      // the pinSpacer is `trigger.height + duration` tall. The trigger's
      // height portion (100vh) is empty padding that scrolls by AFTER
      // the pin releases — visibly a big blank block after the section.
      // The sticky + scrub pattern has no such spacer.
      const syncHeight = () => {
        const distance = getDistance();
        container.style.height = `${distance + window.innerHeight}px`;
      };
      syncHeight();

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top+=64',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: syncHeight,
        },
      });

      // Belt-and-braces: image loads inside the panels can change the
      // track's `scrollWidth` *after* the initial measurement, leaving
      // the user "stuck" on the first card because GSAP only mapped a
      // tiny fraction of the real distance. Re-run the measurement
      // once each panel image has decoded. (Cheap — a handful of
      // events for the curated pieces in the row.)
      const imgs = Array.from(track.querySelectorAll('img'));
      const refresh = () => ScrollTrigger.refresh();
      imgs.forEach((img) => {
        if (!img.complete) {
          img.addEventListener('load', refresh, { once: true });
          img.addEventListener('error', refresh, { once: true });
        }
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
                fontSize: minimal.type.h3,
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
                fontSize: minimal.type.body,
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
      // Height is set imperatively in the effect above to
      // `horizontalDistance + 100vh`. SSR / first-paint fallback: size
      // roughly to the expected final height so there's no layout jump.
      style={{
        height: `${panelCount * 100}vh`,
        position: 'relative',
      }}
    >
      {/*
        Inner sticky wrapper sticks at `top: 0` for `section.height -
        100vh === distance` pixels of scroll. GSAP animates the track's
        `x` in sync with that scroll progress, via ScrollTrigger's
        `scrub: 1`. No `pin: true`, no pinSpacer — therefore no empty
        space after the section ends.
      */}
      <div style={{
        position: 'sticky',
        top: '64px',
        height: 'calc(100vh - 64px)',
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
                fontSize: minimal.type.body,
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
