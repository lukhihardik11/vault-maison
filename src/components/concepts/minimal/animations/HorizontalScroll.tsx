'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotionPreference } from './useResponsiveMotion';
import { minimal } from '../design-system';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  panelCount: number;
  /** Section title displayed above the scroll area */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

/**
 * HorizontalScroll — Pinned horizontal scroll showcase
 *
 * Strategy for iOS compatibility:
 * 1. Always render the native horizontal scroll layout (works on ALL devices)
 * 2. On desktop (non-touch, wide viewport), GSAP enhances it with pin+scrub
 * 3. On iOS/mobile/tablet, the native CSS scroll-snap just works
 *
 * This avoids:
 * - Hydration mismatches (same HTML on server and client)
 * - iOS Safari sticky/pin bugs
 * - Text overlap from GSAP transforms on iOS
 * - Touch event conflicts
 */
export function HorizontalScroll({
  children,
  className = '',
  panelCount,
  title,
  subtitle,
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionPreference();
  const [useGSAP, setUseGSAP] = useState(false);

  // Determine if we should use GSAP (desktop, non-touch, non-iOS)
  useEffect(() => {
    if (prefersReduced) return;

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isWide = window.innerWidth >= 1024;

    // Only use GSAP on desktop with no touch and not iOS
    if (isWide && !isTouch && !isIOS) {
      setUseGSAP(true);
    }
  }, [prefersReduced]);

  // GSAP ScrollTrigger setup (only runs on qualifying desktops)
  useEffect(() => {
    if (!useGSAP) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Hide the native scroll version, show the GSAP version
    const nativeEl = section.querySelector('[data-scroll-native]') as HTMLElement;
    const gsapEl = section.querySelector('[data-scroll-gsap]') as HTMLElement;
    if (nativeEl) nativeEl.style.display = 'none';
    if (gsapEl) gsapEl.style.display = 'flex';

    const imgs = Array.from(track.querySelectorAll('img'));

    const initGSAP = () => {
      const ctx = gsap.context(() => {
        const getScrollDistance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

        // Set section height to create scroll runway
        const syncHeight = () => {
          const distance = getScrollDistance();
          section.style.height = `${distance + window.innerHeight}px`;
        };
        syncHeight();

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
            onRefresh: syncHeight,
          },
        });
      }, section);

      return ctx;
    };

    let ctx: gsap.Context | undefined;
    const allLoaded = imgs.every(img => img.complete);

    if (allLoaded) {
      ctx = initGSAP();
    } else {
      let loadCount = 0;
      const totalToLoad = imgs.filter(img => !img.complete).length;
      const onLoad = () => {
        loadCount++;
        if (loadCount >= totalToLoad && !ctx) {
          ctx = initGSAP();
        }
      };
      imgs.forEach(img => {
        if (!img.complete) {
          img.addEventListener('load', onLoad, { once: true });
          img.addEventListener('error', onLoad, { once: true });
        }
      });
      // Fallback timeout
      const timeout = setTimeout(() => {
        if (!ctx) ctx = initGSAP();
      }, 2000);

      return () => {
        clearTimeout(timeout);
        ctx?.revert();
        // Restore native scroll visibility
        if (nativeEl) nativeEl.style.display = '';
        if (gsapEl) gsapEl.style.display = 'none';
      };
    }

    return () => {
      ctx?.revert();
      // Restore native scroll visibility
      if (nativeEl) nativeEl.style.display = '';
      if (gsapEl) gsapEl.style.display = 'none';
      section.style.height = '';
    };
  }, [useGSAP, panelCount]);

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Header — always visible */}
      {(title || subtitle) && (
        <div style={{
          padding: 'clamp(32px, 5vw, 60px) clamp(20px, 4vw, 60px) clamp(16px, 2vw, 30px)',
        }}>
          {title && (
            <h2 style={{
              fontFamily: 'var(--font-heading, system-ui)',
              fontSize: 'clamp(28px, 4vw, 48px)',
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

      {/* ═══ Native horizontal scroll (default, works everywhere) ═══ */}
      <div
        data-scroll-native
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: 'clamp(16px, 3vw, 40px)',
          overflowX: 'auto',
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x proximity',
          scrollBehavior: 'smooth',
          paddingLeft: 'clamp(20px, 4vw, 60px)',
          paddingRight: 'clamp(20px, 4vw, 60px)',
          paddingBottom: '48px',
          // iOS scroll fixes
          overscrollBehaviorX: 'contain',
          overscrollBehaviorY: 'auto',
          touchAction: 'pan-x pan-y',
        }}
      >
        {children}
      </div>

      {/* ═══ GSAP track (hidden by default, shown via JS on desktop) ═══ */}
      <div
        data-scroll-gsap
        style={{
          display: 'none', // Hidden by default, JS shows it on qualifying desktops
          position: 'sticky',
          top: '64px',
          height: 'calc(100vh - 64px)',
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            paddingLeft: '60px',
            paddingRight: '60px',
            height: '70%',
            width: 'max-content',
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
        maxWidth: '1200px',
        flexShrink: 0,
        height: 'auto',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        scrollSnapAlign: 'start',
      }}
    >
      {children}
    </div>
  );
}
