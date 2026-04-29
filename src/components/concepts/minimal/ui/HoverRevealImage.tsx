'use client'

import { useRef, useCallback, type CSSProperties } from 'react'
import gsap from 'gsap'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

/* ================================================================== */
/*  HoverRevealImage — cursor-following reveal on hover                */
/* ================================================================== */

interface HoverRevealImageProps {
  /** The visible (base) image src */
  src: string
  /** The hidden (reveal) image src — shown on hover */
  revealSrc: string
  /** Alt text */
  alt: string
  /** Reveal circle radius in px. Default 120 */
  radius?: number
  /** CSS class for the container */
  className?: string
  /** Inline styles for the container */
  style?: CSSProperties
}

/**
 * HoverRevealImage — a dual-image component where hovering reveals
 * a second image through a cursor-following circular mask.
 *
 * This is the "peek" effect seen on premium editorial and fashion
 * sites — the user's cursor acts as a spotlight, revealing an
 * alternate view (e.g., a different angle, a detail shot, or a
 * lifestyle context) through a smooth circular clip-path.
 *
 * Implementation:
 *   - Base image is always visible
 *   - Reveal image sits on top with `clip-path: circle(0px at 50% 50%)`
 *   - On mouse move, GSAP animates the clip-path center to follow cursor
 *   - On mouse enter, the circle radius expands
 *   - On mouse leave, the circle radius shrinks to 0
 *
 * Respects prefers-reduced-motion (shows simple crossfade instead).
 */
export function HoverRevealImage({
  src,
  revealSrc,
  alt,
  radius = 120,
  className = '',
  style,
}: HoverRevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotionPreference()

  // Track current clip position
  const clipPos = useRef({ x: 50, y: 50 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return
      const container = containerRef.current
      const reveal = revealRef.current
      if (!container || !reveal) return

      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      clipPos.current = { x, y }
      reveal.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`
    },
    [radius, prefersReduced],
  )

  const handleMouseEnter = useCallback(() => {
    if (prefersReduced) return
    const reveal = revealRef.current
    if (!reveal) return

    gsap.to(reveal, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [prefersReduced])

  const handleMouseLeave = useCallback(() => {
    if (prefersReduced) return
    const reveal = revealRef.current
    if (!reveal) return

    gsap.to(reveal, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        reveal.style.clipPath = `circle(0px at ${clipPos.current.x}px ${clipPos.current.y}px)`
      },
    })
  }, [prefersReduced])

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="view"
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Base image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      {/* Reveal image — clipped by cursor-following circle */}
      <div
        ref={revealRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          clipPath: 'circle(0px at 50% 50%)',
          willChange: prefersReduced ? 'auto' : 'clip-path, opacity',
        }}
      >
        <img
          src={revealSrc}
          alt={`${alt} — alternate view`}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    </div>
  )
}

export default HoverRevealImage
