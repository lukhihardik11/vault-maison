'use client'

import React, { Children, createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import { motion, useMotionValue, type Transition } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CarouselCtx = { index: number; setIndex: (i: number) => void; count: number; setCount: (n: number) => void }
const Ctx = createContext<CarouselCtx | undefined>(undefined)
function useCtx() { const c = useContext(Ctx); if (!c) throw new Error('VaultCarousel context'); return c }

interface VaultCarouselProps { children: ReactNode; className?: string; index?: number; onIndexChange?: (i: number) => void }

export function VaultCarousel({ children, className, index: ext, onIndexChange }: VaultCarouselProps) {
  const [internal, setInternal] = useState(0)
  const [count, setCount] = useState(0)
  const current = ext !== undefined ? ext : internal
  const handleChange = (i: number) => { if (ext === undefined) setInternal(i); onIndexChange?.(i) }

  return (
    <Ctx.Provider value={{ index: current, setIndex: handleChange, count, setCount }}>
      <div className={className} style={{ position: 'relative' }}>
        <div style={{ overflow: 'hidden' }}>{children}</div>
      </div>
    </Ctx.Provider>
  )
}

export function VaultCarouselContent({ children, className }: { children: ReactNode; className?: string }) {
  const { index, setIndex, setCount } = useCtx()
  const dragX = useMotionValue(0)
  const ref = useRef<HTMLDivElement>(null)
  const itemsLength = Children.count(children)

  useEffect(() => { if (itemsLength) setCount(itemsLength) }, [itemsLength, setCount])

  const onDragEnd = () => {
    const x = dragX.get()
    if (x <= -10 && index < itemsLength - 1) setIndex(index + 1)
    else if (x >= 10 && index > 0) setIndex(index - 1)
  }

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragMomentum={false}
      style={{ x: dragX, display: 'flex', cursor: 'grab' }}
      animate={{ translateX: `-${index * 100}%` }}
      onDragEnd={onDragEnd}
      transition={{ damping: 22, stiffness: 100, type: 'spring' as const }}
      className={className}
      ref={ref}
    >
      {children}
    </motion.div>
  )
}

export function VaultCarouselItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} style={{ width: '100%', minWidth: 0, flexShrink: 0, flexGrow: 0, overflow: 'hidden' }}>
      {children}
    </motion.div>
  )
}

export function VaultCarouselNav() {
  const { index, setIndex, count } = useCtx()
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 24 }}>
      <button
        onClick={() => index > 0 && setIndex(index - 1)}
        disabled={index === 0}
        style={{
          background: 'none', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '50%',
          width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 1,
          transition: 'all 0.3s', color: '#D4AF37',
        }}
        aria-label="Previous"
      >
        <ChevronLeft size={16} />
      </button>
      <div style={{ display: 'flex', gap: 8 }}>
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: index === i ? 24 : 8, height: 8, borderRadius: 4, border: 'none',
              background: index === i ? '#D4AF37' : 'rgba(255,255,255,0.2)',
              cursor: 'pointer', transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
      <button
        onClick={() => index < count - 1 && setIndex(index + 1)}
        disabled={index >= count - 1}
        style={{
          background: 'none', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '50%',
          width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: index >= count - 1 ? 'default' : 'pointer', opacity: index >= count - 1 ? 0.3 : 1,
          transition: 'all 0.3s', color: '#D4AF37',
        }}
        aria-label="Next"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
