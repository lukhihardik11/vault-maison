'use client'

import React, { useEffect, useRef, useState, useId } from 'react'

interface GalleryParallaxHeroProps {
  image: string
  title: string
  subtitle?: string
  height?: number
}

export function GalleryParallaxHero({
  image,
  title,
  subtitle,
  height = 500,
}: GalleryParallaxHeroProps) {
  const uid = useId().replace(/:/g, '')
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const viewH = window.innerHeight
      if (rect.bottom > 0 && rect.top < viewH) {
        setOffset((rect.top / viewH) * 80)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        .gph-${uid} {
          position: relative;
          width: 100%;
          height: ${height}px;
          overflow: hidden;
        }
        .gph-${uid} .gph-bg {
          position: absolute;
          inset: -80px 0;
          background-image: url('${image}');
          background-size: cover;
          background-position: center;
          transform: translateY(${offset}px);
          will-change: transform;
        }
        .gph-${uid} .gph-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(253,251,247,0.1), rgba(253,251,247,0.7));
        }
        .gph-${uid} .gph-content {
          position: absolute;
          bottom: 60px;
          left: 60px;
          z-index: 2;
        }
        .gph-${uid} .gph-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #2C2C2C;
          margin: 0 0 8px;
          line-height: 1.2;
        }
        .gph-${uid} .gph-sub {
          font-family: Inter, sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8B7355;
          margin: 0;
        }
        @media (max-width: 768px) {
          .gph-${uid} .gph-content { left: 24px; bottom: 32px; }
          .gph-${uid} .gph-title { font-size: 1.6rem; }
        }
      `}</style>
      <div ref={ref} className={`gph-${uid}`}>
        <div className="gph-bg" />
        <div className="gph-overlay" />
        <div className="gph-content">
          <h2 className="gph-title">{title}</h2>
          {subtitle && <p className="gph-sub">{subtitle}</p>}
        </div>
      </div>
    </>
  )
}
