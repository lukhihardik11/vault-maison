'use client'

import React, { useEffect, useRef, useState, useId } from 'react'

interface VaultTextRevealProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  style?: React.CSSProperties
  highlightWords?: string[]
}

export function VaultTextReveal({
  text,
  as: Tag = 'h2',
  style,
  highlightWords = [],
}: VaultTextRevealProps) {
  const uid = useId().replace(/:/g, '')
  const ref = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const words = text.split(' ')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0
          const interval = setInterval(() => {
            i++
            setVisibleCount(i)
            if (i >= words.length) clearInterval(interval)
          }, 80)
          observer.disconnect()
          return () => clearInterval(interval)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [words.length])

  return (
    <>
      <style>{`
        .vtr-${uid} span {
          display: inline-block;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.4s ease, transform 0.4s ease;
          margin-right: 0.3em;
        }
        .vtr-${uid} span.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .vtr-${uid} span.highlight {
          color: #D4AF37;
        }
      `}</style>
      <div ref={ref}>
        <Tag className={`vtr-${uid}`} style={{ margin: 0, ...style }}>
          {words.map((word, i) => (
            <span
              key={i}
              className={`${i < visibleCount ? 'visible' : ''} ${highlightWords.includes(word.toLowerCase()) ? 'highlight' : ''}`}
              style={{ transitionDelay: `${i * 0.04}s` }}
            >
              {word}
            </span>
          ))}
        </Tag>
      </div>
    </>
  )
}
