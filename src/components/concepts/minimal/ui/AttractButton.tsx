'use client'

import { ShoppingBag } from 'lucide-react'
import { motion, useAnimation } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface AttractButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  particleCount?: number
  text?: string
  hoverText?: string
  icon?: React.ReactNode
  href?: string
}

interface Particle {
  id: number
  x: number
  y: number
}

const font = "'Inter', 'Helvetica Neue', sans-serif"

export default function AttractButton({
  className,
  particleCount = 10,
  text = 'Add to Cart',
  hoverText = 'Adding...',
  icon = <ShoppingBag className="h-4 w-4" />,
  href,
  ...props
}: AttractButtonProps) {
  const [isAttracting, setIsAttracting] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const particlesControl = useAnimation()

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 300 - 150,
      y: Math.random() * 300 - 150,
    }))
    setParticles(newParticles)
  }, [particleCount])

  const handleInteractionStart = useCallback(async () => {
    setIsAttracting(true)
    await particlesControl.start({
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 50, damping: 10 },
    })
  }, [particlesControl])

  const handleInteractionEnd = useCallback(async () => {
    setIsAttracting(false)
    await particlesControl.start((i: number) => ({
      x: particles[i]?.x ?? 0,
      y: particles[i]?.y ?? 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    }))
  }, [particlesControl, particles])

  return (
    <button
      className={cn(
        'relative min-w-[200px] touch-none',
        'bg-[#050505] hover:bg-[#333333]',
        'text-white',
        'border border-[#050505]',
        'px-8 py-3.5',
        'transition-all duration-300',
        'overflow-hidden',
        className
      )}
      style={{ fontFamily: font }}
      onClick={() => { if (href) window.location.href = href }}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      {...props}
    >
      {particles.map((_, index) => (
        <motion.div
          key={index}
          animate={particlesControl}
          custom={index}
          initial={{ x: particles[index]?.x ?? 0, y: particles[index]?.y ?? 0 }}
          className={cn(
            'absolute h-1 w-1',
            'bg-white/60',
            'transition-opacity duration-300',
            isAttracting ? 'opacity-100' : 'opacity-20'
          )}
        />
      ))}
      <span className="relative flex w-full items-center justify-center gap-2">
        <motion.span
          animate={{ scale: isAttracting ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.span>
        <span className="text-xs uppercase tracking-[0.2em] font-normal">
          {isAttracting ? hoverText : text}
        </span>
      </span>
    </button>
  )
}
