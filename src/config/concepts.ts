/**
 * Concept Theme Definitions — re-exports and extends the concept data
 * for use in the multi-tenant template system.
 *
 * Each concept defines a complete visual identity: palette, typography,
 * border radius, animation style, and component preferences.
 * When a customer picks a theme, these values drive the entire UI.
 */

export { type ConceptConfig, concepts, getConcept } from '@/data/concepts'

/**
 * Extended theme metadata for the template system.
 * Maps concept IDs to deployment-specific overrides.
 */
export interface ConceptThemeOverrides {
  /** Custom palette overrides (e.g., customer wants different accent color) */
  palette?: {
    bg?: string
    text?: string
    accent?: string
    muted?: string
    surface?: string
  }
  /** Custom font overrides */
  fonts?: {
    heading?: string
    body?: string
  }
  /** Border radius style */
  borderRadius?: string
  /** Custom hero image */
  heroImage?: string
  /** Custom tagline */
  tagline?: string
}

/**
 * Get concept theme with optional customer overrides applied.
 * Used in single-theme mode to let customers customize their chosen theme.
 */
export function getConceptWithOverrides(
  conceptId: string,
  overrides?: ConceptThemeOverrides
) {
  const { getConcept } = require('@/data/concepts')
  const base = getConcept(conceptId)
  if (!base) return null
  if (!overrides) return base

  return {
    ...base,
    palette: { ...base.palette, ...overrides.palette },
    fonts: { ...base.fonts, ...overrides.fonts },
    heroImage: overrides.heroImage || base.heroImage,
    tagline: overrides.tagline || base.tagline,
  }
}

/**
 * Concept metadata for the showcase landing page.
 * Provides marketing-friendly descriptions and preview info.
 */
export const conceptShowcaseData: Record<
  string,
  {
    marketingName: string
    shortDescription: string
    idealFor: string
    keyFeature: string
  }
> = {
  vault: {
    marketingName: 'The Vault',
    shortDescription: 'Dark, exclusive, gated luxury. Gold accents on obsidian surfaces.',
    idealFor: 'High-end jewelers, private collections, luxury brands',
    keyFeature: 'Cinematic reveal animations & vault-door interactions',
  },
  observatory: {
    marketingName: 'The Observatory',
    shortDescription: 'Analytical precision with transparent, data-rich product displays.',
    idealFor: 'Diamond dealers, gemologists, technical buyers',
    keyFeature: 'Gem specification panels & 360° diamond analysis',
  },
  gallery: {
    marketingName: 'The Gallery',
    shortDescription: 'Museum-quality presentation with editorial photography focus.',
    idealFor: 'Designer jewelry, art jewelry, curated collections',
    keyFeature: 'Full-bleed imagery & gallery-wall product layouts',
  },
  atelier: {
    marketingName: 'The Atelier',
    shortDescription: 'Warm, craft-focused workshop aesthetic celebrating artisanship.',
    idealFor: 'Handcrafted jewelry, bespoke designers, artisan brands',
    keyFeature: 'Process storytelling & behind-the-bench narratives',
  },
  salon: {
    marketingName: 'The Salon',
    shortDescription: 'Soft, intimate consultation experience with personal styling.',
    idealFor: 'Bridal jewelry, personal styling services, boutiques',
    keyFeature: 'Live chat consultation & appointment booking',
  },
  archive: {
    marketingName: 'The Archive',
    shortDescription: 'Systematic, catalog-driven design for extensive inventories.',
    idealFor: 'Large inventories, estate jewelry, vintage collections',
    keyFeature: 'Advanced filtering & catalog-style grid layouts',
  },
  minimal: {
    marketingName: 'The Minimal Machine',
    shortDescription: 'Swiss-precision minimalism. Every pixel earns its place.',
    idealFor: 'Modern jewelry brands, contemporary design, minimalist aesthetics',
    keyFeature: 'Ultra-clean typography & whitespace-driven hierarchy',
  },
  theater: {
    marketingName: 'The Immersive Theater',
    shortDescription: 'Cinematic, full-screen storytelling with dramatic reveals.',
    idealFor: 'Statement pieces, luxury launches, experiential brands',
    keyFeature: 'Full-screen video backgrounds & theatrical transitions',
  },
  marketplace: {
    marketingName: 'The Marketplace of Rarity',
    shortDescription: 'Multi-vendor marketplace for rare and collectible pieces.',
    idealFor: 'Multi-brand retailers, auction houses, rare gem dealers',
    keyFeature: 'Vendor profiles & rarity scoring system',
  },
  maison: {
    marketingName: 'The Modern Maison',
    shortDescription: 'Classic French luxury house aesthetic, refined and timeless.',
    idealFor: 'Heritage brands, established jewelers, classic luxury',
    keyFeature: 'Editorial storytelling & heritage timeline sections',
  },
}
