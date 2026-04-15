'use client';

import type { ReactNode } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export interface SpotlightCardProps {
  title?: string;
  body?: string;
  cardWidth?: number;
  cardHeight?: number;
  glowSize?: number;
  glowOpacity?: number;
  background?: string;
  cardColor?: string;
  textColor?: string;
  mutedColor?: string;
  speed?: number;
  className?: string;
  children?: ReactNode;
  image?: string;
  href?: string;
}

function cursorAt(
  frame: number,
  cardWidth: number,
  cardHeight: number,
  durationInFrames: number,
) {
  const t = (frame / durationInFrames) * Math.PI * 2;
  const x = cardWidth / 2 + Math.sin(t) * (cardWidth * 0.42);
  const y = cardHeight / 2 + Math.sin(t * 2) * (cardHeight * 0.32);
  return { x, y };
}

export function SpotlightCard({
  title = 'Spotlight Card',
  body = 'A moving spotlight sweeps across the card and illuminates the rim.',
  cardWidth = 520,
  cardHeight = 320,
  glowSize = 600,
  glowOpacity = 0.08,
  background = 'transparent',
  cardColor = '#0A0A0A',
  textColor = '#EAEAEA',
  mutedColor = '#8A8A8A',
  speed = 1,
  className,
  children,
  image,
  href,
}: SpotlightCardProps) {
  const frame = useCurrentFrame() * speed;
  const { durationInFrames } = useVideoConfig();

  const cursor = cursorAt(
    Math.max(0, frame - 1),
    cardWidth,
    cardHeight,
    durationInFrames,
  );

  const cardOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Gold-tinted glow instead of white
  const surfaceGlow = `radial-gradient(${glowSize}px circle at ${cursor.x}px ${cursor.y}px, rgba(212,175,55,${glowOpacity}), transparent 40%)`;
  const borderGlow = `radial-gradient(${glowSize * 0.6}px circle at ${cursor.x}px ${cursor.y}px, rgba(212,175,55,0.35), transparent 40%)`;

  const content = (
    <div
      className={className}
      style={{
        position: 'relative',
        background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-cinzel, Cinzel, serif)',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: cardWidth,
          height: cardHeight,
          borderRadius: 16,
          padding: 1,
          background: borderGlow,
          opacity: cardOpacity,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 15,
            background: cardColor,
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          }}
        >
          {image && (
            <img
              src={image}
              alt={title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.4,
              }}
            />
          )}

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: surfaceGlow,
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              padding: 36,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              height: '100%',
              justifyContent: 'flex-end',
            }}
          >
            {children ?? (
              <>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: textColor,
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: mutedColor,
                    maxWidth: 360,
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  }}
                >
                  {body}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return content;
}
