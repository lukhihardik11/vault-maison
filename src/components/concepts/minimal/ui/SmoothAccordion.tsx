'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

export interface SmoothAccordionItem {
  id?: string
  title: string
  content: ReactNode
}

interface SmoothAccordionProps {
  items: SmoothAccordionItem[]
  defaultOpenIndex?: number
}

const F = "'Inter', 'Helvetica Neue', sans-serif"

export default function SmoothAccordion({ items, defaultOpenIndex = 0 }: SmoothAccordionProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex)

  return (
    <div style={{ borderTop: '1px solid #E5E5E5' }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div key={item.id ?? `${item.title}-${index}`} style={{ borderBottom: '1px solid #E5E5E5' }}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '18px 0',
                background: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
              aria-expanded={isOpen}
            >
              <span
                style={{
                  fontFamily: F,
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isOpen ? '#050505' : '#6B6B6B',
                  transition: prefersReducedMotion ? 'none' : 'color 220ms ease',
                }}
              >
                {item.title}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
              >
                <ChevronDown size={16} strokeWidth={1.5} color="#9B9B9B" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={prefersReducedMotion ? false : { height: 0, opacity: 0.01 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0.01 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ paddingBottom: 18 }}>
                    {typeof item.content === 'string' ? (
                      <p
                        style={{
                          margin: 0,
                          fontFamily: F,
                          fontSize: 14,
                          fontWeight: 400,
                          lineHeight: 1.8,
                          color: '#6B6B6B',
                        }}
                      >
                        {item.content}
                      </p>
                    ) : (
                      item.content
                    )}
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
