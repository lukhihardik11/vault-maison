'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

/**
 * CustomCursor — Minimal luxury dot cursor
 *
 * A small dot that follows the mouse with a slight lag (lerp).
 * Scales up when hovering over interactive elements (links, buttons, inputs).
 * Respects prefers-reduced-motion and touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotionPreference()
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Detect touch device — no custom cursor needed
    const checkTouch = () => {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        setIsTouch(true)
      }
    }
    checkTouch()
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || isTouch) return

    const dot = dotRef.current
    if (!dot) return

    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0
    let hovering = false
    let raf: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) setVisible(true)
    }

    const onMouseEnter = () => setVisible(true)
    const onMouseLeave = () => setVisible(false)

    const isInteractive = (el: Element | null): boolean => {
      if (!el) return false
      const tag = el.tagName.toLowerCase()
      if (['a', 'button', 'input', 'textarea', 'select'].includes(tag)) return true
      if (el.getAttribute('role') === 'button') return true
      if (el.closest('a, button, [role="button"]')) return true
      const style = window.getComputedStyle(el)
      if (style.cursor === 'pointer') return true
      return false
    }

    const onMouseOver = (e: MouseEvent) => {
      hovering = isInteractive(e.target as Element)
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      dotX = lerp(dotX, mouseX, 0.15)
      dotY = lerp(dotY, mouseY, 0.15)

      if (dot) {
        dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px) scale(${hovering ? 2.5 : 1})`
        dot.style.opacity = visible ? '1' : '0'
      }

      raf = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(raf)
    }
  }, [prefersReducedMotion, isTouch, visible])

  if (prefersReducedMotion || isTouch) return null

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#050505',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
        mixBlendMode: 'difference',
      }}
    />
  )
}
