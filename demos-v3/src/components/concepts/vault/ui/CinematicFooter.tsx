'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
}

function MagneticButton({ children, href, variant = 'primary' }: MagneticButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btnRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  };

  const isPrimary = variant === 'primary';

  const content = (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 40px',
        borderRadius: 999,
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.8rem',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        cursor: 'pointer',
        transition: 'background 0.3s, box-shadow 0.3s',
        background: isPrimary
          ? 'linear-gradient(135deg, #D4AF37, #C4A265)'
          : 'rgba(255,255,255,0.05)',
        color: isPrimary ? '#0A0A0A' : '#EAEAEA',
        border: isPrimary ? 'none' : '1px solid rgba(212,175,55,0.2)',
        backdropFilter: isPrimary ? 'none' : 'blur(10px)',
      }}
    >
      {children}
    </div>
  );

  return href ? (
    <Link href={href} style={{ textDecoration: 'none' }}>
      {content}
    </Link>
  ) : (
    content
  );
}

export function CinematicFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Giant background text reveal
      gsap.fromTo(
        bgTextRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 0.03,
          y: 0,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Content fade up
      if (contentRef.current) {
        const children = contentRef.current.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 70%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const marqueeText = 'Precision Crafted ◆ GIA Certified ◆ Ethically Sourced ◆ Lifetime Guarantee ◆ Private Collection ◆ ';

  const footerLinks = [
    { label: 'Privacy', href: '/vault/privacy' },
    { label: 'Shipping', href: '/vault/shipping' },
    { label: 'FAQ', href: '/vault/faq' },
    { label: 'Contact', href: '/vault/contact' },
  ];

  return (
    <footer
      ref={footerRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#050505',
        borderTop: '1px solid rgba(212,175,55,0.08)',
      }}
    >
      {/* Aurora glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: 300,
          background: 'radial-gradient(ellipse at center top, rgba(212,175,55,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(212,175,55,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.02) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Giant background text */}
      <div
        ref={bgTextRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(4rem, 15vw, 12rem)',
          fontWeight: 400,
          letterSpacing: '0.2em',
          color: '#EAEAEA',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: 0.03,
        }}
      >
        VAULT MAISON
      </div>

      {/* Marquee */}
      <div
        style={{
          borderBottom: '1px solid rgba(212,175,55,0.08)',
          overflow: 'hidden',
          padding: '16px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            animation: 'marqueeScroll 30s linear infinite',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                opacity: 0.5,
                paddingRight: 40,
              }}
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          maxWidth: 1280,
          margin: '0 auto',
          padding: '80px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 48,
        }}
      >
        {/* CTA section */}
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <h3
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: '#EAEAEA',
              margin: 0,
            }}
          >
            Begin Your Journey
          </h3>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              color: '#8A8A8A',
              maxWidth: 400,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Discover pieces crafted for those who appreciate the extraordinary.
          </p>
        </div>

        {/* Magnetic CTA buttons */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          <MagneticButton href="/vault/collections" variant="primary">
            Explore Collection
          </MagneticButton>
          <MagneticButton href="/vault/bespoke" variant="secondary">
            Book Appointment
          </MagneticButton>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 60,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
          }}
        />

        {/* Footer links */}
        <nav style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="vault-nav-link"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#8A8A8A',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#D4AF37'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#8A8A8A'; }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            color: '#555',
          }}
        >
          <span>&copy; {new Date().getFullYear()} Vault Maison</span>
          <span style={{ color: '#D4AF37', fontSize: '0.5rem' }}>◆</span>
          <span>All Rights Reserved</span>
        </div>
      </div>

      {/* Heartbeat line */}
      <div
        style={{
          height: 2,
          background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
          opacity: 0.15,
          animation: 'heartbeat 3s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes heartbeat {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </footer>
  );
}
