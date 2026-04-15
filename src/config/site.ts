/**
 * Site Configuration — the SINGLE source of truth for deployment mode.
 *
 * SHOWCASE MODE (default):
 *   All 10 themes accessible at /minimal, /vault, /gallery, etc.
 *   Used for: demonstrating themes to potential website-buying customers.
 *
 * SINGLE-THEME MODE:
 *   Set NEXT_PUBLIC_CONCEPT_ID in env → only that theme is active.
 *   Used for: a customer's production jewelry website.
 *
 * Every deployment reads from environment variables so the same
 * codebase powers both the portfolio showcase and individual stores.
 */

export type ConceptId =
  | 'minimal'
  | 'vault'
  | 'gallery'
  | 'salon'
  | 'atelier'
  | 'archive'
  | 'observatory'
  | 'theater'
  | 'marketplace'
  | 'maison'

export interface SiteConfig {
  /** Which theme this deployment uses (null = showcase mode) */
  conceptId: ConceptId | null

  /** Whether we are in showcase mode (all themes) or single-theme mode */
  isShowcase: boolean

  /** Business information (customized per customer) */
  businessName: string
  tagline: string
  description: string
  contactEmail: string
  contactPhone: string
  address: string

  /** Branding overrides (derived from concept but overridable) */
  logo?: string
  favicon?: string

  /** Social links */
  social: {
    instagram?: string
    facebook?: string
    pinterest?: string
    tiktok?: string
  }

  /** Feature flags — toggle capabilities per deployment */
  features: {
    gemhub360: boolean
    stripePayments: boolean
    reviews: boolean
    wishlist: boolean
    bespoke: boolean
    chat: boolean
    search: boolean
    recentlyViewed: boolean
    analytics: boolean
  }

  /** External service configuration (from env vars) */
  supabaseUrl?: string
  supabaseAnonKey?: string
  stripePublishableKey?: string
  gemhubCatalogUrl?: string

  /** SEO defaults */
  seo: {
    titleTemplate: string
    defaultTitle: string
    defaultDescription: string
    siteUrl: string
    ogImage?: string
  }
}

// ---------------------------------------------------------------------------
// Resolve configuration from environment variables
// ---------------------------------------------------------------------------

const conceptId = process.env.NEXT_PUBLIC_CONCEPT_ID as ConceptId | undefined
const isShowcase = !conceptId

export const siteConfig: SiteConfig = {
  conceptId: conceptId || null,
  isShowcase,

  businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Vault Maison',
  tagline: process.env.NEXT_PUBLIC_TAGLINE || 'Luxury Jewelry, Reimagined',
  description:
    process.env.NEXT_PUBLIC_DESCRIPTION ||
    'World-class jewelry e-commerce platform with 10 unique design concepts.',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '',
  address: process.env.NEXT_PUBLIC_ADDRESS || '',

  logo: process.env.NEXT_PUBLIC_LOGO_URL || undefined,
  favicon: process.env.NEXT_PUBLIC_FAVICON_URL || undefined,

  social: {
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || undefined,
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || undefined,
    pinterest: process.env.NEXT_PUBLIC_SOCIAL_PINTEREST || undefined,
    tiktok: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK || undefined,
  },

  features: {
    gemhub360: process.env.NEXT_PUBLIC_FEATURE_GEMHUB === 'true',
    stripePayments: !!process.env.STRIPE_SECRET_KEY,
    reviews: process.env.NEXT_PUBLIC_FEATURE_REVIEWS !== 'false', // on by default
    wishlist: process.env.NEXT_PUBLIC_FEATURE_WISHLIST !== 'false', // on by default
    bespoke: process.env.NEXT_PUBLIC_FEATURE_BESPOKE !== 'false', // on by default
    chat: process.env.NEXT_PUBLIC_FEATURE_CHAT === 'true',
    search: process.env.NEXT_PUBLIC_FEATURE_SEARCH !== 'false', // on by default
    recentlyViewed: process.env.NEXT_PUBLIC_FEATURE_RECENTLY_VIEWED !== 'false',
    analytics: process.env.NEXT_PUBLIC_FEATURE_ANALYTICS === 'true',
  },

  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || undefined,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || undefined,
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || undefined,
  gemhubCatalogUrl: process.env.NEXT_PUBLIC_GEMHUB_CATALOG_URL || undefined,

  seo: {
    titleTemplate: `%s | ${process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Vault Maison'}`,
    defaultTitle: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Vault Maison',
    defaultDescription:
      process.env.NEXT_PUBLIC_DESCRIPTION ||
      'Luxury jewelry e-commerce — 10 unique design concepts, one powerful platform.',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://vaultmaison.com',
    ogImage: process.env.NEXT_PUBLIC_OG_IMAGE || undefined,
  },
}

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/** Check if a specific feature is enabled */
export function isFeatureEnabled(feature: keyof SiteConfig['features']): boolean {
  return siteConfig.features[feature]
}

/** Get the active concept ID (for single-theme mode) or null */
export function getActiveConceptId(): ConceptId | null {
  return siteConfig.conceptId
}

/** Check if we are in single-theme production mode */
export function isSingleThemeMode(): boolean {
  return !siteConfig.isShowcase
}

/** Check if Supabase is configured (real backend available) */
export function isSupabaseConfigured(): boolean {
  return !!(siteConfig.supabaseUrl && siteConfig.supabaseAnonKey)
}

/** Check if Stripe is configured (real payments available) */
export function isStripeConfigured(): boolean {
  return !!siteConfig.stripePublishableKey && siteConfig.features.stripePayments
}
