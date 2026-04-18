'use client'

import React from 'react'
import Link from 'next/link'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

interface ExploreButtonProps {
  text?: string
  href: string
}

export const ExploreButton: React.FC<ExploreButtonProps> = ({
  text = 'Explore',
  href,
}) => {
  return (
    <Link href={href} className="vm-explore-btn" style={{
      display: 'inline-flex',
      gap: '10px',
      alignItems: 'center',
      padding: '12px 24px',
      fontFamily: font,
      fontSize: '12px',
      fontWeight: 500,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#050505',
      textDecoration: 'none',
      border: '1.5px solid #E5E5E5',
      borderRadius: 0,
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
      transition: 'color 350ms ease, border-color 350ms ease',
      background: 'transparent',
    }}>
      <span style={{ position: 'relative', zIndex: 2 }}>{text}</span>
      <svg
        className="vm-explore-arrow"
        width="20"
        height="20"
        viewBox="0 0 16 19"
        fill="none"
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '3px',
          border: '1px solid #E5E5E5',
          borderRadius: 0,
          transform: 'rotate(45deg)',
          transition: 'all 350ms ease',
        }}
      >
        <path
          d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
          fill="currentColor"
        />
      </svg>
      <style>{`
        .vm-explore-btn::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          left: -100%;
          top: 0;
          background: #050505;
          border-radius: 999px;
          transition: all 500ms ease;
          z-index: 0;
          aspect-ratio: 1;
        }
        .vm-explore-btn:hover::before {
          left: 0;
          transform: scale(1.5);
        }
        .vm-explore-btn:hover {
          color: #FFFFFF !important;
          border-color: #050505 !important;
        }
        .vm-explore-btn:hover .vm-explore-arrow {
          transform: rotate(90deg);
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.3) !important;
          color: #FFFFFF;
        }
      `}</style>
    </Link>
  )
}

export default ExploreButton
