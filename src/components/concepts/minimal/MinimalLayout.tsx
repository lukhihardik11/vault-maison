'use client'

import { type ReactNode } from 'react'
import { MinimalNav } from './MinimalNav'
import { MinimalFooter } from './MinimalFooter'
import Toolbar from './ui/Toolbar'
import { AuthModal } from '@/components/shared/auth-modal'
import { ToastNotifications } from '@/components/shared/toast-notifications'
import { getConcept } from '@/data/concepts'

interface MinimalLayoutProps {
  children: ReactNode
  hideNav?: boolean
  hideFooter?: boolean
}

export function MinimalLayout({ children, hideNav = false, hideFooter = false }: MinimalLayoutProps) {
  return (
    <>
      <style>{`
        html, body {
          background: #FFFFFF !important;
          color: #050505 !important;
        }

        /* Brutalist text selection */
        .minimal-concept ::selection,
        ::selection {
          background: #050505;
          color: #FFFFFF;
        }

        /* Custom cursor on product images */
        .product-image { cursor: crosshair; }

        /* Smooth image loading */
        img { transition: opacity 0.5s ease-out; }

        /* Hide scrollbar on filter bar */
        .minimal-filter-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .minimal-filter-scroll::-webkit-scrollbar { display: none; }

        /* Animated underline for links */
        .minimal-link-underline { position: relative; }
        .minimal-link-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 1px;
          background: #050505;
          transition: width 0.3s ease-out;
        }
        .minimal-link-underline:hover::after { width: 100%; }
      `}</style>
      <div
        className="minimal-concept"
        style={{
          backgroundColor: '#FFFFFF',
          color: '#050505',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: 1.6,
          minHeight: '100vh',
        }}
      >
        {!hideNav && <MinimalNav />}
        <main>{children}</main>
        {!hideFooter && <MinimalFooter />}
        {!hideNav && <Toolbar />}
        <AuthModal concept={getConcept('minimal')!} />
        <ToastNotifications concept={getConcept('minimal')!} />
      </div>
    </>
  )
}
