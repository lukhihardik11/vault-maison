'use client'

import { useMemo } from 'react'
import { minimal } from '../design-system'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

interface MarqueeTextProps {
  items: string[]
  speedMs?: number
  className?: string
}

export default function MarqueeText({ items, speedMs = minimal.motion.marqueeMs, className = '' }: MarqueeTextProps) {
  const prefersReduced = useReducedMotionPreference()
  const trackItems = useMemo(() => [...items, ...items], [items])

  return (
    <>
      <div
        className={`vm-marquee-shell ${className}`.trim()}
        role="region"
        aria-label="Scrolling brand statements"
      >
        <div
          className="vm-marquee-track"
          style={{
            animationDuration: `${speedMs}ms`,
            animationPlayState: prefersReduced ? 'paused' : 'running',
          }}
        >
          {trackItems.map((item, index) => (
            <span key={`${item}-${index}`} className="vm-marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .vm-marquee-shell {
          width: 100%;
          border-top: 1px solid #E5E5E5;
          border-bottom: 1px solid #E5E5E5;
          background: #FFFFFF;
          overflow: hidden;
          white-space: nowrap;
        }

        .vm-marquee-track {
          display: inline-flex;
          align-items: center;
          min-width: max-content;
          will-change: transform;
          animation-name: vmMarqueePan;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .vm-marquee-item {
          font-family: ${minimal.font.mono};
          font-size: 11px;
          line-height: 1;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #050505;
          padding: 18px 28px;
          border-right: 1px solid #E5E5E5;
        }

        @keyframes vmMarqueePan {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .vm-marquee-track {
            animation: none !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </>
  )
}
