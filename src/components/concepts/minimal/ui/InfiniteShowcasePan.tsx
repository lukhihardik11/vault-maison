'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/* ────────────────────────────────────────────────────────────────────
 * InfiniteShowcasePan — Infinite Panning Bento Canvas
 *
 * Adapted from the "infinite-bento-pan" pattern:
 * - Replaces Remotion dependency with pure GSAP/rAF animation
 * - Luxury jewelry aesthetic: dark canvas, gold accents, monochrome cards
 * - Diagonal auto-pan with subtle parallax depth
 * - Cards show jewelry metrics: Carat, Clarity, Cut, Certifications
 * - Radial vignette overlay for cinematic depth
 * - Respects prefers-reduced-motion
 *
 * Usage:
 *   <InfiniteShowcasePan />
 *   <InfiniteShowcasePan accentColor="#B88E4A" panDuration={60} />
 * ──────────────────────────────────────────────────────────────── */

const FONT = "'Inter', 'Helvetica Neue', sans-serif"
const MONO = "'JetBrains Mono', 'SF Mono', monospace"

const SUPER_W = 3200
const SUPER_H = 2200

type CardKind = 'chart' | 'counter' | 'gradient' | 'stat' | 'bars' | 'process' | 'material'

interface CardDef {
  x: number
  y: number
  w: number
  h: number
  kind: CardKind
  hue: number
  label?: string
}

// Jewelry-themed cards positioned across the infinite canvas
const CARDS: CardDef[] = [
  { x: 60, y: 60, w: 420, h: 260, kind: 'chart', hue: 38, label: 'Carat Weight' },
  { x: 520, y: 60, w: 260, h: 260, kind: 'counter', hue: 38, label: 'Pieces Crafted' },
  { x: 820, y: 60, w: 340, h: 160, kind: 'gradient', hue: 38 },
  { x: 1200, y: 60, w: 420, h: 260, kind: 'process', hue: 38, label: 'Setting' },
  { x: 1660, y: 60, w: 260, h: 260, kind: 'stat', hue: 38, label: 'Clarity Grade' },
  { x: 1960, y: 60, w: 340, h: 160, kind: 'bars', hue: 38, label: 'Cut Quality' },
  { x: 2340, y: 60, w: 320, h: 260, kind: 'material', hue: 38, label: 'Platinum' },
  { x: 820, y: 260, w: 340, h: 180, kind: 'counter', hue: 38, label: 'Artisans' },
  { x: 1960, y: 260, w: 340, h: 180, kind: 'chart', hue: 38, label: 'Brilliance' },
  { x: 60, y: 360, w: 260, h: 260, kind: 'gradient', hue: 220 },
  { x: 360, y: 360, w: 420, h: 260, kind: 'process', hue: 38, label: 'Polishing' },
  { x: 1200, y: 380, w: 260, h: 260, kind: 'stat', hue: 38, label: 'Symmetry' },
  { x: 1500, y: 380, w: 340, h: 260, kind: 'bars', hue: 38, label: 'Fire' },
  { x: 2340, y: 380, w: 320, h: 260, kind: 'counter', hue: 38, label: 'Certifications' },
  { x: 60, y: 660, w: 420, h: 220, kind: 'chart', hue: 38, label: 'Fluorescence' },
  { x: 520, y: 660, w: 260, h: 220, kind: 'stat', hue: 38, label: 'Color Grade' },
  { x: 820, y: 680, w: 340, h: 200, kind: 'gradient', hue: 280 },
  { x: 1200, y: 680, w: 320, h: 200, kind: 'counter', hue: 38, label: 'Hours/Piece' },
  { x: 1560, y: 680, w: 420, h: 220, kind: 'process', hue: 38, label: 'Engraving' },
  { x: 2020, y: 680, w: 320, h: 220, kind: 'bars', hue: 38, label: 'Durability' },
  { x: 60, y: 920, w: 320, h: 200, kind: 'material', hue: 38, label: '18K Gold' },
  { x: 420, y: 920, w: 340, h: 200, kind: 'stat', hue: 38, label: 'Hardness' },
  { x: 800, y: 920, w: 420, h: 200, kind: 'chart', hue: 38, label: 'Dispersion' },
  { x: 1260, y: 920, w: 260, h: 200, kind: 'counter', hue: 38, label: 'Facets' },
  { x: 1560, y: 940, w: 320, h: 200, kind: 'gradient', hue: 160 },
  { x: 1920, y: 940, w: 340, h: 200, kind: 'process', hue: 38, label: 'Casting' },
  { x: 2300, y: 940, w: 360, h: 200, kind: 'bars', hue: 38, label: 'Luster' },
  { x: 60, y: 1160, w: 420, h: 240, kind: 'process', hue: 38, label: 'Stone Setting' },
  { x: 520, y: 1160, w: 320, h: 240, kind: 'chart', hue: 38, label: 'Scintillation' },
  { x: 880, y: 1160, w: 260, h: 240, kind: 'material', hue: 38, label: 'Titanium' },
  { x: 1180, y: 1160, w: 340, h: 240, kind: 'stat', hue: 38, label: 'Polish' },
  { x: 1560, y: 1180, w: 320, h: 240, kind: 'counter', hue: 38, label: 'Designs' },
  { x: 1920, y: 1180, w: 340, h: 240, kind: 'gradient', hue: 320 },
  { x: 2300, y: 1180, w: 340, h: 240, kind: 'bars', hue: 38, label: 'Precision' },
  { x: 60, y: 1440, w: 340, h: 200, kind: 'stat', hue: 38, label: 'Depth %' },
  { x: 440, y: 1440, w: 420, h: 200, kind: 'chart', hue: 38, label: 'Table %' },
  { x: 900, y: 1440, w: 320, h: 200, kind: 'process', hue: 38, label: 'Grading' },
  { x: 1260, y: 1440, w: 260, h: 200, kind: 'material', hue: 38, label: 'Palladium' },
  { x: 1560, y: 1460, w: 340, h: 200, kind: 'counter', hue: 38, label: 'Clients' },
  { x: 1940, y: 1460, w: 320, h: 200, kind: 'bars', hue: 38, label: 'Yield' },
  { x: 2300, y: 1460, w: 340, h: 200, kind: 'gradient', hue: 60 },
  { x: 60, y: 1680, w: 420, h: 220, kind: 'bars', hue: 38, label: 'Reflectance' },
  { x: 520, y: 1680, w: 340, h: 220, kind: 'gradient', hue: 200 },
  { x: 900, y: 1680, w: 320, h: 220, kind: 'material', hue: 38, label: 'Rose Gold' },
  { x: 1260, y: 1680, w: 420, h: 220, kind: 'chart', hue: 38, label: 'Symmetry Index' },
  { x: 1720, y: 1680, w: 260, h: 220, kind: 'counter', hue: 38, label: 'Awards' },
  { x: 2020, y: 1680, w: 340, h: 220, kind: 'stat', hue: 38, label: 'Purity' },
]

