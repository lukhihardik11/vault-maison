'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="group relative inline-block overflow-hidden h-5 flex items-center text-sm"
    style={{ textDecoration: 'none' }}
  >
    <div className="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-1/2">
      <span style={{ color: '#8A8A8A' }}>{children}</span>
      <span style={{ color: '#D4AF37' }}>{children}</span>
    </div>
  </Link>
);

export function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    if (isOpen) {
      setHeaderShapeClass('rounded-xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => setHeaderShapeClass('rounded-full'), 300);
    }
    return () => { if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current); };
  }, [isOpen]);

  const navLinks = [
    { label: 'Heritage', href: '/vault/about' },
    { label: 'Bespoke', href: '/vault/bespoke' },
    { label: 'Collections', href: '/vault/collections' },
  ];

  return (
    <div
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50
        flex flex-col items-center
        pl-6 pr-6 py-3 backdrop-blur-md
        ${headerShapeClass}
        w-[calc(100%-2rem)] sm:w-auto
        transition-[border-radius] duration-0 ease-in-out md:hidden`}
      style={{
        border: '1px solid rgba(212,175,55,0.15)',
        background: 'rgba(20,20,20,0.85)',
      }}
    >
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        {/* Logo diamond */}
        <div className="relative w-5 h-5 flex items-center justify-center">
          <span className="absolute w-1.5 h-1.5 rounded-full top-0 left-1/2 transform -translate-x-1/2 opacity-80" style={{ background: '#D4AF37' }} />
          <span className="absolute w-1.5 h-1.5 rounded-full left-0 top-1/2 transform -translate-y-1/2 opacity-80" style={{ background: '#D4AF37' }} />
          <span className="absolute w-1.5 h-1.5 rounded-full right-0 top-1/2 transform -translate-y-1/2 opacity-80" style={{ background: '#D4AF37' }} />
          <span className="absolute w-1.5 h-1.5 rounded-full bottom-0 left-1/2 transform -translate-x-1/2 opacity-80" style={{ background: '#D4AF37' }} />
        </div>

        <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
          {navLinks.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          <Link
            href="/vault/account"
            className="px-4 py-2 text-xs border rounded-full transition-colors duration-200"
            style={{
              borderColor: 'rgba(212,175,55,0.2)',
              background: 'rgba(20,20,20,0.6)',
              color: '#8A8A8A',
              textDecoration: 'none',
            }}
          >
            Account
          </Link>
          <Link
            href="/vault/collections"
            className="relative group"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="hidden sm:block absolute inset-0 -m-2 rounded-full opacity-40 filter blur-lg pointer-events-none transition-all duration-300 ease-out group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"
              style={{ background: '#D4AF37' }}
            />
            <span
              className="relative z-10 px-4 py-2 text-xs font-semibold rounded-full inline-block"
              style={{
                color: '#0A0A0A',
                background: 'linear-gradient(135deg, #D4AF37, #C4A265)',
              }}
            >
              Request Access
            </span>
          </Link>
        </div>

        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          style={{ color: '#EAEAEA' }}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      <div
        className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
          ${isOpen ? 'max-h-[1000px] opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}
      >
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors w-full text-center"
              style={{ color: '#8A8A8A', textDecoration: 'none' }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
