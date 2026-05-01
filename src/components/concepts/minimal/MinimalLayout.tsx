'use client'

import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { MinimalNav } from './MinimalNav'
import { MinimalFooter } from './MinimalFooter'
import Toolbar from './ui/Toolbar'
import { ScrollProgress } from './animations/ScrollProgress'
import { useReducedMotionPreference } from './animations/useResponsiveMotion'
import { RouteTransition } from './animations/RouteTransition'
import Breadcrumb from './ui/Breadcrumb'
import BackToTop from './ui/BackToTop'
import { CommandPalette } from './ui/CommandPalette'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { LenisProvider } from './providers/LenisProvider'
import { ToastProvider } from './ui/Toast'
import { minimal } from './design-system';

// Code-split heavy visual components — not needed for initial paint
const CursorFollower = dynamic(() => import('./ui/CursorFollower'), { ssr: false })
const FilmGrain = dynamic(() => import('./ui/FilmGrain').then(m => ({ default: m.FilmGrain })), { ssr: false })
const PreLoader = dynamic(() => import('./animations/PreLoader').then(m => ({ default: m.PreLoader })), { ssr: false })
const MobileBottomNav = dynamic(() => import('./MobileBottomNav'), { ssr: false })
const ServiceWorkerRegistration = dynamic(() => import('./ServiceWorkerRegistration'), { ssr: false })

interface MinimalLayoutProps {
  children: ReactNode
  hideNav?: boolean
  hideFooter?: boolean
}

export function MinimalLayout({ children, hideNav = false, hideFooter = false }: MinimalLayoutProps) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotionPreference()
  const [isLoaded, setIsLoaded] = useState(true)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  const handleCommandPalette = useCallback(() => {
    setCommandPaletteOpen(prev => !prev)
  }, [])

  useKeyboardShortcuts({ onCommandPalette: handleCommandPalette })

  // Listen for custom event from Nav search button
  useEffect(() => {
    const handler = () => setCommandPaletteOpen(true)
    window.addEventListener('open-command-palette', handler)
    return () => window.removeEventListener('open-command-palette', handler)
  }, [])

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
      {/* PWA manifest */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Vault Maison" />
      {/* Font loading optimization: preconnect + preload critical weights */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400&display=swap"
      />
      <style>{`
        /* Fallback font metrics to reduce CLS during font swap */
        @font-face {
          font-family: 'Inter Fallback';
          src: local('Helvetica Neue'), local('Helvetica'), local('Arial');
          size-adjust: 107%;
          ascent-override: 90%;
          descent-override: 22%;
          line-gap-override: 0%;
        }

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
          outline: 2px solid #050505;
          outline-offset: 3px;
        }

        /* Smooth image loading */
        .minimal-concept img {
          transition: opacity 0.5s ease-out;
        }

        /* Respect the user's opt-in for smooth anchor scrolling — so
           the "Back to Top" button (and any #fragment links) glide
           instead of jump. */
        /* Lenis handles smooth scrolling — disable native scroll-behavior
           to avoid double-smoothing. Lenis respects prefers-reduced-motion
           via the disabled prop on LenisProvider. */
        html { scroll-behavior: auto; }

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
          .minimal-concept *,
          .minimal-concept *::before,
          .minimal-concept *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
      <ToastProvider>
      <RouteTransition>
      <LenisProvider lerp={0.07} disabled={prefersReducedMotion}>
      <div
        className={`minimal-concept ${isLoaded ? 'is-loaded' : 'is-loading'} ${prefersReducedMotion ? 'is-reduced-motion' : ''}`}
        data-concept="minimal"
        style={{
          backgroundColor: '#FFFFFF',
          color: '#050505',
          fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: minimal.type.body,
          fontWeight: 400,
          lineHeight: 1.6,
          minHeight: '100vh',
          letterSpacing: '-0.01em',
          overflowX: 'clip',
        }}
      >
        {/* Skip-to-content link for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="vm-skip-link"
          style={{
            position: 'absolute',
            top: '-100px',
            left: '16px',
            zIndex: 99999,
            padding: '12px 24px',
            backgroundColor: '#050505',
            color: '#FFFFFF',
            fontFamily: "'Inter', sans-serif",
            fontSize: minimal.type.body,
            fontWeight: 500,
            textDecoration: 'none',
            borderRadius: '0 0 4px 4px',
            transition: 'top 0.2s ease',
          }}
          onFocus={(e) => { e.currentTarget.style.top = '0' }}
          onBlur={(e) => { e.currentTarget.style.top = '-100px' }}
        >
          Skip to main content
        </a>

        {/* Global scroll progress bar */}
        <ScrollProgress />

        {!hideNav && <MinimalNav />}
        <main id="main-content" className="minimal-main-content" role="main">
          {showBreadcrumb && <Breadcrumb />}
          {children}
        </main>
        {!hideFooter && <MinimalFooter />}
        {!hideNav && <Toolbar />}
        <BackToTop />
        <CursorFollower />
        <FilmGrain />
        <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
        {!hideNav && <MobileBottomNav />}
        <ServiceWorkerRegistration />
      </div>
      </LenisProvider>
      <PreLoader />
      </RouteTransition>
      </ToastProvider>
    </>
  )
}
