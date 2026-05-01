'use client'

import * as React from 'react'
import { motion, useScroll, useSpring, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotionPreference } from './useResponsiveMotion'

export function ScrollProgress({
  className,
  ...props
}: HTMLMotionProps<'div'>) {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotionPreference()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 40,
    bounce: 0,
  })

  // Hide progress bar when user prefers reduced motion
  if (prefersReducedMotion) return null

  return (
    <motion.div
      data-slot="scroll-progress"
      style={{ scaleX }}
      className={cn(
        'fixed z-[100] top-0 left-0 right-0 h-[2px] bg-[#050505] origin-left',
        className,
      )}
      {...props}
    />
  )
}

export default ScrollProgress
