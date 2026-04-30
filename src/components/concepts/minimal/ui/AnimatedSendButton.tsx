'use client'

import React, { useState } from 'react'
import { minimal } from '../design-system';

const font = "'Inter', 'Helvetica Neue', sans-serif"

interface AnimatedSendButtonProps {
  text?: string
  sentText?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

export const AnimatedSendButton: React.FC<AnimatedSendButtonProps> = ({
  text = 'Subscribe',
  sentText = 'Sent',
  onClick,
  type = 'button',
}) => {
  const [sent, setSent] = useState(false)

  const handleClick = () => {
    setSent(true)
    onClick?.()
    setTimeout(() => setSent(false), 2400)
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`vm-send-btn ${sent ? 'vm-send-sent' : ''}`}
      style={{
        cursor: 'pointer',
        borderRadius: 0,
        border: 'none',
        boxShadow: '0 0.5px 0.5px 1px rgba(255,255,255,0.15), 0 8px 20px rgba(0,0,0,0.12), 0 4px 5px 0px rgba(0,0,0,0.04)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'all 350ms ease',
        minWidth: '180px',
        padding: '16px 28px',
        height: '52px',
        fontFamily: font,
        fontSize: minimal.type.bodySm,
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        background: 'linear-gradient(to bottom, #050505, #050505)',
        color: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      <span className="vm-send-state" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Diamond icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="vm-send-icon">
          {sent ? (
            <polyline points="20 6 9 17 4 12" />
          ) : (
            <>
              <polygon points="12 2 2 10 12 22 22 10" />
              <line x1="12" y1="22" x2="12" y2="10" />
              <line x1="2" y1="10" x2="22" y2="10" />
              <line x1="7" y1="2" x2="12" y2="10" />
              <line x1="17" y1="2" x2="12" y2="10" />
            </>
          )}
        </svg>
        <span className="vm-send-text">
          {(sent ? sentText : text).split('').map((char, i) => (
            <span
              key={`${char}-${i}-${sent}`}
              className="vm-send-letter"
              style={{ '--i': i } as React.CSSProperties}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </span>
      {/* Outline glow on hover */}
      <span className="vm-send-outline" />
      <style>{`
        .vm-send-btn { position: relative; }
        .vm-send-btn:hover { transform: scale(1.02); box-shadow: 0 8px 20px rgba(0,0,0,0.12); }
        .vm-send-btn:active { transform: scale(1); }
        .vm-send-letter {
          display: inline-block;
          animation: vmSendSlideDown 0.6s ease forwards calc(var(--i) * 0.03s);
        }
        .vm-send-btn:hover .vm-send-letter {
          animation: vmSendWave 0.4s ease forwards calc(var(--i) * 0.02s);
        }
        .vm-send-sent .vm-send-letter {
          animation: vmSendSlideDown 0.6s ease forwards calc(var(--i) * 0.06s) !important;
        }
        .vm-send-icon { transition: transform 350ms ease; }
        .vm-send-btn:hover .vm-send-icon { transform: rotate(12deg) scale(1.1); }
        .vm-send-sent .vm-send-icon { animation: vmSendCheck 0.5s ease forwards 0.3s; }
        .vm-send-outline {
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          overflow: hidden;
          opacity: 0;
          transition: opacity 350ms ease;
          z-index: 1;
        }
        .vm-send-outline::before {
          content: '';
          position: absolute;
          inset: -100%;
          background: conic-gradient(from 180deg, transparent 60%, rgba(255,255,255,0.4) 80%, transparent 100%);
          animation: vmSendSpin 2s linear infinite paused;
        }
        .vm-send-btn:hover .vm-send-outline { opacity: 1; }
        .vm-send-btn:hover .vm-send-outline::before { animation-play-state: running; }
        @keyframes vmSendWave {
          30% { transform: translateY(2px); }
          50% { transform: translateY(-2px); color: #fff; }
          100% { transform: translateY(0); }
        }
        @keyframes vmSendSlideDown {
          0% { opacity: 0; transform: translateY(-12px) rotate(-45deg); filter: blur(3px); }
          30% { opacity: 1; transform: translateY(2px); filter: blur(0); }
          50% { transform: translateY(-1px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes vmSendCheck {
          0% { opacity: 0; transform: scale(2) rotate(-20deg); }
          50% { opacity: 1; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes vmSendSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  )
}

export default AnimatedSendButton
