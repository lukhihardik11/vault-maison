'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface LetterPullUpProps {
  words: string
  className?: string
  delay?: number
}

export function LetterPullUp({ words, className, delay = 0.05 }: LetterPullUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const letters = words.split('')

  return (
    <div ref={ref} className={cn('flex flex-wrap justify-center', className)}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ y: 100, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.4,
            delay: i * delay,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  )
}
