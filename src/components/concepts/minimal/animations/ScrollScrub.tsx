'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotionPreference } from './useResponsiveMotion'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  ScrollScrub — continuous scroll-linked reveal                     */
/* ------------------------------------------------------------------ */

interface ScrollScrubProps {
  children: ReactNode
  className?: string
  /**
   * The animation to scrub. Each key is a GSAP property.
   * Example: `{ y: 60, opacity: 0, scale: 0.95 }`
   * The element starts at these values and scrubs to their
   * natural state (y:0, opacity:1, scale:1) as you scroll.
   */
  from?: gsap.TweenVars
  /** ScrollTrigger start. Default 'top 90%' */
  start?: string
  /** ScrollTrigger end. Default 'top 40%' */
  end?: string
  /** Tag to render. Default 'div' */
  as?: 'div' | 'section' | 'article' | 'h1' | 'h2' | 'h3' | 'p'
}

/**
 * ScrollScrub — ties an element's animation progress to scroll position.
 *
 * Unlike binary reveals (IntersectionObserver: hidden → visible), this
 * creates a **continuous** relationship between scroll position and
 * animation progress. As the user scrolls, the element smoothly
 * transitions from the `from` state to its natural state.
 *
 * This is the pattern used by Apple, Cartier, and every Awwwards SOTD
 * winner — the scroll itself becomes the animation timeline.
 *
 * Uses GSAP ScrollTrigger `scrub: 0.6` for a slightly smoothed feel
 * that works beautifully with Lenis momentum scrolling.
 */
export function ScrollScrub({
  children,
  className = '',
  from = { y: 60, opacity: 0 },
  start = 'top 90%',
  end = 'top 40%',
  as: Tag = 'div',
}: ScrollScrubProps) {
  const ref = useRef<HTMLElement | null>(null)
  const prefersReduced = useReducedMotionPreference()

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { ...from, willChange: 'transform, opacity' },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          filter: 'blur(0px)',
          willChange: 'auto',
          ease: 'none', // Linear — scroll position IS the easing
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: 0.6, // Smooth scrub — 0.6s lag behind scroll
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [from, start, end, prefersReduced])

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/*  ScrollWordReveal — each word's opacity tied to scroll position    */
/* ------------------------------------------------------------------ */

interface ScrollWordRevealProps {
  text: string
  className?: string
  /** Tag to render. Default 'p' */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'blockquote'
  /** Base opacity for unrevealed words. Default 0.12 */
  baseOpacity?: number
  /** ScrollTrigger start. Default 'top 80%' */
  start?: string
  /** ScrollTrigger end. Default 'top 20%' */
  end?: string
}

/**
 * ScrollWordReveal — each word's opacity is scrubbed by scroll position.
 *
 * Words start at `baseOpacity` (ghosted) and each word progressively
 * reaches full opacity as the user scrolls through the section. This
 * creates the "reading along with scroll" effect used by Apple's
 * product pages and Brunello Cucinelli's AI E-com.
 *
 * The stagger is automatic — earlier words reach full opacity first,
 * creating a left-to-right reading wave tied to scroll.
 */
export function ScrollWordReveal({
  text,
  className = '',
  as: Tag = 'p',
  baseOpacity = 0.12,
  start = 'top 80%',
  end = 'top 20%',
}: ScrollWordRevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const prefersReduced = useReducedMotionPreference()

  const words = text.split(' ')

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced) return

    const wordEls = el.querySelectorAll('[data-scrub-word]')
    if (!wordEls.length) return

    const ctx = gsap.context(() => {
      gsap.set(wordEls, { opacity: baseOpacity })

      gsap.to(wordEls, {
        opacity: 1,
        stagger: 0.05, // Each word takes 5% of the scroll range
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: 0.3, // Tighter scrub for text — feels more responsive
        },
      })
    }, el)

    return () => ctx.revert()
  }, [baseOpacity, start, end, prefersReduced])

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          data-scrub-word
          style={{
            display: 'inline-block',
            opacity: prefersReduced ? 1 : baseOpacity,
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  )
}
