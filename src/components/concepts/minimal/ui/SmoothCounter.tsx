'use client';

/**
 * SmoothCounter — animated number counter.
 *
 * Counts from `from` to `to` over `duration` ms when scrolled into
 * view. Uses requestAnimationFrame + an ease-out-cubic curve. Replaces
 * the inline `CountUp` previously declared at the top of
 * `minimal-home.tsx`.
 *
 * SSR-safe:
 *   - Initial render shows `${from}${suffix}` (matches first client render)
 *   - The animation is started in a useEffect, only after mount
 *   - `useInView` handles defer-until-visible without layout thrash
 *
 * Reduced-motion:
 *   - Skips the animation; final value is set immediately on mount.
 *
 * Numeric formatting:
 *   - Locale-aware (`toLocaleString`) — handy for stats like "10,000+"
 *   - `tabular-nums` enforced on the rendered span so the digits don't
 *     dance during the count-up.
 */

import { useEffect, useRef } from 'react';
import { useInView } from 'motion/react';
import { useReducedMotionPreference } from '../animations/useResponsiveMotion';
import { minimal } from '../design-system';

export interface SmoothCounterProps {
  /** End value. Required. */
  to: number;
  /** Start value. Default 0. */
  from?: number;
  /** Animation duration in ms. Default `minimal.motion.duration.cinematic` (1500). */
  duration?: number;
  /** String appended after the number. Default ''. e.g. '+', '%', 'k' */
  suffix?: string;
  /** String prepended before the number. Default ''. e.g. '$', '€' */
  prefix?: string;
  /** Locale for `toLocaleString`. Default the browser locale. */
  locale?: string;
  /** Optional className passthrough. */
  className?: string;
  /** Optional inline style passthrough. */
  style?: React.CSSProperties;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function SmoothCounter({
  to,
  from = 0,
  duration = minimal.motion.duration.cinematic,
  suffix = '',
  prefix = '',
  locale,
  className = '',
  style,
}: SmoothCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Negative margin pre-triggers slightly above the viewport so the count
  // is already at its end value when the user finishes scrolling onto it.
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotionPreference();

  const format = (n: number) => `${prefix}${n.toLocaleString(locale)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || !isInView) return;

    if (prefersReduced) {
      el.textContent = format(to);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(from + (to - from) * eased);
      el.textContent = format(current);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // `format` rebuilds each render but its inputs are listed; safe to omit it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, from, isInView, locale, prefersReduced, prefix, suffix, to]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums', ...style }}
    >
      {format(from)}
    </span>
  );
}

export default SmoothCounter;
