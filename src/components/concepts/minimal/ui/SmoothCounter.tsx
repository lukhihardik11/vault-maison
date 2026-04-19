'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { minimal } from '../design-system'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

interface SmoothCounterProps {
  value: number
  suffix?: string
  prefix?: string
  durationMs?: number
  decimals?: number
  className?: string
}

export default function SmoothCounter({
  value,
  suffix = '',
  prefix = '',
  durationMs = minimal.motion.counterMs,
  decimals = 0,
  className = '',
}: SmoothCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const prefersReduced = useReducedMotionPreference()
  const [isVisible, setIsVisible] = useState(false)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const target = ref.current
    if (!target || isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        observer.disconnect()
      },
      { threshold: 0.35 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    if (prefersReduced) {
      setDisplayValue(value)
      return
    }

    let frameId = 0
    const start = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(value * eased)

      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      }
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [durationMs, isVisible, prefersReduced, value])

  const formattedValue = useMemo(() => {
    const rounded = Number(displayValue.toFixed(decimals))
    const normalized = decimals > 0 ? rounded : Math.round(rounded)
    return normalized.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  }, [decimals, displayValue])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  )
}
