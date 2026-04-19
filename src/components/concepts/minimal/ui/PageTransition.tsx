'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ filter: 'blur(8px)', y: 12, opacity: 0.99 }}
      animate={{ filter: 'blur(0px)', y: 0, opacity: 1 }}
      exit={{ filter: 'blur(8px)', y: -12, opacity: 0.99 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
