'use client';

import { useSyncExternalStore } from 'react';

function subscribeToMediaQuery(query: string, callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getMediaQuerySnapshot(query: string) {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query).matches;
}

export function useReducedMotionPreference() {
  return useSyncExternalStore(
    (callback) => subscribeToMediaQuery('(prefers-reduced-motion: reduce)', callback),
    () => getMediaQuerySnapshot('(prefers-reduced-motion: reduce)'),
    () => false
  );
}

export function useIsMobile(breakpoint = 768) {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    () => (typeof window === 'undefined' ? false : window.innerWidth < breakpoint),
    () => false
  );
}
