import { NextResponse } from 'next/server'

/**
 * Apply security headers to a NextResponse.
 * Based on OWASP recommendations and SECURITY-ARCHITECTURE.md.
 */
export function applySecurityHeaders(response: NextResponse): NextResponse {
  // Content Security Policy
  response.headers.set('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://hub.gemlightbox.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://images.unsplash.com https://images.pexels.com https://hub.gemlightbox.com https://*.supabase.co",
    "font-src 'self' https://fonts.gstatic.com",
    "frame-src https://js.stripe.com https://hub.gemlightbox.com https://hooks.stripe.com",
    "connect-src 'self' https://*.supabase.co https://api.stripe.com https://hub.gemlightbox.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; '))

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY')

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions policy — disable unused browser features
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // HSTS — force HTTPS for 2 years
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')

  return response
}
