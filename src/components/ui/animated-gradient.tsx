'use client'
import { cn } from '@/lib/utils'

interface AnimatedGradientProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
}

export function AnimatedGradient({
  children,
  className,
  colors = ['#D4AF37', '#8B6914', '#D4AF37', '#F5E6A3'],
}: AnimatedGradientProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: `linear-gradient(270deg, ${colors.join(', ')})`,
          backgroundSize: '400% 400%',
          animation: 'gradientShift 8s ease infinite',
        }}
      />
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
