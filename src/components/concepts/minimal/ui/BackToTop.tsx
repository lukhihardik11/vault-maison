'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

interface BackToTopProps {
  mode?: 'floating' | 'inline'
}

export default function BackToTop({ mode = 'floating' }: BackToTopProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const [isVisible, setIsVisible] = useState(mode === 'inline')
  const [isHovered, setIsHovered] = useState(false)

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

  const transition = {
    duration: 0.4,
    ease: [0.19, 1, 0.22, 1] as const,
  }

  if (mode === 'inline') {
    return (
      <button
        type="button"
        onClick={scrollToTop}
        className="flex items-center justify-center gap-2 h-10 px-4 border border-[#050505] bg-white text-[#050505] hover:bg-[#050505] hover:text-white transition-colors duration-300"
        style={{
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          borderRadius: 0,
        }}
      >
        <ArrowUp size={14} strokeWidth={1.5} />
        <span>Top</span>
      </button>
    )
  }

  return (
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
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 z-50 h-12 w-12 overflow-hidden inline-flex items-center justify-center border border-[#050505] bg-white text-[#050505] shadow-lg"
          style={{ borderRadius: 0 }}
          aria-label="Back to top"
        >
          <motion.div
            className="absolute inset-0 z-0 bg-[#050505]"
            initial={{ y: "100%" }}
            animate={isHovered ? { y: 0 } : { y: "100%" }}
            transition={transition}
          />

          <motion.div
            className="relative z-10 flex h-5 flex-col items-center justify-start overflow-hidden"
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
        </motion.button>
      )}
    </AnimatePresence>
  )
}
