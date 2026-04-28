'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MinimalNav } from './MinimalNav'
import { MinimalFooter } from './MinimalFooter'
import Toolbar from './ui/Toolbar'
import { ScrollProgress } from './animations/ScrollProgress'
import { useReducedMotionPreference } from './animations/useResponsiveMotion'
import PageTransition from './ui/PageTransition'
import Breadcrumb from './ui/Breadcrumb'
import BackToTop from './ui/BackToTop'
import CustomCursor from './ui/CustomCursor'

interface MinimalLayoutProps {
  children: ReactNode
  hideNav?: boolean
  hideFooter?: boolean
}

export function MinimalLayout({ children, hideNav = false, hideFooter = false }: MinimalLayoutProps) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotionPreference()
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsLoaded(true)
      return
    }

    setIsLoaded(false)
    const frame = window.requestAnimationFrame(() => {
      setIsLoaded(true)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname, prefersReducedMotion])

  const isMinimalHome = pathname === '/minimal' || pathname === '/minimal/'
  const showBreadcrumb = Boolean(pathname?.startsWith('/minimal') && !isMinimalHome && !hideNav)

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

        /*
         * Keyboard focus indicator (UI UX Pro Max pre-delivery checklist:
         * "Focus states visible for keyboard nav"). Explicit outline on
         * every interactive element inside .minimal-concept. Mouse users
         * never see it; keyboard users always do. Offset + solid colour
         * matches the brutalist 1px hairline idiom.
         */
        .minimal-concept a:focus-visible,
        .minimal-concept button:focus-visible,
        .minimal-concept input:focus-visible,
        .minimal-concept textarea:focus-visible,
        .minimal-concept select:focus-visible,
        .minimal-concept [role="button"]:focus-visible,
        .minimal-concept [tabindex="0"]:focus-visible {
          outline: 1px solid #050505;
          outline-offset: 2px;
        }

        /* Smooth image loading */
        .minimal-concept img {
          transition: opacity 0.5s ease-out;
        }

        /* Respect the user's opt-in for smooth anchor scrolling — so
           the "Back to Top" button (and any #fragment links) glide
           instead of jump. */
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
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

        /*
         * IMPORTANT: no \`transform\` on the idle state.
         *
         * Any non-\`none\` transform (even \`translateY(0)\`) creates a
         * containing block for \`position: fixed\` descendants. GSAP
         * ScrollTrigger's \`pin: true\` uses \`position: fixed\` under the
         * hood, so a transformed ancestor silently breaks the pin — the
         * "pinned" element becomes fixed to this ancestor instead of the
         * viewport, which visually looks like the horizontal-scroll
         * section simply doesn't work. Same issue applies to
         * \`will-change: transform\`. Keep this transform-free at rest.
         */
        .minimal-concept {
          opacity: 1;
          transition: opacity 360ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .minimal-concept.is-loading {
          opacity: 0.94;
        }
        .minimal-concept.is-loaded {
          opacity: 1;
        }
        .minimal-main-content {
          min-height: calc(100vh - 64px);
        }
        .minimal-concept.is-reduced-motion {
          opacity: 1 !important;
          transition: none !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .minimal-concept {
            opacity: 1 !important;
            transition: none !important;
          }
        }
      `}</style>
      <div
        className={`minimal-concept ${isLoaded ? 'is-loaded' : 'is-loading'} ${prefersReducedMotion ? 'is-reduced-motion' : ''}`}
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
          // `overflow-x: clip` (not `hidden`) — `hidden` creates a scroll
          // container on the X axis, which breaks `position: sticky` on
          // descendants and GSAP ScrollTrigger's `pin: true` (used by
          // HorizontalScroll). `clip` contains visual overflow without
          // creating a scroll container, so sticky/pin work normally.
          overflowX: 'clip',
        }}
      >
        {/* Global scroll progress bar */}
        <ScrollProgress />

        {!hideNav && <MinimalNav />}
        <main className="minimal-main-content">
          {showBreadcrumb && <Breadcrumb />}
          <PageTransition>{children}</PageTransition>
        </main>
        {!hideFooter && <MinimalFooter />}
        {!hideNav && <Toolbar />}
        <BackToTop />
        <CustomCursor />
      </div>
    </>
  )
}
