'use client'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  speed?: number
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  speed = 40,
}: MarqueeProps) {
  return (
    <div
      className={cn('group flex overflow-hidden [--gap:1rem] gap-[var(--gap)]', className)}
      style={{ ['--duration' as string]: `${speed}s` }}
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex shrink-0 justify-around gap-[var(--gap)] [--duration:var(--duration)]',
            'animate-marquee',
            reverse && '[animation-direction:reverse]',
            pauseOnHover && 'group-hover:[animation-play-state:paused]'
          )}
          style={{
            animation: `marquee var(--duration) linear infinite`,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {children}
        </div>
      ))}
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - var(--gap))); }
        }
      `}</style>
    </div>
  )
}
