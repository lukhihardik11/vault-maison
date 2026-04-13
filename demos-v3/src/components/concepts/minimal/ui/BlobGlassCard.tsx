'use client'

import React from 'react'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

interface BlobGlassCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  blobColor?: string
}

export const BlobGlassCard: React.FC<BlobGlassCardProps> = ({
  title,
  description,
  icon,
  blobColor = '#C4A265',
}) => {
  return (
    <div className="vm-blob-card" style={{
      position: 'relative',
      width: '100%',
      height: '240px',
      borderRadius: '14px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '12px 12px 40px #e0ddd8, -12px -12px 40px #ffffff',
    }}>
      {/* Frosted glass background */}
      <div style={{
        position: 'absolute',
        top: '4px',
        left: '4px',
        right: '4px',
        bottom: '4px',
        zIndex: 2,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '10px',
        overflow: 'hidden',
        outline: '1px solid rgba(255,255,255,0.6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        textAlign: 'center',
      }}>
        {icon && <div style={{ marginBottom: '16px', color: '#C4A265' }}>{icon}</div>}
        <h3 style={{
          fontFamily: font,
          fontSize: '16px',
          fontWeight: 500,
          color: '#1A1A1A',
          marginBottom: '10px',
          letterSpacing: '0.02em',
        }}>{title}</h3>
        <p style={{
          fontFamily: font,
          fontSize: '13px',
          fontWeight: 300,
          lineHeight: 1.7,
          color: '#9B9590',
          maxWidth: '220px',
        }}>{description}</p>
      </div>
      {/* Animated blob */}
      <div className="vm-blob" style={{
        position: 'absolute',
        zIndex: 1,
        top: '50%',
        left: '50%',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        backgroundColor: blobColor,
        opacity: 0.25,
        filter: 'blur(20px)',
      }} />
      <style>{`
        .vm-blob {
          animation: vmBlobBounce 6s infinite ease;
        }
        @keyframes vmBlobBounce {
          0% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
          25% { transform: translate(-100%, -100%) translate3d(100%, 0, 0); }
          50% { transform: translate(-100%, -100%) translate3d(100%, 100%, 0); }
          75% { transform: translate(-100%, -100%) translate3d(0, 100%, 0); }
          100% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
        }
        .vm-blob-card { transition: transform 350ms ease, box-shadow 350ms ease; }
        .vm-blob-card:hover { transform: translateY(-4px); box-shadow: 12px 12px 50px #d8d5d0, -12px -12px 50px #ffffff; }
      `}</style>
    </div>
  )
}

export default BlobGlassCard