// Deterministic pseudo-noise for animation
function noise(i: number, frame: number) {
  return Math.sin(frame / 60 + i * 1.7) * 0.5 + 0.5
}

// Chart card — sine wave line chart
function ChartCard({ accent, t }: { accent: string; t: number }) {
  const points: string[] = []
  for (let i = 0; i < 12; i++) {
    const x = (i / 11) * 100
    const y = 50 - (Math.sin(i * 0.7 + t) * 18 + Math.cos(i * 0.4 + t * 0.6) * 8)
    points.push(`${x},${y}`)
  }
  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={accent}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={`${points.join(' ')} 100,60 0,60`}
        fill={`${accent}18`}
        stroke="none"
      />
    </svg>
  )
}

// Bars card — animated bar chart
function BarsCard({ accent, t }: { accent: string; t: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: '100%', width: '100%' }}>
      {Array.from({ length: 8 }).map((_, i) => {
        const h = 25 + (Math.sin(i * 0.8 + t) * 0.5 + 0.5) * 70
        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              background: `linear-gradient(180deg, ${accent} 0%, ${accent}44 100%)`,
              borderRadius: 3,
            }}
          />
        )
      })}
    </div>
  )
}

// Process card — step indicator
function ProcessCard({ label }: { label?: string }) {
  const steps = ['Design', 'Cast', 'Set', 'Polish', 'Grade']
  const activeIdx = steps.indexOf(label || '') >= 0 ? steps.indexOf(label || '') : 2
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: i <= activeIdx ? 'rgba(184,142,74,0.9)' : 'rgba(255,255,255,0.15)',
          }} />
          <span style={{
            fontSize: 11,
            fontFamily: MONO,
            color: i <= activeIdx ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
            letterSpacing: '0.05em',
          }}>
            {step}
          </span>
        </div>
      ))}
    </div>
  )
}

