'use client'

import React, { useState, useEffect, useRef } from 'react'

export interface ShowcaseItem {
  title: string
  subtitle: string
  image: string
  credit?: string
}

interface GalleryCircularShowcaseProps {
  items: ShowcaseItem[]
  radius?: number
  autoRotateSpeed?: number
}

export function GalleryCircularShowcase({
  items,
  radius = 550,
  autoRotateSpeed = 0.015,
}: GalleryCircularShowcaseProps) {
  const [rotation, setRotation] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
      setRotation(scrollProgress * 360)
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const autoRotate = () => {
      if (!isScrolling) setRotation(prev => prev + autoRotateSpeed)
      animationFrameRef.current = requestAnimationFrame(autoRotate)
    }
    animationFrameRef.current = requestAnimationFrame(autoRotate)
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current) }
  }, [isScrolling, autoRotateSpeed])

  const anglePerItem = 360 / items.length

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative', width: '100%', height: 520,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        perspective: 2000, overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transform: `rotateY(${rotation}deg)`,
        transformStyle: 'preserve-3d',
      }}>
        {items.map((item, i) => {
          const itemAngle = i * anglePerItem
          const totalRotation = rotation % 360
          const relativeAngle = (itemAngle + totalRotation + 360) % 360
          const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle)
          const opacity = Math.max(0.25, 1 - (normalizedAngle / 180))

          return (
            <div
              key={i}
              style={{
                position: 'absolute', width: 280, height: 380,
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                left: '50%', top: '50%',
                marginLeft: -140, marginTop: -190,
                opacity, transition: 'opacity 0.3s linear',
              }}
            >
              <div style={{
                position: 'relative', width: '100%', height: '100%',
                borderRadius: 4, overflow: 'hidden',
                background: '#FFFFFF',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
                border: '1px solid #E8E4DE',
              }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Museum label at bottom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '24px 16px 16px',
                  background: 'linear-gradient(to top, rgba(255,255,255,0.95) 60%, transparent)',
                }}>
                  <h3 style={{
                    fontFamily: '"Libre Baskerville", serif',
                    fontSize: '0.85rem', fontWeight: 400,
                    color: '#2C2C2C', margin: 0,
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.65rem', fontStyle: 'italic',
                    color: '#8B7355', margin: '4px 0 0',
                  }}>
                    {item.subtitle}
                  </p>
                  {item.credit && (
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.55rem', color: '#999',
                      margin: '6px 0 0',
                    }}>
                      {item.credit}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
