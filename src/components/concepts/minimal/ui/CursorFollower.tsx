'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import gsap from 'gsap'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'
import { minimal } from '../design-system';

/* ================================================================== */
/*  CursorFollower — Premium dual-layer cursor with context labels     */
/* ================================================================== */

/**
 * CursorFollower — replaces the basic CustomCursor with a premium
 * dual-layer system seen on Awwwards SOTD winners.
 *
 * Architecture:
 *   - **Inner dot** (6px): fast lerp (0.25), tracks cursor tightly
 *   - **Outer ring** (40px): slow lerp (0.12), creates trailing lag
 *   - **Label layer**: context-aware text that appears over elements
 *     with `data-cursor="view"`, `data-cursor="drag"`, etc.
 *
 * The cursor reads `data-cursor` attributes from hovered elements:
 *   - `data-cursor="view"` → shows "View" label, ring expands
 *   - `data-cursor="drag"` → shows "Drag" label
 *   - `data-cursor="explore"` → shows "Explore" label
 *   - `data-cursor="link"` → ring shrinks, dot scales up
 *   - Any interactive element → ring scales up subtly
 *
 * Uses `mix-blend-mode: difference` so the cursor inverts against
 * both light and dark sections automatically.
 *
 * Disabled on:
 *   - Touch devices (`pointer: coarse`)
 *   - `prefers-reduced-motion: reduce`
 *   - SSR (no window)
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

    let mouseX = -100
    let mouseY = -100
    let dotX = -100
    let dotY = -100
    let ringX = -100
    let ringY = -100
    let visible = false
    let currentLabel = ''
    let isInteractive = false

    const DOT_LERP = 0.25
    const RING_LERP = 0.12
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    // Detect cursor context from data-cursor attribute
    const getCursorContext = (el: Element | null): string => {
      if (!el) return ''
      // Walk up the DOM tree to find data-cursor
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

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) {
        visible = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
    }

    const onMouseLeave = () => {
      visible = false
      gsap.to([dot, ring, label], { opacity: 0, duration: 0.3 })
    }

    const onMouseEnter = () => {
      visible = true
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      const context = getCursorContext(target)
      isInteractive = checkInteractive(target)

      if (context && context !== currentLabel) {
        currentLabel = context
        label.textContent = context.charAt(0).toUpperCase() + context.slice(1)
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' })
        gsap.to(ring, { scale: 1.8, borderColor: 'rgba(255,255,255,0.6)', duration: 0.3, ease: 'power2.out' })
        gsap.to(dot, { scale: 0, duration: 0.2 })
      } else if (!context && currentLabel) {
        currentLabel = ''
        gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2, ease: 'power2.in' })
        gsap.to(ring, { scale: 1, borderColor: 'rgba(255,255,255,0.4)', duration: 0.3, ease: 'power2.out' })
        gsap.to(dot, { scale: 1, duration: 0.2 })
      }

      if (!context && isInteractive) {
        gsap.to(ring, { scale: 1.4, duration: 0.25, ease: 'power2.out' })
        gsap.to(dot, { scale: 0.6, duration: 0.2 })
      } else if (!context && !isInteractive) {
        gsap.to(ring, { scale: 1, duration: 0.25, ease: 'power2.out' })
        gsap.to(dot, { scale: 1, duration: 0.2 })
      }
    }

    const tick = () => {
      dotX = lerp(dotX, mouseX, DOT_LERP)
      dotY = lerp(dotY, mouseY, DOT_LERP)
      ringX = lerp(ringX, mouseX, RING_LERP)
      ringY = lerp(ringY, mouseY, RING_LERP)

      dot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(${ring.style.transform.match(/scale\(([^)]+)\)/)?.[1] || 1})`
      label.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`

      requestAnimationFrame(tick)
    }

    // Use GSAP quickSetter for better performance
    const setDotX = gsap.quickSetter(dot, 'x', 'px')
    const setDotY = gsap.quickSetter(dot, 'y', 'px')
    const setRingX = gsap.quickSetter(ring, 'x', 'px')
    const setRingY = gsap.quickSetter(ring, 'y', 'px')
    const setLabelX = gsap.quickSetter(label, 'x', 'px')
    const setLabelY = gsap.quickSetter(label, 'y', 'px')

    const tickGsap = () => {
      dotX = lerp(dotX, mouseX, DOT_LERP)
      dotY = lerp(dotY, mouseY, DOT_LERP)
      ringX = lerp(ringX, mouseX, RING_LERP)
      ringY = lerp(ringY, mouseY, RING_LERP)

      setDotX(dotX - 3)
      setDotY(dotY - 3)
      setRingX(ringX - 20)
      setRingY(ringY - 20)
      setLabelX(ringX - 20)
      setLabelY(ringY - 20)
    }

    // Use GSAP ticker for consistent frame rate
    gsap.ticker.add(tickGsap)

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseover', onMouseOver, { passive: true })

    // Hide default cursor on the minimal-concept container
    const conceptEl = document.querySelector('.minimal-concept')
    if (conceptEl) {
      ;(conceptEl as HTMLElement).style.cursor = 'none'
    }

    return () => {
      gsap.ticker.remove(tickGsap)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover', onMouseOver)
      if (conceptEl) {
        ;(conceptEl as HTMLElement).style.cursor = ''
      }
    }
  }, [prefersReduced, isTouch])

  if (prefersReduced || isTouch) return null

  return (
    <>
      {/* Inner dot — fast tracking */}
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
      {/* Outer ring — slow trailing */}
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
          transition: 'border-color 0.3s ease',
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
