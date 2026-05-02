'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile, useIsTablet, usePrefersReducedMotion } from '../hooks/useMediaQuery'

/* ────────────────────────────────────────────────────────────────────
 * VaultBentoShowcase — Luxury Craftsmanship Bento Grid
 *
 * Desktop: 3-column CSS Grid with span variants
 * Mobile (iPhone): Vertical stacked cards — full-width, magazine-style
 *
 * The mobile layout uses a vertical stack (NOT horizontal scroll)
 * because these are brand pillars that should be read sequentially,
 * not swiped through. Each card gets full attention.
 * ──────────────────────────────────────────────────────────────── */

gsap.registerPlugin(ScrollTrigger)

const serif = "'Cormorant Garamond', 'Playfair Display', Georgia, serif"
const sans = "'Inter', 'Helvetica Neue', sans-serif"
const mono = "'SF Mono', 'Fira Code', monospace"

const colors = {
  ivory: '#FDFBF7',
  cream: '#F5F0EA',
  warmWhite: '#FFFDF9',
  gold: '#C9A96E',
  goldLight: '#D4B87A',
  goldDark: '#A88B52',
  goldGradient: 'linear-gradient(135deg, #D4B87A 0%, #C9A96E 40%, #A88B52 100%)',
  goldShimmer: 'linear-gradient(90deg, #C9A96E 0%, #E8D5A8 25%, #C9A96E 50%, #E8D5A8 75%, #C9A96E 100%)',
  deepCharcoal: '#1A1614',
  charcoal: '#2C2420',
  warmGray: '#6B5E54',
  lightGray: '#9B8E84',
  borderSubtle: '#E8E2DA',
  borderGold: 'rgba(201,169,110,0.35)',
  shadowGold: 'rgba(201,169,110,0.12)',
  cardDark: 'linear-gradient(145deg, #1A1614 0%, #2C2420 60%, #3D3530 100%)',
  cardAccent: 'linear-gradient(145deg, #FDFBF7 0%, #F5F0EA 100%)',
  cardGlass: 'linear-gradient(145deg, rgba(255,253,249,0.9) 0%, rgba(245,240,234,0.7) 100%)',
}

