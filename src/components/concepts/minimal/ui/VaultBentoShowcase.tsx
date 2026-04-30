'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { minimal } from '../design-system';

/* ────────────────────────────────────────────────────────────────────
 * VaultBentoShowcase — Brutalist Bento Grid for Vault Maison
 *
 * Adapted from the "brutalist-bento-grid" pattern:
 * - Bold, raw grid with intentional asymmetry
 * - Luxury jewelry aesthetic: monochrome + gold accent
 * - GSAP scroll-triggered stagger entrance
 * - Supports images, icons, stats, and text blocks
 * - Responsive: 3-col → 2-col → 1-col
 *
 * Usage:
 *   <VaultBentoShowcase items={[...]} />
 * ──────────────────────────────────────────────────────────────── */

gsap.registerPlugin(ScrollTrigger)

const font = "'Inter', 'Helvetica Neue', sans-serif"
const mono = "'JetBrains Mono', 'SF Mono', monospace"

export interface VaultBentoItem {
  title: string
  description?: string
  /** Stat number to display prominently */
  stat?: string
  /** Stat suffix (e.g., "+", "%", "ct") */
  statSuffix?: string
  /** Icon or ReactNode to display */
  icon?: ReactNode
  /** Background image URL */
  image?: string
  /** Grid span: 'wide' = 2 cols, 'tall' = 2 rows, 'feature' = 2x2 */
  span?: 'normal' | 'wide' | 'tall' | 'feature'
  /** Card variant for styling */
  variant?: 'default' | 'dark' | 'accent' | 'glass'
}

interface VaultBentoShowcaseProps {
  items: VaultBentoItem[]
  /** Section title displayed above the grid */
  sectionTitle?: string
  /** Section number label */
  sectionNum?: string
  className?: string
}

export function VaultBentoShowcase({
  items,
  sectionTitle,
  sectionNum,
  className = '',
}: VaultBentoShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const cards = el.querySelectorAll<HTMLElement>('.vm-bento-card')
    if (!cards.length) return

    // Set initial state
    gsap.set(cards, { opacity: 0, y: 40, scale: 0.97 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    })

    tl.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
    })

    return () => { tl.kill() }
  }, [])

  const getGridSpan = (span?: string) => {
    switch (span) {
      case 'wide': return { gridColumn: 'span 2' }
      case 'tall': return { gridRow: 'span 2' }
      case 'feature': return { gridColumn: 'span 2', gridRow: 'span 2' }
      default: return {}
    }
  }

  const getVariantStyles = (variant: string = 'default', hasImage: boolean): React.CSSProperties => {
    if (hasImage) {
      return {
        background: 'none',
        border: 'none',
      }
    }
    switch (variant) {
      case 'dark':
        return {
          backgroundColor: '#050505',
          color: '#FFFFFF',
          border: '1px solid rgba(255,255,255,0.08)',
        }
      case 'accent':
        return {
          backgroundColor: '#050505',
          color: '#FFFFFF',
          border: '1px solid rgba(184,142,74,0.3)',
        }
      case 'glass':
        return {
          backgroundColor: 'rgba(250,250,250,0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0,0,0,0.06)',
        }
      default:
        return {
          backgroundColor: '#FAFAFA',
          border: '1px solid #E5E5E5',
        }
    }
  }

  return (
    <div className={`vm-bento-showcase ${className}`}>
      {(sectionNum || sectionTitle) && (
        <div style={{ marginBottom: '48px' }}>
          {sectionNum && (
            <span style={{
              fontFamily: mono,
              fontSize: minimal.type.caption,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#767676',
              display: 'block',
              marginBottom: '12px',
            }}>
              {sectionNum}
            </span>
          )}
          {sectionTitle && (
            <h2 style={{
              fontFamily: font,
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#050505',
              margin: 0,
            }}>
              {sectionTitle}
            </h2>
          )}
        </div>
      )}

      <div
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="vm-bento-card"
            style={{
              ...getGridSpan(item.span),
              ...getVariantStyles(item.variant, !!item.image),
              position: 'relative',
              overflow: 'hidden',
              minHeight: item.span === 'tall' || item.span === 'feature' ? '360px' : '180px',
              padding: item.image ? '0' : '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: item.stat ? 'center' : 'flex-end',
            }}
          >
            {/* Background image */}
            {item.image && (
              <>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.2) 50%, transparent 100%)',
                }} />
              </>
            )}

            {/* Content */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              padding: item.image ? '32px' : '0',
              marginTop: item.image ? 'auto' : undefined,
            }}>
              {/* Icon */}
              {item.icon && (
                <div style={{ marginBottom: '16px', opacity: 0.7 }}>
                  {item.icon}
                </div>
              )}

              {/* Stat number */}
              {item.stat && (
                <div style={{
                  fontFamily: font,
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: 200,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: item.variant === 'dark' || item.variant === 'accent' || item.image ? '#FFFFFF' : '#050505',
                  marginBottom: '8px',
                }}>
                  {item.stat}
                  {item.statSuffix && (
                    <span style={{ fontSize: '0.5em', color: 'rgba(184,142,74,0.9)', marginLeft: '4px' }}>
                      {item.statSuffix}
                    </span>
                  )}
                </div>
              )}

              {/* Title */}
              <h3 style={{
                fontFamily: font,
                fontSize: item.stat ? '12px' : '15px',
                fontWeight: item.stat ? 500 : 400,
                letterSpacing: item.stat ? '0.15em' : '-0.01em',
                textTransform: item.stat ? 'uppercase' : 'none',
                color: item.variant === 'dark' || item.variant === 'accent' || item.image ? '#FFFFFF' : '#050505',
                margin: 0,
                marginBottom: item.description ? '8px' : '0',
              }}>
                {item.title}
              </h3>

              {/* Description */}
              {item.description && (
                <p style={{
                  fontFamily: font,
                  fontSize: minimal.type.caption,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: item.variant === 'dark' || item.variant === 'accent' || item.image
                    ? 'rgba(255,255,255,0.6)'
                    : '#767676',
                  margin: 0,
                  maxWidth: '280px',
                }}>
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .vm-bento-showcase {
          padding: 0;
          container-type: inline-size;
          container-name: vault-bento;
        }
        .vm-bento-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .vm-bento-card:hover {
          transform: scale(0.985);
        }
        .vm-bento-card:hover img {
          transform: scale(1.03);
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        /* Container query breakpoints — adapts to parent width */
        @container vault-bento (max-width: 1024px) {
          .vm-bento-showcase > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @container vault-bento (max-width: 640px) {
          .vm-bento-showcase > div:last-child {
            grid-template-columns: 1fr !important;
          }
          .vm-bento-card {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            min-height: 200px !important;
          }
        }
        /* Fallback for browsers without container query support */
        @supports not (container-type: inline-size) {
          @media (max-width: 1024px) {
            .vm-bento-showcase > div:last-child {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 640px) {
            .vm-bento-showcase > div:last-child {
              grid-template-columns: 1fr !important;
            }
            .vm-bento-card {
              grid-column: span 1 !important;
              grid-row: span 1 !important;
              min-height: 200px !important;
            }
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .vm-bento-card {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default VaultBentoShowcase
