'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useId } from 'react';
import { useReducedMotionPreference } from '../animations/useResponsiveMotion';

export interface GlitchTextProps {
  children: ReactNode;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'p';
  offset?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  always?: boolean;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export function GlitchText({
  children,
  as: Tag = 'span',
  offset = 2,
  color,
  className = '',
  style,
  always = false,
}: GlitchTextProps) {
  const id = useId().replace(/:/g, '');
  const prefersReducedMotion = useReducedMotionPreference();
  const text = typeof children === 'string' ? children : '';
  
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(always);
  const animationRef = useRef<number | null>(null);
  const scrambleCountRef = useRef(0);
  const currentIndexRef = useRef(0);
  
  const speed = 30;
  const scrambleSpeed = 10;

  const getRandomChar = () => characters[Math.floor(Math.random() * characters.length)];

  useEffect(() => {
    if (prefersReducedMotion || !text || (!isHovered && !always)) {
      setDisplayText(text);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    currentIndexRef.current = 0;
    scrambleCountRef.current = 0;

    const animate = () => {
      if (currentIndexRef.current >= text.length) {
        setDisplayText(text);
        return;
      }

      if (scrambleCountRef.current < scrambleSpeed) {
        const scrambled = text
          .split("")
          .map((char, index) => {
            if (index < currentIndexRef.current) return char;
            if (char === " ") return " ";
            return getRandomChar();
          })
          .join("");

        setDisplayText(scrambled);
        scrambleCountRef.current++;
      } else {
        currentIndexRef.current++;
        scrambleCountRef.current = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [text, isHovered, always, prefersReducedMotion]);

  return (
    <Tag
      className={`vm-glitch-${id} ${className}`}
      onMouseEnter={() => !always && setIsHovered(true)}
      onMouseLeave={() => !always && setIsHovered(false)}
      style={{
        color,
        display: 'inline-block',
        position: 'relative',
        ...style,
      }}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" style={{ minWidth: text ? `${text.length}ch` : 'auto' }}>
        {text ? displayText : children}
      </span>
    </Tag>
  );
}

export default GlitchText;
