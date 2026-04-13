'use client'

/**
 * SmoothTab — adapted from KokonutUI
 * Animated tab bar with sliding background indicator.
 * Adapted for Vault Maison minimal: monochrome, system fonts.
 */

import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface SmoothTabItem {
  id: string
  title: string
  content: ReactNode
}

interface SmoothTabProps {
  items: SmoothTabItem[]
  defaultSelected?: string
  className?: string
}

export default function SmoothTab({
  items,
  defaultSelected,
  className,
}: SmoothTabProps) {
  const [selected, setSelected] = useState(defaultSelected ?? items[0]?.id ?? '')
  const [direction, setDirection] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 0, left: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const updateDimensions = useCallback(() => {
    const button = buttonRefs.current.get(selected)
    const container = containerRef.current
    if (button && container) {
      const bRect = button.getBoundingClientRect()
      const cRect = container.getBoundingClientRect()
      setDimensions({
        width: bRect.width,
        left: bRect.left - cRect.left,
      })
    }
  }, [selected])

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [updateDimensions])

  const handleTabClick = (tabId: string) => {
    const currentIndex = items.findIndex((i) => i.id === selected)
    const newIndex = items.findIndex((i) => i.id === tabId)
    setDirection(newIndex > currentIndex ? 1 : -1)
    setSelected(tabId)
  }

  const selectedItem = items.find((item) => item.id === selected)

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  }

  return (
    <div className="flex flex-col w-full">
      {/* Content Area */}
      <div className="relative mb-5 flex-1">
        <div className="relative min-h-[200px] w-full overflow-hidden">
          <AnimatePresence custom={direction} initial={false} mode="popLayout">
            <motion.div
              animate="center"
              className="w-full"
              custom={direction}
              exit="exit"
              initial="enter"
              key={`tab-content-${selected}`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              variants={slideVariants}
            >
              {selectedItem?.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Tab Bar */}
      <div
        aria-label="Tabs"
        className={cn(
          'relative flex items-center gap-0',
          'mx-auto w-full max-w-lg',
          'border-t border-[#E8E5E0]',
          'pt-3',
          className
        )}
        ref={containerRef}
        role="tablist"
      >
        {/* Sliding Background */}
        <motion.div
          animate={{
            width: dimensions.width,
            x: dimensions.left,
            opacity: 1,
          }}
          className="absolute bottom-0 h-[1px] bg-[#050505]"
          initial={false}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        />

        <div className={`relative z-[2] grid w-full`} style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
          {items.map((item) => {
            const isSelected = selected === item.id
            return (
              <button
                aria-selected={isSelected}
                className={cn(
                  'relative flex items-center justify-center px-3 py-2',
                  'text-[11px] uppercase tracking-[0.15em] transition-all duration-300',
                  isSelected
                    ? 'text-[#050505]'
                    : 'text-[#050505]/30 hover:text-[#050505]/60'
                )}
                id={`tab-${item.id}`}
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                ref={(el) => {
                  if (el) buttonRefs.current.set(item.id, el)
                  else buttonRefs.current.delete(item.id)
                }}
                role="tab"
                tabIndex={isSelected ? 0 : -1}
                type="button"
                style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif",
                  fontWeight: 400,
                }}
              >
                <span className="truncate">{item.title}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
