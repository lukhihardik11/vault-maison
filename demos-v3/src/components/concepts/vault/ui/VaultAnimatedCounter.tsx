'use client'

import React, { useEffect, useRef, useState } from 'react'

interface VaultAnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  label: string
  decimals?: number
}

export function VaultAnimatedCounter({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  label,
  decimals = 0,
}: VaultAnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = performance.now()
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(eased * end)
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: "'Cinzel', serif",
        fontSize: '2.8rem',
        fontWeight: 400,
        color: '#D4AF37',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      }}>
        {prefix}{count.toFixed(decimals)}{suffix}
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.65rem',
        fontWeight: 400,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.5)',
        marginTop: 8,
      }}>
        {label}
      </div>
    </div>
  )
}
