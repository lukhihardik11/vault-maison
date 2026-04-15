'use client';

import React from 'react';

interface SparkleGlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function SparkleGlowButton({ children, onClick, href, className }: SparkleGlowButtonProps) {
  const handleClick = () => {
    if (href) {
      window.location.href = href;
    }
    onClick?.();
  };

  return (
    <>
      <button className={`vault-sparkle-btn ${className || ''}`} onClick={handleClick}>
        <span className="vault-sparkle-dots">
          <span className="vault-sparkle-dots-inner" />
        </span>
        <svg className="vault-sparkle-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="vault-sparkle-path" d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        <span className="vault-sparkle-text">{children}</span>
      </button>
      <style>{`
        .vault-sparkle-btn {
          --gold-500: #D4AF37;
          --gold-600: #C4A265;
          --dark-700: #141414;
          --border_radius: 9999px;
          --transition: 0.3s ease-in-out;
          cursor: pointer;
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transform-origin: center;
          padding: 1rem 2rem;
          background-color: transparent;
          border: none;
          border-radius: var(--border_radius);
          transform: scale(calc(1 + (var(--active, 0) * 0.05)));
          transition: transform var(--transition);
        }
        .vault-sparkle-btn::before {
          content: "";
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 100%; height: 100%;
          background-color: var(--dark-700);
          border-radius: var(--border_radius);
          box-shadow: inset 0 0.5px rgba(212,175,55,0.3), inset 0 -1px 2px 0 rgba(0,0,0,0.5),
            0px 4px 10px -4px rgba(0,0,0,calc(1 - var(--active, 0))),
            0 0 0 calc(var(--active, 0) * 0.375rem) rgba(212,175,55,0.4);
          transition: all var(--transition);
          z-index: 0;
        }
        .vault-sparkle-btn::after {
          content: "";
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 100%; height: 100%;
          background-color: rgba(212,175,55,0.5);
          background-image: radial-gradient(at 51% 89%, rgba(212,175,55,0.8) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(196,162,101,0.6) 0px, transparent 50%),
            radial-gradient(at 22% 91%, rgba(196,162,101,0.6) 0px, transparent 50%);
          background-position: top;
          opacity: var(--active, 0);
          border-radius: var(--border_radius);
          transition: opacity var(--transition);
          z-index: 2;
        }
        .vault-sparkle-btn:is(:hover, :focus-visible) { --active: 1; }
        .vault-sparkle-btn:active { transform: scale(0.97); }
        .vault-sparkle-dots {
          overflow: hidden;
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: calc(100% + 2px); height: calc(100% + 2px);
          background-color: transparent;
          border-radius: var(--border_radius);
          z-index: -10;
        }
        .vault-sparkle-dots-inner {
          content: "";
          position: absolute;
          top: 30%; left: 50%;
          transform: translate(-50%, -50%);
          transform-origin: left;
          width: 100%; height: 2rem;
          background-color: #D4AF37;
          mask: linear-gradient(transparent 0%, white 120%);
          animation: vaultSparkleRotate 2s linear infinite;
        }
        @keyframes vaultSparkleRotate { to { transform: rotate(360deg); } }
        .vault-sparkle-icon {
          position: relative; z-index: 10;
          width: 1.5rem; height: 1.5rem;
        }
        .vault-sparkle-path {
          fill: currentColor; stroke: currentColor;
          transform-origin: center;
          color: #D4AF37;
        }
        .vault-sparkle-btn:is(:hover, :focus) .vault-sparkle-path {
          animation: vaultSparklePath 1.5s linear 0.5s infinite;
        }
        @keyframes vaultSparklePath {
          0%, 34%, 71%, 100% { transform: scale(1); }
          17% { transform: scale(1.2); }
          49% { transform: scale(1.2); }
          83% { transform: scale(1.2); }
        }
        .vault-sparkle-text {
          position: relative; z-index: 10;
          background-image: linear-gradient(90deg, #EAEAEA 0%, rgba(234,234,234,var(--active, 0.7)) 120%);
          background-clip: text;
          -webkit-background-clip: text;
          font-size: 0.85rem;
          font-family: Inter, sans-serif;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: transparent;
        }
      `}</style>
    </>
  );
}
