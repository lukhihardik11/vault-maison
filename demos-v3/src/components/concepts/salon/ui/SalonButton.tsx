'use client'

import React, { useRef, useId } from 'react'
import { S } from '../SalonLayout'

interface SalonButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
  fullWidth?: boolean
  style?: React.CSSProperties
}

/* ── SVG star shape used by the sparkle effect ── */
const StarSVG = ({ className, width }: { className: string; width: number }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    version="1.1"
    style={{
      shapeRendering: 'geometricPrecision',
      textRendering: 'geometricPrecision',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    }}
    viewBox="0 0 784.11 815.53"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={width}
    height="auto"
  >
    <defs />
    <g id="Layer_x0020_1">
      <metadata id="CorelCorpID_0Corel-Layer" />
      <path
        className="salon-star-fil0"
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.05,-407.78z"
      />
    </g>
  </svg>
)

export function SalonButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  fullWidth,
  style,
}: SalonButtonProps) {
  const uid = useId().replace(/:/g, '')
  const btnRef = useRef<HTMLElement>(null)

  const sizes = {
    sm: { padding: '8px 20px', fontSize: '0.65rem' },
    md: { padding: '13px 35px', fontSize: '0.7rem' },
    lg: { padding: '16px 44px', fontSize: '0.75rem' },
  }

  /* ── Warm Salon palette ── */
  const accentColor = '#D4A54A'       // warm goldenrod
  const accentColorAlpha = '#D4A54A8c'
  const starGlow = '#FFF8E7'          // warm cream star glow

  const variants = {
    primary: {
      background: accentColor,
      color: '#1A1A1A',
      border: `3px solid ${accentColor}`,
      hoverBg: 'transparent',
      hoverColor: accentColor,
      hoverShadow: `0 0 25px ${accentColorAlpha}`,
    },
    secondary: {
      background: 'transparent',
      color: S.text,
      border: `2px solid ${S.border}`,
      hoverBg: 'transparent',
      hoverColor: accentColor,
      hoverShadow: `0 0 20px ${accentColorAlpha}`,
    },
    ghost: {
      background: 'transparent',
      color: accentColor,
      border: '3px solid transparent',
      hoverBg: 'transparent',
      hoverColor: accentColor,
      hoverShadow: `0 0 15px ${accentColorAlpha}`,
    },
  }

  const v = variants[variant]
  const s = sizes[size]

  const baseStyle: React.CSSProperties = {
    position: 'relative',
    ...s,
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    background: v.background,
    color: v.color,
    border: v.border,
    borderRadius: '8px',
    boxShadow: '0 0 0 ' + accentColorAlpha,
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: fullWidth ? '100%' : undefined,
    overflow: 'visible',
    ...style,
  }

  /* ── Scoped CSS for this button instance ── */
  const scopedCSS = `
    .salon-star-fil0 { fill: ${starGlow}; }

    .sbtn-${uid} .salon-star {
      position: absolute;
      filter: drop-shadow(0 0 0 ${starGlow});
      z-index: -5;
    }
    .sbtn-${uid} .salon-star-1 {
      top: 20%; left: 20%; width: 25px;
      transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
    }
    .sbtn-${uid} .salon-star-2 {
      top: 45%; left: 45%; width: 15px;
      transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
    }
    .sbtn-${uid} .salon-star-3 {
      top: 40%; left: 40%; width: 5px;
      transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
    }
    .sbtn-${uid} .salon-star-4 {
      top: 20%; left: 40%; width: 8px;
      transition: all 0.8s cubic-bezier(0, 0.4, 0, 1.01);
    }
    .sbtn-${uid} .salon-star-5 {
      top: 25%; left: 45%; width: 15px;
      transition: all 0.6s cubic-bezier(0, 0.4, 0, 1.01);
    }
    .sbtn-${uid} .salon-star-6 {
      top: 5%; left: 50%; width: 5px;
      transition: all 0.8s ease;
    }

    .sbtn-${uid}:hover {
      background: ${v.hoverBg} !important;
      color: ${v.hoverColor} !important;
      box-shadow: ${v.hoverShadow} !important;
      border-color: ${accentColor} !important;
    }

    .sbtn-${uid}:hover .salon-star-1 {
      top: -80%; left: -30%; width: 25px;
      filter: drop-shadow(0 0 10px ${starGlow});
      z-index: 2;
    }
    .sbtn-${uid}:hover .salon-star-2 {
      top: -25%; left: 10%; width: 15px;
      filter: drop-shadow(0 0 10px ${starGlow});
      z-index: 2;
    }
    .sbtn-${uid}:hover .salon-star-3 {
      top: 55%; left: 25%; width: 5px;
      filter: drop-shadow(0 0 10px ${starGlow});
      z-index: 2;
    }
    .sbtn-${uid}:hover .salon-star-4 {
      top: 30%; left: 80%; width: 8px;
      filter: drop-shadow(0 0 10px ${starGlow});
      z-index: 2;
    }
    .sbtn-${uid}:hover .salon-star-5 {
      top: 25%; left: 115%; width: 15px;
      filter: drop-shadow(0 0 10px ${starGlow});
      z-index: 2;
    }
    .sbtn-${uid}:hover .salon-star-6 {
      top: 5%; left: 60%; width: 5px;
      filter: drop-shadow(0 0 10px ${starGlow});
      z-index: 2;
    }

    .sbtn-${uid}:active {
      transform: scale(0.97);
    }
  `

  const stars = (
    <>
      <StarSVG className="salon-star salon-star-1" width={25} />
      <StarSVG className="salon-star salon-star-2" width={15} />
      <StarSVG className="salon-star salon-star-3" width={5} />
      <StarSVG className="salon-star salon-star-4" width={8} />
      <StarSVG className="salon-star salon-star-5" width={15} />
      <StarSVG className="salon-star salon-star-6" width={5} />
    </>
  )

  if (href) {
    return (
      <>
        <style>{scopedCSS}</style>
        <a
          ref={btnRef as React.Ref<HTMLAnchorElement>}
          href={href}
          className={`sbtn-${uid}`}
          style={baseStyle}
        >
          {children}
          {stars}
        </a>
      </>
    )
  }

  return (
    <>
      <style>{scopedCSS}</style>
      <button
        ref={btnRef as React.Ref<HTMLButtonElement>}
        className={`sbtn-${uid}`}
        style={baseStyle}
        onClick={onClick}
      >
        {children}
        {stars}
      </button>
    </>
  )
}
