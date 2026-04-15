/**
 * Analytics Event Tracking
 *
 * A lightweight, privacy-respecting analytics layer that fires events
 * to whatever analytics provider is configured (GA4, Segment, PostHog, etc.).
 *
 * Events are only fired when NEXT_PUBLIC_FEATURE_ANALYTICS=true.
 * In demo/showcase mode, events are logged to console in development.
 */

import { siteConfig } from '@/config/site'

// ─── Event Types ─────────────────────────────────────────────

export type AnalyticsEvent =
  | { name: 'page_view'; properties: { path: string; concept?: string } }
  | { name: 'product_view'; properties: { productId: string; productName: string; price: number; category: string; concept: string } }
  | { name: 'add_to_cart'; properties: { productId: string; productName: string; price: number; quantity: number } }
  | { name: 'remove_from_cart'; properties: { productId: string; productName: string } }
  | { name: 'add_to_wishlist'; properties: { productId: string; productName: string } }
  | { name: 'search'; properties: { query: string; resultCount: number } }
  | { name: 'begin_checkout'; properties: { cartTotal: number; itemCount: number } }
  | { name: 'purchase'; properties: { orderId: string; total: number; itemCount: number } }
  | { name: 'concept_switch'; properties: { from: string; to: string } }
  | { name: 'gemhub_360_view'; properties: { productId: string; productName: string } }
  | { name: 'auth_signin'; properties: { method: string } }
  | { name: 'auth_signup'; properties: { method: string } }

// ─── Core Tracking Function ──────────────────────────────────

export function trackEvent(event: AnalyticsEvent): void {
  // Only track if analytics feature is enabled
  if (!siteConfig.features.analytics) {
    // In development, log to console for debugging
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.debug(`[Analytics] ${event.name}`, event.properties)
    }
    return
  }

  try {
    // Google Analytics 4 (gtag)
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', event.name, event.properties)
    }

    // Generic dataLayer push (GTM compatible)
    if (typeof window !== 'undefined' && 'dataLayer' in window) {
      (window as any).dataLayer.push({
        event: event.name,
        ...event.properties,
      })
    }
  } catch (error) {
    // Silently fail — analytics should never break the app
    console.warn('[Analytics] Failed to track event:', error)
  }
}

// ─── Convenience Functions ───────────────────────────────────

export function trackPageView(path: string, concept?: string): void {
  trackEvent({ name: 'page_view', properties: { path, concept } })
}

export function trackProductView(product: {
  id: string
  name: string
  price: number
  category: string
}, concept: string): void {
  trackEvent({
    name: 'product_view',
    properties: {
      productId: product.id,
      productName: product.name,
      price: product.price,
      category: product.category,
      concept,
    },
  })
}

export function trackAddToCart(product: {
  id: string
  name: string
  price: number
}, quantity: number): void {
  trackEvent({
    name: 'add_to_cart',
    properties: {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity,
    },
  })
}

export function trackSearch(query: string, resultCount: number): void {
  trackEvent({ name: 'search', properties: { query, resultCount } })
}

export function trackBeginCheckout(cartTotal: number, itemCount: number): void {
  trackEvent({ name: 'begin_checkout', properties: { cartTotal, itemCount } })
}

export function trackPurchase(orderId: string, total: number, itemCount: number): void {
  trackEvent({ name: 'purchase', properties: { orderId, total, itemCount } })
}
