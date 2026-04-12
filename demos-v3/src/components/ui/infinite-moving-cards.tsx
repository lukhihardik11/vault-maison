'use client'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface InfiniteMovingCardsProps {
  items: { quote: string; name: string; title: string }[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  className?: string
  textColor?: string
  accentColor?: string
}

export function InfiniteMovingCards({
  items,
  direction = 'left',
  speed = 'normal',
  className,
  textColor = '#EAEAEA',
  accentColor = '#D4AF37',
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    if (!scrollerRef.current || !containerRef.current) return
    const scrollerContent = Array.from(scrollerRef.current.children)
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      scrollerRef.current?.appendChild(duplicatedItem)
    })

    const speedMap = { fast: '20s', normal: '40s', slow: '80s' }
    containerRef.current.style.setProperty('--animation-duration', speedMap[speed])
    containerRef.current.style.setProperty(
      '--animation-direction',
      direction === 'left' ? 'forwards' : 'reverse'
    )
    setStart(true)
  }, [direction, speed])

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]', className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex min-w-full shrink-0 gap-6 w-max flex-nowrap',
          start && 'animate-scroll'
        )}
        style={{
          animation: start
            ? `scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite`
            : 'none',
        }}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[350px] max-w-full flex-shrink-0 px-8 py-6"
            style={{ border: `1px solid ${accentColor}20` }}
          >
            <blockquote>
              <p className="text-sm font-light leading-relaxed opacity-70" style={{ color: textColor }}>
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-4">
                <p className="text-xs font-medium" style={{ color: accentColor }}>{item.name}</p>
                <p className="text-[10px] opacity-40 mt-0.5" style={{ color: textColor }}>{item.title}</p>
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 12px)); }
        }
      `}</style>
    </div>
  )
}
