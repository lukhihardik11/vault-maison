'use client'

import { useRef, useState, useEffect, useCallback, type CSSProperties } from 'react'
import gsap from 'gsap'
import { minimal } from '../design-system';

/* ────────────────────────────────────────────────────────────────────
 * ToggleSwitch — Animated toggle with spring physics
 *
 * Features:
 * - GSAP elastic spring on thumb movement
 * - Background color morph on state change
 * - Scale press on click
 * - prefers-reduced-motion respected
 * ──────────────────────────────────────────────────────────────── */

interface ToggleSwitchProps {
  /** Current state */
  checked: boolean
  /** Change handler */
  onChange: (checked: boolean) => void
  /** Label text */
  label?: string
  /** Disabled state */
  disabled?: boolean
  /** Size variant */
  size?: 'sm' | 'md'
  /** Container style */
  style?: CSSProperties
}

const SIZE_MAP = {
  sm: { track: { w: 36, h: 20 }, thumb: 16, offset: 2 },
  md: { track: { w: 44, h: 24 }, thumb: 20, offset: 2 },
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  style,
}: ToggleSwitchProps) {
  const thumbRef = useRef<HTMLSpanElement>(null)
  const trackRef = useRef<HTMLButtonElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const s = SIZE_MAP[size]
  const onX = s.track.w - s.thumb - s.offset * 2
  const offX = 0

  /* ── Animate thumb on state change ─────────────────────────── */
  useEffect(() => {
    if (!thumbRef.current || !trackRef.current) return

    if (reduced) {
      thumbRef.current.style.transform = `translateX(${checked ? onX : offX}px)`
      trackRef.current.style.backgroundColor = checked ? '#050505' : '#D4D4D4'
      return
    }

    gsap.to(thumbRef.current, {
      x: checked ? onX : offX,
      duration: 0.4,
      ease: 'elastic.out(1, 0.5)',
    })

    gsap.to(trackRef.current, {
      backgroundColor: checked ? '#050505' : '#D4D4D4',
      duration: 0.2,
      ease: 'power2.out',
    })
  }, [checked, onX, offX, reduced])

  const handleClick = useCallback(() => {
    if (disabled) return

    // Press scale
    if (!reduced && trackRef.current) {
      gsap.fromTo(
        trackRef.current,
        { scale: 0.95 },
        { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' }
      )
    }

    onChange(!checked)
  }, [disabled, checked, onChange, reduced])

  const F = "'Inter', 'Helvetica Neue', sans-serif"

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
    >
      <button
        ref={trackRef}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleClick}
        disabled={disabled}
        style={{
          position: 'relative',
          width: s.track.w,
          height: s.track.h,
          borderRadius: s.track.h / 2,
          backgroundColor: checked ? '#050505' : '#D4D4D4',
          border: 'none',
          padding: 0,
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          WebkitTapHighlightColor: 'transparent',
          willChange: 'background-color',
        }}
      >
        <span
          ref={thumbRef}
          style={{
            position: 'absolute',
            top: s.offset,
            left: s.offset,
            width: s.thumb,
            height: s.thumb,
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            willChange: 'transform',
            transform: `translateX(${checked ? onX : offX}px)`,
          }}
        />
      </button>

      {label && (
        <span
          onClick={handleClick}
          style={{
            fontFamily: F,
            fontSize: minimal.type.bodySm,
            fontWeight: 400,
            color: '#050505',
            letterSpacing: '0.01em',
            userSelect: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

export default ToggleSwitch
