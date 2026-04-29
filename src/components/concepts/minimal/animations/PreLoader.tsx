'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useReducedMotionPreference } from './useResponsiveMotion'

/* ================================================================== */
/*  PreLoader — First-visit branded loading sequence                   */
/* ================================================================== */

/**
 * PreLoader — a cinematic loading screen shown only on the very first
 * visit to the site (per session). Subsequent navigations use the
 * RouteTransition curtain instead.
 *
 * Sequence:
 *   1. Full-screen black overlay with "VAULT MAISON" in large type
 *   2. Each character staggers in with translateY + autoAlpha
 *   3. A thin progress line animates from 0% to 100% width
 *   4. After progress completes, the overlay lifts with clip-path
 *   5. Page content is revealed beneath
 *
 * Uses sessionStorage to track whether the loader has played.
 * Disabled on prefers-reduced-motion (content shows immediately).
 *
 * The loader blocks interaction during playback via pointer-events
 * and is removed from the DOM after completion.
 */

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

    // Check if already played this session
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setIsDone(true)
        return
      }
    } catch {
      // sessionStorage not available — skip loader
      setIsDone(true)
      return
    }

    setShouldShow(true)
  }, [prefersReduced])

  useEffect(() => {
    if (!shouldShow || isDone) return

    const overlay = overlayRef.current
    const line = lineRef.current
    const chars = charsRef.current.filter(Boolean) as HTMLSpanElement[]
    if (!overlay || !line || !chars.length) return

    // Lock body scroll during preloader
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem(SESSION_KEY, '1')
        } catch { /* noop */ }
        document.body.style.overflow = ''
        setIsDone(true)
      },
    })

    // Initial state
    tl.set(chars, { autoAlpha: 0, y: 30 })
    tl.set(line, { scaleX: 0, transformOrigin: 'left center' })

    // Phase 1: Stagger characters in
    tl.to(chars, {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.04,
      ease: 'power3.out',
    }, 0.3)

    // Phase 2: Progress line
    tl.to(line, {
      scaleX: 1,
      duration: 1.2,
      ease: 'power2.inOut',
    }, 0.8)

    // Phase 3: Hold
    tl.to({}, { duration: 0.3 })

    // Phase 4: Fade out text
    tl.to(chars, {
      autoAlpha: 0,
      y: -15,
      duration: 0.3,
      stagger: 0.02,
      ease: 'power2.in',
    })

    tl.to(line, {
      autoAlpha: 0,
      duration: 0.2,
    }, '<')

    // Phase 5: Curtain lifts
    tl.to(overlay, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.7,
      ease: 'power3.inOut',
    })

    // Phase 6: Remove from DOM
    tl.set(overlay, { display: 'none' })

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [shouldShow, isDone])

  if (isDone && !shouldShow) return null
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
      {/* Brand text — each character wrapped for stagger */}
      <div
        style={{
          display: 'flex',
          gap: '0',
          userSelect: 'none',
        }}
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
              visibility: 'hidden',
              // Preserve space character width
              minWidth: char === ' ' ? '0.5em' : undefined,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* Progress line */}
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
