'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

interface MinimalCursorProps {
  dotSize?: number
  frameSize?: number
  hoverFrameSize?: number
  trailLength?: number
  smoothness?: number
}

export function MinimalCursor({
  dotSize = 6,
  frameSize = 36,
  hoverFrameSize = 76,
  trailLength = 4,
  smoothness = 0.15,
}: MinimalCursorProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  
  const cursorRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<HTMLDivElement[]>([])
  
  const mousePos = useRef({ x: -100, y: -100 })
  const currentPos = useRef({ x: -100, y: -100 })
  const trailPositions = useRef<Array<{ x: number; y: number }>>([])
  
  const rafRef = useRef<number>(0)
  const [cursorText, setCursorText] = useState('')
  const textRef = useRef('')
  const [shouldRender, setShouldRender] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice || prefersReducedMotion) return
    setShouldRender(true)

    for (let i = 0; i < trailLength; i++) {
      trailPositions.current.push({ x: -100, y: -100 })
    }

    const lerp = (start: number, end: number, factor: number) => 
      start + (end - start) * factor

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, smoothness)
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, smoothness)

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`
      }

      if (frameRef.current) {
        const targetSize = textRef.current ? hoverFrameSize : frameSize
        frameRef.current.style.width = `${targetSize}px`
        frameRef.current.style.height = `${targetSize}px`
        frameRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`
      }

      trailPositions.current.unshift({ 
        x: currentPos.current.x, 
        y: currentPos.current.y 
      })
      trailPositions.current = trailPositions.current.slice(0, trailLength)

      trailPositions.current.forEach((pos, index) => {
        if (trailRefs.current[index]) {
          const opacity = 0.5 - (index / trailLength) * 0.5
          const scale = 1 - (index / trailLength) * 0.3
          trailRefs.current[index].style.transform = 
            `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${scale})`
          trailRefs.current[index].style.opacity = opacity.toString()
        }
      })

      rafRef.current = window.requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return

      if (target.closest('[data-cursor="view"]')) {
        textRef.current = 'View'
        setCursorText('View')
        return
      }

      if (target.closest('a, button, [role="button"]')) {
        textRef.current = ''
        setCursorText('')
        return
      }

      textRef.current = ''
      setCursorText('')
    }

    const handleOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const relatedTarget = event.relatedTarget as HTMLElement | null
      
      if (
        target?.closest('[data-cursor="view"]') && 
        relatedTarget?.closest('[data-cursor="view"]') === target.closest('[data-cursor="view"]')
      ) {
        return
      }
      
      textRef.current = ''
      setCursorText('')
    }

    const handleClick = () => {
      setIsPulsing(true)
      setTimeout(() => setIsPulsing(false), 300)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)
    window.addEventListener('click', handleClick)
    
    rafRef.current = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
      window.removeEventListener('click', handleClick)
      window.cancelAnimationFrame(rafRef.current)
    }
  }, [smoothness, trailLength, prefersReducedMotion, frameSize, hoverFrameSize])

  if (!shouldRender) return null

  return (
    <>
      {Array.from({ length: trailLength }).map((_, index) => (
        <div
          key={`trail-${index}`}
          ref={(el) => {
            if (el) trailRefs.current[index] = el
          }}
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${frameSize}px`,
            height: `${frameSize}px`,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            pointerEvents: 'none',
            zIndex: 9997,
            mixBlendMode: 'difference',
            willChange: 'transform, opacity',
            borderRadius: '0%', // strictly NO rounded corners
          }}
        />
      ))}
      
      <motion.div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: '#FFFFFF',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          willChange: 'transform',
          borderRadius: '0%', // strictly NO rounded corners
        }}
        animate={isPulsing ? { scale: [1, 2, 1] } : { scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      
      <div
        ref={frameRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${frameSize}px`,
          height: `${frameSize}px`,
          border: '1px solid rgba(255, 255, 255, 0.4)',
          pointerEvents: 'none',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'difference',
          transition: 'width 0.3s ease, height 0.3s ease',
          willChange: 'transform, width, height',
          borderRadius: '0%', // strictly NO rounded corners
        }}
      >
        {cursorText && (
          <span
            style={{
              fontSize: '10px',
              lineHeight: 1,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              fontWeight: 500,
            }}
          >
            {cursorText}
          </span>
        )}
      </div>
      <style jsx global>{`
        .minimal-concept,
        .minimal-concept a,
        .minimal-concept button,
        .minimal-concept [role='button'] {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}
