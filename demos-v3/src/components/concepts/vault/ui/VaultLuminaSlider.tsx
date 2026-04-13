'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SlideData {
  title: string
  description: string
  image: string
}

interface VaultLuminaSliderProps {
  slides: SlideData[]
  autoPlaySpeed?: number
  onSlideClick?: (index: number) => void
}

export function VaultLuminaSlider({ slides, autoPlaySpeed = 5000, onSlideClick }: VaultLuminaSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<NodeJS.Timeout | null>(null)

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setProgress(0)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const next = () => goToSlide((currentIndex + 1) % slides.length)
  const prev = () => goToSlide((currentIndex - 1 + slides.length) % slides.length)

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (progressRef.current) clearInterval(progressRef.current)

    const startTime = Date.now()
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      setProgress(Math.min(elapsed / autoPlaySpeed, 1))
    }, 50)

    timerRef.current = setTimeout(() => {
      next()
    }, autoPlaySpeed)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [currentIndex, autoPlaySpeed])

  if (slides.length === 0) return null

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#0A0A0A' }}>
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          onClick={() => onSlideClick?.(idx)}
          style={{
            position: 'absolute', inset: 0,
            opacity: idx === currentIndex ? 1 : 0,
            transform: idx === currentIndex ? 'scale(1)' : 'scale(1.08)',
            transition: 'opacity 0.8s cubic-bezier(0.25,0.8,0.25,1), transform 1.2s cubic-bezier(0.25,0.8,0.25,1)',
            cursor: onSlideClick ? 'pointer' : 'default',
          }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Dark overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.15) 100%)',
          }} />
        </div>
      ))}

      {/* Content overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 clamp(24px, 5vw, 80px) clamp(60px, 10vh, 120px)',
        zIndex: 10,
      }}>
        <div style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
          transition: 'all 0.6s cubic-bezier(0.25,0.8,0.25,1)',
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#D4AF37', marginBottom: 12,
          }}>
            {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </p>
          <h2 style={{
            fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
            fontWeight: 400, color: '#FFFFFF', margin: '0 0 12px',
            letterSpacing: '0.04em', lineHeight: 1.15,
          }}>
            {slides[currentIndex].title}
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
            color: 'rgba(255,255,255,0.6)', maxWidth: 480,
            lineHeight: 1.6, margin: 0,
          }}>
            {slides[currentIndex].description}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              style={{
                flex: 1, height: 2, maxWidth: 80, border: 'none', padding: 0,
                background: 'rgba(255,255,255,0.15)', cursor: 'pointer',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                background: '#D4AF37',
                width: idx === currentIndex ? `${progress * 100}%` : idx < currentIndex ? '100%' : '0%',
                transition: idx === currentIndex ? 'none' : 'width 0.4s',
              }} />
            </button>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <div style={{
        position: 'absolute', right: 'clamp(24px, 5vw, 80px)',
        top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: 12, zIndex: 10,
      }}>
        <button
          onClick={prev}
          style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)',
            color: '#D4AF37', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s', backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.15)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)' }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)',
            color: '#D4AF37', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s', backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.15)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)' }}
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
