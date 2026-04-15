'use client'
import React from 'react'
import Image from 'next/image'
import { MS } from '../MaisonLayout'
import { MaisonButton } from './MaisonButton'

interface HeritageBannerProps {
  image: string; title: string; description: string; ctaText: string; ctaHref: string; reverse?: boolean
}

export function HeritageBanner({ image, title, description, ctaText, ctaHref, reverse }: HeritageBannerProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, background: MS.card, borderRadius: 4, overflow: 'hidden', border: `1px solid ${MS.borderLight}` }}>
      {reverse ? (
        <>
          <div style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 600, color: MS.text, margin: '0 0 12px' }}>{title}</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>{description}</p>
            <MaisonButton href={ctaHref}>{ctaText}</MaisonButton>
          </div>
          <div style={{ position: 'relative', height: 360 }}>
            <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
          </div>
        </>
      ) : (
        <>
          <div style={{ position: 'relative', height: 360 }}>
            <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 600, color: MS.text, margin: '0 0 12px' }}>{title}</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>{description}</p>
            <MaisonButton href={ctaHref}>{ctaText}</MaisonButton>
          </div>
        </>
      )}
    </div>
  )
}
