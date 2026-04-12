'use client'
import { cn } from '@/lib/utils'

interface ShimmerButtonProps {
  children: React.ReactNode
  className?: string
  shimmerColor?: string
  shimmerSize?: string
  background?: string
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = '#D4AF37',
  shimmerSize = '0.1em',
  background = 'rgba(0,0,0,0.9)',
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden px-8 py-4',
        'text-[10px] uppercase tracking-[0.25em] transition-all',
        className
      )}
      style={{ background }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}40, transparent)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite',
        }}
      />
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <span className="relative z-10">{children}</span>
    </button>
  )
}
