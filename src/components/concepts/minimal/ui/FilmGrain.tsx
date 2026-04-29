'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

/**
 * FilmGrain — subtle analog noise overlay.
 *
 * Uses an inline SVG `<feTurbulence>` filter to generate organic noise,
 * rendered as a fixed full-screen overlay at very low opacity. This adds
 * the "crafted / analog" texture that every Awwwards-winning luxury site
 * has (Cartier, Audemars Piguet, OCCUPY).
 *
 * The grain animates subtly by shifting the `baseFrequency` every 100ms
 * to avoid a static/frozen look. Animation is disabled for
 * `prefers-reduced-motion` users.
 *
 * Performance: pointer-events: none, mix-blend-mode: overlay, and the
 * SVG filter is GPU-composited. No layout cost.
 */
export function FilmGrain() {
  const prefersReducedMotion = useReducedMotionPreference()
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null)

  /* Animate the grain by shifting baseFrequency slightly each frame */
  useEffect(() => {
    if (prefersReducedMotion || !turbulenceRef.current) return

    let frame: number
    const el = turbulenceRef.current

    const animate = () => {
      // Subtle frequency variation: 0.65 ± 0.02
      const freq = 0.65 + Math.random() * 0.04
      el.setAttribute('baseFrequency', `${freq}`)
      frame = window.setTimeout(() => {
        requestAnimationFrame(animate)
      }, 120) // ~8fps — enough for grain, saves CPU
    }

    animate()
    return () => clearTimeout(frame)
  }, [prefersReducedMotion])

  /* Don't render for reduced-motion users — the overlay is purely decorative */
  if (prefersReducedMotion) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998, // Below cursor (9999) but above everything else
        pointerEvents: 'none',
        opacity: 0.04, // Very subtle — 4% opacity
        mixBlendMode: 'overlay',
        width: '100%',
        height: '100%',
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <filter id="vm-film-grain">
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#vm-film-grain)"
          opacity="1"
        />
      </svg>
    </div>
  )
}
