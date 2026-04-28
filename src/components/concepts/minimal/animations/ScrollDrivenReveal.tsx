'use client'

import { useRef, useEffect, type ReactNode, type CSSProperties } from 'react'
import { useReducedMotionPreference, useIsMobile } from './useResponsiveMotion'

/**
 * ScrollDrivenReveal — Apple-style scroll-driven animation.
 *
 * Uses native CSS `animation-timeline: view()` where supported (Chrome 115+,
 * Edge 115+), with a graceful IntersectionObserver fallback for Safari/Firefox.
 *
 * The element fades in + translates up as it enters the viewport, driven
 * entirely by scroll position — no JS animation loop, no GSAP dependency.
 *
 * Tier 1 reference: apple.com/iphone-17-pro scroll-driven product reveals.
 */

interface ScrollDrivenRevealProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Vertical translate distance in px (default: 60) */
  translateY?: number
  /** Start of animation in viewport (default: 'entry 0%') */
  rangeStart?: string
  /** End of animation in viewport (default: 'entry 100%') */
  rangeEnd?: string
  /** Optional delay for stagger effect (ms) */
  delay?: number
}

export function ScrollDrivenReveal({
  children,
  className = '',
  style,
  translateY = 60,
  rangeStart = 'entry 0%',
  rangeEnd = 'entry 100%',
  delay = 0,
}: ScrollDrivenRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotionPreference()

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion) {
      // No animation — show immediately
      if (el) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }
      return
    }

    // Feature detect CSS scroll-driven animations
    const supportsScrollTimeline = CSS.supports('animation-timeline', 'view()')

    if (supportsScrollTimeline) {
      // Native CSS scroll-driven animation — zero JS overhead
      el.style.animationName = 'scrollDrivenFadeIn'
      el.style.animationTimeline = 'view()'
      el.style.animationRangeStart = rangeStart
      el.style.animationRangeEnd = rangeEnd
      el.style.animationFillMode = 'both'
      el.style.animationDuration = '1ms' // Required but ignored by scroll timeline
      if (delay > 0) {
        el.style.animationDelay = `${delay}ms`
      }
    } else {
      // Fallback: IntersectionObserver-based reveal
      el.style.opacity = '0'
      el.style.transform = `translateY(${translateY}px)`
      el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            observer.unobserve(el)
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -10% 0px' },
      )
      observer.observe(el)

      return () => observer.disconnect()
    }
  }, [prefersReducedMotion, translateY, rangeStart, rangeEnd, delay])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}

/**
 * ScrollDrivenScale — Apple-style scroll-driven scale + fade.
 * Used for product images that grow into view as you scroll.
 */
interface ScrollDrivenScaleProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Initial scale (default: 0.92) */
  scaleFrom?: number
}

export function ScrollDrivenScale({
  children,
  className = '',
  style,
  scaleFrom = 0.92,
}: ScrollDrivenScaleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotionPreference()

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion) {
      if (el) {
        el.style.opacity = '1'
        el.style.transform = 'scale(1)'
      }
      return
    }

    const supportsScrollTimeline = CSS.supports('animation-timeline', 'view()')

    if (supportsScrollTimeline) {
      el.style.animationName = 'scrollDrivenScaleIn'
      el.style.animationTimeline = 'view()'
      el.style.animationRangeStart = 'entry 0%'
      el.style.animationRangeEnd = 'cover 40%'
      el.style.animationFillMode = 'both'
      el.style.animationDuration = '1ms'
    } else {
      el.style.opacity = '0'
      el.style.transform = `scale(${scaleFrom})`
      el.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)'

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'scale(1)'
            observer.unobserve(el)
          }
        },
        { threshold: 0.05 },
      )
      observer.observe(el)

      return () => observer.disconnect()
    }
  }, [prefersReducedMotion, scaleFrom])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
