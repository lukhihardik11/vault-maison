'use client'

import { useEffect, useRef, useMemo, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotionPreference } from './useResponsiveMotion'

gsap.registerPlugin(ScrollTrigger)

/* ================================================================== */
/*  CharSplit — utility to split text into per-character spans         */
/*  Preserves word boundaries with wrapper spans so the browser can    */
/*  still word-wrap normally. Each character gets a data-char attr.    */
/* ================================================================== */

function splitIntoChars(text: string): { word: string; chars: string[] }[] {
  return text.split(' ').filter(Boolean).map((word) => ({
    word,
    chars: word.split(''),
  }))
}

/* ================================================================== */
/*  KineticHeadline — per-character scroll-scrubbed reveal             */
/* ================================================================== */

type HeadlineTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'

interface KineticHeadlineProps {
  /** The text to animate character-by-character */
  text: string
  /** HTML tag to render. Default 'h1' */
  as?: HeadlineTag
  /** CSS class applied to the outer element */
  className?: string
  /** Inline styles for the outer element */
  style?: CSSProperties
  /**
   * Animation variant:
   * - 'slide-up': chars slide up from below + fade (default)
   * - 'fade': chars fade in only
   * - 'scale': chars scale up from 0.6 + fade
   * - 'rotate': chars rotate from -12deg + slide up + fade
   */
  variant?: 'slide-up' | 'fade' | 'scale' | 'rotate'
  /** Per-character stagger as fraction of scroll range. Default 0.02 */
  stagger?: number
  /** ScrollTrigger start. Default 'top 85%' */
  start?: string
  /** ScrollTrigger end. Default 'top 35%' */
  end?: string
  /** Scrub smoothing. Default 0.4 */
  scrub?: number
  /** Whether to use a one-shot trigger instead of scrub. Default false */
  once?: boolean
  /** Duration in seconds for one-shot mode. Default 0.8 */
  duration?: number
}

/**
 * KineticHeadline — per-character animation tied to scroll position.
 *
 * This is the "SplitText" pattern from premium Awwwards sites, built
 * without the GSAP SplitText plugin. Each character is wrapped in its
 * own <span> and animated with staggered GSAP tweens scrubbed by
 * ScrollTrigger.
 *
 * The result: as the user scrolls, characters cascade into view with
 * a wave-like stagger — the signature kinetic typography effect seen
 * on Apple, Cartier, and Awwwards SOTD winners.
 *
 * Supports four variants:
 * - slide-up: characters rise from below (most dramatic)
 * - fade: characters fade in (subtle)
 * - scale: characters scale up (punchy)
 * - rotate: characters rotate in (editorial)
 *
 * All variants honor prefers-reduced-motion.
 */
