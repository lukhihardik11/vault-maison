'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { S } from '../SalonLayout'

interface SalonGlowSearchProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  placeholder?: string
  showFilterButton?: boolean
  onFilterClick?: () => void
}

export function SalonGlowSearch({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search our collection...',
  showFilterButton = false,
  onFilterClick,
}: SalonGlowSearchProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const styleId = useRef(`salon-glow-${Math.random().toString(36).slice(2, 8)}`)

  useEffect(() => {
    const id = styleId.current
    if (typeof document !== 'undefined' && !document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = `
        @keyframes salonGlowRotate {
          100% { transform: translate(-50%, -50%) rotate(450deg); }
        }
        .salon-glow-white::before,
        .salon-glow-border::before,
        .salon-glow-dark::before,
        .salon-glow-outer::before {
          content: "";
          position: absolute;
          z-index: -2;
          text-align: center;
          top: 50%;
          left: 50%;
          width: 600px;
          height: 600px;
          background-repeat: no-repeat;
          background-position: 0 0;
          transition: all 2s;
        }
        .salon-glow-container:hover .salon-glow-white::before,
        .salon-glow-container:focus-within .salon-glow-white::before {
          transform: translate(-50%, -50%) rotate(263deg) !important;
          transition: all 4s !important;
        }
        .salon-glow-container:hover .salon-glow-border::before,
        .salon-glow-container:focus-within .salon-glow-border::before {
          transform: translate(-50%, -50%) rotate(250deg) !important;
          transition: all 4s !important;
        }
        .salon-glow-container:hover .salon-glow-dark::before,
        .salon-glow-container:focus-within .salon-glow-dark::before {
          transform: translate(-50%, -50%) rotate(262deg) !important;
          transition: all 4s !important;
        }
        .salon-glow-container:hover .salon-glow-outer::before,
        .salon-glow-container:focus-within .salon-glow-outer::before {
          transform: translate(-50%, -50%) rotate(240deg) !important;
          transition: all 4s !important;
        }
      `
      document.head.appendChild(style)
    }
    return () => {
      const el = document.getElementById(id)
      if (el) el.remove()
    }
  }, [])

  const active = isFocused || isHovered

  return (
    <div
      className="salon-glow-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: 520,
        margin: '0 auto',
      }}
    >
      {/* Glow layer (blurred outer glow) */}
      <div
        className="salon-glow-outer"
        style={{
          maxHeight: 130,
          maxWidth: '110%',
          height: '100%',
          width: '100%',
          position: 'absolute',
          overflow: 'hidden',
          zIndex: -1,
          borderRadius: 14,
          filter: 'blur(30px)',
          opacity: active ? 0.5 : 0.25,
          transition: 'opacity 0.3s',
        }}
      >
        <div
          style={{
            content: '""',
            position: 'absolute',
            zIndex: -2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(60deg)',
            width: 999,
            height: 999,
            backgroundImage: `conic-gradient(transparent, ${S.accent} 5%, transparent 38%, transparent 50%, #D4A017 60%, transparent 87%)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 0',
            transition: 'all 2s',
          }}
        />
      </div>

      {/* Dark border background */}
      <div
        className="salon-glow-dark"
        style={{
          maxHeight: 65,
          maxWidth: '102%',
          height: '100%',
          width: '100%',
          position: 'absolute',
          overflow: 'hidden',
          zIndex: -1,
          borderRadius: 12,
          filter: 'blur(3px)',
        }}
      >
        <div
          style={{
            content: '""',
            position: 'absolute',
            zIndex: -2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(82deg)',
            width: 600,
            height: 600,
            backgroundImage: `conic-gradient(transparent, #8B6914, transparent 10%, transparent 50%, #D4A017, transparent 60%)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 0',
            transition: 'all 2s',
          }}
        />
      </div>

      {/* Border layer */}
      <div
        className="salon-glow-border"
        style={{
          maxHeight: 59,
          maxWidth: '100.5%',
          height: '100%',
          width: '100%',
          position: 'absolute',
          overflow: 'hidden',
          zIndex: -1,
          borderRadius: 11,
          filter: 'blur(0.5px)',
        }}
      >
        <div
          style={{
            content: '""',
            position: 'absolute',
            zIndex: -2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(70deg)',
            width: 600,
            height: 600,
            filter: 'brightness(1.3)',
            backgroundImage: `conic-gradient(${S.text}, ${S.accent} 5%, ${S.text} 14%, ${S.text} 50%, #D4A017 60%, ${S.text} 64%)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 0',
            transition: 'all 2s',
          }}
        />
      </div>

      {/* White inner layer */}
      <div
        className="salon-glow-white"
        style={{
          maxHeight: 63,
          maxWidth: '101%',
          height: '100%',
          width: '100%',
          position: 'absolute',
          overflow: 'hidden',
          zIndex: -1,
          borderRadius: 10,
          filter: 'blur(2px)',
        }}
      >
        <div
          style={{
            content: '""',
            position: 'absolute',
            zIndex: -2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(83deg)',
            width: 600,
            height: 600,
            filter: 'brightness(1.4)',
            backgroundImage: `conic-gradient(transparent 0%, ${S.accent}, transparent 8%, transparent 50%, #D4A017, transparent 58%)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 0',
            transition: 'all 2s',
          }}
        />
      </div>

      {/* Main input container */}
      <div style={{ position: 'relative', width: '100%' }}>
        <Search
          size={18}
          style={{
            position: 'absolute',
            left: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            color: active ? S.accent : S.textSecondary,
            transition: 'color 0.3s',
            zIndex: 2,
          }}
        />

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit?.()}
          placeholder={placeholder}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 10,
            border: 'none',
            background: S.warmPanel,
            color: S.text,
            fontFamily: "'Lora', serif",
            fontSize: '0.95rem',
            paddingLeft: 52,
            paddingRight: showFilterButton ? 56 : 20,
            outline: 'none',
            position: 'relative',
            zIndex: 1,
          }}
        />

        {/* Input mask gradient */}
        {!isFocused && !value && (
          <div
            style={{
              pointerEvents: 'none',
              width: 80,
              height: 20,
              position: 'absolute',
              background: `linear-gradient(90deg, transparent, ${S.warmPanel})`,
              top: 18,
              right: showFilterButton ? 56 : 20,
              zIndex: 2,
            }}
          />
        )}

        {/* Filter button */}
        {showFilterButton && (
          <button
            onClick={onFilterClick}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              height: 40,
              width: 38,
              overflow: 'hidden',
              borderRadius: 10,
              background: `linear-gradient(180deg, ${S.accent}, #9A7209, #7A5A07)`,
              border: '1px solid transparent',
              color: '#fff',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
          >
            <SlidersHorizontal size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
