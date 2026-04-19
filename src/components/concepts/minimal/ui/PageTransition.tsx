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
        .minimal-page-transition {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 320ms cubic-bezier(0.16, 1, 0.3, 1), transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .minimal-page-transition.is-transitioning {
          opacity: 0.88;
          transform: translateY(10px);
        }
        .minimal-page-transition.is-settled {
          opacity: 1;
          transform: translateY(0);
        }
        .minimal-page-transition.is-reduced {
          opacity: 1;
          transform: none;
          transition: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .minimal-page-transition {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  )
}
