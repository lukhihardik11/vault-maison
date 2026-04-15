'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RotateCw, Maximize2, X } from 'lucide-react'
import { type ConceptConfig } from '@/data/concepts'
import { siteConfig } from '@/config/site'

interface GemHubViewerProps {
  /** GemHub share link URL (from product.gemhubUrl) */
  shareUrl?: string
  /** GemHub media ID (from product.gemhubId) */
  gemhubId?: string
  /** Product name for alt text and title */
  productName: string
  /** Fallback product image when GemHub is not configured */
  fallbackImage: string
  /** Concept config for themed styling */
  concept: ConceptConfig
  /** Width in pixels */
  width?: number
  /** Height in pixels */
  height?: number
}

/** Per-concept badge styling */
const themeStyles: Record<string, { label: string; badgeStyle: string }> = {
  vault: { label: '360\u00B0 Vault View', badgeStyle: 'bg-[#D4AF37] text-black' },
  gallery: { label: '360\u00B0 Gallery View', badgeStyle: 'bg-[#E8D5B7] text-black' },
  minimal: { label: '360\u00B0 View', badgeStyle: 'bg-black text-white' },
  salon: { label: '360\u00B0 Salon View', badgeStyle: 'bg-[#D4A574] text-white' },
  atelier: { label: '360\u00B0 Atelier View', badgeStyle: 'bg-[#8B7355] text-white' },
  archive: { label: '360\u00B0 Catalog View', badgeStyle: 'bg-[#C9A96E] text-black' },
  observatory: { label: '360\u00B0 Analysis View', badgeStyle: 'bg-[#00E5FF] text-black' },
  theater: { label: '360\u00B0 Spotlight View', badgeStyle: 'bg-[#DC143C] text-white' },
  marketplace: { label: '360\u00B0 Live View', badgeStyle: 'bg-[#2E8B57] text-white' },
  maison: { label: '360\u00B0 Heritage View', badgeStyle: 'bg-[#B8924A] text-white' },
}

export function GemHubViewer({
  shareUrl,
  gemhubId,
  productName,
  fallbackImage,
  concept,
  width = 600,
  height = 600,
}: GemHubViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isRotating, setIsRotating] = useState(false)

  const theme = themeStyles[concept.id] || themeStyles.minimal

  // Resolve the iframe URL: direct shareUrl > constructed from gemhubId > null
  const resolvedUrl =
    shareUrl ||
    (gemhubId && siteConfig.gemhubCatalogUrl
      ? `${siteConfig.gemhubCatalogUrl}/share/${gemhubId}`
      : null)

  // Show 360 iframe only if GemHub feature is enabled AND we have a URL
  const show360 = siteConfig.features.gemhub360 && resolvedUrl && !hasError

  // ─── Fallback: static product image with "360 coming soon" badge ───
  if (!show360) {
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
        <Image
          src={fallbackImage}
          alt={productName}
          fill
          className={`object-cover transition-transform duration-1000 ${
            isRotating ? 'animate-spin-slow' : ''
          }`}
          sizes={`${width}px`}
        />

        {/* 360 Badge */}
        <div
          className={`absolute top-3 left-3 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-medium ${theme.badgeStyle}`}
        >
          {theme.label}
        </div>

        {/* Hover controls */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="w-8 h-8 flex items-center justify-center transition-colors"
            style={{
              backgroundColor: `${concept.palette.bg}cc`,
              color: concept.palette.text,
            }}
            title="Toggle rotation preview"
          >
            <RotateCw size={14} className={isRotating ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Hover overlay */}
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
            <p
              className="text-[10px] uppercase tracking-[0.2em] opacity-60"
              style={{ color: concept.palette.text }}
            >
              360&deg; Interactive View
            </p>
            <p
              className="text-[8px] opacity-40 mt-1"
              style={{ color: concept.palette.text }}
            >
              Configure GemHub to enable
            </p>
          </div>
        </div>

        {/* GemHub Attribution */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-60 transition-opacity">
          <p
            className="text-[8px] uppercase tracking-[0.15em]"
            style={{ color: concept.palette.text }}
          >
            Powered by GemLightBox Hub
          </p>
        </div>
      </div>
    )
  }

  // ─── Real 360 iframe viewer ───────────────────────────────────
  return (
    <div
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
      style={
        isFullscreen
          ? { backgroundColor: concept.palette.bg }
          : {
              width: '100%',
              maxWidth: width,
              aspectRatio: '1/1',
              backgroundColor: concept.palette.surface,
              border: `1px solid ${concept.palette.muted}`,
            }
      }
    >
      {/* Loading state */}
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ backgroundColor: concept.palette.surface }}
        >
          <div className="text-center">
            <RotateCw
              size={24}
              className="mx-auto mb-2 animate-spin"
              style={{ color: concept.palette.accent }}
            />
            <p
              className="text-xs tracking-wider opacity-60"
              style={{ color: concept.palette.text }}
            >
              Loading 360&deg; view...
            </p>
          </div>
        </div>
      )}

      {/* GemHub iframe */}
      <iframe
        src={resolvedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; fullscreen"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        title={`360 degree view of ${productName}`}
        className="w-full h-full"
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
      />

      {/* 360 Interactive badge */}
      <div
        className={`absolute top-3 left-3 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-medium flex items-center gap-1.5 ${theme.badgeStyle}`}
      >
        <RotateCw size={10} className="animate-spin" style={{ animationDuration: '3s' }} />
        {theme.label}
      </div>

      {/* Controls */}
      <div className="absolute bottom-3 right-3 flex gap-2">
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="w-8 h-8 flex items-center justify-center transition-colors"
          style={{
            backgroundColor: `${concept.palette.bg}cc`,
            color: concept.palette.text,
          }}
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen view'}
        >
          {isFullscreen ? <X size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      {/* GemHub Attribution */}
      <div className="absolute bottom-3 left-3 opacity-60">
        <p
          className="text-[8px] uppercase tracking-[0.15em]"
          style={{ color: concept.palette.text }}
        >
          Powered by GemLightBox Hub
        </p>
      </div>
    </div>
  )
}
