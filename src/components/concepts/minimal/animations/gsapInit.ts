'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* ────────────────────────────────────────────────────────────────────
 * gsapInit — Centralized GSAP plugin registration
 *
 * Instead of calling gsap.registerPlugin(ScrollTrigger) in every
 * component file, import this module once. The registration is
 * idempotent but having a single entry point:
 * 1. Makes tree-shaking clearer for bundlers
 * 2. Avoids race conditions with SSR checks
 * 3. Provides a single place to configure GSAP defaults
 * ──────────────────────────────────────────────────────────────── */

let initialized = false

export function initGSAP() {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  gsap.registerPlugin(ScrollTrigger)

  // Global GSAP defaults for performance
  gsap.defaults({
    ease: 'power2.out',
    overwrite: 'auto', // Prevent conflicting tweens from stacking
  })

  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none none',
  })

  // Optimize ScrollTrigger refresh on resize
  ScrollTrigger.config({
    ignoreMobileResize: true, // Prevents layout thrash on mobile address bar hide/show
  })
}

// Auto-initialize on import
initGSAP()

export { gsap, ScrollTrigger }
