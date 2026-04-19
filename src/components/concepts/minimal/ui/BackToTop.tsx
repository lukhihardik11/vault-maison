'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'
import { minimal } from '../design-system'

const mono = minimal.font.mono

interface BackToTopProps {
  mode?: 'floating' | 'inline'
}

export default function BackToTop({ mode = 'floating' }: BackToTopProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const [isVisible, setIsVisible] = useState(mode === 'inline')

  useEffect(() => {
    if (mode === 'inline') {
      setIsVisible(true)
      return
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > 340)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mode])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <>
      <button
        type="button"
        onClick={scrollToTop}
        className={`minimal-back-to-top ${mode === 'inline' ? 'inline' : 'floating'} ${isVisible ? 'visible' : 'hidden'}`}
        aria-label="Back to top"
      >
        <ArrowUp size={14} strokeWidth={1.7} />
        <span>Top</span>
      </button>
      <style>{`
        .minimal-back-to-top {
          border: 1px solid #050505;
          background: #FFFFFF;
          color: #050505;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 40px;
          padding: 0 14px;
          font-family: ${mono};
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms ease, background-color 220ms ease, color 220ms ease;
        }
        .minimal-back-to-top.floating {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 48;
          pointer-events: auto;
        }
        .minimal-back-to-top.inline {
          position: relative;
        }
        .minimal-back-to-top.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .minimal-back-to-top.hidden {
          opacity: 0;
          transform: translateY(8px);
          pointer-events: none;
        }
        .minimal-back-to-top:hover {
          background: #050505;
          color: #FFFFFF;
          transform: translateY(-2px);
        }
        .minimal-back-to-top:focus-visible {
          outline: 1px solid #050505;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .minimal-back-to-top {
            transition: none;
          }
          .minimal-back-to-top.hidden,
          .minimal-back-to-top.visible,
          .minimal-back-to-top:hover {
            transform: none;
          }
        }
      `}</style>
    </>
  )
}
