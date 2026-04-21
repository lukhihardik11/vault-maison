'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

interface BackToTopProps {
  mode?: 'floating' | 'inline'
}

export default function BackToTop({ mode = 'floating' }: BackToTopProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const [isVisible, setIsVisible] = useState(mode === 'inline')
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

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

  const scrollToTop = useCallback(() => {
    // Use both methods for maximum iOS compatibility
    try {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
    } catch {
      // Fallback for older iOS Safari that doesn't support smooth scrolling
      window.scrollTo(0, 0)
    }
  }, [prefersReducedMotion])

  const transition = {
    duration: 0.4,
    ease: [0.19, 1, 0.22, 1] as const,
  }

  if (mode === 'inline') {
    return (
      <button
        type="button"
        onClick={scrollToTop}
        className="flex items-center justify-center gap-2 h-10 px-4 border border-[#050505] bg-white text-[#050505] hover:bg-[#050505] hover:text-white active:bg-[#050505] active:text-white transition-colors duration-300"
        style={{
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          borderRadius: 0,
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <ArrowUp size={14} strokeWidth={1.5} />
        <span>Top</span>
      </button>
    )
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0.01, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0.01, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => {
              setIsPressed(false)
              setTimeout(() => setIsPressed(false), 150)
            }}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            whileTap={{ scale: 0.92 }}
            className="vm-back-to-top fixed z-50 flex items-center justify-center border border-[#050505] shadow-lg"
            style={{
              borderRadius: 0,
              width: 48,
              height: 48,
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              backgroundColor: isPressed ? '#050505' : '#ffffff',
              color: isPressed ? '#ffffff' : '#050505',
              transition: 'background-color 0.15s, color 0.15s',
            }}
            aria-label="Back to top"
          >
            {/* Desktop hover fill animation */}
            <motion.div
              className="absolute inset-0 z-0 bg-[#050505] hidden md:block"
              initial={{ y: "100%" }}
              animate={isHovered ? { y: 0 } : { y: "100%" }}
              transition={transition}
            />

            {/* Desktop: animated arrow swap on hover */}
            <motion.div
              className="relative z-10 hidden md:flex h-5 flex-col items-center justify-start overflow-hidden"
              animate={isHovered ? { y: "-50%" } : { y: 0 }}
              transition={transition}
            >
              <ArrowUp
                className="h-5 w-5 text-[#050505]"
                strokeWidth={1.5}
              />
              <ArrowUp
                className="h-5 w-5 text-white"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </motion.div>

            {/* Mobile: simple static arrow (color changes via isPressed state) */}
            <div className="relative z-10 flex md:hidden items-center justify-center">
              <ArrowUp
                className="h-5 w-5"
                strokeWidth={1.5}
                style={{ color: isPressed ? '#ffffff' : '#050505' }}
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        /* Desktop: standard bottom-right position */
        .vm-back-to-top {
          bottom: 2rem;
          right: 2rem;
        }

        /* Mobile: position above the fixed toolbar (64px + safe area + 12px gap) */
        @media (max-width: 768px) {
          .vm-back-to-top {
            bottom: calc(64px + env(safe-area-inset-bottom, 0px) + 12px) !important;
            right: 1rem !important;
            width: 44px !important;
            height: 44px !important;
          }
        }
      `}</style>
    </>
  )
}
