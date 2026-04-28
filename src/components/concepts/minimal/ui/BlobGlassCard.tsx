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
  blobColor = '#050505',
}) => {
  return (
    <div className="vm-blob-card" style={{
      position: 'relative',
      width: '100%',
      height: '240px',
      borderRadius: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
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
        borderRadius: 0,
        overflow: 'hidden',
        outline: '1px solid rgba(255,255,255,0.6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        textAlign: 'center',
      }}>
        {icon && <div style={{ marginBottom: '16px', color: '#050505' }}>{icon}</div>}
        <h3 style={{
          fontFamily: font,
          fontSize: '16px',
          fontWeight: 500,
          color: '#050505',
          marginBottom: '10px',
          letterSpacing: '0.02em',
        }}>{title}</h3>
        <p style={{
          fontFamily: font,
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: 1.7,
          color: '#9B9B9B',
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
        borderRadius: 0,
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
        .vm-blob-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
      `}</style>
    </div>
  )
}

export default BlobGlassCard