export function KineticHeadline({
  text,
  as: Tag = 'h1',
  className = '',
  style,
  variant = 'slide-up',
  stagger = 0.02,
  start = 'top 85%',
  end = 'top 35%',
  scrub = 0.4,
  once = false,
  duration = 0.8,
}: KineticHeadlineProps) {
  const ref = useRef<HTMLElement | null>(null)
  const prefersReduced = useReducedMotionPreference()

  const wordData = useMemo(() => splitIntoChars(text), [text])

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced) return

    const charEls = el.querySelectorAll('[data-kinetic-char]')
    if (!charEls.length) return

    // Determine the "from" state based on variant
    const fromVars: gsap.TweenVars = { autoAlpha: 0 }

    switch (variant) {
      case 'slide-up':
        fromVars.yPercent = 100
        fromVars.rotateX = -40
        break
      case 'scale':
        fromVars.scale = 0.6
        fromVars.yPercent = 20
        break
      case 'rotate':
        fromVars.rotation = -12
        fromVars.yPercent = 60
        fromVars.transformOrigin = 'left bottom'
        break
      case 'fade':
      default:
        // Just autoAlpha: 0 is enough
        break
    }

    const ctx = gsap.context(() => {
      gsap.set(charEls, fromVars)

      const toVars: gsap.TweenVars = {
        autoAlpha: 1,
        yPercent: 0,
        rotation: 0,
        rotateX: 0,
        scale: 1,
        stagger,
        ease: once ? 'power3.out' : 'none',
      }

      if (once) {
        // One-shot mode: play once when element enters viewport
        toVars.duration = duration
        toVars.scrollTrigger = {
          trigger: el,
          start,
          toggleActions: 'play none none none',
          once: true,
        }
      } else {
        // Scrub mode: tied to scroll position
        toVars.scrollTrigger = {
          trigger: el,
          start,
          end,
          scrub,
        }
      }

      gsap.to(charEls, toVars)
    }, el)

    return () => ctx.revert()
  }, [variant, stagger, start, end, scrub, once, duration, prefersReduced])

  // Global char index for unique keys
  let charIndex = 0

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        ...style,
        // perspective for 3D rotateX effect
        perspective: variant === 'slide-up' ? '600px' : undefined,
      }}
    >
      {wordData.map((wordObj, wi) => (
        <span
          key={wi}
          style={{
            display: 'inline-block',
            whiteSpace: 'pre',
          }}
        >
          {wordObj.chars.map((char) => {
            const idx = charIndex++
            return (
              <span
                key={idx}
                data-kinetic-char
                style={{
                  display: 'inline-block',
                  // Prevent layout shift during animation
                  willChange: prefersReduced ? 'auto' : 'transform, opacity',
                  visibility: prefersReduced ? 'visible' : 'hidden',
                }}
              >
                {char}
              </span>
            )
          })}
          {/* Word separator — only between words, not after last */}
          {wi < wordData.length - 1 && (
            <span style={{ display: 'inline-block' }}>&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  )
}

/* ================================================================== */
/*  HeadlineReveal — line-by-line clip-path + translate reveal         */
/* ================================================================== */

interface HeadlineRevealProps {
  /** Array of text lines to reveal sequentially */
  lines: string[]
  /** HTML tag for each line. Default 'span' rendered inside a wrapper */
  as?: HeadlineTag
  /** CSS class for the outer wrapper */
  className?: string
  /** Inline styles for the outer wrapper */
  style?: CSSProperties
  /** CSS class applied to each line element */
  lineClassName?: string
  /** Inline styles applied to each line element */
  lineStyle?: CSSProperties
  /** Stagger delay between lines in seconds. Default 0.12 */
  stagger?: number
  /** Animation duration per line in seconds. Default 0.7 */
  duration?: number
  /** ScrollTrigger start. Default 'top 80%' */
  start?: string
  /** Whether to scrub (tie to scroll) instead of one-shot. Default false */
  scrub?: boolean | number
  /** ScrollTrigger end (only used when scrub is enabled). Default 'top 30%' */
  end?: string
}

/**
 * HeadlineReveal — each line of a headline slides up from behind a
 * clip-path mask with staggered timing.
 *
 * This is the "masked line reveal" pattern — each line starts below
 * its container (clipped by overflow:hidden) and slides up into view.
 * Combined with a slight opacity fade, it creates the premium editorial
 * headline entrance seen on Cartier, Tiffany, and Awwwards typography
 * showcases.
 *
 * Pass `lines` as an array — each string becomes one animated line.
 * This gives you explicit control over line breaks (no relying on
 * browser wrapping) which is essential for editorial headline design.
 */
export function HeadlineReveal({
  lines,
  as: Tag = 'h1',
  className = '',
  style,
  lineClassName = '',
  lineStyle,
  stagger: staggerVal = 0.12,
  duration = 0.7,
  start = 'top 80%',
  scrub = false,
  end = 'top 30%',
}: HeadlineRevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const prefersReduced = useReducedMotionPreference()

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced) return

    const lineEls = el.querySelectorAll('[data-headline-line]')
    if (!lineEls.length) return

    const ctx = gsap.context(() => {
      gsap.set(lineEls, {
        yPercent: 110,
        opacity: 0,
      })

      const toVars: gsap.TweenVars = {
        yPercent: 0,
        opacity: 1,
        stagger: staggerVal,
        ease: scrub ? 'none' : 'power3.out',
      }

      if (scrub) {
        toVars.scrollTrigger = {
          trigger: el,
          start,
          end,
          scrub: typeof scrub === 'number' ? scrub : 0.5,
        }
      } else {
        toVars.duration = duration
        toVars.scrollTrigger = {
          trigger: el,
          start,
          toggleActions: 'play none none none',
          once: true,
        }
      }

      gsap.to(lineEls, toVars)
    }, el)

    return () => ctx.revert()
  }, [staggerVal, duration, start, end, scrub, prefersReduced])

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={style}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          style={{
            display: 'block',
            overflow: 'hidden',
          }}
        >
          <span
            data-headline-line
            className={lineClassName}
            style={{
              display: 'block',
              ...lineStyle,
              visibility: prefersReduced ? 'visible' : 'hidden',
              // GSAP autoAlpha will handle visibility
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
