'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotionPreference()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (prefersReducedMotion || !mounted) {
    return <>{children}</>
  }

  const variants = {
    enter: {
      opacity: 0.01,
      y: 10,
      filter: "blur(4px)",
    },
    center: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0.01,
      y: -10,
      filter: "blur(4px)",
    },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          opacity: { duration: 0.4, ease: "easeInOut" },
          y: { duration: 0.4, ease: "easeOut" },
          filter: { duration: 0.4, ease: "easeInOut" },
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
