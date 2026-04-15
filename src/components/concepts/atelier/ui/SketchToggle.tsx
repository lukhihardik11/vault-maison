'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { A } from '../AtelierLayout'

interface SketchToggleProps {
  photoSrc?: string
  sketchSrc?: string
  title?: string
  style?: React.CSSProperties
}

export function SketchToggle({ photoSrc, sketchSrc, title, style = {} }: SketchToggleProps) {
  const [showSketch, setShowSketch] = useState(false)

  return (
    <div style={{ position: 'relative', ...style }}>
      {/* Toggle */}
      <div style={{
        position: 'absolute', top: 12, right: 12, zIndex: 2,
        display: 'flex', background: 'rgba(254,252,248,0.9)',
        border: `1px solid ${A.border}`, borderRadius: 2,
        overflow: 'hidden',
      }}>
        <button
          onClick={() => setShowSketch(false)}
          style={{
            padding: '6px 14px', border: 'none', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.05em', textTransform: 'uppercase',
            background: !showSketch ? A.accent : 'transparent',
            color: !showSketch ? '#FFF' : A.textSoft,
            transition: 'all 0.3s',
          }}
        >
          Photo
        </button>
        <button
          onClick={() => setShowSketch(true)}
          style={{
            padding: '6px 14px', border: 'none', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.05em', textTransform: 'uppercase',
            background: showSketch ? A.accent : 'transparent',
            color: showSketch ? '#FFF' : A.textSoft,
            transition: 'all 0.3s',
          }}
        >
          Sketch
        </button>
      </div>

      {/* Image area */}
      <div style={{
        position: 'relative', paddingTop: '100%', overflow: 'hidden',
        background: showSketch ? A.paper : A.workshop,
        borderRadius: 2,
        transition: 'background 0.5s',
      }}>
        <AnimatePresence mode="wait">
          {showSketch ? (
            <motion.div
              key="sketch"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: 12,
              }}
            >
              {sketchSrc ? (
                <img src={sketchSrc} alt={`${title} sketch`} style={{ width: '80%', height: '80%', objectFit: 'contain', filter: 'sepia(0.3) contrast(0.9)' }} />
              ) : (
                <>
                  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke={A.sketch} strokeWidth="0.5">
                    <ellipse cx="50" cy="50" rx="35" ry="25" />
                    <ellipse cx="50" cy="50" rx="28" ry="18" strokeDasharray="4 3" />
                    <path d="M30 35 Q50 15 70 35" />
                    <path d="M35 65 Q50 80 65 65" />
                    <circle cx="50" cy="30" r="6" />
                    <line x1="20" y1="50" x2="80" y2="50" strokeDasharray="2 4" />
                  </svg>
                  <span style={{
                    fontFamily: 'Caveat, cursive', fontSize: 14, color: A.sketch,
                  }}>
                    Design sketch — {title || 'Piece'}
                  </span>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="photo"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {photoSrc ? (
                <img src={photoSrc} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={A.sketch} strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {title && (
        <div style={{
          fontFamily: 'Caveat, cursive', fontSize: 14, color: A.textSoft,
          textAlign: 'center', marginTop: 8,
        }}>
          {showSketch ? 'Original design sketch' : 'Finished piece'}
        </div>
      )}
    </div>
  )
}
