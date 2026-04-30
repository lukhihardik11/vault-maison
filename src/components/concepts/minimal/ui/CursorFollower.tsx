'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'
import { minimal } from '../design-system'

/* ================================================================== */
/*  CursorFollower — Diamond-faceted luxury cursor for Vault Maison    */
/* ================================================================== */

/**
 * CursorFollower — A jewelry-themed cursor that replaces the generic
 * dot+ring pattern with a faceted diamond shape.
 *
 * Design Philosophy:
 *   The cursor is a rotated square (diamond/rhombus) — evoking the
 *   top-down view of a brilliant-cut gemstone. It uses thin strokes
 *   and no fill, matching the minimal luxury aesthetic of the brand.
 *
 * Shape States:
 *   - **Default**: Small diamond (12×12px rotated 45°), thin white border
 *   - **Interactive hover**: Diamond scales up 1.5×, border brightens
 *   - **data-cursor context**: Diamond expands 2.5×, label appears inside
 *   - **Click/press**: Diamond compresses briefly (0.75× scale)
 *
 * Movement:
 *   Uses a single-layer approach with a responsive lerp (0.2) for
 *   immediate feel. Luxury = precision, not laggy trailing.
 *   GSAP ticker ensures consistent 60fps rendering.
 *
 * Context detection via `data-cursor` attributes:
 *   - `data-cursor="view"` → expands, shows "View"
 *   - `data-cursor="drag"` → expands, shows "Drag"
 *   - `data-cursor="explore"` → expands, shows "Explore"
 *   - Interactive elements → scales up subtly
 *
 * Visibility:
 *   `mix-blend-mode: difference` inverts against any background.
 *
 * Disabled on:
 *   - Touch devices (`pointer: coarse`)
 *   - `prefers-reduced-motion: reduce`
 *   - SSR (no window)
 */
export default function CursorFollower() {
  const diamondRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotionPreference()
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(pointer: coarse)')
    setIsTouch(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReduced || isTouch) return

    const diamond = diamondRef.current
    const label = labelRef.current
    if (!diamond || !label) return

    // Position state
    let mouseX = -100
    let mouseY = -100
    let curX = -100
    let curY = -100
    let visible = false
    let currentLabel = ''

    // Movement lerp — higher = more responsive = more precise
    const LERP = 0.2
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    // GSAP quickSetters for maximum performance
    const setX = gsap.quickSetter(diamond, 'x', 'px')
    const setY = gsap.quickSetter(diamond, 'y', 'px')
    const setLabelX = gsap.quickSetter(label, 'x', 'px')
    const setLabelY = gsap.quickSetter(label, 'y', 'px')

    // Diamond size (half-width for centering)
    const DIAMOND_HALF = 6 // 12px / 2

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) {
        visible = true
        gsap.to(diamond, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      }
    }

    const onMouseLeave = () => {
      visible = false
      gsap.to([diamond, label], { opacity: 0, duration: 0.25 })
    }

    const onMouseEnter = () => {
      if (!visible) {
        visible = true
        gsap.to(diamond, { opacity: 1, duration: 0.3 })
      }
    }

    const onMouseDown = () => {
      gsap.to(diamond, {
        scale: 0.75,
        duration: 0.1,
        ease: 'power3.out',
      })
    }

    const onMouseUp = () => {
      gsap.to(diamond, {
        scale: currentLabel ? 2.5 : 1,
        duration: 0.35,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    // Context detection
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      let node: Element | null = target
      let context = ''
      let isInteractive = false

      // Walk up DOM to find data-cursor or interactive element
      while (node && node !== document.body) {
        const attr = node.getAttribute('data-cursor')
        if (attr) {
          context = attr
          break
        }
        const tag = node.tagName.toLowerCase()
        if (
          tag === 'a' ||
          tag === 'button' ||
          tag === 'input' ||
          tag === 'textarea' ||
          node.getAttribute('role') === 'button'
        ) {
          isInteractive = true
        }
        node = node.parentElement
      }

      // Context label state
      if (context && context !== currentLabel) {
        currentLabel = context
        label.textContent = context.charAt(0).toUpperCase() + context.slice(1)
        gsap.to(label, { opacity: 1, duration: 0.2, ease: 'power2.out' })
        gsap.to(diamond, {
          scale: 2.5,
          borderColor: 'rgba(255, 255, 255, 0.8)',
          duration: 0.35,
          ease: 'power2.out',
        })
      } else if (!context && currentLabel) {
        currentLabel = ''
        gsap.to(label, { opacity: 0, duration: 0.15, ease: 'power2.in' })
        gsap.to(diamond, {
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.7)',
          duration: 0.3,
          ease: 'power2.out',
        })
      }

      // Interactive element hover (no context label)
      if (!context && isInteractive) {
        gsap.to(diamond, {
          scale: 1.5,
          borderColor: 'rgba(255, 255, 255, 0.9)',
          duration: 0.25,
          ease: 'power2.out',
        })
      } else if (!context && !isInteractive && !currentLabel) {
        gsap.to(diamond, {
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.7)',
          duration: 0.25,
          ease: 'power2.out',
        })
      }
    }

    // Animation tick — GSAP ticker for consistent frame rate
    const tick = () => {
      curX = lerp(curX, mouseX, LERP)
      curY = lerp(curY, mouseY, LERP)

      setX(curX - DIAMOND_HALF)
      setY(curY - DIAMOND_HALF)
      setLabelX(curX - 20) // Label is 40px wide, center it
      setLabelY(curY - 20)
    }

    gsap.ticker.add(tick)

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    // Hide default cursor on the minimal-concept container
    const conceptEl = document.querySelector('.minimal-concept')
    if (conceptEl) {
      ;(conceptEl as HTMLElement).style.cursor = 'none'
    }

    return () => {
      gsap.ticker.remove(tick)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      if (conceptEl) {
        ;(conceptEl as HTMLElement).style.cursor = ''
      }
    }
  }, [prefersReduced, isTouch])

  if (prefersReduced || isTouch) return null

  return (
    <>
      {/* Diamond cursor — rotated square evoking a brilliant-cut gem */}
      <div
        ref={diamondRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          border: '1.5px solid rgba(255, 255, 255, 0.7)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          mixBlendMode: 'difference',
          willChange: 'transform',
          transform: 'rotate(45deg)',
          transformOrigin: 'center center',
        }}
      />
      {/* Context label — appears centered when hovering data-cursor elements */}
      <div
        ref={labelRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          color: '#FFFFFF',
          fontSize: '9px',
          fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 500,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
    </>
  )
}
