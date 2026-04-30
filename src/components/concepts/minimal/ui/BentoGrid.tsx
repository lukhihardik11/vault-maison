'use client'
import { useEffect, useRef } from 'react'
import { minimal } from '../design-system';

/* ────────────────────────────────────────────────────────────────────
 * BentoGrid — Luxury Jewelry Craftsmanship Grid
 *
 * Redesigned from tech/SaaS to luxury jewelry aesthetic:
 * - Warm ivory/cream backgrounds with gold accent borders
 * - Elegant serif typography for headings
 * - Subtle hover lift with gold shadow
 * - Responsive: 3-col → 2-col → 1-col
 * ──────────────────────────────────────────────────────────────── */

const serif = "'Cormorant Garamond', 'Playfair Display', Georgia, serif"
const sans = minimal.font.primary

// Warm luxury color palette
const colors = {
  ivory: '#FDFBF7',
  cream: '#F5F0EA',
  gold: '#C9A96E',
  deepCharcoal: '#2C2420',
  warmGray: '#6B5E54',
  borderSubtle: '#E8E2DA',
  goldBorder: 'rgba(201,169,110,0.25)',
}

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
      {/* Container query wrapper — grid adapts to its own width, not the viewport */}
      <div className={`bento-wrapper ${className}`}>
      <div ref={ref} className="bento-container">
        {items.map((item, i) => (
          <div
            key={i}
            className={`bento-item ${item.span === 'wide' ? 'bento-wide' : ''} ${item.span === 'tall' ? 'bento-tall' : ''}`}
            style={{
              background: item.image ? 'none' : colors.ivory,
              border: `1px solid ${colors.borderSubtle}`,
              borderRadius: 0,
              padding: item.image ? '0' : '32px',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '180px',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.4s ease',
            }}
          >
            {item.image && (
              <>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,36,32,0.75) 0%, transparent 60%)' }} />
              </>
            )}
            <div style={{ position: item.image ? 'absolute' : 'relative', bottom: item.image ? '24px' : 'auto', left: item.image ? '24px' : 'auto', right: item.image ? '24px' : 'auto' }}>
              {item.icon && <div style={{ marginBottom: '12px', color: colors.gold }}>{item.icon}</div>}
              <h3 style={{ fontFamily: serif, fontSize: minimal.type.bodyLg, fontWeight: 400, color: item.image ? '#FFFFFF' : colors.deepCharcoal, marginBottom: '8px', letterSpacing: '0.02em' }}>{item.title}</h3>
              <p style={{ fontFamily: sans, fontSize: minimal.type.caption, fontWeight: 400, color: item.image ? 'rgba(255,255,255,0.7)' : colors.warmGray, lineHeight: 1.7 }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
      <style>{`
        /* Container query context — wrapper is the size container */
        .bento-wrapper {
          container-type: inline-size;
          container-name: bento;
          max-width: 1200px;
          margin: 0 auto;
        }
        .bento-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .bento-wide { grid-column: span 2; }
        .bento-tall { grid-row: span 2; }
        .bento-item.bento-visible { opacity: 1 !important; transform: translateY(0) !important; }
        .bento-item:hover { box-shadow: 0 6px 24px rgba(201,169,110,0.08) !important; transform: translateY(-2px) !important; }

        /* Container query breakpoints — adapts to parent width, not viewport */
        @container bento (max-width: 768px) {
          .bento-container { grid-template-columns: repeat(2, 1fr); }
          .bento-wide { grid-column: span 2; }
        }
        @container bento (max-width: 480px) {
          .bento-container { grid-template-columns: 1fr; gap: 12px; }
          .bento-wide, .bento-tall { grid-column: span 1; grid-row: span 1; }
        }

        /* Fallback for browsers without container query support */
        @supports not (container-type: inline-size) {
          @media (max-width: 768px) {
            .bento-container { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 480px) {
            .bento-container { grid-template-columns: 1fr; }
            .bento-wide, .bento-tall { grid-column: span 1 !important; grid-row: span 1 !important; }
          }
        }
      `}</style>
    </>
  )
}
