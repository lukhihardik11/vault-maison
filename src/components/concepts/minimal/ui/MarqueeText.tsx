'use client';

import React from 'react';
import { useReducedMotionPreference } from '../animations/useResponsiveMotion';

interface MarqueeTextProps {
  text: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function MarqueeText({ text, speed = 50, className = '', style }: MarqueeTextProps) {
  const prefersReduced = useReducedMotionPreference();

  if (prefersReduced) {
    return (
      <div className={`overflow-hidden whitespace-nowrap ${className}`} style={style}>
        <div className="px-4 py-2 inline-block">
          {text}
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden whitespace-nowrap flex ${className}`} style={{ ...style, backgroundColor: '#050505', color: '#FFFFFF' }}>
      <div
        className="flex animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="px-4 py-2 inline-block text-sm tracking-[0.2em] uppercase font-mono text-[#E5E5E5]">
            {text} •&nbsp;
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
