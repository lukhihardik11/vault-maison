'use client'

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'
import gsap from 'gsap'
import { useReducedMotionPreference } from './useResponsiveMotion'
import { useTransitionState } from './RouteTransition'

/* ================================================================== */
/*  PageEntrance — Orchestrated entrance choreography                  */
/* ================================================================== */

interface PageEntranceProps {
  children: ReactNode
  variant?: 'hero' | 'standard' | 'fade'
  delay?: number
  className?: string
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
      hero: { y: 40, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
      standard: { y: 24, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
      fade: { y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
    }[variant]

    const ctx = gsap.context(() => {
      // Use opacity instead of autoAlpha to avoid visibility:hidden fallback issues
      gsap.set(items, {
        opacity: 0,
        y: config.y,
      })

      gsap.to(items, {
        opacity: 1,
        y: 0,
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
