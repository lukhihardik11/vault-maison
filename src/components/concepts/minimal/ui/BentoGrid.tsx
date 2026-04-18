'use client'
import { useEffect, useRef } from 'react'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

interface BentoItem {
  title: string
  description: string
  icon?: React.ReactNode
  image?: string
  span?: 'normal' | 'wide' | 'tall'
}

interface BentoGridProps {
  items: BentoItem[]
  className?: string
}

export default function BentoGrid({ items, className = '' }: BentoGridProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll('.bento-item').forEach((item, i) => {
          setTimeout(() => (item as HTMLElement).classList.add('bento-visible'), i * 120)
        })
        observer.unobserve(el)
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={ref} className={className} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '1200px', margin: '0 auto' }}>
        {items.map((item, i) => (
          <div
            key={i}
            className="bento-item"
            style={{
              gridColumn: item.span === 'wide' ? 'span 2' : 'span 1',
              gridRow: item.span === 'tall' ? 'span 2' : 'span 1',
              background: item.image ? 'none' : 'rgba(255,255,255,0.65)',
              backdropFilter: item.image ? 'none' : 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 0,
              padding: item.image ? '0' : '32px',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '180px',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease',
            }}
          >
            {item.image && (
              <>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,26,0.7) 0%, transparent 60%)' }} />
              </>
            )}
            <div style={{ position: item.image ? 'absolute' : 'relative', bottom: item.image ? '24px' : 'auto', left: item.image ? '24px' : 'auto', right: item.image ? '24px' : 'auto' }}>
              {item.icon && <div style={{ marginBottom: '12px', color: '#050505' }}>{item.icon}</div>}
              <h3 style={{ fontFamily: font, fontSize: '16px', fontWeight: 400, color: item.image ? '#FFFFFF' : '#050505', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: item.image ? 'rgba(255,255,255,0.7)' : '#9B9B9B', lineHeight: 1.6 }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .bento-item.bento-visible { opacity: 1 !important; transform: translateY(0) !important; }
        .bento-item:hover { box-shadow: 0 8px 30px rgba(196,162,101,0.12) !important; }
        @media (max-width: 768px) { .bento-item { grid-column: span 1 !important; } }
      `}</style>
    </>
  )
}
