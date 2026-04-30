'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/* ────────────────────────────────────────────────────────────────────
 * InfiniteShowcasePan — Luxury Craftsmanship Canvas
 *
 * Redesigned from tech/SaaS dashboard to luxury jewelry aesthetic:
 * - Warm ivory/cream backgrounds with gold accents
 * - Elegant serif typography (Cormorant Garamond)
 * - Craftsmanship storytelling cards (heritage, materials, artisans)
 * - Diagonal auto-pan with subtle parallax depth
 * - Radial vignette overlay for cinematic depth
 * - Respects prefers-reduced-motion
 *
 * Usage:
 *   <InfiniteShowcasePan />
 *   <InfiniteShowcasePan accentColor="#C9A96E" panDuration={60} />
 * ──────────────────────────────────────────────────────────────── */

const SERIF = "'Cormorant Garamond', 'Playfair Display', Georgia, serif"
const SANS = "'Inter', 'Helvetica Neue', sans-serif"
const MONO = "'SF Mono', 'Fira Code', monospace"

const SUPER_W = 3200
const SUPER_H = 2200

type CardKind = 'heritage' | 'stat' | 'material' | 'quote' | 'process' | 'accent'

interface CardDef {
  x: number
  y: number
  w: number
  h: number
  kind: CardKind
  label?: string
  value?: string
  subtitle?: string
}

// Luxury jewelry craftsmanship cards positioned across the infinite canvas
const CARDS: CardDef[] = [
  // Row 1
  { x: 60, y: 60, w: 420, h: 260, kind: 'heritage', label: 'Established', value: '1974', subtitle: 'Five decades of mastery' },
  { x: 520, y: 60, w: 260, h: 260, kind: 'stat', label: 'Master Artisans', value: '50+' },
  { x: 820, y: 60, w: 340, h: 160, kind: 'material', label: '18K Gold' },
  { x: 1200, y: 60, w: 420, h: 260, kind: 'quote', label: '"Every facet tells a story of patience and precision."' },
  { x: 1660, y: 60, w: 260, h: 260, kind: 'stat', label: 'Hours Per Piece', value: '120' },
  { x: 1960, y: 60, w: 340, h: 160, kind: 'accent', label: 'Atelier' },
  { x: 2340, y: 60, w: 320, h: 260, kind: 'material', label: 'Platinum 950' },
  // Row 2
  { x: 820, y: 260, w: 340, h: 180, kind: 'stat', label: 'GIA Certified', value: '100%' },
  { x: 1960, y: 260, w: 340, h: 180, kind: 'heritage', label: 'Generations', value: 'III', subtitle: 'Third-generation craftsmen' },
  { x: 60, y: 360, w: 260, h: 260, kind: 'accent', label: 'Heritage' },
  { x: 360, y: 360, w: 420, h: 260, kind: 'process', label: 'The Journey', value: 'Sketch → Stone → Setting → Polish' },
  { x: 1200, y: 380, w: 260, h: 260, kind: 'stat', label: 'Facets Cut', value: '57' },
  { x: 1500, y: 380, w: 340, h: 260, kind: 'quote', label: '"Where tradition meets innovation."' },
  { x: 2340, y: 380, w: 320, h: 260, kind: 'stat', label: 'Countries', value: '42' },
  // Row 3
  { x: 60, y: 660, w: 420, h: 220, kind: 'heritage', label: 'Pieces Created', value: '12,000+', subtitle: 'Each one unique' },
  { x: 520, y: 660, w: 260, h: 220, kind: 'material', label: 'VVS Diamonds' },
  { x: 820, y: 680, w: 340, h: 200, kind: 'accent', label: 'Bespoke' },
  { x: 1200, y: 680, w: 320, h: 200, kind: 'stat', label: 'Weeks to Create', value: '6–8' },
  { x: 1560, y: 680, w: 420, h: 220, kind: 'quote', label: '"The hand remembers what the eye forgets."' },
  { x: 2020, y: 680, w: 320, h: 220, kind: 'process', label: 'Materials', value: 'Gold · Platinum · Palladium' },
  // Row 4
  { x: 60, y: 920, w: 320, h: 200, kind: 'material', label: 'Rose Gold' },
  { x: 420, y: 920, w: 340, h: 200, kind: 'stat', label: 'Clarity Grade', value: 'IF' },
  { x: 800, y: 920, w: 420, h: 200, kind: 'heritage', label: 'Ateliers', value: 'Geneva & Antwerp', subtitle: 'Two houses of craft' },
  { x: 1260, y: 920, w: 260, h: 200, kind: 'accent', label: 'Éternité' },
  { x: 1560, y: 940, w: 320, h: 200, kind: 'material', label: 'Sapphire' },
  { x: 1920, y: 940, w: 340, h: 200, kind: 'quote', label: '"From mine to maison, fully traceable."' },
  { x: 2300, y: 940, w: 360, h: 200, kind: 'stat', label: 'Lifetime Warranty', value: '∞' },
  // Row 5
  { x: 60, y: 1160, w: 420, h: 240, kind: 'process', label: 'Certification', value: 'GIA · HRD · AGS' },
  { x: 520, y: 1160, w: 320, h: 240, kind: 'heritage', label: 'Clients Served', value: '8,400+', subtitle: 'Worldwide' },
  { x: 880, y: 1160, w: 260, h: 240, kind: 'material', label: 'Emerald' },
  { x: 1180, y: 1160, w: 340, h: 240, kind: 'stat', label: 'Carat Range', value: '0.3–15' },
  { x: 1560, y: 1180, w: 320, h: 240, kind: 'accent', label: 'Lumière' },
  { x: 1920, y: 1180, w: 340, h: 240, kind: 'quote', label: '"Brilliance is not found — it is crafted."' },
  { x: 2300, y: 1180, w: 340, h: 240, kind: 'process', label: 'Excellence', value: 'Design · Cast · Set · Finish' },
  // Row 6
  { x: 60, y: 1440, w: 340, h: 200, kind: 'stat', label: 'Color Grade', value: 'D–F' },
  { x: 440, y: 1440, w: 420, h: 200, kind: 'quote', label: '"A jewel is a conversation between light and form."' },
  { x: 900, y: 1440, w: 320, h: 200, kind: 'material', label: 'White Gold' },
  { x: 1260, y: 1440, w: 260, h: 200, kind: 'accent', label: 'Artisan' },
  { x: 1560, y: 1460, w: 340, h: 200, kind: 'heritage', label: 'Awards', value: '23', subtitle: 'International recognition' },
  { x: 1940, y: 1460, w: 320, h: 200, kind: 'stat', label: 'Hands Per Piece', value: '12' },
  { x: 2300, y: 1460, w: 340, h: 200, kind: 'material', label: 'Ruby' },
  // Row 7
  { x: 60, y: 1680, w: 420, h: 220, kind: 'heritage', label: 'Legacy', value: '50 Years', subtitle: 'Of uncompromising craft' },
  { x: 520, y: 1680, w: 340, h: 220, kind: 'accent', label: 'Maison' },
  { x: 900, y: 1680, w: 320, h: 220, kind: 'material', label: 'Tanzanite' },
  { x: 1260, y: 1680, w: 420, h: 220, kind: 'quote', label: '"Forever means forever."' },
  { x: 1720, y: 1680, w: 260, h: 220, kind: 'stat', label: 'Symmetry', value: 'Ideal' },
  { x: 2020, y: 1680, w: 340, h: 220, kind: 'process', label: 'Promise', value: 'Clean · Polish · Protect' },
]

