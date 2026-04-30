'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'
import { minimal } from '../design-system';

/* ================================================================== */
/*  CursorFollower — Premium physics-based cursor with context states   */
/* ================================================================== */

/**
 * CursorFollower v2 — Phase 2 upgrade.
 *
 * Architecture:
 *   - **Inner dot** (6px): fast lerp (0.28), tracks cursor tightly
 *   - **Outer ring** (40px): slow lerp (0.10), creates trailing lag
 *   - **Label layer**: context-aware text from `data-cursor` attributes
 *   - **Click feedback**: dot pulses, ring contracts on mousedown
 *   - **Scroll-aware**: updates position during passive scroll
 *   - **Velocity-reactive**: ring stretches subtly at high speed
 *
 * Context states (via `data-cursor` attribute):
 *   - `view`    → "View" label, ring expands to 1.8x
 *   - `drag`    → "Drag" label, ring expands
 *   - `explore` → "Explore" label, ring expands
 *   - `zoom`    → "Zoom" label, ring expands
 *   - `play`    → "Play" label, ring expands
 *   - `link`    → ring scales 1.4x, dot shrinks
 *   - Any `<a>`, `<button>`, `[role="button"]` → ring scales 1.3x
 *
 * Performance:
 *   - GSAP ticker (not rAF) for consistent frame rate
 *   - quickSetter for zero-allocation transforms
 *   - Passive event listeners
 *   - Early exit when cursor is off-screen
 *
 * Accessibility:
 *   - Disabled on touch devices (pointer: coarse)
 *   - Disabled on prefers-reduced-motion
 *   - No SSR rendering
 */
