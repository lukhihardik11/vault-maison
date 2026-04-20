'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotionPreference()
  const [isSettled, setIsSettled] = useState(true)

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsSettled(true)
      return
    }

    setIsSettled(false)
    const frame = window.requestAnimationFrame(() => {
      setIsSettled(true)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname, prefersReducedMotion])

  return (
    <>
      <div
        className={`minimal-page-transition ${isSettled ? 'is-settled' : 'is-transitioning'} ${prefersReducedMotion ? 'is-reduced' : ''}`}
      >
        {children}
      </div>
      <style>{`
        /*
         * No \`transform\` on the idle/settled state — see the note in
         * MinimalLayout.tsx. A transformed ancestor creates a containing
         * block for \`position: fixed\` which silently breaks GSAP
         * ScrollTrigger's \`pin: true\` (used by HorizontalScroll).
         * Same story for \`will-change: transform\`. Fade via opacity
         * only at rest; the translateY sneaks in only during the actual
         * transition frame and is removed when settled.
         */
        .minimal-page-transition {
          opacity: 1;
          transition: opacity 320ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .minimal-page-transition.is-transitioning {
          opacity: 0.88;
        }
        .minimal-page-transition.is-settled {
          opacity: 1;
        }
        .minimal-page-transition.is-reduced {
          opacity: 1;
          transition: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .minimal-page-transition {
            opacity: 1 !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  )
}
