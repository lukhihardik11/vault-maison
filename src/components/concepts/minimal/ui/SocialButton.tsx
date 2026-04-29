'use client'

import { Mail, Globe, Copy, Send, Share2 } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const font = "'Inter', 'Helvetica Neue', sans-serif"

interface SocialButtonProps {
  className?: string
  onShare?: (platform: string) => void
}

export default function SocialButton({ className, onShare }: SocialButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const shareButtons = [
    { icon: Send, label: 'Share via message', platform: 'message' },
    { icon: Mail, label: 'Email', platform: 'email' },
    { icon: Globe, label: 'Web', platform: 'web' },
    { icon: Copy, label: 'Copy link', platform: 'copy' },
  ]

  const handleShare = (index: number, platform: string) => {
    setActiveIndex(index)
    onShare?.(platform)
    setTimeout(() => setActiveIndex(null), 300)
  }

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      style={{ fontFamily: font }}
    >
      <motion.div
        animate={{ opacity: isVisible ? 0 : 1 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <button
          className={cn(
            'relative min-w-[140px] h-10',
            'bg-white hover:bg-[#FAFAFA]',
            'text-[#050505]',
            'border border-[#050505]/10',
            'px-4',
            'transition-colors duration-200',
            'flex items-center justify-center gap-2'
          )}
        >
          <Share2 className="h-3.5 w-3.5" />
          <span className="text-[11px] uppercase tracking-[0.15em]">Share</span>
        </button>
      </motion.div>

      <motion.div
        animate={{ width: isVisible ? 'auto' : 0 }}
        className="absolute top-0 left-0 flex h-10 overflow-hidden"
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {shareButtons.map((button, i) => (
          <motion.button
            key={button.label}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : -20,
            }}
            aria-label={button.label}
            className={cn(
              'h-10 w-10',
              'flex items-center justify-center',
              'bg-[#050505] text-white',
              'border-r border-white/10 last:border-r-0',
              'hover:bg-[#1a1a1a]',
              'outline-none',
              'relative overflow-hidden',
              'transition-colors duration-200'
            )}
            onClick={() => handleShare(i, button.platform)}
            transition={{
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1],
              delay: isVisible ? i * 0.05 : 0,
            }}
            type="button"
          >
            <motion.div
              animate={{ scale: activeIndex === i ? 0.85 : 1 }}
              className="relative z-10"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <button.icon className="h-4 w-4" />
            </motion.div>
            <motion.div
              animate={{ opacity: activeIndex === i ? 0.15 : 0 }}
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0.01 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
