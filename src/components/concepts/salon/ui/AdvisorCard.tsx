'use client'

import React from 'react'
import { S } from '../SalonLayout'

interface AdvisorCardProps {
  name: string
  specialty: string
  experience: string
  avatar: string
  initials: string
  onBook?: () => void
}

export function AdvisorCard({ name, specialty, experience, avatar, initials, onBook }: AdvisorCardProps) {
  return (
    <div
      className="salon-advisor-card"
      style={{
        background: S.surface,
        borderRadius: S.radiusLg,
        padding: '36px 28px',
        textAlign: 'center',
        border: `1px solid ${S.border}`,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
      }}
      onClick={onBook}
    >
      {/* Avatar */}
      {avatar ? (
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          margin: '0 auto 20px',
          overflow: 'hidden',
          border: `3px solid ${S.accent}33`,
          boxShadow: `0 4px 20px rgba(184, 134, 11, 0.2)`,
        }}>
          <img src={avatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ) : (
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: `linear-gradient(135deg, ${S.accent}, ${S.accentHover})`,
          margin: '0 auto 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem', fontFamily: "'Cormorant Garamond', serif",
          color: '#fff', fontWeight: 400,
          boxShadow: `0 4px 20px rgba(184, 134, 11, 0.2)`,
        }}>
          {initials}
        </div>
      )}

      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem',
        fontWeight: 400, color: S.text, margin: '0 0 6px',
      }}>
        {name}
      </h3>
      <p style={{
        fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: S.accent, margin: '0 0 8px', fontWeight: 500,
      }}>
        {specialty}
      </p>
      <p style={{
        fontFamily: "'Lora', serif", fontSize: '0.8rem',
        color: S.textSecondary, margin: '0 0 20px',
      }}>
        {experience}
      </p>

      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
        letterSpacing: '0.08em', textTransform: 'uppercase',
        color: S.accent, fontWeight: 500,
        padding: '10px 20px',
        border: `1.5px solid ${S.accent}`,
        borderRadius: S.radius,
        display: 'inline-block',
        transition: 'all 0.3s',
      }}
        className="salon-advisor-book-btn"
      >
        Book a Private Session
      </div>

      <style>{`
        .salon-advisor-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px ${S.shadow};
          border-color: ${S.accent}30;
        }
        .salon-advisor-card:hover .salon-advisor-book-btn {
          background: ${S.accent};
          color: #fff;
        }
      `}</style>
    </div>
  )
}
