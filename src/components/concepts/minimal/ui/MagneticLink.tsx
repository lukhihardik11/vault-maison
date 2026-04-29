'use client'

import { useCallback, useRef, type ReactNode, type CSSProperties } from 'react'
import gsap from 'gsap'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

/* ================================================================== */
/*  MagneticLink — lightweight magnetic pull for text links            */
/* ================================================================== */

interface MagneticLinkProps {
  children: ReactNode
  /** Pull strength (0–1). Default 0.2 — subtler than MagneticButton */
  strength?: number
  /** Activation radius in px. Default 60 */
  radius?: number
  /** CSS class for the wrapper */
  className?: string
  /** Inline styles for the wrapper */
  style?: CSSProperties
}

/**
 * MagneticLink — a lighter version of MagneticButton designed for
 * inline text links (footer links, nav items, breadcrumbs).
 *
 * Differences from MagneticButton:
 *   - Smaller default radius (60px vs 100px)
 *   - Weaker default strength (0.2 vs 0.35)
 *   - Uses GSAP instead of motion/react for consistency with Phase 7
 *   - Returns with elastic ease for a playful bounce
 *   - Renders as inline-flex to sit naturally in text flow
 *
 * The magnetic pull is subtle enough for body text links but
 * noticeable enough to signal interactivity — the "alive" feeling
 * that distinguishes premium sites from static ones.
 */
export function MagneticLink({
  children,
  strength = 0.2,
  radius = 60,
  className = '',
  style,
}: MagneticLinkProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const prefersReduced = useReducedMotionPreference()

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (prefersReduced) return
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist > radius) {
        gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
        return
      }

      const falloff = 1 - dist / radius
      gsap.to(el, {
        x: dx * strength * falloff,
        y: dy * strength * falloff,
        duration: 0.3,
        ease: 'power2.out',
      })
    },
    [strength, radius, prefersReduced],
  )

  const handleMouseLeave = useCallback(() => {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    })
  }, [prefersReduced])

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: 'inline-flex',
        willChange: prefersReduced ? 'auto' : 'transform',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  )
}

export default MagneticLink