const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`

export interface VaultBentoItem {
  title: string
  description?: string
  stat?: string
  statSuffix?: string
  icon?: ReactNode
  image?: string
  span?: 'normal' | 'wide' | 'tall' | 'feature'
  variant?: 'default' | 'dark' | 'accent' | 'glass'
}

interface VaultBentoShowcaseProps {
  items: VaultBentoItem[]
  sectionTitle?: string
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
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const prefersReducedMotion = usePrefersReducedMotion()

  // GSAP stagger entrance — desktop only
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return
    const el = containerRef.current
    if (!el) return

    const cards = el.querySelectorAll<HTMLElement>('.vm-bento-card')
    if (!cards.length) return

    gsap.set(cards, { opacity: 0, y: 40, scale: 0.96 })

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
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
    })

    return () => { tl.kill() }
  }, [isMobile, prefersReducedMotion])

  const getGridSpan = (span?: string) => {
    if (isMobile) return {}
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
        borderRadius: '4px',
      }
    }
    switch (variant) {
      case 'dark':
        return {
          background: colors.cardDark,
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '4px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
        }
      case 'accent':
        return {
          background: colors.cardAccent,
          color: colors.deepCharcoal,
          border: `1.5px solid ${colors.borderGold}`,
          borderRadius: '4px',
          boxShadow: `0 4px 24px ${colors.shadowGold}, 0 1px 3px rgba(0,0,0,0.04)`,
        }
      case 'glass':
        return {
          background: colors.cardGlass,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1px solid rgba(201,169,110,0.2)`,
          borderRadius: '4px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }
      default:
        return {
          background: colors.warmWhite,
          border: `1px solid ${colors.borderSubtle}`,
          borderRadius: '4px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
        }
    }
  }

  const renderCard = (item: VaultBentoItem, i: number) => {
    const isDark = item.variant === 'dark' || !!item.image
    const isAccent = item.variant === 'accent'

    return (
      <div
        key={i}
        className="vm-bento-card"
        style={{
          ...getGridSpan(item.span),
          ...getVariantStyles(item.variant, !!item.image),
          position: 'relative',
          overflow: 'hidden',
          minHeight: isMobile ? '180px' : (item.span === 'tall' || item.span === 'feature' ? '380px' : '200px'),
          padding: item.image ? '0' : isMobile ? '28px 24px' : '36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: item.stat ? 'space-between' : 'flex-end',
        }}
      >
        {/* Noise texture overlay */}
        {!item.image && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: noiseTexture,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px',
              pointerEvents: 'none',
              opacity: item.variant === 'dark' ? 0.06 : 0.04,
            }}
          />
        )}

        {/* Corner gold accent for accent variant */}
        {isAccent && !item.image && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '80px',
              height: '80px',
              background: `linear-gradient(225deg, ${colors.gold}15 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Decorative corner mark for dark cards */}
        {item.variant === 'dark' && !item.image && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '20px',
              height: '20px',
              border: `1px solid rgba(201,169,110,0.4)`,
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
        )}

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
              background: `
                linear-gradient(to top, rgba(26,22,20,0.9) 0%, rgba(26,22,20,0.5) 35%, rgba(26,22,20,0.1) 60%, transparent 100%),
                linear-gradient(to right, rgba(26,22,20,0.2) 0%, transparent 50%)
              `,
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '36px',
              right: '36px',
              height: '1px',
              background: `linear-gradient(90deg, ${colors.gold} 0%, transparent 100%)`,
              opacity: 0.5,
            }} />
          </>
        )}

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: item.image ? '36px' : '0',
        }}>
          {/* Stat number with gold shimmer */}
          {item.stat && (
            <div style={{
              fontFamily: serif,
              fontSize: isMobile ? 'clamp(36px, 10vw, 52px)' : 'clamp(42px, 5vw, 64px)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 0.9,
              color: isDark ? '#FFFFFF' : colors.deepCharcoal,
              marginBottom: '12px',
              position: 'relative',
            }}>
              <span style={{
                background: isDark ? colors.goldShimmer : 'none',
                backgroundSize: isDark ? '200% 100%' : 'auto',
                WebkitBackgroundClip: isDark ? 'text' : 'unset',
                WebkitTextFillColor: isDark ? 'transparent' : 'inherit',
                backgroundClip: isDark ? 'text' : 'unset',
              }}>
                {item.stat}
              </span>
              {item.statSuffix && (
                <span style={{
                  fontSize: '0.5em',
                  verticalAlign: 'super',
                  color: isDark ? colors.gold : colors.goldDark,
                  marginLeft: '2px',
                }}>
                  {item.statSuffix}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 style={{
            fontFamily: item.stat ? sans : serif,
            fontSize: item.stat
              ? (isMobile ? '11px' : '11px')
              : (isMobile ? '20px' : '18px'),
            fontWeight: item.stat ? 600 : 400,
            letterSpacing: item.stat ? '0.2em' : '0.01em',
            textTransform: item.stat ? 'uppercase' as const : 'none' as const,
            color: isDark ? 'rgba(255,255,255,0.9)' : colors.deepCharcoal,
            margin: 0,
            marginBottom: item.description ? '10px' : '0',
          }}>
            {item.title}
          </h3>

          {/* Description */}
          {item.description && (
            <p style={{
              fontFamily: sans,
              fontSize: isMobile ? '14px' : '13px',
              fontWeight: 400,
              lineHeight: 1.7,
              color: isDark ? 'rgba(255,255,255,0.6)' : colors.warmGray,
              margin: 0,
              maxWidth: '360px',
            }}>
              {item.description}
            </p>
          )}
        </div>

        {/* Bottom decorative gold accent line for stat cards */}
        {item.stat && !item.image && (
          <div style={{
            width: '32px',
            height: '2px',
            background: colors.goldGradient,
            marginTop: 'auto',
            borderRadius: '1px',
          }} />
        )}
      </div>
    )
  }

  return (
    <div className={`vm-bento-showcase ${className}`}>
      {/* Section Header */}
      {(sectionNum || sectionTitle) && (
        <div style={{ marginBottom: isMobile ? '32px' : '56px', textAlign: 'center' }}>
          {sectionNum && (
            <span style={{
              fontFamily: mono,
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: colors.gold,
              display: 'block',
              marginBottom: '14px',
            }}>
              {sectionNum}
            </span>
          )}
          {sectionTitle && (
            <h2 style={{
              fontFamily: serif,
              fontSize: 'clamp(26px, 4vw, 44px)',
              fontWeight: 300,
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              color: colors.deepCharcoal,
              margin: 0,
              padding: '0 clamp(8px, 4vw, 20px)',
            }}>
              {sectionTitle}
            </h2>
          )}
          {/* Decorative gold line with diamond */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            margin: '20px auto 0',
          }}>
            <div style={{ width: '32px', height: '1px', background: colors.goldGradient }} />
            <div style={{
              width: '6px',
              height: '6px',
              background: colors.gold,
              transform: 'rotate(45deg)',
            }} />
            <div style={{ width: '32px', height: '1px', background: colors.goldGradient }} />
          </div>
        </div>
      )}

      {/* ═══ MOBILE LAYOUT: Vertical stacked cards ═══ */}
      {isMobile ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '0 20px',
        }}>
          {/* First row: 2 cards side by side (stat cards) */}
          {items.filter(item => item.stat && item.stat !== '∞').length >= 2 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(120px, 100%), 1fr))',
              gap: '12px',
            }}>
              {items.filter(item => item.stat && item.stat !== '∞').map((item, i) => (
                <div key={`stat-${i}`}>
                  {renderCard(item, i)}
                </div>
              ))}
            </div>
          )}

          {/* Remaining cards: full width stacked */}
          {items.filter(item => !item.stat || item.stat === '∞').map((item, i) => (
            <div key={`card-${i}`}>
              {renderCard(item, items.indexOf(item))}
            </div>
          ))}
        </div>
      ) : isTablet ? (
        /* ═══ TABLET LAYOUT: 2-column grid ═══ */
        <div
          ref={containerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            maxWidth: '100%',
            margin: '0 auto',
            padding: '0 20px',
          }}
        >
          {items.map((item, i) => renderCard(item, i))}
        </div>
      ) : (
        /* ═══ DESKTOP LAYOUT: CSS Grid with spans ═══ */
        <div
          ref={containerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
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
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease;
        }
        @media (hover: hover) {
          .vm-bento-card:hover {
            transform: translateY(-3px) scale(1.005);
            box-shadow: 0 12px 40px rgba(201,169,110,0.12), 0 4px 12px rgba(0,0,0,0.06);
          }
          .vm-bento-card:hover img {
            transform: scale(1.03);
            transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          }
        }
        /* Container query for tablet */
        @container vault-bento (max-width: 1024px) {
          .vm-bento-showcase > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
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
