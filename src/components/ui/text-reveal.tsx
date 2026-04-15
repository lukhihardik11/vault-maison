'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  text: string
  className?: string
  revealColor?: string
}

export function TextReveal({ text, className, revealColor }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.25'],
  })

  const words = text.split(' ')

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <p className="flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]} revealColor={revealColor}>
              {word}
            </Word>
          )
        })}
      </p>
    </div>
  )
}

function Word({
  children,
  progress,
  range,
  revealColor,
}: {
  children: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
  revealColor?: string
}) {
  const opacity = useTransform(progress, range, [0.15, 1])

  return (
    <span className="relative mr-[0.25em] mt-[0.1em]">
      <motion.span style={{ opacity, color: revealColor }} className="inline-block">
        {children}
      </motion.span>
    </span>
  )
}
