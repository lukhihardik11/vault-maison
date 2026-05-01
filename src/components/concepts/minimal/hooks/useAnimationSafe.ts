'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from './useMediaQuery';

/* ────────────────────────────────────────────────────────────────────
 * useAnimationSafe — GSAP wrapper that respects prefers-reduced-motion
 *
 * Provides:
 * - `shouldAnimate`: boolean flag for conditional animation logic
 * - `safeTimeline()`: creates a GSAP timeline that auto-kills on unmount
 *   and returns null if reduced motion is preferred
 * - `safeTo()`: gsap.to() that skips if reduced motion
 * - `safeFrom()`: gsap.from() that skips if reduced motion
 * - `safeSet()`: gsap.set() that always runs (instant, no animation)
 *
 * Usage:
 *   const { shouldAnimate, safeTimeline, safeTo } = useAnimationSafe()
 *   
 *   useEffect(() => {
 *     if (!shouldAnimate) return
 *     const tl = safeTimeline()
 *     if (!tl) return
 *     tl.to(el, { opacity: 1 })
 *     return () => tl.kill()
 *   }, [shouldAnimate])
 * ──────────────────────────────────────────────────────────────── */

export function useAnimationSafe() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const timelines = useRef<gsap.core.Timeline[]>([]);

  // Clean up all timelines on unmount
  useEffect(() => {
    return () => {
      timelines.current.forEach((tl) => tl.kill());
      timelines.current = [];
    };
  }, []);

  const safeTimeline = useCallback(
    (vars?: gsap.TimelineVars): gsap.core.Timeline | null => {
      if (prefersReducedMotion) return null;
      const tl = gsap.timeline(vars);
      timelines.current.push(tl);
      return tl;
    },
    [prefersReducedMotion],
  );

  const safeTo = useCallback(
    (
      targets: gsap.TweenTarget,
      vars: gsap.TweenVars,
    ): gsap.core.Tween | null => {
      if (prefersReducedMotion) {
        // Instantly set final state without animation
        gsap.set(targets, { ...vars, duration: 0 });
        return null;
      }
      return gsap.to(targets, vars);
    },
    [prefersReducedMotion],
  );

  const safeFrom = useCallback(
    (
      targets: gsap.TweenTarget,
      vars: gsap.TweenVars,
    ): gsap.core.Tween | null => {
      if (prefersReducedMotion) return null;
      return gsap.from(targets, vars);
    },
    [prefersReducedMotion],
  );

  const safeSet = useCallback(
    (targets: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween => {
      return gsap.set(targets, vars);
    },
    [],
  );

  return {
    shouldAnimate: !prefersReducedMotion,
    prefersReducedMotion,
    safeTimeline,
    safeTo,
    safeFrom,
    safeSet,
  };
}