// Individual card renderer — luxury jewelry aesthetic
function Card({ card }: { card: CardDef }) {
  // Warm luxury color palette
  const ivory = '#FDFBF7'
  const cream = '#F5F0EA'
  const warmGold = '#C9A96E'
  const deepCharcoal = '#2C2420'
  const warmGray = '#6B5E54'

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: card.x,
    top: card.y,
    width: card.w,
    height: card.h,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  }

  if (card.kind === 'heritage') {
    return (
      <div style={{
        ...baseStyle,
        background: ivory,
        border: `1px solid ${warmGold}33`,
        padding: '28px 24px',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: 10,
          fontFamily: MONO,
          color: warmGold,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          {card.label}
        </span>
        <div>
          <div style={{
            fontFamily: SERIF,
            fontSize: card.value && card.value.length > 6 ? 28 : 44,
            fontWeight: 300,
            color: deepCharcoal,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: 6,
          }}>
            {card.value}
          </div>
          {card.subtitle && (
            <span style={{
              fontSize: 12,
              fontFamily: SANS,
              color: warmGray,
              fontWeight: 400,
            }}>
              {card.subtitle}
            </span>
          )}
        </div>
      </div>
    )
  }

  if (card.kind === 'stat') {
    return (
      <div style={{
        ...baseStyle,
        background: '#FFFFFF',
        border: `1px solid #E8E2DA`,
        padding: '24px 20px',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        <span style={{
          fontSize: 10,
          fontFamily: MONO,
          color: warmGray,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          {card.label}
        </span>
        <div style={{
          fontFamily: SERIF,
          fontSize: 36,
          fontWeight: 300,
          color: deepCharcoal,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          {card.value}
          <div style={{
            width: 24,
            height: 1,
            background: warmGold,
            marginTop: 8,
          }} />
        </div>
      </div>
    )
  }

  if (card.kind === 'quote') {
    return (
      <div style={{
        ...baseStyle,
        background: cream,
        border: `1px solid ${warmGold}22`,
        padding: '28px 24px',
        justifyContent: 'center',
      }}>
        <div style={{
          width: 20,
          height: 2,
          background: warmGold,
          marginBottom: 16,
        }} />
        <p style={{
          fontFamily: SERIF,
          fontSize: 15,
          fontWeight: 400,
          fontStyle: 'italic',
          color: deepCharcoal,
          lineHeight: 1.6,
          margin: 0,
          letterSpacing: '0.01em',
        }}>
          {card.label}
        </p>
      </div>
    )
  }

  if (card.kind === 'material') {
    return (
      <div style={{
        ...baseStyle,
        background: `linear-gradient(145deg, ${cream} 0%, ${ivory} 50%, rgba(201,169,110,0.08) 100%)`,
        border: `1px solid ${warmGold}44`,
        padding: '20px',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
      }}>
        {/* Decorative gold circle */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: `1px solid ${warmGold}55`,
          opacity: 0.6,
        }} />
        <span style={{
          fontSize: 11,
          fontFamily: SANS,
          fontWeight: 500,
          color: warmGold,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>
          {card.label}
        </span>
      </div>
    )
  }

  if (card.kind === 'process') {
    return (
      <div style={{
        ...baseStyle,
        background: ivory,
        border: `1px solid #E8E2DA`,
        padding: '24px 20px',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: 10,
          fontFamily: MONO,
          color: warmGold,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          {card.label}
        </span>
        <p style={{
          fontFamily: SANS,
          fontSize: 13,
          fontWeight: 400,
          color: warmGray,
          lineHeight: 1.6,
          margin: 0,
          letterSpacing: '0.02em',
        }}>
          {card.value}
        </p>
      </div>
    )
  }

  // Accent card — warm gold gradient
  return (
    <div style={{
      ...baseStyle,
      background: `linear-gradient(135deg, rgba(201,169,110,0.12) 0%, rgba(201,169,110,0.04) 50%, ${ivory} 100%)`,
      border: `1px solid ${warmGold}33`,
      padding: '24px 20px',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <span style={{
        fontFamily: SERIF,
        fontSize: 18,
        fontWeight: 400,
        fontStyle: 'italic',
        color: warmGold,
        letterSpacing: '0.08em',
      }}>
        {card.label}
      </span>
    </div>
  )
}

export interface InfiniteShowcasePanProps {
  /** Duration of one full pan cycle in seconds */
  panDuration?: number
  /** Accent color (default: Vault Maison gold) */
  accentColor?: string
  /** Height of the container */
  height?: string
  className?: string
}

export function InfiniteShowcasePan({
  panDuration = 50,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  accentColor = '#C9A96E',
  height = '600px',
  className = '',
}: InfiniteShowcasePanProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isReduced, setIsReduced] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (isReduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    // Animate the pan using GSAP for smooth diagonal movement
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    const maxX = SUPER_W - 1280
    const maxY = SUPER_H - 600

    tl.fromTo(canvas,
      { x: 0, y: 0 },
      { x: -maxX, y: -maxY, duration: panDuration, ease: 'none' }
    )

    return () => {
      tl.kill()
    }
  }, [isReduced, panDuration])

  return (
    <div
      ref={containerRef}
      className={`vm-infinite-pan ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
        background: '#FAF8F5',
      }}
    >
      <div
        ref={canvasRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: SUPER_W,
          height: SUPER_H,
          willChange: 'transform',
        }}
      >
        {isMounted && CARDS.map((c, i) => (
          <Card key={i} card={c} />
        ))}
      </div>

      {/* Warm vignette overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(250,248,245,0.5) 65%, rgba(250,248,245,0.9) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Top/bottom fade for seamless blending */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'linear-gradient(to bottom, #FAF8F5, transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'linear-gradient(to top, #FAF8F5, transparent)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

export default InfiniteShowcasePan
