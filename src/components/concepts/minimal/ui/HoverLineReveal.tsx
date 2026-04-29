'use client'

import { useRef, useCallback, type ReactNode, type CSSProperties } from 'react'
import gsap from 'gsap'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

/* ================================================================== */
/*  HoverLineReveal — animated underline with directional awareness    */
/* ================================================================== */

interface HoverLineRevealProps {
  children: ReactNode
  /** Line color. Default '#050505' */
  color?: string
  /** Line height in px. Default 1 */
  lineHeight?: number
  /** Animation duration in seconds. Default 0.4 */
  duration?: number
  /** CSS class for the wrapper */
  className?: string
  /** Inline styles for the wrapper */
  style?: CSSProperties
  /** HTML tag. Default 'span' */
  as?: 'span' | 'div' | 'a'
}

/**
 * HoverLineReveal — a directionally-aware animated underline.
 *
 * Unlike CSS `::after` underlines that always animate left-to-right,
 * this component detects which side the cursor enters from and
 * animates the underline in that direction. On leave, the line
 * exits from the opposite side — creating a smooth "wipe through"
 * effect.
 *
 * This is the premium link hover pattern seen on Cartier, Hermès,
 * and Awwwards typography-focused sites. It makes every text link
 * feel intentional and crafted.
 */
export function HoverLineReveal({
  children,
  color = '#050505',
  lineHeight: lh = 1,
  duration = 0.4,
  className = '',
  style,
  as: Tag = 'span',
}: HoverLineRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const prefersReduced = useReducedMotionPreference()

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReduced) return
      const el = ref.current
      const line = lineRef.current
      if (!el || !line) return

      const rect = el.getBoundingClientRect()
      const fromLeft = e.clientX - rect.left < rect.width / 2

      // Instantly position the line off-screen on the entry side
      gsap.set(line, {
        scaleX: 0,
        transformOrigin: fromLeft ? 'left center' : 'right center',
      })

      // Animate in
      gsap.to(line, {
        scaleX: 1,
        duration,
        ease: 'power3.out',
      })
    },
    [duration, prefersReduced],
  )

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReduced) return
      const el = ref.current
      const line = lineRef.current
      if (!el || !line) return

      const rect = el.getBoundingClientRect()
      const exitLeft = e.clientX - rect.left < rect.width / 2

      // Set transform origin to exit side
      gsap.set(line, {
        transformOrigin: exitLeft ? 'left center' : 'right center',
      })

      // Animate out
      gsap.to(line, {
        scaleX: 0,
        duration: duration * 0.8,
        ease: 'power3.in',
      })
    },
    [duration, prefersReduced],
  )

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <span
        ref={lineRef}
        style={{
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          width: '100%',
          height: `${lh}px`,
          backgroundColor: color,
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
          pointerEvents: 'none',
        }}
      />
    </Tag>
  )
}

export default HoverLineReveal
