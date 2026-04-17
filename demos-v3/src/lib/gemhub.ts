/**
 * Vault Maison — GemHub Integration Module
 * 
 * This module manages the integration with GemHub (by Picup Media) for
 * 360° product visualization, AR try-on, and media management.
 * 
 * Currently operates in "placeholder" mode. When GemHub credentials are
 * configured, it switches to live iframe embedding.
 * 
 * See docs/GEMHUB-DEEP-RESEARCH.md for the full integration strategy.
 */

import type { GemHubConfig, GemHubAsset } from '@/types'

// ═══════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const defaultConfig: GemHubConfig = {
  enabled: !!process.env.NEXT_PUBLIC_GEMHUB_ENABLED,
  baseUrl: process.env.NEXT_PUBLIC_GEMHUB_URL || 'https://hub.gemlightbox.com',
  customDomain: process.env.NEXT_PUBLIC_GEMHUB_DOMAIN,
  defaultSettings: {
    showBanner: false,
    showLogo: true,
    showContact: false,
    showCart: false,
  },
}

// ═══════════════════════════════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════════════════════════════

export const gemhub = {
  /** Check if GemHub integration is enabled */
  isEnabled(): boolean {
    return defaultConfig.enabled
  },

  /** Get the embed URL for a product's 360° viewer */
  getEmbedUrl(gemhubId: string): string {
    const base = defaultConfig.customDomain || defaultConfig.baseUrl
    const params = new URLSearchParams({
      banner: String(defaultConfig.defaultSettings.showBanner),
      logo: String(defaultConfig.defaultSettings.showLogo),
      contact: String(defaultConfig.defaultSettings.showContact),
      cart: String(defaultConfig.defaultSettings.showCart),
    })
    return `${base}/share/${gemhubId}?${params}`
  },

  /** Get the AR try-on URL for a product */
  getARUrl(gemhubId: string): string {
    const base = defaultConfig.customDomain || defaultConfig.baseUrl
    return `${base}/ar/${gemhubId}`
  },

  /** Get all media assets for a product (mock for now) */
  async getAssets(productId: string): Promise<GemHubAsset[]> {
    if (!defaultConfig.enabled) {
      return [] // Return empty in placeholder mode
    }

    // Future: fetch from GemHub API or local mapping
    return [
      {
        id: `gh_${productId}_360`,
        productId,
        type: '360-video',
        url: gemhub.getEmbedUrl(productId),
        thumbnailUrl: '/images/products/placeholder-360.jpg',
        width: 800,
        height: 800,
      },
    ]
  },

  /** Check if a product has GemHub media */
  hasMedia(gemhubId?: string): boolean {
    return defaultConfig.enabled && !!gemhubId
  },

  /** Get configuration for the viewer component */
  getViewerConfig() {
    return {
      enabled: defaultConfig.enabled,
      baseUrl: defaultConfig.baseUrl,
      customDomain: defaultConfig.customDomain,
    }
  },
}

export default gemhub
