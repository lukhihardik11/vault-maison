'use client'

import React, { useRef, useState, useCallback, useId } from 'react'

interface GalleryImageCompareProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  height?: number
}

export function GalleryImageCompare({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  height = 400,
}: GalleryImageCompareProps) {
  const uid = useId().replace(/:/g, '')
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, x)))
  }, [])

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: React.MouseEvent) => { if (isDragging) handleMove(e.clientX) }
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX)

  return (
    <>
      <style>{`
        .gic-${uid} {
          position: relative;
          width: 100%;
          height: ${height}px;
          overflow: hidden;
          border-radius: 8px;
          cursor: col-resize;
          user-select: none;
          border: 1px solid #E8E4DE;
        }
        .gic-${uid} .gic-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .gic-${uid} .gic-before {
          clip-path: polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%);
        }
        .gic-${uid} .gic-slider {
          position: absolute;
          top: 0;
          left: ${position}%;
          width: 3px;
          height: 100%;
          background: #8B7355;
          transform: translateX(-50%);
          z-index: 2;
        }
        .gic-${uid} .gic-handle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FDFBF7;
          border: 2px solid #8B7355;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .gic-${uid} .gic-handle svg {
          color: #8B7355;
        }
        .gic-${uid} .gic-label {
          position: absolute;
          bottom: 16px;
          font-family: Inter, sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #FDFBF7;
          background: rgba(44,44,44,0.7);
          padding: 4px 12px;
          border-radius: 4px;
          backdrop-filter: blur(4px);
          z-index: 3;
        }
      `}</style>
      <div
        ref={containerRef}
        className={`gic-${uid}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* After image (full) */}
        <img className="gic-img" src={afterImage} alt={afterLabel} />
        {/* Before image (clipped) */}
        <img className="gic-img gic-before" src={beforeImage} alt={beforeLabel} />
        {/* Slider line + handle */}
        <div className="gic-slider">
          <div className="gic-handle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 5l-5 7 5 7" /><path d="M16 5l5 7-5 7" />
            </svg>
          </div>
        </div>
        {/* Labels */}
        <span className="gic-label" style={{ left: 16 }}>{beforeLabel}</span>
        <span className="gic-label" style={{ right: 16 }}>{afterLabel}</span>
      </div>
    </>
  )
}
