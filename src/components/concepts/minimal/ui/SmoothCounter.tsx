'use client';

/**
 * SmoothCounter — animated number counter.
 *
 * Counts from `from` to `to` over `duration` ms when scrolled into
 * view. Uses requestAnimationFrame + an ease-out-cubic curve.
 *
 * Why a hand-rolled IntersectionObserver instead of `motion`'s
 * `useInView`:
 *   - Earlier the counter was reported stuck at 0 — the framer
 *     observer occasionally never reported `true` if the element was
 *     already inside the viewport at the moment React attached the
 *     ref (a known edge case in the library when StrictMode mounts
 *     twice in dev). Native IO with `entries[0].isIntersecting`
 *     handles this synchronously: if the element is already on
 *     screen at observer creation time, the very first callback
 *     fires immediately with `isIntersecting: true`.
 *   - We also wire a hard 1.6 s safety net: even if the observer
 *     never fires (JS blocked, viewport off-screen forever), the
 *     final value pops in so the stat is never permanently "0+".
 *
 * SSR-safe:
 *   - Initial render shows `${from}${suffix}` (matches first client render)
 *   - The animation is started in a useEffect, only after mount
 *
 * Reduced-motion:
 *   - Skips the animation; final value is set immediately.
 *
 * Numeric formatting:
 *   - Locale-aware (`toLocaleString`) — handy for stats like "10,000+"
 *   - `tabular-nums` enforced on the rendered span so the digits don't
 *     dance during the count-up.
 */

import { useEffect, useRef } from 'react';
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
  const prefersReduced = useReducedMotionPreference();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const format = (n: number) =>
      `${prefix}${n.toLocaleString(locale)}${suffix}`;

    let cancelled = false;
    let frame = 0;

    const playAnimation = () => {
      if (cancelled) return;
      if (prefersReduced) {
        el.textContent = format(to);
        return;
      }

      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const current = Math.round(from + (to - from) * eased);
        el.textContent = format(current);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    // ─── Visibility detection ──────────────────────────────────────
    // 1) Native IntersectionObserver — fires immediately for any
    //    element already on screen, so heroes-above-the-fold animate
    //    on first paint instead of waiting for a scroll.
    // 2) Hard fallback timer — 1.6 s after mount the counter pops to
    //    its end value if the observer never fired (JS blocked,
    //    headless renderer, off-screen forever, etc.). Better to show
    //    the real number than a stuck "0".
    let observer: IntersectionObserver | null = null;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      playAnimation();
    };

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              start();
              break;
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
      );
      observer.observe(el);
    } else {
      // Browser too old for IO — just play right away.
      start();
    }

    const safetyNet = window.setTimeout(start, 1600);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(safetyNet);
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [duration, from, locale, prefersReduced, prefix, suffix, to]);

  // Initial render uses the same `format(from)` markup the effect
  // would write on first frame. Server and client agree → no
  // hydration mismatch.
  const initial = `${prefix}${from.toLocaleString(locale)}${suffix}`;

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums', ...style }}
    >
      {initial}
    </span>
  );
}

export default SmoothCounter;
