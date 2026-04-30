'use client'

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type CSSProperties,
} from 'react'
import gsap from 'gsap'
import { minimal } from '../design-system';

/* ────────────────────────────────────────────────────────────────────
 * FocusInput — Animated form field with floating label + underline draw
 *
 * Features:
 * - Floating label that lifts on focus or when field has value
 * - Underline draws from center outward on focus (GSAP scaleX)
 * - Subtle glow ring on focus
 * - Error state with shake animation
 * - prefers-reduced-motion respected
 * ──────────────────────────────────────────────────────────────── */

interface FocusInputProps {
  /** Floating label text */
  label: string
  /** Error message */
  error?: string
  /** Whether to render as textarea */
  multiline?: boolean
  /** Number of rows for textarea */
  rows?: number
  /** Container style overrides */
  containerStyle?: CSSProperties
  /** Input style overrides */
  inputStyle?: CSSProperties
}

type InputFieldProps = FocusInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'style'>

type TextareaFieldProps = FocusInputProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> & {
    multiline: true
  }

type Props = InputFieldProps | TextareaFieldProps

export const FocusInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  Props
>(function FocusInput(
  {
    label,
    error,
    multiline = false,
    rows = 4,
    containerStyle,
    inputStyle,
    ...rest
  },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const underlineRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLLabelElement>(null)
  const innerInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Check initial value
  useEffect(() => {
    const el = innerInputRef.current
    if (el && (el as HTMLInputElement).value) {
      setHasValue(true)
    }
  }, [])

  const isLifted = focused || hasValue

  /* ── Focus handler ─────────────────────────────────────────── */
  const handleFocus = useCallback(() => {
    setFocused(true)
    if (reduced) return

    // Underline draw from center
    if (underlineRef.current) {
      gsap.to(underlineRef.current, {
        scaleX: 1,
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    // Label lift
    if (labelRef.current) {
      gsap.to(labelRef.current, {
        y: -24,
        scale: 0.75,
        color: '#050505',
        duration: 0.25,
        ease: 'power2.out',
      })
    }
  }, [reduced])

  /* ── Blur handler ──────────────────────────────────────────── */
  const handleBlur = useCallback(
    (e: React.FocusEvent) => {
      setFocused(false)
      const val = (e.target as HTMLInputElement).value
      setHasValue(!!val)

      if (reduced) return

      // Underline retract
      if (underlineRef.current && !val) {
        gsap.to(underlineRef.current, {
          scaleX: 0,
          duration: 0.25,
          ease: 'power2.in',
        })
      }

      // Label drop back if empty
      if (labelRef.current && !val) {
        gsap.to(labelRef.current, {
          y: 0,
          scale: 1,
          color: '#767676',
          duration: 0.25,
          ease: 'power2.in',
        })
      }
    },
    [reduced]
  )

  /* ── Change handler ────────────────────────────────────────── */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setHasValue(!!e.target.value)
      // Forward the onChange if provided
      if ('onChange' in rest && rest.onChange) {
        ;(rest.onChange as (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void)(e)
      }
    },
    [rest]
  )

  /* ── Error shake ───────────────────────────────────────────── */
  useEffect(() => {
    if (error && !reduced && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { x: -6 },
        { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
      )
    }
  }, [error, reduced])

  const F = "'Inter', 'Helvetica Neue', sans-serif"

  const sharedInputStyle: CSSProperties = {
    width: '100%',
    fontFamily: F,
    fontSize: minimal.type.body,
    fontWeight: 400,
    color: '#050505',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid #E5E5E5',
    padding: '12px 0 8px',
    outline: 'none',
    transition: reduced ? 'none' : 'border-color 200ms ease',
    borderBottomColor: error ? '#C53030' : focused ? '#050505' : '#E5E5E5',
    ...inputStyle,
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        marginBottom: '28px',
        ...containerStyle,
      }}
    >
      {/* Floating label */}
      <label
        ref={labelRef}
        style={{
          position: 'absolute',
          left: 0,
          top: '12px',
          fontFamily: F,
          fontSize: minimal.type.body,
          fontWeight: 400,
          color: error ? '#C53030' : isLifted ? '#050505' : '#767676',
          pointerEvents: 'none',
          transformOrigin: 'left center',
          transform: reduced && isLifted ? 'translateY(-24px) scale(0.75)' : reduced ? 'none' : undefined,
          willChange: reduced ? 'auto' : 'transform',
          letterSpacing: '0.02em',
        }}
      >
        {label}
      </label>

      {/* Input / Textarea */}
      {multiline ? (
        <textarea
          ref={(el) => {
            innerInputRef.current = el
            if (typeof ref === 'function') ref(el)
            else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el
          }}
          rows={rows}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          style={{ ...sharedInputStyle, resize: 'vertical', minHeight: '80px' }}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={(el) => {
            innerInputRef.current = el
            if (typeof ref === 'function') ref(el)
            else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          style={sharedInputStyle}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {/* Animated underline */}
      <span
        ref={underlineRef}
        style={{
          position: 'absolute',
          bottom: error ? '20px' : '0',
          left: 0,
          width: '100%',
          height: '2px',
          backgroundColor: error ? '#C53030' : '#050505',
          transform: reduced ? (isLifted ? 'scaleX(1)' : 'scaleX(0)') : 'scaleX(0)',
          transformOrigin: 'center',
          willChange: reduced ? 'auto' : 'transform',
        }}
      />

      {/* Error message */}
      {error && (
        <span
          style={{
            display: 'block',
            fontFamily: F,
            fontSize: minimal.type.caption,
            fontWeight: 400,
            color: '#C53030',
            marginTop: '6px',
            letterSpacing: '0.02em',
          }}
        >
          {error}
        </span>
      )}
    </div>
  )
})

export default FocusInput
