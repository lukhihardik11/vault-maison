'use client'
import { cn } from '@/lib/utils'

interface GlowingBorderProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  borderRadius?: string
}

export function GlowingBorder({
  children,
  className,
  glowColor = '#D4AF37',
  borderRadius = '0px',
}: GlowingBorderProps) {
  return (
    <div
      className={cn('relative p-[1px] overflow-hidden group', className)}
      style={{ borderRadius }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${glowColor}, transparent, ${glowColor}, transparent)`,
          animation: 'spin 4s linear infinite',
          borderRadius,
        }}
      />
      <div
        className="absolute inset-[1px]"
        style={{ borderRadius }}
      />
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div className="relative" style={{ borderRadius }}>{children}</div>
    </div>
  )
}
