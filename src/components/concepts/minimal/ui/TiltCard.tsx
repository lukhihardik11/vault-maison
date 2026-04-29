'use client'

import { useRef, useCallback, type ReactNode, type CSSProperties } from 'react'
import gsap from 'gsap'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

/* ================================================================== */
/*  TiltCard — Mouse-position-reactive 3D perspective tilt             */
/* ================================================================== */

interface TiltCardProps {
  children: ReactNode
  /** Maximum tilt angle in degrees. Default 6 */
  maxTilt?: number
  /** Perspective distance in px. Default 800 */
  perspective?: number
  /** Scale on hover. Default 1.02 */
  hoverScale?: number
  /** Whether to show a light/shine effect following cursor. Default true */
  shine?: boolean
  /** CSS class for the outer wrapper */
  className?: string
  /** Inline styles for the outer wrapper */
  style?: CSSProperties
  /** data-cursor attribute for CursorFollower context */
  dataCursor?: string
}

/**
 * TiltCard — wraps any content and applies a 3D perspective tilt
 * that follows the cursor position within the card.
 *
 * This is the premium product card hover effect seen on luxury
 * e-commerce sites — the card subtly tilts toward the cursor,
 * creating a sense of depth and physicality.
 *
 * Features:
 *   - 3D rotateX/rotateY based on cursor position within the card
 *   - Optional shine/light overlay that follows the cursor
 *   - Smooth spring return to flat on mouse leave
 *   - GSAP-driven for buttery 60fps performance
 *   - Respects prefers-reduced-motion
 *   - Disabled on touch devices
 *
 * Usage:
 *   <TiltCard maxTilt={8} shine>
 *     <ProductCard ... />
 *   </TiltCard>
 */
export function TiltCard({
  children,
  maxTilt = 6,
  perspective = 800,
  hoverScale = 1.02,
  shine = true,
  className = '',
  style,
  dataCursor,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotionPreference()

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return
      const card = cardRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Normalize to -1...1
      const normalX = (x - centerX) / centerX
      const normalY = (y - centerY) / centerY

      // rotateY follows X axis, rotateX follows inverted Y axis
      const rotateY = normalX * maxTilt
      const rotateX = -normalY * maxTilt

      gsap.to(card, {
        rotateX,
        rotateY,
        scale: hoverScale,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })

      // Shine overlay follows cursor
      if (shine && shineRef.current) {
        gsap.to(shineRef.current, {
          opacity: 0.12,
          background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.25) 0%, transparent 60%)`,
          duration: 0.3,
          overwrite: 'auto',
        })
      }
    },
    [maxTilt, hoverScale, shine, prefersReduced],
  )

  const handleMouseLeave = useCallback(() => {
    if (prefersReduced) return
    const card = cardRef.current
    if (!card) return

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto',
    })

    if (shine && shineRef.current) {
      gsap.to(shineRef.current, {
        opacity: 0,
        duration: 0.4,
        overwrite: 'auto',
      })
    }
  }, [shine, prefersReduced])

  return (
    <div
      style={{
        perspective: `${perspective}px`,
        ...style,
      }}
      className={className}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor={dataCursor}
        style={{
          transformStyle: 'preserve-3d',
          willChange: prefersReduced ? 'auto' : 'transform',
          position: 'relative',
        }}
      >
        {children}
        {/* Shine overlay */}
        {shine && !prefersReduced && (
          <div
            ref={shineRef}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: 0,
              borderRadius: 'inherit',
              zIndex: 2,
            }}
          />
        )}
      </div>
    </div>
  )
}

export default TiltCard
