'use client'

import { type ReactNode, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { MinimalNav } from './MinimalNav'
import { MinimalFooter } from './MinimalFooter'
import Toolbar from './ui/Toolbar'
import { ScrollProgress } from './animations/ScrollProgress'
import { PageTransition } from './ui/PageTransition'
import { BackToTop } from './ui/BackToTop'
import { Breadcrumb } from './ui/Breadcrumb'

const MinimalCursor = dynamic(
  () => import('./cursor/MinimalCursor').then((mod) => mod.MinimalCursor),
  { ssr: false }
)

interface MinimalLayoutProps {
  children: ReactNode
  hideNav?: boolean
  hideFooter?: boolean
}

export function MinimalLayout({ children, hideNav = false, hideFooter = false }: MinimalLayoutProps) {
  const pathname = usePathname()
  const isInnerPage = pathname && pathname !== '/minimal'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&display=swap');

        html, body {
          background: #FFFFFF !important;
          color: #050505 !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Brutalist text selection */
        .minimal-concept ::selection,
        ::selection {
          background: #050505;
          color: #FFFFFF;
        }

        /* Smooth image loading */
        .minimal-concept img {
          transition: opacity 0.5s ease-out;
        }

        /* Hide scrollbar on filter bar */
        .minimal-filter-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .minimal-filter-scroll::-webkit-scrollbar { display: none; }

        /* Animated underline for links */
        .minimal-link-underline { position: relative; display: inline-block; }
        .minimal-link-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 1px;
          background: #050505;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .minimal-link-underline:hover::after { width: 100%; }

        /* Button hover inversion */
        .vm-btn-primary {
          transition: background-color 0.25s ease, color 0.25s ease !important;
        }
        .vm-btn-primary:hover {
          background-color: #FFFFFF !important;
          color: #050505 !important;
        }
        .vm-btn-ghost {
          transition: background-color 0.25s ease, color 0.25s ease !important;
        }
        .vm-btn-ghost:hover {
          background-color: #050505 !important;
          color: #FFFFFF !important;
        }
        
        /* Subtle page-load animation */
        .page-load-fade {
          opacity: 0;
          animation: pageLoadFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes pageLoadFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        className={`minimal-concept ${mounted ? 'page-load-fade' : ''}`}
        data-concept="minimal"
        style={{
          backgroundColor: '#FFFFFF',
          color: '#050505',
          fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: '14px',
          fontWeight: 300,
          lineHeight: 1.6,
          minHeight: '100vh',
          letterSpacing: '-0.01em',
          overflowX: 'hidden',
        }}
      >
        {/* Global scroll progress bar */}
        <ScrollProgress />

        <MinimalCursor />

        {!hideNav && <MinimalNav />}
        
        <PageTransition>
          <main>
            {isInnerPage && !hideNav && (
              <div className="max-w-[1400px] mx-auto px-[clamp(24px,3vw,64px)] pt-6 pb-2">
                <Breadcrumb />
              </div>
            )}
            {children}
          </main>
        </PageTransition>
        
        {!hideFooter && <MinimalFooter />}
        {!hideNav && <Toolbar />}
        <BackToTop />
      </div>
    </>
  )
}
