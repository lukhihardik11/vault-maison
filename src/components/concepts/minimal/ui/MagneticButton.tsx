'use client'

import Link from 'next/link'
import type { ReactNode, MouseEvent } from 'react'
import { minimal } from '../design-system'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

type Variant = 'primary' | 'secondary'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  className?: string
  variant?: Variant
  maxOffset?: number
  ariaLabel?: string
}

function getMagneticOffset(event: MouseEvent<HTMLElement>, maxOffset: number) {
  const { currentTarget, clientX, clientY } = event
  const rect = currentTarget.getBoundingClientRect()
  const x = ((clientX - rect.left) / rect.width - 0.5) * maxOffset * 2
  const y = ((clientY - rect.top) / rect.height - 0.5) * maxOffset * 2
  return { x, y }
}

export default function MagneticButton({
  children,
  href,
  className = '',
  variant = 'primary',
  maxOffset = 6,
  ariaLabel,
}: MagneticButtonProps) {
  const prefersReduced = useReducedMotionPreference()
  const isPrimary = variant === 'primary'

  const sharedClassName = `vm-magnetic-btn ${isPrimary ? 'vm-magnetic-btn-primary' : 'vm-magnetic-btn-secondary'} ${className}`.trim()

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (prefersReduced) return
    const { x, y } = getMagneticOffset(event, maxOffset)
    event.currentTarget.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`
  }

  const resetPosition = (target: HTMLElement) => {
    target.style.transform = 'translate(0px, 0px)'
  }

  const handleLeave = (event: MouseEvent<HTMLElement>) => {
    resetPosition(event.currentTarget)
  }

  return (
    <>
      {href ? (
        <Link
          href={href}
          aria-label={ariaLabel}
          className={sharedClassName}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          onBlur={(event) => resetPosition(event.currentTarget)}
        >
          {children}
        </Link>
      ) : (
        <button
          type="button"
          aria-label={ariaLabel}
          className={sharedClassName}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          onBlur={(event) => resetPosition(event.currentTarget)}
        >
          {children}
        </button>
      )}

      <style>{`
        .vm-magnetic-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          height: 52px;
          padding: 0 30px;
          border: 1px solid #050505;
          border-radius: 0;
          font-family: ${minimal.font.primary};
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          transition:
            transform ${minimal.motion.buttonMs}ms ${minimal.easing.expressive},
            background-color ${minimal.motion.hoverMs}ms ${minimal.easing.standard},
            color ${minimal.motion.hoverMs}ms ${minimal.easing.standard},
            border-color ${minimal.motion.hoverMs}ms ${minimal.easing.standard};
          will-change: transform;
          cursor: pointer;
        }

        .vm-magnetic-btn:focus-visible {
          outline: 1px solid #050505;
          outline-offset: 2px;
        }

        .vm-magnetic-btn-primary {
          background: #050505;
          color: #FFFFFF;
        }

        .vm-magnetic-btn-primary:hover {
          background: #FFFFFF;
          color: #050505;
        }

        .vm-magnetic-btn-secondary {
          background: #FFFFFF;
          color: #050505;
        }

        .vm-magnetic-btn-secondary:hover {
          background: #050505;
          color: #FFFFFF;
        }

        @media (prefers-reduced-motion: reduce) {
          .vm-magnetic-btn {
            transform: none !important;
            transition:
              background-color ${minimal.motion.microMs}ms linear,
              color ${minimal.motion.microMs}ms linear,
              border-color ${minimal.motion.microMs}ms linear;
          }
        }
      `}</style>
    </>
  )
}
