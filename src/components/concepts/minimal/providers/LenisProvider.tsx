'use client'

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Context                                                           */
/* ------------------------------------------------------------------ */

interface LenisContextValue {
  lenis: Lenis | null
  /** Programmatic scroll — wraps `lenis.scrollTo` */
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { duration?: number; offset?: number; immediate?: boolean }
  ) => void
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
})

export const useLenis = () => useContext(LenisContext)

/* ------------------------------------------------------------------ */
/*  Provider                                                          */
/* ------------------------------------------------------------------ */

interface LenisProviderProps {
  children: ReactNode
  /**
   * Lerp factor — lower = smoother / heavier momentum.
   * 0.06–0.08 for luxury, 0.10–0.12 for snappy.
   */
  lerp?: number
  /** Disable Lenis entirely (e.g. for reduced-motion users). */
  disabled?: boolean
}

export function LenisProvider({
  children,
  lerp = 0.07,
  disabled = false,
}: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number>(0)
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const pathname = usePathname()

  /* ---------- initialise / destroy ---------- */
  useEffect(() => {
    if (disabled || typeof window === 'undefined') return

    const instance = new Lenis({
      lerp,
      smoothWheel: true,
      /* Keep native touch scroll on mobile — Lenis enhances wheel only.
         This avoids fighting with iOS rubber-band and pull-to-refresh. */
      touchMultiplier: 0,
      /* Infinite scroll disabled — we want natural document height. */
      infinite: false,
    })

    lenisRef.current = instance
    setLenis(instance)

    // Expose globally so components outside the provider tree
    // (like RouteTransition) can reset scroll position
    ;(window as any).__lenis = instance

    /* Bridge Lenis → GSAP ScrollTrigger so pinned sections, scrub
       animations, and snap all work with the smooth-scrolled position. */
    instance.on('scroll', ScrollTrigger.update)

    /* Use GSAP ticker for the raf loop — this guarantees Lenis and
       GSAP share the same frame, avoiding jitter between scroll
       position and animation values. */
    const tickHandler = (time: number) => {
      instance.raf(time * 1000) // GSAP ticker gives seconds, Lenis wants ms
    }
    gsap.ticker.add(tickHandler)

    /* Lenis manages its own raf when using the ticker bridge, so
       disable its internal autoRaf. */
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickHandler)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
      ;(window as any).__lenis = null
    }
  }, [lerp, disabled])

  /* ---------- scroll-to-top on route change ---------- */
  // Use a completely different approach: listen to Next.js navigation
  // by intercepting pushState/replaceState which Next.js App Router uses
  useEffect(() => {
    if (typeof window === 'undefined') return

    let lastUrl = window.location.href

    const resetScroll = () => {
      const instance = lenisRef.current || (window as any).__lenis
      if (instance) {
        instance.stop()
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        requestAnimationFrame(() => {
          instance.start()
          ScrollTrigger.refresh()
        })
      } else {
        window.scrollTo(0, 0)
      }
    }

    // Monkey-patch pushState and replaceState to detect SPA navigation
    const originalPushState = history.pushState.bind(history)
    const originalReplaceState = history.replaceState.bind(history)

    history.pushState = function (data: any, unused: string, url?: string | URL | null) {
      originalPushState(data, unused, url)
      const newUrl = window.location.href
      if (newUrl !== lastUrl) {
        lastUrl = newUrl
        // Reset scroll after a small delay to let the page render
        setTimeout(resetScroll, 50)
        setTimeout(resetScroll, 200)
        setTimeout(resetScroll, 500)
      }
    }

    history.replaceState = function (data: any, unused: string, url?: string | URL | null) {
      originalReplaceState(data, unused, url)
      const newUrl = window.location.href
      if (newUrl !== lastUrl) {
        lastUrl = newUrl
        setTimeout(resetScroll, 50)
        setTimeout(resetScroll, 200)
        setTimeout(resetScroll, 500)
      }
    }

    // Also listen for popstate (browser back/forward)
    const handlePopState = () => {
      const newUrl = window.location.href
      if (newUrl !== lastUrl) {
        lastUrl = newUrl
        setTimeout(resetScroll, 50)
        setTimeout(resetScroll, 200)
        setTimeout(resetScroll, 500)
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
      window.removeEventListener('popstate', handlePopState)
    }
  }, []) // Empty deps - only run once on mount

  /* ---------- programmatic scrollTo ---------- */
  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: { duration?: number; offset?: number; immediate?: boolean }
    ) => {
      lenisRef.current?.scrollTo(target, {
        duration: options?.duration ?? 1.2,
        offset: options?.offset ?? 0,
        immediate: options?.immediate ?? false,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      })
    },
    []
  )

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  )
}
