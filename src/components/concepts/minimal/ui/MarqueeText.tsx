'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { minimal } from '../design-system';
import { useReducedMotionPreference } from '../animations/useResponsiveMotion';

export interface MarqueeTextProps {
  /** Item(s) to scroll. A single string or an array. Repeated to fill the band. */
  text: string | string[];
  /**
   * Direction of travel. `'left'` scrolls content from right to left
   * (typical), `'right'` reverses it. Default `'left'`.
   */
  direction?: 'left' | 'right';
  /** Pixels per second. Higher = faster. Default `40`. */
  speed?: number;
  /** Pause the marquee while the pointer hovers. Default `true`. */
  pauseOnHover?: boolean;
  /** Visual register. `'light'` is dark text on white, `'dark'` is the inverse. */
  tone?: 'light' | 'dark';
  /**
   * Glyph rendered between repeated items. Use a tall asterisk or a thin
   * vertical bar for a brutalist feel. Default `'✷'`.
   */
  separator?: string;
  /** Hide top + bottom hairline borders that bracket the band. */
  hideRules?: boolean;
  className?: string;
}

/**
 * MarqueeText
 * -----------
 * Brutalist scrolling band of high-density type. Acts as a punctuation mark
 * between sections — a constant horizontal motion that contrasts the silent
 * vertical typography of the rest of the page.
 *
 * Implementation notes:
 *  - Uses a single `transform: translate3d` on a flex track for 60 fps
 *    GPU-composited motion (no layout thrash).
 *  - The track contains two identical halves so the loop is seamless once we
 *    translate by exactly `-50%`.
 *  - Driven by `requestAnimationFrame`, so the marquee pauses when the tab
 *    is backgrounded — no wasted CPU.
 *  - Respects `prefers-reduced-motion`: renders a centered static headline
 *    instead of a moving track.
 */
export function MarqueeText({
  text,
  direction = 'left',
  speed = 40,
  pauseOnHover = true,
  tone = 'light',
  separator = '✷',
  hideRules = false,
  className,
}: MarqueeTextProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const prefersReduced = useReducedMotionPreference();

  const items = Array.isArray(text) ? text : [text];

  useEffect(() => {
    if (prefersReduced) return;

    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    let lastTime = performance.now();
    let translate = 0;
    const half = track.scrollWidth / 2;

    if (half <= 0) return;

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isPausedRef.current) {
        translate += direction === 'left' ? -speed * delta : speed * delta;
        // Wrap so we never let translate run away into giant numbers.
        if (translate <= -half) translate += half;
        if (translate >= 0 && direction === 'right') translate -= half;
        track.style.transform = `translate3d(${translate}px, 0, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [direction, prefersReduced, speed, items.length]);

  const handleEnter = () => {
    if (pauseOnHover) isPausedRef.current = true;
  };
  const handleLeave = () => {
    if (pauseOnHover) isPausedRef.current = false;
  };

  const isDark = tone === 'dark';
  const fg = isDark ? minimal.colors.textInverse : minimal.colors.text;
  const bg = isDark ? minimal.colors.surfaceInverse : minimal.colors.bg;
  const rule = isDark ? '#1A1A1A' : minimal.colors.border;

  const containerStyle: CSSProperties = {
    backgroundColor: bg,
    color: fg,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    borderTop: hideRules ? 'none' : `1px solid ${rule}`,
    borderBottom: hideRules ? 'none' : `1px solid ${rule}`,
    paddingBlock: 'clamp(18px, 2.4vw, 28px)',
    cursor: pauseOnHover ? 'pointer' : 'default',
  };

  const trackStyle: CSSProperties = {
    display: 'flex',
    width: 'max-content',
    willChange: prefersReduced ? undefined : 'transform',
  };

  const itemStyle: CSSProperties = {
    fontFamily: minimal.font.primary,
    fontSize: 'clamp(28px, 4.6vw, 64px)',
    fontWeight: 200,
    letterSpacing: '-0.04em',
    lineHeight: 1,
    textTransform: 'uppercase',
    paddingInline: 'clamp(20px, 3vw, 48px)',
    whiteSpace: 'nowrap',
  };

  const separatorStyle: CSSProperties = {
    fontFamily: minimal.font.mono,
    fontSize: 'clamp(20px, 3vw, 36px)',
    color: isDark ? '#6B6B6B' : minimal.colors.textMuted,
    paddingInline: 'clamp(8px, 1vw, 16px)',
    alignSelf: 'center',
    lineHeight: 1,
  };

  if (prefersReduced) {
    return (
      <div
        ref={containerRef}
        style={{ ...containerStyle, cursor: 'default', textAlign: 'center' }}
        className={className}
        role="presentation"
      >
        <span style={{ ...itemStyle, paddingInline: 0 }}>{items.join(`  ${separator}  `)}</span>
      </div>
    );
  }

  // Two identical halves — translating the track by -50% creates a seamless loop.
  const renderHalf = (k: 'a' | 'b') => (
    <div key={k} style={{ display: 'flex', alignItems: 'center' }} aria-hidden={k === 'b'}>
      {items.map((value, i) => (
        <span key={`${k}-${i}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span style={itemStyle}>{value}</span>
          <span style={separatorStyle} aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      className={className}
      role="marquee"
      aria-label={items.join(', ')}
    >
      <div ref={trackRef} style={trackStyle}>
        {renderHalf('a')}
        {renderHalf('b')}
      </div>
    </div>
  );
}

export default MarqueeText;
