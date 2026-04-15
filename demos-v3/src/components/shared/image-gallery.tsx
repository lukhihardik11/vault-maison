'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { type ConceptConfig } from '@/data/concepts'

interface ImageGalleryProps {
  images: string[]
  alt: string
  concept: ConceptConfig
}

export function ImageGallery({ images, alt, concept }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const mainImageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return
    const rect = mainImageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }, [])

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // Touch swipe support
  const touchStartX = useRef(0)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext()
      else handlePrev()
    }
  }

  return (
    <>
      <div className="space-y-3">
        {/* Main Image with Zoom */}
        <div
          ref={mainImageRef}
          className="relative overflow-hidden cursor-zoom-in group"
          style={{ aspectRatio: '3/4' }}
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setLightboxOpen(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={images[selectedIndex]}
            alt={`${alt} - Image ${selectedIndex + 1}`}
            fill
            className="object-cover transition-transform duration-300"
            style={{
              transform: isZooming ? 'scale(2)' : 'scale(1)',
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />

          {/* Zoom indicator */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-60 transition-opacity">
            <ZoomIn size={20} style={{ color: concept.palette.text }} />
          </div>

          {/* Navigation arrows (mobile) */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev() }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-70 transition-opacity lg:flex hidden"
                style={{ backgroundColor: `${concept.palette.bg}cc`, color: concept.palette.text }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext() }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-70 transition-opacity lg:flex hidden"
                style={{ backgroundColor: `${concept.palette.bg}cc`, color: concept.palette.text }}
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Mobile dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
              {images.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{
                    backgroundColor: i === selectedIndex
                      ? concept.palette.accent
                      : `${concept.palette.text}40`,
                    transform: i === selectedIndex ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="hidden lg:flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className="relative w-16 h-20 overflow-hidden transition-all"
                style={{
                  opacity: selectedIndex === i ? 1 : 0.4,
                  border: selectedIndex === i
                    ? `2px solid ${concept.palette.accent}`
                    : `2px solid transparent`,
                }}
              >
                <Image
                  src={img}
                  alt={`${alt} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: `${concept.palette.bg}f5` }}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 z-10 opacity-60 hover:opacity-100 transition-opacity"
          >
            <X size={24} style={{ color: concept.palette.text }} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                style={{ backgroundColor: concept.palette.surface, color: concept.palette.text }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                style={{ backgroundColor: concept.palette.surface, color: concept.palette.text }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <div className="relative w-full max-w-3xl max-h-[80vh] mx-6" style={{ aspectRatio: '3/4' }}>
            <Image
              src={images[selectedIndex]}
              alt={`${alt} - Full size`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Lightbox thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className="relative w-12 h-12 overflow-hidden transition-all"
                  style={{
                    opacity: selectedIndex === i ? 1 : 0.4,
                    border: selectedIndex === i
                      ? `2px solid ${concept.palette.accent}`
                      : `2px solid transparent`,
                  }}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="48px" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
