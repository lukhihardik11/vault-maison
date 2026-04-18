import { concepts, type ConceptConfig, type ProductCategory } from '@/data/concepts'

export function getConceptFromPath(pathname: string): ConceptConfig | undefined {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return undefined
  const conceptId = segments[0]
  return concepts.find((c) => c.id === conceptId)
}

export function getConceptCSSVars(concept: ConceptConfig): Record<string, string> {
  return {
    '--concept-bg': concept.palette.bg,
    '--concept-text': concept.palette.text,
    '--concept-accent': concept.palette.accent,
    '--concept-muted': concept.palette.muted,
    '--concept-surface': concept.palette.surface,
  }
}

export function getCategorySlug(category: ProductCategory): string {
  return category
}

export function getCategoryFromSlug(slug: string): ProductCategory | undefined {
  const categories: ProductCategory[] = [
    'diamond-rings', 'diamond-necklaces', 'diamond-earrings', 'diamond-bracelets',
    'gold-rings', 'gold-necklaces', 'gold-earrings', 'gold-bracelets',
    'loose-diamonds', 'wedding-bridal',
  ]
  return categories.find((c) => c === slug)
}

export function buildConceptUrl(conceptId: string, path: string = ''): string {
  return `/${conceptId}${path ? `/${path}` : ''}`
}

export function buildCategoryUrl(conceptId: string, category: ProductCategory): string {
  return `/${conceptId}/category/${category}`
}

export function buildProductUrl(conceptId: string, productSlug: string): string {
  return `/${conceptId}/product/${productSlug}`
}

export function getLuxuryTransitionDuration(concept: ConceptConfig): string {
  if (concept.id === 'minimal') return '0ms'
  if (concept.id === 'theater') return '1200ms'
  return '800ms'
}

export function getLuxuryEasing(): string {
  return 'cubic-bezier(0.25, 0.1, 0.25, 1.0)'
}
