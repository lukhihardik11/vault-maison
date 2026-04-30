'use client'

import { useEffect, useRef, useState, useCallback, createContext, useContext, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { useReducedMotionPreference } from './useResponsiveMotion'
import { minimal } from '../design-system';

/* ================================================================== */
/*  RouteTransition — Full-screen curtain wipe on route changes        */
/* ================================================================== */

/**
 * RouteTransition — a premium full-screen overlay that plays a
 * curtain-wipe animation on every client-side route change.
 *
 * Sequence:
 *   1. Route change detected (pathname changes)
 *   2. Black curtain slides in from bottom (0.5s)
 *   3. Brand wordmark fades in at center (0.3s hold)
 *   4. Curtain slides out to top (0.5s)
 *   5. New page content is revealed
 *
 * The curtain uses `clip-path: inset()` for GPU-accelerated animation
 * without layout thrashing. The wordmark uses `opacity` for clean
 * fade without FOUC.
 *
 * Context API:
 *   - `TransitionContext` provides `isTransitioning` boolean
 *   - Child components can read this to delay their entrance animations
 *     until the curtain has lifted
 *
 * Disabled on:
 *   - `prefers-reduced-motion: reduce` (instant page swap)
 *   - First mount (handled by PreLoader instead)
 */

interface TransitionContextValue {
  isTransitioning: boolean
  hasEnteredOnce: boolean
}

const TransitionContext = createContext<TransitionContextValue>({
  isTransitioning: false,
  hasEnteredOnce: false,
})

export function useTransitionState() {
  return useContext(TransitionContext)
}

interface RouteTransitionProps {
  children: ReactNode
}

export function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname()
  const prefersReduced = useReducedMotionPreference()
  const curtainRef = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)
  const prevPathRef = useRef(pathname)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hasEnteredOnce, setHasEnteredOnce] = useState(false)
  const isFirstMount = useRef(true)

  // Mark first entrance complete after initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEnteredOnce(true)
      isFirstMount.current = false
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Skip on first mount (PreLoader handles that)
    if (isFirstMount.current) {
      prevPathRef.current = pathname
      return
    }

    // Skip if pathname hasn't actually changed
    if (pathname === prevPathRef.current) return
    prevPathRef.current = pathname

    // Skip animation for reduced motion
    if (prefersReduced) return

    const curtain = curtainRef.current
    const wordmark = wordmarkRef.current
    if (!curtain || !wordmark) return

    setIsTransitioning(true)

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false)
        // Scroll to top after transition
        window.scrollTo(0, 0)
      },
    })

    // Phase 1: Curtain slides in from bottom
    tl.set(curtain, { display: 'flex', clipPath: 'inset(100% 0 0 0)' })
    tl.to(curtain, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 0.5,
      ease: 'power3.inOut',
    })

    // Phase 2: Wordmark fades in
    tl.to(wordmark, {
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out',
    })

    // Phase 3: Hold for a beat
    tl.to({}, { duration: 0.25 })

    // Phase 4: Wordmark fades out
    tl.to(wordmark, {
      opacity: 0,
      duration: 0.15,
      ease: 'power2.in',
    })

    // Phase 5: Curtain slides out to top
    tl.to(curtain, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.5,
      ease: 'power3.inOut',
    })

    // Phase 6: Reset
    tl.set(curtain, { display: 'none', clipPath: 'inset(100% 0 0 0)' })

    return () => {
      tl.kill()
    }
  }, [pathname, prefersReduced])

  return (
    <TransitionContext.Provider value={{ isTransitioning, hasEnteredOnce }}>
      {children}

      {/* Transition curtain overlay */}
      {!prefersReduced && (
        <div
          ref={curtainRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99990,
            backgroundColor: '#050505',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            clipPath: 'inset(100% 0 0 0)',
            pointerEvents: 'none',
          }}
        >
          {/* Brand wordmark */}
          <div
            ref={wordmarkRef}
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              fontSize: minimal.type.bodySm,
              fontWeight: 300,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              opacity: 0,
              userSelect: 'none',
            }}
          >
            Vault Maison
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  )
}

export default RouteTransition
