'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface ImageRevealProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function ImageReveal({ children, className, style }: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      style={{ overflow: 'hidden', position: 'relative', ...style }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
