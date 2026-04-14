'use client'

import React, { useState, useEffect, useId } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryLightboxProps {
  images: { src: string; alt: string; caption?: string }[]
  children: (openAt: (index: number) => void) => React.ReactNode
}

export function GalleryLightbox({ images, children }: GalleryLightboxProps) {
  const uid = useId().replace(/:/g, '')
  const [isOpen, setIsOpen] = useState(false)
  const [current, setCurrent] = useState(0)

  const openAt = (index: number) => {
    setCurrent(index)
    setIsOpen(true)
  }

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
      if (e.key === 'ArrowRight') setCurrent((p) => (p + 1) % images.length)
      if (e.key === 'ArrowLeft') setCurrent((p) => (p - 1 + images.length) % images.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, images.length])

  return (
    <>
      <style>{`
        .glb-${uid} {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(12px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .glb-${uid}.open {
          opacity: 1;
          pointer-events: auto;
        }
        .glb-${uid} img {
          max-width: 85vw;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 4px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .glb-${uid} .glb-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: none;
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }
        .glb-${uid} .glb-close:hover {
          border-color: #8B7355;
          color: #8B7355;
        }
        .glb-${uid} .glb-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: 1px solid rgba(255,255,255,0.15);
          color: white;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }
        .glb-${uid} .glb-nav:hover {
          border-color: #8B7355;
          color: #8B7355;
          background: rgba(139,115,85,0.1);
        }
        .glb-${uid} .glb-caption {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          font-family: Inter, sans-serif;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.05em;
          text-align: center;
        }
        .glb-${uid} .glb-counter {
          position: absolute;
          top: 28px;
          left: 50%;
          transform: translateX(-50%);
          font-family: Inter, sans-serif;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.1em;
        }
      `}</style>

      {children(openAt)}

      <div
        className={`glb-${uid} ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <img src={images[current]?.src} alt={images[current]?.alt} />
        </div>
        <button className="glb-close" onClick={() => setIsOpen(false)}>
          <X size={18} />
        </button>
        <button
          className="glb-nav"
          style={{ left: 24 }}
          onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p - 1 + images.length) % images.length) }}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          className="glb-nav"
          style={{ right: 24 }}
          onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p + 1) % images.length) }}
        >
          <ChevronRight size={18} />
        </button>
        <span className="glb-counter">{current + 1} / {images.length}</span>
        {images[current]?.caption && (
          <span className="glb-caption">{images[current].caption}</span>
        )}
      </div>
    </>
  )
}
