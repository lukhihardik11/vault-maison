'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

/* ────────────────────────────────────────────────────────────────────
 * InfiniteShowcasePan — Luxury Craftsmanship Canvas
 *
 * A visually rich, magazine-quality panning canvas showcasing
 * luxury craftsmanship through dramatic card designs:
 *   - Heritage cards with warm gradients and gold foil numbers
 *   - Stat cards with shimmer text effects
 *   - Quote cards with elegant serif italic and accent borders
 *   - Material cards with radial gradient gem-like backgrounds
 *   - Process cards with step indicators
 *   - Accent cards with centered calligraphic text
 *
 * Desktop: Diagonal auto-pan with GSAP, hover-pause
 * Mobile:  Touch-draggable with momentum + snap-back
 *          Uses touch-action: pan-y (NOT none) for iOS compatibility
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

// SVG noise texture for luxury paper feel
const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`

/* ─── Enhanced Card Renderer ─────────────────────────────────────── */
function Card({ card }: { card: CardDef }) {
  const gold = '#C9A96E'
  const goldLight = '#D4B87A'
  const goldDark = '#A88B52'
  const ivory = '#FDFBF7'
  const cream = '#F5F0EA'
  const deepCharcoal = '#1A1614'
  const charcoal = '#2C2420'
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
    borderRadius: '2px',
  }

  // ─── Heritage Card: Rich warm gradient + gold foil number ───
  if (card.kind === 'heritage') {
    return (
      <div style={{
        ...baseStyle,
        background: `linear-gradient(155deg, ${ivory} 0%, ${cream} 60%, rgba(201,169,110,0.06) 100%)`,
        border: `1px solid rgba(201,169,110,0.3)`,
        padding: '32px 28px',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)',
      }}>
        {/* Noise texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: noiseTexture, backgroundRepeat: 'repeat', backgroundSize: '200px', pointerEvents: 'none' }} />
        {/* Corner accent */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', background: `linear-gradient(225deg, rgba(201,169,110,0.1) 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <span style={{
          fontSize: 10,
          fontFamily: MONO,
          color: gold,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 1,
        }}>
          {card.label}
        </span>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: SERIF,
            fontSize: card.value && card.value.length > 6 ? 28 : 48,
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 0.9,
            marginBottom: 8,
            background: `linear-gradient(135deg, ${goldDark} 0%, ${gold} 40%, ${goldLight} 70%, ${gold} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {card.value}
          </div>
          {card.subtitle && (
            <span style={{
              fontSize: 12,
              fontFamily: SANS,
              color: warmGray,
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}>
              {card.subtitle}
            </span>
          )}
        </div>
        {/* Bottom gold line */}
        <div style={{ position: 'absolute', bottom: 0, left: '28px', width: '40px', height: '2px', background: `linear-gradient(90deg, ${gold}, transparent)`, borderRadius: '1px' }} />
      </div>
    )
  }

  // ─── Stat Card: Dark background + gold shimmer number ───
  if (card.kind === 'stat') {
    return (
      <div style={{
        ...baseStyle,
        background: `linear-gradient(145deg, ${deepCharcoal} 0%, ${charcoal} 70%, #3D3530 100%)`,
        border: 'none',
        padding: '28px 24px',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}>
        {/* Noise texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: noiseTexture, backgroundRepeat: 'repeat', backgroundSize: '200px', pointerEvents: 'none', opacity: 0.5 }} />
        {/* Decorative circle */}
        <div style={{ position: 'absolute', top: '16px', right: '16px', width: '18px', height: '18px', border: `1px solid rgba(201,169,110,0.3)`, borderRadius: '50%', pointerEvents: 'none' }} />
        <span style={{
          fontSize: 10,
          fontFamily: MONO,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 1,
        }}>
          {card.label}
        </span>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: SERIF,
            fontSize: 40,
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            background: `linear-gradient(90deg, ${gold} 0%, #E8D5A8 30%, ${gold} 60%, #E8D5A8 100%)`,
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {card.value}
          </div>
          <div style={{
            width: 28,
            height: 2,
            background: `linear-gradient(90deg, ${gold}, transparent)`,
            marginTop: 10,
            borderRadius: '1px',
          }} />
        </div>
      </div>
    )
  }

  // ─── Quote Card: Elegant serif italic with left gold border ───
  if (card.kind === 'quote') {
    return (
      <div style={{
        ...baseStyle,
        background: cream,
        borderLeft: `3px solid ${gold}`,
        borderTop: `1px solid rgba(201,169,110,0.15)`,
        borderRight: `1px solid rgba(201,169,110,0.15)`,
        borderBottom: `1px solid rgba(201,169,110,0.15)`,
        padding: '32px 28px',
        justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
      }}>
        {/* Noise texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: noiseTexture, backgroundRepeat: 'repeat', backgroundSize: '200px', pointerEvents: 'none' }} />
        {/* Large decorative quotation mark */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '20px',
          fontFamily: SERIF,
          fontSize: '72px',
          fontWeight: 300,
          color: `rgba(201,169,110,0.12)`,
          lineHeight: 1,
          pointerEvents: 'none',
        }}>
          "
        </div>
        <p style={{
          fontFamily: SERIF,
          fontSize: 16,
          fontWeight: 400,
          fontStyle: 'italic',
          color: charcoal,
          lineHeight: 1.7,
          margin: 0,
          letterSpacing: '0.01em',
          position: 'relative',
          zIndex: 1,
        }}>
          {card.label}
        </p>
      </div>
    )
  }

  // ─── Material Card: Radial gradient gem-like background ───
  if (card.kind === 'material') {
    return (
      <div style={{
        ...baseStyle,
        background: `radial-gradient(ellipse at 30% 30%, rgba(201,169,110,0.15) 0%, ${cream} 40%, ${ivory} 100%)`,
        border: `1px solid rgba(201,169,110,0.25)`,
        padding: '24px',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        boxShadow: '0 2px 16px rgba(201,169,110,0.06)',
      }}>
        {/* Noise texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: noiseTexture, backgroundRepeat: 'repeat', backgroundSize: '200px', pointerEvents: 'none' }} />
        {/* Decorative gem circle */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: `1.5px solid rgba(201,169,110,0.35)`,
          background: `radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        {/* Inner diamond shape */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(45deg)',
          width: 20,
          height: 20,
          border: `1px solid rgba(201,169,110,0.25)`,
          pointerEvents: 'none',
        }} />
        <span style={{
          fontSize: 11,
          fontFamily: SANS,
          fontWeight: 600,
          color: gold,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 1,
        }}>
          {card.label}
        </span>
      </div>
    )
  }

  // ─── Process Card: Step-by-step with arrow indicators ───
  if (card.kind === 'process') {
    return (
      <div style={{
        ...baseStyle,
        background: `linear-gradient(160deg, ${ivory} 0%, #FFFFFF 100%)`,
        border: `1px solid ${cream}`,
        padding: '28px 24px',
        justifyContent: 'space-between',
        boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
      }}>
        {/* Noise texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: noiseTexture, backgroundRepeat: 'repeat', backgroundSize: '200px', pointerEvents: 'none' }} />
        {/* Top decorative line */}
        <div style={{ position: 'absolute', top: 0, left: '24px', right: '24px', height: '1px', background: `linear-gradient(90deg, transparent, ${gold}40, transparent)` }} />
        <span style={{
          fontSize: 10,
          fontFamily: MONO,
          color: gold,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 1,
        }}>
          {card.label}
        </span>
        <p style={{
          fontFamily: SANS,
          fontSize: 13,
          fontWeight: 400,
          color: warmGray,
          lineHeight: 1.7,
          margin: 0,
          letterSpacing: '0.03em',
          position: 'relative',
          zIndex: 1,
        }}>
          {card.value}
        </p>
        {/* Bottom gold dot */}
        <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '6px', height: '6px', background: gold, borderRadius: '50%', opacity: 0.6 }} />
      </div>
    )
  }

  // ─── Accent Card: Centered calligraphic with radial glow ───
  return (
    <div style={{
      ...baseStyle,
      background: `radial-gradient(ellipse at center, rgba(201,169,110,0.1) 0%, rgba(201,169,110,0.04) 40%, ${ivory} 100%)`,
      border: `1px solid rgba(201,169,110,0.25)`,
      padding: '24px 20px',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 2px 12px rgba(201,169,110,0.04)',
    }}>
      {/* Noise texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: noiseTexture, backgroundRepeat: 'repeat', backgroundSize: '200px', pointerEvents: 'none' }} />
      {/* Decorative border frame */}
      <div style={{
        position: 'absolute',
        inset: '8px',
        border: `1px solid rgba(201,169,110,0.15)`,
        borderRadius: '1px',
        pointerEvents: 'none',
      }} />
      <span style={{
        fontFamily: SERIF,
        fontSize: 20,
        fontWeight: 400,
        fontStyle: 'italic',
        color: gold,
        letterSpacing: '0.06em',
        position: 'relative',
        zIndex: 1,
      }}>
        {card.label}
      </span>
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────────────── */

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
        // iOS fix: use pan-y (NOT none) so vertical page scroll still works
        touchAction: isTouchDevice ? 'pan-y' : 'auto',
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
        background: 'radial-gradient(ellipse at center, transparent 25%, rgba(250,248,245,0.4) 55%, rgba(250,248,245,0.85) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Top/bottom fade */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(to bottom, #FAF8F5, transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(to top, #FAF8F5, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Mobile: Touch hint indicator */}
      {isTouchDevice && (
        <div
          className="vm-touch-hint"
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            background: 'rgba(253,251,247,0.92)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(201,169,110,0.25)',
            borderRadius: '2px',
            pointerEvents: 'none',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
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
