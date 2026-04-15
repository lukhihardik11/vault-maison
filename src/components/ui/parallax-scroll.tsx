'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ParallaxScrollProps {
  images: string[]
  className?: string
}

export function ParallaxScroll({ images, className }: ParallaxScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50])

  const third = Math.ceil(images.length / 3)
  const col1 = images.slice(0, third)
  const col2 = images.slice(third, third * 2)
  const col3 = images.slice(third * 2)

  return (
    <div ref={containerRef} className={cn('grid grid-cols-3 gap-4 overflow-hidden', className)}>
      <motion.div style={{ y: y1 }} className="flex flex-col gap-4">
        {col1.map((src, i) => (
          <div key={i} className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
            <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
          </div>
        ))}
      </motion.div>
      <motion.div style={{ y: y2 }} className="flex flex-col gap-4">
        {col2.map((src, i) => (
          <div key={i} className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
            <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
          </div>
        ))}
      </motion.div>
      <motion.div style={{ y: y3 }} className="flex flex-col gap-4">
        {col3.map((src, i) => (
          <div key={i} className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
            <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
