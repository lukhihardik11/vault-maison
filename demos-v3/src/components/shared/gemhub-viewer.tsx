'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RotateCw, Maximize2 } from 'lucide-react'
import { type ConceptConfig } from '@/data/concepts'

type ConceptTheme =
  | 'minimal' | 'vault' | 'gallery' | 'salon'
  | 'atelier' | 'archive' | 'observatory' | 'theater'
  | 'marketplace' | 'maison'

interface GemHubViewerProps {
  productId: string
  productImage: string
  productName: string
  conceptTheme: ConceptTheme
  concept: ConceptConfig
  width?: number
  height?: number
}

const themeStyles: Record<ConceptTheme, { label: string; badgeStyle: string }> = {
  minimal: { label: '360° View', badgeStyle: 'bg-black text-white' },
  vault: { label: '360° Vault View', badgeStyle: 'bg-[#D4AF37] text-black' },
  gallery: { label: '360° Exhibition View', badgeStyle: 'bg-[#2C2C2C] text-white' },
  salon: { label: '360° Private View', badgeStyle: 'bg-[#8B6F47] text-white' },
  atelier: { label: '360° Workbench View', badgeStyle: 'bg-[#7C6B5A] text-white' },
  archive: { label: '360° Catalog View', badgeStyle: 'bg-[#C9A96E] text-black' },
  observatory: { label: '360° Analysis View', badgeStyle: 'bg-[#00E5FF] text-black' },
  theater: { label: '360° Spotlight View', badgeStyle: 'bg-[#DC143C] text-white' },
  marketplace: { label: '360° Live View', badgeStyle: 'bg-[#2E8B57] text-white' },
  maison: { label: '360° Heritage View', badgeStyle: 'bg-[#B8924A] text-white' },
}

export function GemHubViewer({
  productId,
  productImage,
  productName,
  conceptTheme,
  concept,
  width = 400,
  height = 400,
}: GemHubViewerProps) {
  const [isRotating, setIsRotating] = useState(false)
  const theme = themeStyles[conceptTheme]

  return (
    <div
      className="relative group overflow-hidden"
      style={{
        width: '100%',
        maxWidth: width,
        aspectRatio: '1/1',
        backgroundColor: concept.palette.surface,
        border: `1px solid ${concept.palette.muted}`,
      }}
    >
      {/* Product Image */}
      <div className="relative w-full h-full">
        <Image
          src={productImage}
          alt={`${productName} - 360° View`}
          fill
          className={`object-cover transition-transform duration-1000 ${isRotating ? 'animate-spin-slow' : ''}`}
          sizes={`${width}px`}
        />
      </div>

      {/* 360° Badge */}
      <div className={`absolute top-3 left-3 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-medium ${theme.badgeStyle}`}>
        {theme.label}
      </div>

      {/* Controls */}
      <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="w-8 h-8 flex items-center justify-center transition-colors"
          style={{
            backgroundColor: `${concept.palette.bg}cc`,
            color: concept.palette.text,
          }}
          title="Toggle 360° rotation"
        >
          <RotateCw size={14} className={isRotating ? 'animate-spin' : ''} />
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center transition-colors"
          style={{
            backgroundColor: `${concept.palette.bg}cc`,
            color: concept.palette.text,
          }}
          title="Fullscreen view"
        >
          <Maximize2 size={14} />
        </button>
      </div>

      {/* GemHub Attribution */}
      <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-60 transition-opacity">
        <p className="text-[8px] uppercase tracking-[0.15em]" style={{ color: concept.palette.text }}>
          Powered by GemLightBox Hub
        </p>
      </div>

      {/* Placeholder overlay - will be removed when real API is connected */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ backgroundColor: `${concept.palette.bg}40` }}
      >
        <div className="text-center">
          <RotateCw
            size={32}
            strokeWidth={1}
            className="mx-auto mb-2 opacity-60"
            style={{ color: concept.palette.accent }}
          />
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-60" style={{ color: concept.palette.text }}>
            360° Interactive View
          </p>
          <p className="text-[8px] opacity-40 mt-1" style={{ color: concept.palette.text }}>
            GemHub integration coming soon
          </p>
        </div>
      </div>
    </div>
  )
}
