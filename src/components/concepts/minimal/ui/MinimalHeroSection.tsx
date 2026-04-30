'use client'
import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { minimal } from '../design-system';

const font = "'Inter', 'Helvetica Neue', sans-serif"

interface MinimalHeroSectionProps {
  eyebrow?: string
  title: string
  subtitle?: string
  image: string
  ctaText?: string
  ctaHref?: string
  overlay?: 'dark' | 'light' | 'gradient'
}

export default function MinimalHeroSection({
  eyebrow, title, subtitle, image, ctaText = 'Explore', ctaHref = '#', overlay = 'dark'
}: MinimalHeroSectionProps) {
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current) {
        const y = window.scrollY
        imgRef.current.style.transform = `translateY(${y * 0.3}px) scale(1.1)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const overlayStyle = overlay === 'dark'
    ? 'rgba(26,26,26,0.6)'
    : overlay === 'light'
    ? 'rgba(250,250,248,0.4)'
    : 'rgba(5,5,5,0.45)'

  return (
    <section style={{ position: 'relative', height: '70vh', minHeight: '400px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div ref={imgRef} style={{ position: 'absolute', inset: '-10%', transition: 'transform 0.1s linear' }}>
        <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" decoding="async"/>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: overlayStyle }} />
      <div style={{ position: 'relative', zIndex: 1, padding: '0 5vw', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {eyebrow && <p style={{ fontFamily: font, fontSize: minimal.type.caption, fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#050505', marginBottom: '16px' }}>{eyebrow}</p>}
        <h1 style={{ fontFamily: font, fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '16px', maxWidth: '600px' }}>{title}</h1>
        {subtitle && <p style={{ fontFamily: font, fontSize: minimal.type.body, fontWeight: 400, color: 'rgba(255,255,255,0.7)', maxWidth: '400px', marginBottom: '32px', lineHeight: 1.7 }}>{subtitle}</p>}
        <Link href={ctaHref} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: font, fontSize: minimal.type.caption, fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF', backgroundColor: '#050505', padding: '12px 28px', textDecoration: 'none', transition: 'background-color 200ms ease' }}>
          {ctaText}
        </Link>
      </div>
    </section>
  )
}
