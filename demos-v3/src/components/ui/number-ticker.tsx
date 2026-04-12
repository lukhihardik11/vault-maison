'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NumberTickerProps {
  value: number
  direction?: 'up' | 'down'
  delay?: number
  className?: string
  prefix?: string
  suffix?: string
}

export function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  className,
  prefix = '',
  suffix = '',
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === 'down' ? value : 0)
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const isInView = useInView(ref, { once: true, margin: '0px' })
  const [displayValue, setDisplayValue] = useState(direction === 'down' ? value : 0)

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === 'down' ? 0 : value)
      }, delay * 1000)
    }
  }, [motionValue, isInView, delay, value, direction])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return unsubscribe
  }, [springValue])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  )
}
