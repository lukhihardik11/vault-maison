'use client'

/**
 * SlideTextButton — adapted from KokonutUI
 * Animated vertical text-swap CTA button.
 * Pure black & white, system fonts.
 */

import { motion } from 'motion/react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SlideTextButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text?: string
  hoverText?: string
  href?: string
  className?: string
  variant?: 'default' | 'ghost'
}

export default function SlideTextButton({
  text = 'Explore',
  hoverText,
  href = '#',
  className,
  variant = 'default',
  ...props
}: SlideTextButtonProps) {
  const slideText = hoverText ?? text
  const variantStyles =
    variant === 'ghost'
      ? 'border border-[#050505]/10 text-[#050505] hover:bg-[#050505]/5'
      : 'bg-[#050505] text-white hover:bg-[#050505]/90'

  return (
    <motion.div
      animate={{ y: 0, opacity: 1, transition: { duration: 0.4 } }}
      className="relative"
      initial={{ y: 20, opacity: 0 }}
    >
      <Link
        className={cn(
          'group relative inline-flex h-11 items-center justify-center overflow-hidden px-10 font-normal text-[13px] tracking-[0.12em] uppercase transition-all duration-300',
          variantStyles,
          className
        )}
        href={href}
        {...props}
      >
        <span className="relative inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
          <span className="flex items-center gap-2 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
            <span>{text}</span>
          </span>
          <span className="absolute top-full left-0 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span>{slideText}</span>
          </span>
        </span>
      </Link>
    </motion.div>
  )
}
