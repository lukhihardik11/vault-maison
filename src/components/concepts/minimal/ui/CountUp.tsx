'use client'

import { useRef, useState, useEffect, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* ────────────────────────────────────────────────────────────────────
 * CountUp — Animated number counter triggered by scroll
 *
 * Features:
 * - Counts from 0 (or custom start) to target value
 * - Triggered when element enters viewport
 * - Supports prefix/suffix (e.g., "$", "+", "%")
 * - GSAP-powered for smooth easing
 * - prefers-reduced-motion: shows final value immediately
 * ──────────────────────────────────────────────────────────────── */

interface CountUpProps {
  /** Target number to count to */
  to: number
  /** Starting number (default 0) */
  from?: number
  /** Duration in seconds */
  duration?: number
  /** Prefix text (e.g., "$") */
  prefix?: string
  /** Suffix text (e.g., "+", "%") */
  suffix?: string
  /** Number of decimal places */
  decimals?: number
  /** Use comma separator for thousands */
  separator?: boolean
  /** HTML tag to render */
  as?: keyof JSX.IntrinsicElements
  /** Style overrides */
  style?: CSSProperties
  /** CSS class */
  className?: string
  /** ScrollTrigger start position */
  start?: string
}

function formatNumber(
  value: number,
  decimals: number,
  separator: boolean
): string {
  const fixed = value.toFixed(decimals)
  if (!separator) return fixed

  const [int, dec] = fixed.split('.')
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return dec ? `${formatted}.${dec}` : formatted
}

export function CountUp({
  to,
  from = 0,
  duration = 1.8,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = true,
  as: Tag = 'span',
  style,
  className,
  start = 'top 85%',
}: CountUpProps) {
  const ref = useRef<HTMLElement>(null)
  const [display, setDisplay] = useState(`${prefix}${formatNumber(from, decimals, separator)}${suffix}`)
  const [reduced, setReduced] = useState(false)
  const hasPlayed = useRef(false)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduced(isReduced)

    if (isReduced) {
      setDisplay(`${prefix}${formatNumber(to, decimals, separator)}${suffix}`)
      return
    }

    const el = ref.current
    if (!el) return

    const obj = { value: from }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        if (hasPlayed.current) return
        hasPlayed.current = true

        gsap.to(obj, {
          value: to,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            setDisplay(
              `${prefix}${formatNumber(obj.value, decimals, separator)}${suffix}`
            )
          },
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [to, from, duration, prefix, suffix, decimals, separator, start, reduced])

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} style={style} className={className}>
      {display}
    </Tag>
  )
}

export default CountUp