// Material card — gradient swatch
function MaterialCard({ label, accent }: { label?: string; accent: string }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 64,
        height: 64,
        borderRadius: 14,
        background: `linear-gradient(135deg, ${accent} 0%, rgba(184,142,74,0.4) 100%)`,
        boxShadow: `0 8px 24px ${accent}33`,
      }} />
      {label && (
        <span style={{
          position: 'absolute',
          bottom: 16,
          left: 18,
          fontSize: 10,
          fontFamily: MONO,
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {label}
        </span>
      )}
    </div>
  )
}

// Gradient card — radial gradient fill
function GradientCard({ hue }: { hue: number }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: `radial-gradient(circle at 30% 30%, hsl(${hue},20%,25%) 0%, hsl(${(hue + 40) % 360},15%,12%) 50%, #0a0a0a 100%)`,
    }} />
  )
}

// Individual card renderer
function Card({ card, accent, index, frame }: { card: CardDef; accent: string; index: number; frame: number }) {
  const t = noise(index, frame) * 6.28

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: card.x,
    top: card.y,
    width: card.w,
    height: card.h,
    borderRadius: 14,
    background: 'linear-gradient(180deg, #131313 0%, #0a0a0a 100%)',
    border: '1px solid rgba(255,255,255,0.12)',
    overflow: 'hidden',
    padding: 16,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  }

  const labelEl = card.label ? (
    <div style={{
      fontSize: 10,
      fontWeight: 500,
      fontFamily: MONO,
      color: 'rgba(255,255,255,0.65)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      marginBottom: 6,
    }}>
      {card.label}
    </div>
  ) : null

  if (card.kind === 'chart') {
    return (
      <div style={baseStyle}>
        {labelEl}
        <div style={{ flex: 1 }}><ChartCard accent={accent} t={t} /></div>
      </div>
    )
  }
  if (card.kind === 'bars') {
    return (
      <div style={baseStyle}>
        {labelEl}
        <div style={{ flex: 1 }}><BarsCard accent={accent} t={t} /></div>
      </div>
    )
  }
  if (card.kind === 'counter') {
    const v = Math.floor(50 + noise(index, frame) * 200)
    return (
      <div style={baseStyle}>
        {labelEl}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: 44, fontWeight: 200, letterSpacing: '-0.04em', color: 'white', fontFamily: FONT }}>
          {v.toLocaleString()}
        </div>
        <div style={{ fontSize: 10, color: accent, fontWeight: 500, fontFamily: MONO }}>
          +{(noise(index + 1, frame) * 8).toFixed(1)}%
        </div>
      </div>
    )
  }
  if (card.kind === 'stat') {
    const v = (95 + noise(index, frame) * 5).toFixed(1)
    return (
      <div style={baseStyle}>
        {labelEl}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', fontSize: 40, fontWeight: 200, letterSpacing: '-0.03em', fontFamily: FONT }}>
          {v}
          <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', marginLeft: 4 }}>%</span>
        </div>
      </div>
    )
  }
  if (card.kind === 'process') {
    return (
      <div style={baseStyle}>
        {labelEl}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <ProcessCard label={card.label} />
        </div>
      </div>
    )
  }
  if (card.kind === 'material') {
    return (
      <div style={{ ...baseStyle, padding: 0, position: 'absolute' as const, left: card.x, top: card.y, width: card.w, height: card.h }}>
        <MaterialCard label={card.label} accent={accent} />
      </div>
    )
  }
  // gradient
  return (
    <div style={{ ...baseStyle, padding: 0 }}>
      <GradientCard hue={card.hue} />
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
  accentColor = 'rgba(184,142,74,0.9)',
  height = '600px',
  className = '',
}: InfiniteShowcasePanProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef(0)
  const rafRef = useRef<number>(0)
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
    const maxX = SUPER_W - 1280 // approximate viewport
    const maxY = SUPER_H - 600

    tl.fromTo(canvas,
      { x: 0, y: 0 },
      { x: -maxX, y: -maxY, duration: panDuration, ease: 'none' }
    )

    // Animate frame counter for card internal animations
    const animate = () => {
      frameRef.current += 1
      // Force re-render every 2 frames for card animations
      if (frameRef.current % 3 === 0 && canvas) {
        canvas.style.setProperty('--frame', String(frameRef.current))
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      tl.kill()
      cancelAnimationFrame(rafRef.current)
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
        background: '#050505',
        borderRadius: 0,
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
          <Card key={i} card={c} accent={accentColor} index={i} frame={0} />
        ))}
      </div>

      {/* Cinematic vignette overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(5,5,5,0.45) 75%, rgba(5,5,5,0.85) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Top/bottom fade for seamless blending */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'linear-gradient(to bottom, #050505, transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'linear-gradient(to top, #050505, transparent)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

export default InfiniteShowcasePan
