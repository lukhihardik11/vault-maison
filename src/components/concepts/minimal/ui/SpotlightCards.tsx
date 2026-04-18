'use client'

/**
 * SpotlightCards — adapted from KokonutUI
 * Feature grid with magnetic 3D tilt and focus-dim siblings.
 * Adapted for Vault Maison minimal: monochrome, system fonts, no colored icons.
 * Uses lucide-react icons.
 */

import { Diamond } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const TILT_MAX = 7
const TILT_SPRING = { stiffness: 300, damping: 28 } as const
const GLOW_SPRING = { stiffness: 180, damping: 22 } as const

export interface SpotlightItem {
  icon?: LucideIcon
  title: string
  description: string
  image?: string
  href?: string
}

interface CardProps {
  item: SpotlightItem
  dimmed: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}

function Card({ item, dimmed, onHoverStart, onHoverEnd }: CardProps) {
  const Icon = item.icon || Diamond
  const cardRef = useRef<HTMLDivElement>(null)

  const normX = useMotionValue(0.5)
  const normY = useMotionValue(0.5)

  const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX])
  const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX])

  const rotateX = useSpring(rawRotateX, TILT_SPRING)
  const rotateY = useSpring(rawRotateY, TILT_SPRING)
  const glowOpacity = useSpring(0, GLOW_SPRING)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    normX.set((e.clientX - rect.left) / rect.width)
    normY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseEnter = () => {
    glowOpacity.set(1)
    onHoverStart()
  }

  const handleMouseLeave = () => {
    normX.set(0.5)
    normY.set(0.5)
    glowOpacity.set(0)
    onHoverEnd()
  }

  return (
    <motion.div
      animate={{
        scale: dimmed ? 0.96 : 1,
        opacity: dimmed ? 0.4 : 1,
      }}
      className={cn(
        'group relative flex flex-col gap-5 overflow-hidden p-6',
        'border border-[#E5E5E5] bg-white',
        'transition-[border-color] duration-300',
        'hover:border-[#050505]/20'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {/* Hover glow layer */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: glowOpacity,
          background: 'radial-gradient(ellipse at 20% 20%, rgba(5,5,5,0.04), transparent 65%)',
        }}
      />

      {/* Shimmer sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[55%] -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-[#050505]/[0.03] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[280%]"
      />

      {/* Icon */}
      <div className="relative z-10 flex h-10 w-10 items-center justify-center border border-[#E5E5E5]">
        <Icon size={17} strokeWidth={1.2} color="#050505" />
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col gap-2">
        <h3
          className="text-[14px] tracking-tight text-[#050505]"
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif",
            fontWeight: 400,
          }}
        >
          {item.title}
        </h3>
        <p
          className="text-[12px] leading-relaxed text-[#050505]/50"
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif",
            fontWeight: 300,
          }}
        >
          {item.description}
        </p>
      </div>

      {/* Accent bottom line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[1px] w-0 transition-all duration-500 group-hover:w-full"
        style={{ background: '#050505' }}
      />
    </motion.div>
  )
}

export interface SpotlightCardsProps {
  items?: SpotlightItem[]
  eyebrow?: string
  heading?: string
  className?: string
}

export default function SpotlightCards({
  items = [],
  eyebrow = 'Philosophy',
  heading = 'Our principles',
  className,
}: SpotlightCardsProps) {
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null)

  return (
    <div className={cn('relative w-full overflow-hidden px-0', className)}>
      {/* Header */}
      <div className="relative mb-10 flex flex-col gap-2">
        <p
          className="text-[10px] uppercase tracking-[0.22em] text-[#050505]/40"
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif",
            fontWeight: 400,
          }}
        >
          {eyebrow}
        </p>
        <h2
          className="text-[22px] tracking-tight text-[#050505]"
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif",
            fontWeight: 300,
          }}
        >
          {heading}
        </h2>
      </div>

      {/* Card grid */}
      <div className="relative grid grid-cols-1 gap-[1px] bg-[#E5E5E5] sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <Card
            dimmed={hoveredTitle !== null && hoveredTitle !== item.title}
            item={item}
            key={item.title}
            onHoverEnd={() => setHoveredTitle(null)}
            onHoverStart={() => setHoveredTitle(item.title)}
          />
        ))}
      </div>
    </div>
  )
}