export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
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

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    // ─── State ─────────────────────────────────────────────────
    let mouseX = -100
    let mouseY = -100
    let dotX = -100
    let dotY = -100
    let ringX = -100
    let ringY = -100
    let prevDotX = -100
    let prevDotY = -100
    let visible = false
    let currentLabel = ''
    let isInteractive = false
    let isPressed = false

    // ─── Physics tuning ────────────────────────────────────────
    const DOT_LERP = 0.28
    const RING_LERP = 0.10
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    // ─── Context detection ─────────────────────────────────────
    const getCursorContext = (el: Element | null): string => {
      if (!el) return ''
      let node: Element | null = el
      while (node) {
        const attr = node.getAttribute('data-cursor')
        if (attr) return attr
        node = node.parentElement
      }
      return ''
    }

    const checkInteractive = (el: Element | null): boolean => {
      if (!el) return false
      const tag = el.tagName.toLowerCase()
      if (['a', 'button', 'input', 'textarea', 'select'].includes(tag)) return true
      if (el.getAttribute('role') === 'button') return true
      if (el.closest('a, button, [role="button"]')) return true
      return false
    }

    // ─── Event handlers ────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) {
        visible = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.4, ease: 'power2.out' })
      }
    }

    const onMouseLeave = () => {
      visible = false
      gsap.to([dot, ring, label], { opacity: 0, duration: 0.3 })
    }

    const onMouseEnter = () => {
      if (!visible) {
        visible = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      const context = getCursorContext(target)
      isInteractive = checkInteractive(target)

      // Context label state
      if (context && context !== currentLabel) {
        currentLabel = context
        label.textContent = context.charAt(0).toUpperCase() + context.slice(1)
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' })
        gsap.to(ring, { scale: 1.8, borderColor: 'rgba(255,255,255,0.6)', duration: 0.35, ease: 'power3.out' })
        gsap.to(dot, { scale: 0, duration: 0.2 })
      } else if (!context && currentLabel) {
        currentLabel = ''
        gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2, ease: 'power2.in' })
        gsap.to(ring, { scale: 1, borderColor: 'rgba(255,255,255,0.4)', duration: 0.35, ease: 'power3.out' })
        gsap.to(dot, { scale: 1, duration: 0.2 })
      }

      // Interactive element state (no context label)
      if (!context && isInteractive) {
        gsap.to(ring, { scale: 1.3, borderColor: 'rgba(255,255,255,0.5)', duration: 0.25, ease: 'power2.out' })
        gsap.to(dot, { scale: 0.7, duration: 0.2 })
      } else if (!context && !isInteractive) {
        gsap.to(ring, { scale: 1, borderColor: 'rgba(255,255,255,0.4)', duration: 0.25, ease: 'power2.out' })
        gsap.to(dot, { scale: 1, duration: 0.2 })
      }
    }

    // ─── Click feedback ────────────────────────────────────────
    const onMouseDown = () => {
      isPressed = true
      gsap.to(ring, { scale: 0.8, duration: 0.12, ease: 'power3.out' })
      gsap.to(dot, { scale: 1.6, duration: 0.12, ease: 'power3.out' })
    }

    const onMouseUp = () => {
      isPressed = false
      // Return to appropriate state
      if (currentLabel) {
        gsap.to(ring, { scale: 1.8, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
        gsap.to(dot, { scale: 0, duration: 0.2 })
      } else if (isInteractive) {
        gsap.to(ring, { scale: 1.3, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
        gsap.to(dot, { scale: 0.7, duration: 0.2 })
      } else {
        gsap.to(ring, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
        gsap.to(dot, { scale: 1, duration: 0.2 })
      }
    }

    // ─── Scroll-aware update ───────────────────────────────────
    // When user scrolls without moving mouse, elements shift under cursor
    // We re-check the element under the cursor position
    const onScroll = () => {
      if (!visible) return
      const el = document.elementFromPoint(mouseX, mouseY)
      if (el) {
        const context = getCursorContext(el)
        const interactive = checkInteractive(el)

        if (context && context !== currentLabel) {
          currentLabel = context
          label.textContent = context.charAt(0).toUpperCase() + context.slice(1)
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' })
          gsap.to(ring, { scale: 1.8, borderColor: 'rgba(255,255,255,0.6)', duration: 0.35, ease: 'power3.out' })
          gsap.to(dot, { scale: 0, duration: 0.2 })
        } else if (!context && currentLabel) {
          currentLabel = ''
          gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2, ease: 'power2.in' })
          gsap.to(ring, { scale: 1, borderColor: 'rgba(255,255,255,0.4)', duration: 0.35, ease: 'power3.out' })
          gsap.to(dot, { scale: 1, duration: 0.2 })
        }

        if (!context && interactive && !isInteractive) {
          isInteractive = true
          gsap.to(ring, { scale: 1.3, duration: 0.25, ease: 'power2.out' })
          gsap.to(dot, { scale: 0.7, duration: 0.2 })
        } else if (!context && !interactive && isInteractive) {
          isInteractive = false
          gsap.to(ring, { scale: 1, duration: 0.25, ease: 'power2.out' })
          gsap.to(dot, { scale: 1, duration: 0.2 })
        }
      }
    }

    // ─── Animation loop (GSAP ticker) ─────────────────────────
    const setDotX = gsap.quickSetter(dot, 'x', 'px')
    const setDotY = gsap.quickSetter(dot, 'y', 'px')
    const setRingX = gsap.quickSetter(ring, 'x', 'px')
    const setRingY = gsap.quickSetter(ring, 'y', 'px')
    const setLabelX = gsap.quickSetter(label, 'x', 'px')
    const setLabelY = gsap.quickSetter(label, 'y', 'px')

    const tickGsap = () => {
      // Store previous for velocity calculation
      prevDotX = dotX
      prevDotY = dotY

      // Lerp positions
      dotX = lerp(dotX, mouseX, DOT_LERP)
      dotY = lerp(dotY, mouseY, DOT_LERP)
      ringX = lerp(ringX, mouseX, RING_LERP)
      ringY = lerp(ringY, mouseY, RING_LERP)

      // Apply transforms (offset by half element size)
      setDotX(dotX - 3)
      setDotY(dotY - 3)
      setRingX(ringX - 20)
      setRingY(ringY - 20)
      setLabelX(ringX - 20)
      setLabelY(ringY - 20)

      // Velocity-based ring stretch (subtle)
      const vx = dotX - prevDotX
      const vy = dotY - prevDotY
      const speed = Math.hypot(vx, vy)
      if (speed > 2 && !isPressed && !currentLabel) {
        const stretch = Math.min(speed * 0.008, 0.15)
        const angle = Math.atan2(vy, vx) * (180 / Math.PI)
        ring.style.borderRadius = `${50 - stretch * 20}%`
        ring.style.rotate = `${angle}deg`
      } else if (!isPressed) {
        ring.style.borderRadius = '50%'
        ring.style.rotate = '0deg'
      }
    }

    // ─── Register listeners ────────────────────────────────────
    gsap.ticker.add(tickGsap)

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Hide default cursor on the minimal-concept container
    const conceptEl = document.querySelector('.minimal-concept')
    if (conceptEl) {
      ;(conceptEl as HTMLElement).style.cursor = 'none'
    }

    // Also hide cursor on all interactive elements within
    const styleTag = document.createElement('style')
    styleTag.id = 'vm-cursor-hide'
    styleTag.textContent = `
      .minimal-concept,
      .minimal-concept a,
      .minimal-concept button,
      .minimal-concept input,
      .minimal-concept textarea,
      .minimal-concept select,
      .minimal-concept [role="button"] {
        cursor: none !important;
      }
    `
    document.head.appendChild(styleTag)

    return () => {
      gsap.ticker.remove(tickGsap)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('scroll', onScroll)
      if (conceptEl) {
        ;(conceptEl as HTMLElement).style.cursor = ''
      }
      const existingStyle = document.getElementById('vm-cursor-hide')
      if (existingStyle) existingStyle.remove()
    }
  }, [prefersReduced, isTouch])

  if (prefersReduced || isTouch) return null

  return (
    <>
      {/* Inner dot — fast tracking, mix-blend-mode: difference */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* Outer ring — slow trailing, velocity-reactive */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.4)',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          mixBlendMode: 'difference',
          willChange: 'transform',
          transition: 'border-color 0.3s ease, border-radius 0.3s ease, rotate 0.2s ease',
        }}
      />
      {/* Context label */}
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
          fontSize: minimal.type.micro,
          fontFamily: "'Space Mono', 'SF Mono', monospace",
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
    </>
  )
}
