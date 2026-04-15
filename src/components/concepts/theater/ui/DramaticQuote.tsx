'use client'
import React from 'react'
import { TH, GoldRule } from '../TheaterLayout'

interface DramaticQuoteProps {
  quote: string; author: string; title?: string
}

export function DramaticQuote({ quote, author, title }: DramaticQuoteProps) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto', padding: '40px 0' }}>
      <GoldRule style={{ marginBottom: 32 }} />
      <blockquote style={{
        fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 400,
        color: TH.text, lineHeight: 1.6, margin: '0 0 24px', fontStyle: 'italic',
      }}>
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: TH.gold, marginBottom: 4 }}>
        {author}
      </div>
      {title && (
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', color: TH.textSecondary }}>
          {title}
        </div>
      )}
      <GoldRule style={{ marginTop: 32 }} />
    </div>
  )
}
