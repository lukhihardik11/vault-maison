'use client'

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'
import gsap from 'gsap'
import { useReducedMotionPreference } from './useResponsiveMotion'
import { useTransitionState } from './RouteTransition'

/* ================================================================== */
/*  PageEntrance — Orchestrated entrance choreography                  */
/* ================================================================== */

/**
 * PageEntrance — wraps hero-level content and plays a coordinated
 * entrance animation after the RouteTransition curtain lifts.
 *
 * This is NOT a scroll-triggered animation (those are handled by
 * StaggerReveal, TextReveal, etc.). PageEntrance fires once on
 * page load, creating the "first impression" choreography.
 *
 * Each direct child is treated as a "beat" in the entrance sequence,
 * animated with staggered clip-path reveals and translateY slides.
 *
 * Variants:
 *   - `hero`: Dramatic entrance — large translateY, slow timing, wide stagger
 *   - `standard`: Quick entrance — small translateY, fast timing, tight stagger
 *   - `fade`: Minimal — opacity only, no movement
 *
 * Waits for RouteTransition to complete before playing (reads
 * `isTransitioning` from TransitionContext). If no transition is
 * active (e.g., direct page load), plays immediately after mount.
 */

interface PageEntranceProps {
  children: ReactNode
  /** Entrance variant. Default 'standard' */
  variant?: 'hero' | 'standard' | 'fade'
  /** Additional delay before entrance starts (seconds). Default 0 */
  delay?: number
  /** CSS class for the wrapper */
  className?: string
  /** Inline styles for the wrapper */
  style?: CSSProperties
}

export function PageEntrance({
  children,
  variant = 'standard',
  delay = 0,
  className = '',
  style,
}: PageEntranceProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotionPreference()
  const { isTransitioning } = useTransitionState()
  const hasPlayed = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced || hasPlayed.current) return

    // Wait for transition to finish
    if (isTransitioning) return

    hasPlayed.current = true
    const items = Array.from(el.children) as HTMLElement[]
    if (!items.length) return

    const config = {
      hero: { y: 60, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
      standard: { y: 30, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
      fade: { y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
    }[variant]

    const ctx = gsap.context(() => {
      gsap.set(items, {
        autoAlpha: 0,
        y: config.y,
        ...(variant === 'hero' ? { clipPath: 'inset(0 0 20% 0)' } : {}),
      })

      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        ...(variant === 'hero' ? { clipPath: 'inset(0 0 0% 0)' } : {}),
        duration: config.duration,
        stagger: config.stagger,
        ease: config.ease,
        delay: delay + 0.1,
      })
    }, el)

    return () => ctx.revert()
  }, [isTransitioning, prefersReduced, variant, delay])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}

export default PageEntrance
