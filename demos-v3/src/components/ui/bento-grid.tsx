'use client'
import { cn } from '@/lib/utils'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {children}
    </div>
  )
}

export interface BentoCardProps {
  children: React.ReactNode
  className?: string
  colSpan?: number
  rowSpan?: number
  style?: React.CSSProperties
}

export function BentoCard({ children, className, colSpan = 1, rowSpan = 1, style }: BentoCardProps) {
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
