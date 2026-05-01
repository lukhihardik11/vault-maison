'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

/* ────────────────────────────────────────────────────────────────────
 * InfiniteShowcasePan — Luxury Craftsmanship Canvas
 *
 * Desktop: Diagonal auto-pan with GSAP, hover-pause
 * Mobile:  Touch-draggable canvas with momentum + snap-back
 *
 * Features:
 * - Warm ivory/cream backgrounds with gold accents
 * - Elegant serif typography (Cormorant Garamond)
 * - Craftsmanship storytelling cards
 * - Respects prefers-reduced-motion (shows static grid)
 * - Touch-optimized for mobile with inertia
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

  // Accent card
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
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const panTl = useRef<gsap.core.Timeline | null>(null)

  // Touch drag state
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    velocityX: 0,
    velocityY: 0,
    lastMoveTime: 0,
    lastMoveX: 0,
    lastMoveY: 0,
  })

  useEffect(() => {
    setIsMounted(true)
    setIsTouchDevice(
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    )
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Desktop: Auto-pan with GSAP
  useEffect(() => {
    if (isReduced || isTouchDevice) return

    const canvas = canvasRef.current
    if (!canvas) return

    const maxX = SUPER_W - 1280
    const maxY = SUPER_H - 600

    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.fromTo(canvas,
      { x: 0, y: 0 },
      { x: -maxX, y: -maxY, duration: panDuration, ease: 'none' }
    )
    panTl.current = tl

    return () => { tl.kill() }
  }, [isReduced, panDuration, isTouchDevice])

  // Mobile: Touch-drag with momentum
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isTouchDevice) return
    const touch = e.touches[0]
    const canvas = canvasRef.current
    if (!canvas) return

    // Pause any running GSAP animation
    if (panTl.current) panTl.current.pause()

    // Kill any inertia animation
    gsap.killTweensOf(canvas)

    const transform = new DOMMatrix(getComputedStyle(canvas).transform)
    dragState.current = {
      isDragging: true,
      startX: touch.clientX - transform.m41,
      startY: touch.clientY - transform.m42,
      currentX: transform.m41,
      currentY: transform.m42,
      velocityX: 0,
      velocityY: 0,
      lastMoveTime: Date.now(),
      lastMoveX: touch.clientX,
      lastMoveY: touch.clientY,
    }
  }, [isTouchDevice])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragState.current.isDragging) return
    const touch = e.touches[0]
    const canvas = canvasRef.current
    if (!canvas) return

    const now = Date.now()
    const dt = now - dragState.current.lastMoveTime
    if (dt > 0) {
      dragState.current.velocityX = (touch.clientX - dragState.current.lastMoveX) / dt * 16
      dragState.current.velocityY = (touch.clientY - dragState.current.lastMoveY) / dt * 16
    }
    dragState.current.lastMoveTime = now
    dragState.current.lastMoveX = touch.clientX
    dragState.current.lastMoveY = touch.clientY

    let newX = touch.clientX - dragState.current.startX
    let newY = touch.clientY - dragState.current.startY

    // Clamp with rubber-band effect
    const containerWidth = containerRef.current?.clientWidth || 375
    const containerHeight = containerRef.current?.clientHeight || 600
    const maxX = 0
    const minX = -(SUPER_W - containerWidth)
    const maxY = 0
    const minY = -(SUPER_H - containerHeight)

    if (newX > maxX) newX = maxX + (newX - maxX) * 0.3
    if (newX < minX) newX = minX + (newX - minX) * 0.3
    if (newY > maxY) newY = maxY + (newY - maxY) * 0.3
    if (newY < minY) newY = minY + (newY - minY) * 0.3

    dragState.current.currentX = newX
    dragState.current.currentY = newY

    gsap.set(canvas, { x: newX, y: newY })
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!dragState.current.isDragging) return
    dragState.current.isDragging = false

    const canvas = canvasRef.current
    if (!canvas) return

    const containerWidth = containerRef.current?.clientWidth || 375
    const containerHeight = containerRef.current?.clientHeight || 600
    const minX = -(SUPER_W - containerWidth)
    const minY = -(SUPER_H - containerHeight)

    // Apply momentum with deceleration
    let targetX = dragState.current.currentX + dragState.current.velocityX * 20
    let targetY = dragState.current.currentY + dragState.current.velocityY * 20

    // Clamp to bounds
    targetX = Math.max(minX, Math.min(0, targetX))
    targetY = Math.max(minY, Math.min(0, targetY))

    gsap.to(canvas, {
      x: targetX,
      y: targetY,
      duration: 0.8,
      ease: 'power3.out',
    })
  }, [])

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
        touchAction: isTouchDevice ? 'none' : 'auto',
        cursor: isTouchDevice ? 'grab' : 'default',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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

      {/* Top/bottom fade */}
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

      {/* Mobile: Touch hint indicator */}
      {isTouchDevice && (
        <div
          className="vm-touch-hint"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(253,251,247,0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(201,169,110,0.2)',
            pointerEvents: 'none',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5">
            <path d="M7 11L12 6L17 11M7 13L12 18L17 13" />
          </svg>
          <span style={{
            fontFamily: SANS,
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#6B5E54',
          }}>
            Drag to explore
          </span>
        </div>
      )}
    </div>
  )
}

export default InfiniteShowcasePan
