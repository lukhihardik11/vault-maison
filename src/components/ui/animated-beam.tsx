'use client'
import { cn } from '@/lib/utils'

interface AnimatedBeamProps {
  className?: string
  color?: string
  direction?: 'horizontal' | 'vertical'
}

export function AnimatedBeam({
  className,
  color = '#D4AF37',
  direction = 'horizontal',
}: AnimatedBeamProps) {
  const isHorizontal = direction === 'horizontal'

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="absolute"
        style={{
          ...(isHorizontal
            ? { top: 0, bottom: 0, width: '100px', height: '1px' }
            : { left: 0, right: 0, height: '100px', width: '1px' }),
          background: `linear-gradient(${isHorizontal ? 'to right' : 'to bottom'}, transparent, ${color}, transparent)`,
          animation: `beam-${direction} 3s ease-in-out infinite`,
        }}
      />
      <style jsx>{`
        @keyframes beam-horizontal {
          0% { left: -100px; }
          100% { left: calc(100% + 100px); }
        }
        @keyframes beam-vertical {
          0% { top: -100px; }
          100% { top: calc(100% + 100px); }
        }
      `}</style>
    </div>
  )
}
