'use client'

import { useEffect, useRef, useMemo, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotionPreference } from './useResponsiveMotion'

gsap.registerPlugin(ScrollTrigger)

/* ================================================================== */
/*  CharSplit — utility to split text into per-character spans         */
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
  text: string
  as?: HeadlineTag
  className?: string
  style?: CSSProperties
  variant?: 'slide-up' | 'fade' | 'scale' | 'rotate'
  stagger?: number
  start?: string
  end?: string
  scrub?: number
  once?: boolean
  duration?: number
}

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
  const [mounted, setMounted] = useState(false)

  const wordData = useMemo(() => splitIntoChars(text), [text])

  // Mark as mounted after hydration so CSS can hide chars
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced || !mounted) return

    const charEls = el.querySelectorAll('[data-kinetic-char]')
    if (!charEls.length) return

    const fromVars: gsap.TweenVars = { opacity: 0 }

    switch (variant) {
      case 'slide-up':
        fromVars.yPercent = 60
        fromVars.rotateX = -20
        break
      case 'scale':
        fromVars.scale = 0.6
        fromVars.yPercent = 20
        break
      case 'rotate':
        fromVars.rotation = -12
        fromVars.yPercent = 40
        fromVars.transformOrigin = 'left bottom'
        break
      case 'fade':
      default:
        break
    }

    const ctx = gsap.context(() => {
      gsap.set(charEls, fromVars)

      const toVars: gsap.TweenVars = {
        opacity: 1,
        yPercent: 0,
        rotation: 0,
        rotateX: 0,
        scale: 1,
        stagger,
        ease: once ? 'power3.out' : 'none',
      }

      if (once) {
        toVars.duration = duration
        toVars.scrollTrigger = {
          trigger: el,
          start,
          toggleActions: 'play none none none',
          once: true,
        }
      } else {
        toVars.scrollTrigger = {
          trigger: el,
          start,
          end,
          scrub,
        }
      }

      gsap.to(charEls, toVars)

      // Safety: force a ScrollTrigger refresh after a short delay
      // to catch elements already in viewport
      setTimeout(() => ScrollTrigger.refresh(), 200)
    }, el)

    return () => ctx.revert()
  }, [variant, stagger, start, end, scrub, once, duration, prefersReduced, mounted])

  let charIndex = 0

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        ...style,
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
                  /* Chars are visible by default (SSR).
                     GSAP sets opacity:0 then animates to 1 after mount.
                     If GSAP fails, text remains visible. */
                }}
              >
                {char}
              </span>
            )
          })}
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
  lines: string[]
  as?: HeadlineTag
  className?: string
  style?: CSSProperties
  lineClassName?: string
  lineStyle?: CSSProperties
  stagger?: number
  duration?: number
  start?: string
  scrub?: boolean | number
  end?: string
}

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
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced || !mounted) return

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

      // Safety: force a ScrollTrigger refresh after a short delay
      setTimeout(() => ScrollTrigger.refresh(), 200)
    }, el)

    return () => ctx.revert()
  }, [staggerVal, duration, start, end, scrub, prefersReduced, mounted])

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
              /* Visible by default — GSAP handles opacity after mount */
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
