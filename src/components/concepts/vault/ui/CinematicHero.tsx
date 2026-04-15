'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CinematicHeroProps {
  heroImage?: string;
  brandName?: string;
  tagline?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function CinematicHero({
  heroImage = '/images/vault/jewelry-dark-collection.jpg',
  brandName = 'VAULT MAISON',
  tagline = 'Precision meets desire',
  ctaText = 'Explore Collection',
  onCtaClick,
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        overlayRef.current,
        { opacity: 1 },
        { opacity: 0.6, duration: 1.5 }
      )
        .fromTo(
          headingRef.current,
          { y: 80, opacity: 0, letterSpacing: '0.5em' },
          { y: 0, opacity: 1, letterSpacing: '0.2em', duration: 1.2 },
          '-=0.8'
        )
        .fromTo(
          taglineRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6 },
          '-=0.3'
        );

      // Scroll parallax
      gsap.to(imageRef.current, {
        y: -80,
        scale: 1.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Heading scroll fade
      gsap.to(headingRef.current, {
        y: -60,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: '30% top',
          end: '60% top',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#0A0A0A',
      }}
    >
      {/* Background image with parallax */}
      <div
        ref={imageRef}
        style={{
          position: 'absolute',
          inset: '-40px',
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <img
          src={heroImage}
          alt="Vault Maison Collection"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.35) contrast(1.1)',
          }}
        />
      </div>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.8) 70%)',
        }}
      />

      {/* Gold vignette edges */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(212,175,55,0.03) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        {/* Decorative line above */}
        <div
          style={{
            width: 60,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            marginBottom: 32,
          }}
        />

        <h1
          ref={headingRef}
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 400,
            color: '#EAEAEA',
            letterSpacing: '0.2em',
            lineHeight: 1.1,
            margin: 0,
            textShadow: '0 0 80px rgba(212,175,55,0.15)',
          }}
        >
          {brandName}
        </h1>

        <p
          ref={taglineRef}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
            color: '#8A8A8A',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop: 20,
            marginBottom: 48,
          }}
        >
          {tagline}
        </p>

        <button
          ref={ctaRef}
          onClick={onCtaClick}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#0A0A0A',
            background: 'linear-gradient(135deg, #D4AF37, #C4A265)',
            border: 'none',
            borderRadius: 0,
            padding: '16px 48px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.4s ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.background = 'linear-gradient(135deg, #E5C04B, #D4AF37)';
            (e.target as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(212,175,55,0.3)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.background = 'linear-gradient(135deg, #D4AF37, #C4A265)';
            (e.target as HTMLButtonElement).style.boxShadow = 'none';
          }}
        >
          {ctaText}
        </button>

        {/* Decorative line below */}
        <div
          style={{
            width: 60,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            marginTop: 48,
          }}
        />

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8A8A8A',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, #D4AF37, transparent)',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
}
