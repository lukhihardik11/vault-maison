'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HoverBorderGradientProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  as?: React.ElementType
  gradientColors?: string[]
  duration?: number
}

export function HoverBorderGradient({
  children,
  className,
  containerClassName,
  gradientColors = ['#D4AF37', '#8B6914', '#F5E6A3', '#D4AF37'],
  duration = 2,
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={cn('relative inline-flex p-[1px] overflow-hidden', containerClassName)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg, ${gradientColors.join(', ')})`,
        }}
        animate={{ rotate: hovered ? 360 : 0 }}
        transition={{ duration, repeat: hovered ? Infinity : 0, ease: 'linear' }}
      />
      <div className={cn('relative z-10', className)}>{children}</div>
    </div>
  )
}
