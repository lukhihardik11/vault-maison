'use client'

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  forwardRef,
  type ReactNode,
  type CSSProperties,
  type ButtonHTMLAttributes,
} from 'react'
import gsap from 'gsap'
import { minimal } from '../design-system';

/* ────────────────────────────────────────────────────────────────────
 * PressButton — Tactile press animation with ripple + state morphs
 *
 * Features:
 * - Scale-down on mousedown (0.96), spring bounce on release
 * - Radial ripple from click point
 * - Success state morph: button shrinks to checkmark circle
 * - Loading state: pulsing opacity
 * - prefers-reduced-motion respected
 * ──────────────────────────────────────────────────────────────── */

interface PressButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  /** Content shown in success state */
  successContent?: ReactNode
  /** Whether button is in success state */
  success?: boolean
  /** Whether button is in loading state */
  loading?: boolean
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'ghost'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Full width */
  fullWidth?: boolean
  /** Custom style overrides */
  style?: CSSProperties
}

const SIZE_MAP = {
  sm: { padding: '10px 24px', fontSize: minimal.type.caption, letterSpacing: '0.08em' },
  md: { padding: '16px 36px', fontSize: minimal.type.caption, letterSpacing: '0.1em' },
  lg: { padding: '20px 52px', fontSize: minimal.type.bodySm, letterSpacing: '0.12em' },
}

const VARIANT_MAP = {
  primary: {
    bg: '#050505',
    color: '#FAFAFA',
    border: '1px solid #050505',
    hoverBg: '#1a1a1a',
  },
  secondary: {
    bg: '#FAFAFA',
    color: '#050505',
    border: '1px solid #050505',
    hoverBg: '#F0F0F0',
  },
  ghost: {
    bg: 'transparent',
    color: '#050505',
    border: '1px solid transparent',
    hoverBg: 'rgba(5, 5, 5, 0.04)',
  },
}

export const PressButton = forwardRef<HTMLButtonElement, PressButtonProps>(
  function PressButton(
    {
      children,
      successContent,
      success = false,
      loading = false,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      style: userStyle,
      onClick,
      disabled,
      ...rest
    },
    ref
  ) {
    const innerRef = useRef<HTMLButtonElement>(null)
    const rippleRef = useRef<HTMLSpanElement>(null)
    const [reduced, setReduced] = useState(false)

    useEffect(() => {
      setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }, [])

    // Resolve ref
    const btnRef = (ref as React.RefObject<HTMLButtonElement>) || innerRef

    /* ── Press down ──────────────────────────────────────────── */
    const handleMouseDown = useCallback(() => {
      if (reduced || disabled || loading) return
      const el = (btnRef as React.RefObject<HTMLButtonElement>).current
      if (!el) return
      gsap.to(el, {
        scale: 0.96,
        duration: 0.1,
        ease: 'power2.out',
      })
    }, [reduced, disabled, loading, btnRef])

    /* ── Press release ───────────────────────────────────────── */
    const handleMouseUp = useCallback(() => {
      if (reduced || disabled || loading) return
      const el = (btnRef as React.RefObject<HTMLButtonElement>).current
      if (!el) return
      gsap.to(el, {
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1.2, 0.4)',
      })
    }, [reduced, disabled, loading, btnRef])

    /* ── Ripple ──────────────────────────────────────────────── */
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!reduced && !disabled && !loading) {
          const el = (btnRef as React.RefObject<HTMLButtonElement>).current
          if (el && rippleRef.current) {
            const rect = el.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const ripple = rippleRef.current

            gsap.set(ripple, {
              x,
              y,
              scale: 0,
              opacity: variant === 'primary' ? 0.3 : 0.15,
            })
            gsap.to(ripple, {
              scale: 4,
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out',
            })
          }
        }
        onClick?.(e)
      },
      [reduced, disabled, loading, variant, onClick, btnRef]
    )

    const v = VARIANT_MAP[variant]
    const s = SIZE_MAP[size]

    return (
      <button
        ref={btnRef as React.Ref<HTMLButtonElement>}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
        disabled={disabled || loading}
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
          fontWeight: 500,
          textTransform: 'uppercase',
          cursor: disabled || loading ? 'not-allowed' : 'pointer',
          backgroundColor: v.bg,
          color: v.color,
          border: v.border,
          width: fullWidth ? '100%' : 'auto',
          opacity: disabled ? 0.5 : loading ? 0.8 : 1,
          willChange: 'transform',
          WebkitTapHighlightColor: 'transparent',
          ...s,
          ...userStyle,
        }}
        {...rest}
      >
        {/* Ripple element */}
        <span
          ref={rippleRef}
          style={{
            position: 'absolute',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: variant === 'primary' ? '#FFFFFF' : '#050505',
            transform: 'translate(-50%, -50%) scale(0)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'opacity 200ms ease',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {success && successContent ? successContent : children}
        </span>

        {/* Loading pulse overlay */}
        {loading && (
          <span
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(90deg, transparent, ${variant === 'primary' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}, transparent)`,
              animation: 'pressButtonShimmer 1.5s ease infinite',
            }}
          />
        )}

        <style>{`
          @keyframes pressButtonShimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .vm-press-btn * { animation: none !important; transition: none !important; }
          }
        `}</style>
      </button>
    )
  }
)

export default PressButton
