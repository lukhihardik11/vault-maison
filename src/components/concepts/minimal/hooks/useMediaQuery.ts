'use client';

import { useSyncExternalStore } from 'react';
import { breakpoints } from '../mobile-tokens';

/* ─── Generic Media Query Hook ────────────────────────────────────── */

function subscribe(query: string, callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mql = window.matchMedia(query);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSnapshot(query: string) {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query).matches;
}

/**
 * Reactive media query hook using useSyncExternalStore.
 * Returns true when the query matches.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => subscribe(query, cb),
    () => getSnapshot(query),
    () => false, // SSR always returns false
  );
}

/* ─── Device Type Hooks ───────────────────────────────────────────── */

/** True on phones (< 768px) */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${breakpoints.md - 1}px)`);
}

/** True on tablets (768px – 1023px) */
export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
  );
}

/** True on desktop (>= 1024px) */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${breakpoints.lg}px)`);
}

/** True on touch devices (no hover capability) */
export function useIsTouchDevice(): boolean {
  return useMediaQuery('(hover: none) and (pointer: coarse)');
}

/** True when user prefers dark mode */
export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}

/** True when user prefers reduced motion */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** True when device is in landscape orientation */
export function useIsLandscape(): boolean {
  return useMediaQuery('(orientation: landscape)');
}
