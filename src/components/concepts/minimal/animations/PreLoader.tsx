'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useReducedMotionPreference } from './useResponsiveMotion'

/* ================================================================== */
/*  PreLoader — First-visit branded loading sequence                   */
/* ================================================================== */

const BRAND_TEXT = 'VAULT MAISON'
const SESSION_KEY = 'vm-preloader-played'

export function PreLoader() {
  const prefersReduced = useReducedMotionPreference()
  const overlayRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<(HTMLSpanElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)
  const [shouldShow, setShouldShow] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (prefersReduced) {
      setIsDone(true)
      return
    }

    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setIsDone(true)
        return
      }
    } catch {
      setIsDone(true)
      return
    }

    setShouldShow(true)

    // Safety: force-remove after 3s even if GSAP fails
    const safety = setTimeout(() => {
      try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* noop */ }
      document.body.style.overflow = ''
      setIsDone(true)
    }, 3000)

    return () => clearTimeout(safety)
  }, [prefersReduced])

  useEffect(() => {
    if (!shouldShow || isDone) return

    const overlay = overlayRef.current
    const line = lineRef.current
    const chars = charsRef.current.filter(Boolean) as HTMLSpanElement[]
    if (!overlay || !line || !chars.length) return

    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* noop */ }
        document.body.style.overflow = ''
        setIsDone(true)
      },
    })

    // Use opacity (not autoAlpha) to avoid visibility:hidden issues
    tl.set(chars, { opacity: 0, y: 30 })
    tl.set(line, { scaleX: 0, transformOrigin: 'left center' })

    // Phase 1: Stagger characters in
    tl.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.03,
      ease: 'power3.out',
    }, 0.2)

    // Phase 2: Progress line
    tl.to(line, {
      scaleX: 1,
      duration: 0.8,
      ease: 'power2.inOut',
    }, 0.5)

    // Phase 3: Hold briefly
    tl.to({}, { duration: 0.2 })

    // Phase 4: Fade out text
    tl.to(chars, {
      opacity: 0,
      y: -15,
      duration: 0.25,
      stagger: 0.015,
      ease: 'power2.in',
    })

    tl.to(line, { opacity: 0, duration: 0.15 }, '<')

    // Phase 5: Curtain lifts
    tl.to(overlay, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.5,
      ease: 'power3.inOut',
    })

    // Phase 6: Remove
    tl.set(overlay, { display: 'none' })

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [shouldShow, isDone])

  if (isDone) return null

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99995,
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        pointerEvents: 'all',
      }}
    >
      <div
        style={{ display: 'flex', gap: '0', userSelect: 'none' }}
        aria-hidden="true"
      >
        {BRAND_TEXT.split('').map((char, i) => (
          <span
            key={i}
            ref={(el) => { charsRef.current[i] = el }}
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              fontSize: 'clamp(24px, 4vw, 48px)',
              fontWeight: 200,
              letterSpacing: '0.3em',
              color: '#FFFFFF',
              display: 'inline-block',
              opacity: 0,
              minWidth: char === ' ' ? '0.5em' : undefined,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      <div
        style={{
          width: 'clamp(120px, 20vw, 200px)',
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#FFFFFF',
            transform: 'scaleX(0)',
            transformOrigin: 'left center',
          }}
        />
      </div>
    </div>
  )
}

export default PreLoader
