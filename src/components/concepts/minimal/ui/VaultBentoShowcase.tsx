'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { minimal } from '../design-system'
import { useIsMobile } from '../hooks/useMediaQuery'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

/* ────────────────────────────────────────────────────────────────────
 * VaultBentoShowcase — Luxury Craftsmanship Bento Grid
 *
 * Desktop: 3-column CSS Grid with span variants
 * Mobile:  Horizontal scroll-snap carousel with peek design
 *
 * Features:
 * - Warm ivory/cream backgrounds with gold accent borders
 * - Elegant serif typography (Cormorant Garamond)
 * - GSAP scroll-triggered stagger entrance (desktop)
 * - Scroll-snap with momentum (mobile)
 * - Container queries for component-level responsiveness
 * - Respects prefers-reduced-motion
 * ──────────────────────────────────────────────────────────────── */

gsap.registerPlugin(ScrollTrigger)

const serif = "'Cormorant Garamond', 'Playfair Display', Georgia, serif"
const sans = "'Inter', 'Helvetica Neue', sans-serif"
const mono = "'SF Mono', 'Fira Code', monospace"

// Warm luxury color palette
const colors = {
  ivory: '#FDFBF7',
  cream: '#F5F0EA',
  warmWhite: '#FFFFFF',
  gold: '#C9A96E',
  goldLight: 'rgba(201,169,110,0.12)',
  goldBorder: 'rgba(201,169,110,0.3)',
  deepCharcoal: '#2C2420',
  warmGray: '#6B5E54',
  borderSubtle: '#E8E2DA',
}

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
  const scrollRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const prefersReducedMotion = usePrefersReducedMotion()

  // GSAP stagger entrance — desktop only
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return
    const el = containerRef.current
    if (!el) return

    const cards = el.querySelectorAll<HTMLElement>('.vm-bento-card')
    if (!cards.length) return

    gsap.set(cards, { opacity: 0, y: 30, scale: 0.98 })

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
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
    })

    return () => { tl.kill() }
  }, [isMobile, prefersReducedMotion])

  const getGridSpan = (span?: string) => {
    if (isMobile) return {} // No spanning on mobile
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
          backgroundColor: colors.ivory,
          color: colors.deepCharcoal,
          border: `1px solid ${colors.goldBorder}`,
        }
      case 'accent':
        return {
          backgroundColor: colors.cream,
          color: colors.deepCharcoal,
          border: `1px solid ${colors.gold}`,
          boxShadow: `0 4px 24px rgba(201,169,110,0.08)`,
        }
      case 'glass':
        return {
          backgroundColor: colors.warmWhite,
          border: `1px solid ${colors.borderSubtle}`,
        }
      default:
        return {
          backgroundColor: colors.warmWhite,
          border: `1px solid ${colors.borderSubtle}`,
        }
    }
  }

  // Separate items into "hero" (feature/wide) and "scrollable" for mobile
  const heroItems = items.filter(item => item.span === 'feature')
  const scrollableItems = items.filter(item => item.span !== 'feature')

  const renderCard = (item: VaultBentoItem, i: number) => (
    <div
      key={i}
      className="vm-bento-card"
      style={{
        ...getGridSpan(item.span),
        ...getVariantStyles(item.variant, !!item.image),
        position: 'relative',
        overflow: 'hidden',
        minHeight: isMobile ? '200px' : (item.span === 'tall' || item.span === 'feature' ? '360px' : '180px'),
        padding: item.image ? '0' : '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: item.stat ? 'space-between' : 'flex-end',
        ...(isMobile ? { borderRadius: '0' } : {}),
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
            background: 'linear-gradient(to top, rgba(44,36,32,0.8) 0%, rgba(44,36,32,0.2) 50%, transparent 100%)',
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
          <div style={{ marginBottom: '16px', color: colors.gold }}>
            {item.icon}
          </div>
        )}

        {/* Stat number */}
        {item.stat && (
          <div style={{
            fontFamily: serif,
            fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : 'clamp(36px, 5vw, 56px)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: item.image ? '#FFFFFF' : colors.deepCharcoal,
            marginBottom: '8px',
          }}>
            {item.stat}
            {item.statSuffix && (
              <span style={{ fontSize: '0.5em', color: colors.gold, marginLeft: '4px' }}>
                {item.statSuffix}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 style={{
          fontFamily: item.stat ? sans : serif,
          fontSize: item.stat ? '11px' : '16px',
          fontWeight: item.stat ? 500 : 400,
          letterSpacing: item.stat ? '0.15em' : '0.02em',
          textTransform: item.stat ? 'uppercase' : 'none',
          color: item.image ? '#FFFFFF' : colors.deepCharcoal,
          margin: 0,
          marginBottom: item.description ? '8px' : '0',
        }}>
          {item.title}
        </h3>

        {/* Description */}
        {item.description && (
          <p style={{
            fontFamily: sans,
            fontSize: minimal.type.caption,
            fontWeight: 400,
            lineHeight: 1.7,
            color: item.image ? 'rgba(255,255,255,0.7)' : colors.warmGray,
            margin: 0,
            maxWidth: '320px',
          }}>
            {item.description}
          </p>
        )}
      </div>

      {/* Decorative gold accent line for stat cards */}
      {item.stat && !item.image && (
        <div style={{
          width: '24px',
          height: '1px',
          background: colors.gold,
          marginTop: 'auto',
        }} />
      )}
    </div>
  )

  return (
    <div className={`vm-bento-showcase ${className}`}>
      {(sectionNum || sectionTitle) && (
        <div style={{ marginBottom: isMobile ? '32px' : '48px', textAlign: 'center' }}>
          {sectionNum && (
            <span style={{
              fontFamily: mono,
              fontSize: minimal.type.micro,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: colors.gold,
              display: 'block',
              marginBottom: '12px',
            }}>
              {sectionNum}
            </span>
          )}
          {sectionTitle && (
            <h2 style={{
              fontFamily: serif,
              fontSize: 'clamp(24px, 4vw, 42px)',
              fontWeight: 300,
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              color: colors.deepCharcoal,
              margin: 0,
              padding: '0 20px',
            }}>
              {sectionTitle}
            </h2>
          )}
          {/* Decorative gold line */}
          <div style={{
            width: '48px',
            height: '1px',
            background: colors.gold,
            margin: '20px auto 0',
          }} />
        </div>
      )}

      {/* Mobile Layout: Hero full-width + horizontal scroll row */}
      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Hero items full-width */}
          {heroItems.map((item, i) => (
            <div key={`hero-${i}`} style={{ padding: '0 20px' }}>
              {renderCard(item, i)}
            </div>
          ))}

          {/* Scrollable row with peek design */}
          <div
            ref={scrollRef}
            className="vm-scroll-snap-x"
            role="region"
            aria-label="Scroll through highlights"
            aria-roledescription="carousel"
            style={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollPadding: '0 20px',
              WebkitOverflowScrolling: 'touch',
              gap: '12px',
              padding: '0 20px',
              scrollbarWidth: 'none',
            }}
          >
            {scrollableItems.map((item, i) => (
              <div
                key={`scroll-${i}`}
                className="vm-scroll-snap-item"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${scrollableItems.length}`}
                style={{
                  flex: '0 0 85vw',
                  maxWidth: '340px',
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always',
                }}
              >
                {renderCard(item, heroItems.length + i)}
              </div>
            ))}
          </div>

          {/* Scroll indicator dots */}
          <div
            aria-hidden="true"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              padding: '12px 0',
            }}
          >
            {scrollableItems.slice(0, Math.min(scrollableItems.length, 6)).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: i === 0 ? colors.gold : colors.borderSubtle,
                  transition: 'background-color 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Desktop Layout: CSS Grid with spans */
        <div
          ref={containerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {items.map((item, i) => renderCard(item, i))}
        </div>
      )}

      <style>{`
        .vm-bento-showcase {
          padding: 0;
          container-type: inline-size;
          container-name: vault-bento;
        }
        .vm-bento-card {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
        }
        @media (hover: hover) {
          .vm-bento-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 32px rgba(201,169,110,0.08);
          }
          .vm-bento-card:hover img {
            transform: scale(1.02);
            transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
          }
        }
        /* Container query breakpoints — adapts to parent width */
        @container vault-bento (max-width: 1024px) {
          .vm-bento-showcase > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        /* Hide scrollbar on mobile carousel */
        .vm-scroll-snap-x::-webkit-scrollbar {
          display: none;
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
