'use client'

import React, { useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface MasonryImage {
  src: string
  alt: string
  caption?: string
  ratio?: number // width/height ratio, e.g. 16/9 or 9/16
}

interface GalleryMasonryWallProps {
  images: MasonryImage[]
  columns?: number
}

export function GalleryMasonryWall({ images, columns = 3 }: GalleryMasonryWallProps) {
  // Distribute images across columns
  const cols: MasonryImage[][] = Array.from({ length: columns }, () => [])
  images.forEach((img, idx) => {
    cols[idx % columns].push(img)
  })

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: 20,
      width: '100%',
    }}>
      {cols.map((col, colIdx) => (
        <div key={colIdx} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {col.map((img, imgIdx) => (
            <MasonryItem key={`${colIdx}-${imgIdx}`} image={img} />
          ))}
        </div>
      ))}
    </div>
  )
}

function MasonryItem({ image }: { image: MasonryImage }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isLoaded, setIsLoaded] = useState(false)
  const ratio = image.ratio || (Math.random() > 0.5 ? 3 / 4 : 4 / 3)

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${(1 / ratio) * 100}%`,
        background: '#F0EDE8',
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid #E8E4DE',
      }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: isInView && isLoaded ? 1 : 0,
          transform: isInView && isLoaded ? 'scale(1)' : 'scale(1.05)',
          transition: 'opacity 0.8s ease-in-out, transform 1s ease-out',
        }}
      />
      {image.caption && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '20px 12px 10px',
          background: 'linear-gradient(to top, rgba(255,255,255,0.9) 60%, transparent)',
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.65rem',
            color: '#8B7355',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            {image.caption}
          </p>
        </div>
      )}
    </div>
  )
}
