'use client'

import { useEffect } from 'react'

/**
 * ServiceWorkerRegistration — Registers the service worker for PWA support.
 *
 * Only registers in production builds. Provides:
 * - Offline page fallback
 * - Asset caching (stale-while-revalidate)
 * - Font caching (cache-first)
 * - App install prompt readiness
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !('serviceWorker' in navigator) ||
      process.env.NODE_ENV === 'development'
    ) {
      return
    }

    // Register after page load to avoid competing with critical resources
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/minimal' })
        .then((registration) => {
          // Check for updates every 60 minutes
          setInterval(() => {
            registration.update()
          }, 60 * 60 * 1000)

          console.log('[SW] Registered:', registration.scope)
        })
        .catch((error) => {
          console.warn('[SW] Registration failed:', error)
        })
    })
  }, [])

  return null
}

export default ServiceWorkerRegistration
