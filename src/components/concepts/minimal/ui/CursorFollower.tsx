'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

/* ================================================================== */
/*  CursorFollower — Luxury Jeweler's Cursor for Vault Maison          */
/* ================================================================== */

/**
 * A visually rich, multi-layered cursor inspired by fine jewelry craftsmanship.
 *
 * Layers:
 *   1. **Inner gem** — A small faceted diamond (rotated square) with golden
 *      gradient border, subtle glow pulse
 *   2. **Outer ring** — A thin circular ring that orbits/breathes around the gem,
 *      expanding on hover to form a "loupe" effect
 *   3. **Sparkle canvas** — Occasional golden sparkle particles that emit
 *      on movement, creating a subtle trail of brilliance
 *   4. **Context label** — Text that appears inside the expanded ring
 *
 * States:
 *   - Default: Small golden diamond + thin breathing ring
 *   - Interactive hover: Ring expands slightly, diamond brightens
 *   - data-cursor context: Ring expands to 56px circle, label appears, diamond pulses
 *   - Click: Diamond compresses, sparkle burst (4-5 particles)
 *
 * Colors: Uses the brand gold (#C9A96E) with warm white accents
 */

// Sparkle particle type
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  opacity: number
}

export default function CursorFollower() {
  const gemRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReduced = useReducedMotionPreference()
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(pointer: coarse)')
    setIsTouch(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReduced || isTouch) return

    const gem = gemRef.current
    const ring = ringRef.current
    const label = labelRef.current
    const canvas = canvasRef.current
    if (!gem || !ring || !label || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Brand colors
    const GOLD = '#C9A96E'
    const GOLD_LIGHT = '#E8D5A8'
    const GOLD_DIM = 'rgba(201, 169, 110, 0.4)'

    // Position state
    let mouseX = -100
    let mouseY = -100
    let curX = -100
    let curY = -100
    let ringX = -100
    let ringY = -100
    let visible = false
    let currentLabel = ''
    let isInteractive = false
    let velocity = 0
    let prevMouseX = -100
    let prevMouseY = -100

    // Sparkle particles
    const particles: Particle[] = []
    let frameCount = 0

    // Movement lerps
    const GEM_LERP = 0.25 // Gem follows closely
    const RING_LERP = 0.15 // Ring trails slightly for depth
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    // GSAP quickSetters
    const setGemX = gsap.quickSetter(gem, 'x', 'px')
    const setGemY = gsap.quickSetter(gem, 'y', 'px')
    const setRingX = gsap.quickSetter(ring, 'x', 'px')
    const setRingY = gsap.quickSetter(ring, 'y', 'px')
    const setLabelX = gsap.quickSetter(label, 'x', 'px')
    const setLabelY = gsap.quickSetter(label, 'y', 'px')

    // Gem size
    const GEM_HALF = 5 // 10px / 2
    // Ring default size
    const RING_SIZE_DEFAULT = 28
    const RING_HALF_DEFAULT = RING_SIZE_DEFAULT / 2

    // Breathing animation for the ring
    const breathe = gsap.to(ring, {
      scale: 1.08,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      paused: true,
    })

    // Gem glow pulse
    const glowPulse = gsap.to(gem, {
      boxShadow: `0 0 8px 2px ${GOLD_DIM}, inset 0 0 4px 1px rgba(201, 169, 110, 0.3)`,
      duration: 1.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      paused: true,
    })

    // Spawn sparkle particles
    const spawnParticle = (x: number, y: number, burst = false) => {
      const count = burst ? 5 : 1
      for (let i = 0; i < count; i++) {
        const angle = burst ? (Math.PI * 2 * i) / count + Math.random() * 0.5 : Math.random() * Math.PI * 2
        const speed = burst ? 1.5 + Math.random() * 2 : 0.3 + Math.random() * 0.8
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: burst ? 30 + Math.random() * 20 : 20 + Math.random() * 15,
          size: burst ? 2 + Math.random() * 2.5 : 1 + Math.random() * 1.5,
          opacity: 1,
        })
      }
    }

    // Draw sparkle particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.02 // slight gravity
        p.vx *= 0.98 // friction
        p.life++
        p.opacity = 1 - p.life / p.maxLife

        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        // Draw a 4-pointed star shape for each particle
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.life * 0.05) + i) // slow rotation
        ctx.globalAlpha = p.opacity * 0.8

        const s = p.size * (1 - p.life / p.maxLife * 0.5)

        // 4-pointed star
        ctx.beginPath()
        ctx.moveTo(0, -s * 1.5)
        ctx.lineTo(s * 0.4, -s * 0.4)
        ctx.lineTo(s * 1.5, 0)
        ctx.lineTo(s * 0.4, s * 0.4)
        ctx.lineTo(0, s * 1.5)
        ctx.lineTo(-s * 0.4, s * 0.4)
        ctx.lineTo(-s * 1.5, 0)
        ctx.lineTo(-s * 0.4, -s * 0.4)
        ctx.closePath()

        // Golden gradient fill
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 1.5)
        grad.addColorStop(0, GOLD_LIGHT)
        grad.addColorStop(0.5, GOLD)
        grad.addColorStop(1, 'rgba(201, 169, 110, 0)')
        ctx.fillStyle = grad
        ctx.fill()

        ctx.restore()
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Calculate velocity
      const dx = mouseX - prevMouseX
      const dy = mouseY - prevMouseY
      velocity = Math.sqrt(dx * dx + dy * dy)
      prevMouseX = mouseX
      prevMouseY = mouseY

      if (!visible) {
        visible = true
        gsap.to([gem, ring], { opacity: 1, duration: 0.4, ease: 'power2.out' })
        breathe.play()
        glowPulse.play()
      }

      // Emit sparkle particles based on velocity (only when moving fast enough)
      if (velocity > 8 && frameCount % 3 === 0) {
        spawnParticle(mouseX, mouseY)
      }
    }

    const onMouseLeave = () => {
      visible = false
      gsap.to([gem, ring, label], { opacity: 0, duration: 0.3 })
      breathe.pause()
      glowPulse.pause()
    }

    const onMouseEnter = () => {
      if (!visible) {
        visible = true
        gsap.to([gem, ring], { opacity: 1, duration: 0.4 })
        breathe.play()
        glowPulse.play()
      }
    }

    const onMouseDown = () => {
      gsap.to(gem, {
        scale: 0.6,
        duration: 0.08,
        ease: 'power3.out',
      })
      gsap.to(ring, {
        scale: 0.85,
        duration: 0.1,
        ease: 'power3.out',
      })
      // Sparkle burst on click
      spawnParticle(mouseX, mouseY, true)
    }

    const onMouseUp = () => {
      gsap.to(gem, {
        scale: currentLabel ? 1.2 : 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.4)',
      })
      gsap.to(ring, {
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    // Context detection
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      let node: Element | null = target
      let context = ''
      let interactive = false

      while (node && node !== document.body) {
        const attr = node.getAttribute('data-cursor')
        if (attr) {
          context = attr
          break
        }
        const tag = node.tagName.toLowerCase()
        if (
          tag === 'a' ||
          tag === 'button' ||
          tag === 'input' ||
          tag === 'textarea' ||
          node.getAttribute('role') === 'button'
        ) {
          interactive = true
        }
        node = node.parentElement
      }

      // Context label state
      if (context && context !== currentLabel) {
        currentLabel = context
        isInteractive = false
        label.textContent = context.charAt(0).toUpperCase() + context.slice(1)
        gsap.to(label, { opacity: 1, duration: 0.25, ease: 'power2.out' })
        gsap.to(ring, {
          width: 56,
          height: 56,
          borderColor: GOLD,
          borderRadius: '50%',
          duration: 0.4,
          ease: 'power2.out',
        })
        gsap.to(gem, {
          scale: 1.2,
          borderColor: GOLD_LIGHT,
          duration: 0.3,
          ease: 'power2.out',
        })
        breathe.pause()
      } else if (!context && currentLabel) {
        currentLabel = ''
        isInteractive = false
        gsap.to(label, { opacity: 0, duration: 0.15, ease: 'power2.in' })
        gsap.to(ring, {
          width: RING_SIZE_DEFAULT,
          height: RING_SIZE_DEFAULT,
          borderColor: GOLD_DIM,
          duration: 0.35,
          ease: 'power2.out',
        })
        gsap.to(gem, {
          scale: 1,
          borderColor: GOLD,
          duration: 0.25,
          ease: 'power2.out',
        })
        breathe.play()
      }

      // Interactive element hover (no context label)
      if (!context && interactive && !isInteractive) {
        isInteractive = true
        gsap.to(ring, {
          width: 36,
          height: 36,
          borderColor: GOLD,
          duration: 0.25,
          ease: 'power2.out',
        })
        gsap.to(gem, {
          scale: 1.3,
          borderColor: GOLD_LIGHT,
          boxShadow: `0 0 12px 3px ${GOLD_DIM}`,
          duration: 0.25,
          ease: 'power2.out',
        })
      } else if (!context && !interactive && isInteractive) {
        isInteractive = false
        gsap.to(ring, {
          width: RING_SIZE_DEFAULT,
          height: RING_SIZE_DEFAULT,
          borderColor: GOLD_DIM,
          duration: 0.3,
          ease: 'power2.out',
        })
        gsap.to(gem, {
          scale: 1,
          borderColor: GOLD,
          boxShadow: `0 0 6px 1px ${GOLD_DIM}`,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    // Animation tick
    const tick = () => {
      frameCount++

      // Gem follows mouse closely
      curX = lerp(curX, mouseX, GEM_LERP)
      curY = lerp(curY, mouseY, GEM_LERP)

      // Ring trails slightly behind for depth
      ringX = lerp(ringX, mouseX, RING_LERP)
      ringY = lerp(ringY, mouseY, RING_LERP)

      setGemX(curX - GEM_HALF)
      setGemY(curY - GEM_HALF)

      // Ring centers itself (dynamic size via GSAP)
      const ringEl = ring
      const rw = ringEl.offsetWidth / 2
      const rh = ringEl.offsetHeight / 2
      setRingX(ringX - rw)
      setRingY(ringY - rh)

      // Label follows ring
      setLabelX(ringX - 28)
      setLabelY(ringY - 28)

      // Draw sparkles
      drawParticles()
    }

    gsap.ticker.add(tick)

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    // Hide default cursor
    const conceptEl = document.querySelector('.minimal-concept')
    if (conceptEl) {
      ;(conceptEl as HTMLElement).style.cursor = 'none'
    }

    return () => {
      gsap.ticker.remove(tick)
      breathe.kill()
      glowPulse.kill()
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', resizeCanvas)
      if (conceptEl) {
        ;(conceptEl as HTMLElement).style.cursor = ''
      }
    }
  }, [prefersReduced, isTouch])

  if (prefersReduced || isTouch) return null

  return (
    <>
      {/* Sparkle canvas — full viewport, behind everything interactive */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 99997,
        }}
      />

      {/* Outer ring — thin circle that breathes and expands on context */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '28px',
          height: '28px',
          border: '1px solid rgba(201, 169, 110, 0.6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          willChange: 'transform, width, height',
          transition: 'border-radius 0.3s ease',
        }}
      />

      {/* Inner gem — faceted diamond with golden glow */}
      <div
        ref={gemRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '10px',
          height: '10px',
          border: '1.5px solid #C9A96E',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          willChange: 'transform',
          transform: 'rotate(45deg)',
          transformOrigin: 'center center',
          boxShadow: '0 0 8px 2px rgba(201, 169, 110, 0.5)',
          background: 'rgba(201, 169, 110, 0.15)',
        }}
      />

      {/* Context label — appears inside expanded ring */}
      <div
        ref={labelRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          color: '#C9A96E',
          fontSize: '8px',
          fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontWeight: 600,
          willChange: 'transform',
        }}
      />
    </>
  )
}
