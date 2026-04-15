'use client'
import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  animate?: boolean
}

export function GradientText({
  children,
  className,
  colors = ['#D4AF37', '#F5E6A3', '#D4AF37'],
  animate = true,
}: GradientTextProps) {
  return (
    <span
      className={cn('inline-block bg-clip-text text-transparent', className)}
      style={{
        backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
        backgroundSize: animate ? '200% auto' : '100% auto',
        animation: animate ? 'gradientText 3s linear infinite' : 'none',
      }}
    >
      <style jsx>{`
        @keyframes gradientText {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
      {children}
    </span>
  )
}
