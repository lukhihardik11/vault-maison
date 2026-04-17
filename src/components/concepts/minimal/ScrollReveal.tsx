'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Fallback: reveal after 2 seconds regardless
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.05, rootMargin: '50px 0px 50px 0px' }
    )

    observer.observe(el)
    return () => {
      clearTimeout(fallbackTimer)
      observer.disconnect()
    }
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.7s ease-out, transform 0.7s ease-out`,
      }}
    >
      {children}
    </div>
  )
}
