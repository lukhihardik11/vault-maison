'use client'

import React, { useId } from 'react'

interface SalonPulseIndicatorProps {
  label?: string
  online?: boolean
  size?: 'sm' | 'md'
}

export function SalonPulseIndicator({
  label = 'Online Now',
  online = true,
  size = 'sm',
}: SalonPulseIndicatorProps) {
  const uid = useId().replace(/:/g, '')
  const dotSize = size === 'sm' ? 8 : 10
  const ringSize = size === 'sm' ? 20 : 24

  return (
    <>
      <style>{`
        .spi-${uid} {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .spi-${uid} .spi-dot-wrap {
          position: relative;
          width: ${ringSize}px;
          height: ${ringSize}px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .spi-${uid} .spi-dot {
          width: ${dotSize}px;
          height: ${dotSize}px;
          border-radius: 50%;
          background: ${online ? '#4CAF50' : '#B8B0A4'};
          position: relative;
          z-index: 2;
        }
        .spi-${uid} .spi-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid ${online ? 'rgba(76,175,80,0.4)' : 'transparent'};
          animation: ${online ? `spi-pulse-${uid} 2s ease-in-out infinite` : 'none'};
        }
        @keyframes spi-pulse-${uid} {
          0% { transform: scale(0.8); opacity: 1; }
          70% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
        .spi-${uid} .spi-label {
          font-family: Inter, sans-serif;
          font-size: ${size === 'sm' ? '0.65rem' : '0.72rem'};
          color: ${online ? '#4CAF50' : '#B8B0A4'};
          font-weight: 500;
          letter-spacing: 0.03em;
        }
      `}</style>
      <div className={`spi-${uid}`}>
        <div className="spi-dot-wrap">
          <div className="spi-dot" />
          <div className="spi-ring" />
        </div>
        <span className="spi-label">{label}</span>
      </div>
    </>
  )
}
