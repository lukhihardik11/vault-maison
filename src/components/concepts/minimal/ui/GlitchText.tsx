'use client'

import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

interface GlitchTextProps {
  text: string
  as?: ElementType
  className?: string
  style?: CSSProperties
}

export default function GlitchText({
  text,
  as: Component = 'span',
  className = '',
  style,
}: GlitchTextProps) {
  const prefersReduced = useReducedMotionPreference()
  const Tag = Component as ElementType<{
    children?: ReactNode
    className?: string
    style?: CSSProperties
  }>

  if (prefersReduced) {
    return (
      <Tag className={className} style={{ whiteSpace: 'pre-line', ...style }}>
        {text}
      </Tag>
    )
  }

  return (
    <>
      <Tag className={`vm-glitch ${className}`.trim()} style={style}>
        <span className="vm-glitch-base">{text}</span>
        <span aria-hidden="true" className="vm-glitch-layer vm-glitch-layer-a">
          {text}
        </span>
        <span aria-hidden="true" className="vm-glitch-layer vm-glitch-layer-b">
          {text}
        </span>
      </Tag>

      <style>{`
        .vm-glitch {
          position: relative;
          display: inline-block;
          color: #050505;
          white-space: pre-line;
          cursor: default;
        }

        .vm-glitch-base {
          position: relative;
          z-index: 2;
          display: block;
        }

        .vm-glitch-layer {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          mix-blend-mode: normal;
        }

        .vm-glitch-layer-a {
          color: #6B6B6B;
        }

        .vm-glitch-layer-b {
          color: #9B9B9B;
        }

        .vm-glitch:hover .vm-glitch-layer,
        .vm-glitch:focus-within .vm-glitch-layer {
          opacity: 1;
        }

        .vm-glitch:hover .vm-glitch-layer-a,
        .vm-glitch:focus-within .vm-glitch-layer-a {
          animation: vmGlitchA 260ms steps(2, end) 3;
        }

        .vm-glitch:hover .vm-glitch-layer-b,
        .vm-glitch:focus-within .vm-glitch-layer-b {
          animation: vmGlitchB 260ms steps(2, end) 3;
        }

        @keyframes vmGlitchA {
          0% { transform: translate(0, 0); }
          33% { transform: translate(-2px, 1px); }
          66% { transform: translate(2px, -1px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes vmGlitchB {
          0% { transform: translate(0, 0); }
          33% { transform: translate(2px, -1px); }
          66% { transform: translate(-2px, 1px); }
          100% { transform: translate(0, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .vm-glitch-layer {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
