'use client'

/* ────────────────────────────────────────────────────────────────────
 * perfUtils — Performance utilities for animation components
 *
 * Provides:
 * - will-change cleanup after animation completes
 * - IntersectionObserver-based lazy initialization
 * - GPU layer promotion/demotion helpers
 * ──────────────────────────────────────────────────────────────── */

/**
 * Remove will-change from an element after animation completes.
 * Keeping will-change indefinitely wastes GPU memory.
 * Call this in GSAP onComplete callbacks.
 */
export function clearWillChange(el: HTMLElement | null) {
  if (!el) return
  el.style.willChange = 'auto'
}

/**
 * Set will-change on an element before animation starts.
 * Call this in GSAP onStart callbacks or before triggering.
 */
export function promoteLayer(el: HTMLElement | null, properties = 'transform, opacity') {
  if (!el) return
  el.style.willChange = properties
}

/**
 * Batch clear will-change on multiple elements.
 */
export function clearWillChangeBatch(els: (HTMLElement | null)[]) {
  els.forEach((el) => {
    if (el) el.style.willChange = 'auto'
  })
}

/**
 * Create a one-shot IntersectionObserver that calls `onVisible` when
 * the element enters the viewport. Useful for lazy-initializing
 * heavy animations only when they're about to be seen.
 */
export function onceVisible(
  el: HTMLElement,
  onVisible: () => void,
  options: IntersectionObserverInit = { rootMargin: '200px 0px' }
): () => void {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      observer.disconnect()
      onVisible()
    }
  }, options)

  observer.observe(el)
  return () => observer.disconnect()
}

/**
 * Debounced resize handler that avoids layout thrash.
 * Returns a cleanup function.
 */
export function onResizeDebounced(
  callback: () => void,
  delay = 150
): () => void {
  let timer: ReturnType<typeof setTimeout>

  const handler = () => {
    clearTimeout(timer)
    timer = setTimeout(callback, delay)
  }

  window.addEventListener('resize', handler, { passive: true })
  return () => {
    clearTimeout(timer)
    window.removeEventListener('resize', handler)
  }
}

/**
 * Check if the user prefers reduced motion.
 * Lightweight alternative to the hook for non-React contexts.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if the device is likely a touch device (no fine pointer).
 * Used to skip cursor/hover effects.
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}
