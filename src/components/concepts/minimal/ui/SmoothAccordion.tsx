'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
  title: string
  content: React.ReactNode
}

interface SmoothAccordionProps {
  items: AccordionItem[]
}

const F = "'Inter', 'Helvetica Neue', sans-serif"

export function SmoothAccordion({ items }: SmoothAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const shouldReduceMotion = useReducedMotion()

  return (
    <div style={{ borderTop: '1px solid #E5E5E5' }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} style={{ borderBottom: '1px solid #E5E5E5' }}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 0',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{ 
                fontFamily: F, 
                fontSize: 13, 
                fontWeight: 500, 
                letterSpacing: '0.06em', 
                textTransform: 'uppercase', 
                color: isOpen ? '#050505' : '#9B9B9B', 
                transition: 'color 0.2s' 
              }}>
                {item.title}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
              >
                <ChevronDown size={16} strokeWidth={1.5} color="#9B9B9B" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={shouldReduceMotion ? { height: 0 } : { height: 0, opacity: 1 }}
                  animate={shouldReduceMotion ? { height: 'auto' } : { height: 'auto', opacity: 1 }}
                  exit={shouldReduceMotion ? { height: 0 } : { height: 0, opacity: 1 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ paddingBottom: 20 }}>
                    <p style={{ fontFamily: F, fontSize: 14, fontWeight: 300, color: '#6B6B6B', lineHeight: 1.85, margin: 0 }}>
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
