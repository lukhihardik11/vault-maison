'use client';

import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
} from 'react';
import { useInView } from 'framer-motion';
import { minimal } from '../design-system';
import { useReducedMotionPreference } from '../animations/useResponsiveMotion';

type EasingName = keyof typeof minimal.easing;

export interface SmoothCounterProps {
  /** Final value the counter eases to. */
  value: number;
  /** Starting value. Default `0`. */
  from?: number;
  /** Optional prefix glued to the value (e.g. `'$'`). */
  prefix?: string;
  /** Optional suffix glued to the value (e.g. `'%'`). */
  suffix?: string;
  /** Animation duration (ms). Defaults to the `motion.long` token (`1500`). */
  duration?: number;
  /** Easing token name. Default `'out'`. */
  easing?: EasingName;
  /** Number of decimals to render. Default `0`. */
  decimals?: number;
  /**
   * Custom formatter. Receives the (possibly fractional) current value and
   * returns the string to render. Overrides `decimals`/`prefix`/`suffix`
   * formatting when provided.
   */
  format?: (value: number) => string;
  /** Use `font-variant-numeric: tabular-nums`. Default `true`. */
  tabularNums?: boolean;
  /** Locale used by the default formatter. Default `'en-US'`. */
  locale?: string;
  /** Re-trigger the count when scrolled out and back into view. Default `false`. */
  retrigger?: boolean;
  className?: string;
  style?: CSSProperties;
  /** ARIA label override. */
  ariaLabel?: string;
}

const easingFunctions: Record<EasingName, (t: number) => number> = {
  out: (t) => 1 - Math.pow(1 - t, 3),
  in: (t) => t * t * t,
  inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  standard: (t) => 1 - Math.pow(1 - t, 2.4),
  brutal: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};

/**
 * SmoothCounter
 * -------------
 * Number counter driven by `requestAnimationFrame`. Eases from `from` to
 * `value` once the element scrolls into view. Plays nicely with the
 * brutalist motion vocabulary — pick an easing token, a duration token, and
 * walk away.
 *
 * Honours `prefers-reduced-motion` by snapping straight to the final value.
 */
export function SmoothCounter({
  value,
  from = 0,
  prefix = '',
  suffix = '',
  duration = minimal.motion.long,
  easing = 'out',
  decimals = 0,
  format,
  tabularNums = true,
  locale = 'en-US',
  retrigger = false,
  className,
  style,
  ariaLabel,
}: SmoothCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: !retrigger, margin: '0px 0px -10% 0px' });
  const prefersReduced = useReducedMotionPreference();

  const formatter = useMemo(() => {
    if (format) return format;
    return (v: number) =>
      `${prefix}${v.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;
  }, [decimals, format, locale, prefix, suffix]);

  // Set initial render to `from` (or final value if reduced-motion).
  // We render this on the server too, so SSR markup matches first paint.
  const initialText = useMemo(() => {
    return formatter(prefersReduced ? value : from);
  }, [formatter, from, prefersReduced, value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!inView) return;

    if (prefersReduced) {
      el.textContent = formatter(value);
      return;
    }

    const easeFn = easingFunctions[easing] ?? easingFunctions.out;
    const start = performance.now();
    const delta = value - from;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / Math.max(1, duration), 1);
      const eased = easeFn(t);
      const current = from + delta * eased;
      el.textContent = formatter(current);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, easing, formatter, from, inView, prefersReduced, value]);

  const composedStyle: CSSProperties = {
    fontVariantNumeric: tabularNums ? 'tabular-nums' : undefined,
    ...(style ?? {}),
  };

  return (
    <span
      ref={ref}
      className={className}
      style={composedStyle}
      aria-label={ariaLabel ?? formatter(value)}
      role="text"
    >
      {initialText}
    </span>
  );
}

export default SmoothCounter;
