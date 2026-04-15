'use client';

import React from 'react';

interface ElegantDarkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function ElegantDarkButton({ children, onClick, href, className }: ElegantDarkButtonProps) {
  const handleClick = () => {
    if (href) {
      window.location.href = href;
    }
    onClick?.();
  };

  return (
    <>
      <button className={`vault-elegant-btn ${className || ''}`} onClick={handleClick}>
        {children}
      </button>
      <style>{`
        .vault-elegant-btn {
          padding: 14px 32px;
          border: 1px solid #2A2A2A;
          background-color: #141414;
          color: #EAEAEA;
          font-size: 0.8rem;
          font-family: Inter, sans-serif;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 9999px;
          transition: all 0.4s ease;
          outline: none;
          position: relative;
          overflow: hidden;
        }
        .vault-elegant-btn::after {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0) 70%);
          transform: scale(0);
          transition: transform 0.5s ease;
        }
        .vault-elegant-btn:hover::after {
          transform: scale(4);
        }
        .vault-elegant-btn:hover {
          border-color: rgba(212,175,55,0.3);
          background: #1A1A1A;
          color: #D4AF37;
        }
        .vault-elegant-btn:active {
          transform: scale(0.97);
        }
      `}</style>
    </>
  );
}
