'use client'

import { useEffect, useRef, useCallback } from 'react'

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  staggerDelay?: number
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', staggerDelay = 100 } = options
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement

            // Check if it's a stagger parent
            if (el.classList.contains('scroll-reveal')) {
              el.classList.add('revealed')
            }

            // Handle stagger children
            const staggerItems = el.querySelectorAll('.stagger-item')
            staggerItems.forEach((item, index) => {
              setTimeout(() => {
                ;(item as HTMLElement).classList.add('revealed')
              }, index * staggerDelay)
            })

            observer.unobserve(el)
          }
        })
      },
      { threshold, rootMargin }
    )

    // Observe all scroll-reveal elements within the container
    const revealElements = container.querySelectorAll('.scroll-reveal')
    revealElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [threshold, rootMargin, staggerDelay])

  return containerRef
}

// Mouse tracking hook for shine effects
export function useMouseTracking() {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
  }, [])

  return { onMouseMove: handleMouseMove }
}
