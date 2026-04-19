'use client';

import React, { useState } from 'react';
import { useReducedMotionPreference } from '../animations/useResponsiveMotion';

interface GlitchTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function GlitchText({ text, className = '', style }: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotionPreference();

  if (prefersReduced) {
    return <span className={className} style={style}>{text}</span>;
  }

  return (
    <span
      className={`relative inline-block ${className}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={isHovered ? 'opacity-0' : ''}>{text}</span>
      {isHovered && (
        <>
          <span className="absolute top-0 left-0 -ml-1 text-[#6B6B6B] animate-glitch-1 mix-blend-multiply">{text}</span>
          <span className="absolute top-0 left-0 ml-1 text-[#9B9B9B] animate-glitch-2 mix-blend-multiply">{text}</span>
        </>
      )}
      <style>{`
        @keyframes glitch-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
        }
        @keyframes glitch-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 1px); }
          40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, 2px); }
          80% { clip-path: inset(50% 0 30% 0); transform: translate(1px, -1px); }
          100% { clip-path: inset(5% 0 80% 0); transform: translate(-1px, 1px); }
        }
        .animate-glitch-1 { animation: glitch-1 0.3s infinite linear alternate-reverse; }
        .animate-glitch-2 { animation: glitch-2 0.4s infinite linear alternate-reverse; }
      `}</style>
    </span>
  );
}
