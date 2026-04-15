'use client'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface BackgroundBeamsProps {
  className?: string
  color?: string
}

export function BackgroundBeams({ className, color = 'rgba(212,175,55,0.15)' }: BackgroundBeamsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let beams: { x: number; y: number; length: number; angle: number; speed: number; opacity: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize beams
    for (let i = 0; i < 8; i++) {
      beams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 200 + Math.random() * 400,
        angle: Math.random() * Math.PI * 2,
        speed: 0.001 + Math.random() * 0.002,
        opacity: 0.1 + Math.random() * 0.3,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      beams.forEach((beam) => {
        beam.angle += beam.speed
        const endX = beam.x + Math.cos(beam.angle) * beam.length
        const endY = beam.y + Math.sin(beam.angle) * beam.length

        const gradient = ctx.createLinearGradient(beam.x, beam.y, endX, endY)
        gradient.addColorStop(0, 'transparent')
        gradient.addColorStop(0.5, color)
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.moveTo(beam.x, beam.y)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.globalAlpha = beam.opacity
        ctx.stroke()
        ctx.globalAlpha = 1
      })
      animationId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 pointer-events-none', className)}
    />
  )
}
