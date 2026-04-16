'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  /** Delay in ms before animation starts (for staggering) */
  delay?: number
  /** Threshold for IntersectionObserver (0-1) */
  threshold?: number
}

/**
 * ScrollReveal — CSS-only scroll-driven animation wrapper.
 * Uses IntersectionObserver to toggle a CSS class.
 * ⚠️ NEVER uses initial={{ opacity: 0 }} — that causes blank pages.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold = 0.08,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => el.classList.add('mn-visible'), delay)
          } else {
            el.classList.add('mn-visible')
          }
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '-20px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, threshold])

  return (
    <div ref={ref} className={cn('mn-scroll-reveal', className)}>
      {children}
    </div>
  )
}

export default ScrollReveal
