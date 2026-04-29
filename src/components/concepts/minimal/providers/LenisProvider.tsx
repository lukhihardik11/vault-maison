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
    }
  }, [lerp, disabled])

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
