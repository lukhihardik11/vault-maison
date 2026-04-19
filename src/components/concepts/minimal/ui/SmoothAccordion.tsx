'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
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
  const [heights, setHeights] = useState<Record<number, number>>({})
  const contentRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    if (openIndex < 0) return
    const element = contentRefs.current[openIndex]
    if (!element) return
    setHeights((prev) => ({ ...prev, [openIndex]: element.scrollHeight }))
  }, [items, openIndex])

  return (
    <div style={{ borderTop: '1px solid #E5E5E5' }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const measuredHeight = heights[index] ?? 0

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
              <ChevronDown
                size={16}
                strokeWidth={1.5}
                color="#9B9B9B"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: prefersReducedMotion ? 'none' : 'transform 220ms ease',
                }}
              />
            </button>
            <div
              style={{
                maxHeight: isOpen ? (prefersReducedMotion ? 'none' : `${measuredHeight}px`) : '0px',
                overflow: isOpen && prefersReducedMotion ? 'visible' : 'hidden',
                transition: prefersReducedMotion ? 'none' : 'max-height 280ms ease',
              }}
            >
              <div
                ref={(element) => {
                  contentRefs.current[index] = element
                }}
                style={{
                  paddingBottom: isOpen ? 18 : 0,
                  opacity: isOpen ? 1 : 0,
                  transition: prefersReducedMotion ? 'none' : 'opacity 180ms ease',
                }}
              >
                {typeof item.content === 'string' ? (
                  <p
                    style={{
                      margin: 0,
                      fontFamily: F,
                      fontSize: 14,
                      fontWeight: 300,
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
            </div>
          </div>
        )
      })}
    </div>
  )
}
