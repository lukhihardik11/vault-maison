'use client';

/**
 * MarqueeText — full-bleed scrolling brand band.
 *
 * A monochrome strip that scrolls horizontally on autopilot. Inspired
 * by gallery wayfinding boards and the destination-display panels in
 * old train stations. Pauses on hover; honors prefers-reduced-motion
 * via a media-query in the inline style block (no JS observer needed).
 *
 * Visual:
 *   ◆  PRECISION CUTS  ◆  GIA CERTIFIED  ◆  BESPOKE COMMISSIONS  ◆  ...
 *
 * Why CSS keyframes (not JS / Framer):
 *   - Runs on the compositor thread → 60 fps with zero JS cost
 *   - Survives React re-renders without restarting
 *   - `animation-play-state: paused` is a one-liner for hover
 *
 * Accessibility:
 *   - Decorative brand band — every phrase ("Precision Cuts", "GIA
 *     Certified", …) already appears verbatim elsewhere on the homepage
 *     (hero data points, philosophy section, footer). Re-announcing the
 *     same words here would be noise. We mark the whole strip
 *     `aria-hidden="true"` so AT users skip it.
 *   - We deliberately do NOT use `role="marquee"` — it is not a valid
 *     WAI-ARIA role and would fail `jsx-a11y/aria-role`.
 *   - Reduced-motion users see the original (un-duplicated) text static.
 */

import { useId } from 'react';
import { minimal } from '../design-system';

export interface MarqueeTextProps {
  /** Items to scroll. Rendered with a `◆` separator between each. */
  items: string[];
  /** Loop duration in seconds. Lower = faster. Default 30. */
  duration?: number;
  /** Reverse direction. Default false (right → left). */
  reverse?: boolean;
  /** Pause on hover. Default true. */
  pauseOnHover?: boolean;
  /** Visual variant. `dark` = black band / white text (default). `light` = white band / black text. */
  variant?: 'dark' | 'light';
  /** Override className for the outer band. */
  className?: string;
}

const SEPARATOR = '\u25C6'; // ◆

export function MarqueeText({
  items,
  duration = 30,
  reverse = false,
  pauseOnHover = true,
  variant = 'dark',
  className = '',
}: MarqueeTextProps) {
  const id = useId().replace(/:/g, '');
  const fg = variant === 'dark' ? '#FFFFFF' : minimal.colors.text;
  const bg = variant === 'dark' ? minimal.colors.text : '#FFFFFF';
  const sepColor = variant === 'dark' ? '#6B6B6B' : '#9B9B9B';

  // Two identical rows are concatenated to fake a seamless loop.
  // The strip is decorative — see the JSDoc Accessibility section.
  const renderRow = (key: string) => (
    <div
      key={key}
      className={`vm-marquee-row-${id}`}
      style={{
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        gap: minimal.space[6],
        paddingRight: minimal.space[6],
        whiteSpace: 'nowrap',
      }}
    >
      {items.map((item, i) => (
        <span key={`${key}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: minimal.space[6] }}>
          <span
            style={{
              fontFamily: minimal.font.primary,
              fontSize: 'clamp(13px, 1.2vw, 16px)',
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: fg,
            }}
          >
            {item}
          </span>
          <span
            style={{
              fontSize: '10px',
              color: sepColor,
              lineHeight: 1,
              transform: 'translateY(-1px)',
            }}
          >
            {SEPARATOR}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className={`vm-marquee-${id} ${className}`}
      style={{
        backgroundColor: bg,
        overflow: 'hidden',
        padding: `${minimal.space[5]} 0`,
        borderTop: `1px solid ${minimal.colors.border}`,
        borderBottom: `1px solid ${minimal.colors.border}`,
        position: 'relative',
      }}
    >
      <div
        className={`vm-marquee-track-${id}`}
        style={{
          display: 'flex',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {renderRow('a')}
        {renderRow('b')}
      </div>

      <style>{`
        .vm-marquee-track-${id} {
          animation: vm-marquee-${id} ${duration}s linear infinite ${reverse ? 'reverse' : 'normal'};
        }
        ${pauseOnHover ? `.vm-marquee-${id}:hover .vm-marquee-track-${id} { animation-play-state: paused; }` : ''}
        @keyframes vm-marquee-${id} {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .vm-marquee-track-${id} { animation: none !important; transform: none !important; }
          .vm-marquee-track-${id} > .vm-marquee-row-${id}:nth-child(2) { display: none !important; }
        }
      `}</style>
    </div>
  );
}

export default MarqueeText;
