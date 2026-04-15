import { type ProductCategory } from './concepts'

export interface Collection {
  id: string
  name: string
  subtitle: string
  description: string
  categories: ProductCategory[]
  heroImage: string
  featured: boolean
}

export const collections: Collection[] = [
  {
    id: 'diamond-essentials',
    name: 'Diamond Essentials',
    subtitle: 'The Foundation of Every Collection',
    description: 'Timeless diamond pieces that form the cornerstone of a refined jewelry wardrobe. From classic studs to elegant pendants, each piece is designed to be worn every day and treasured forever.',
    categories: ['diamond-rings', 'diamond-necklaces', 'diamond-earrings', 'diamond-bracelets'],
    heroImage: '/images/diamond-collection-1.jpg',
    featured: true,
  },
  {
    id: 'gold-heritage',
    name: 'Gold Heritage',
    subtitle: 'Crafted in Precious Metal',
    description: 'Pure gold pieces that celebrate the timeless allure of the world\'s most coveted metal. From signet rings to statement chains, each piece carries the weight and warmth of solid gold craftsmanship.',
    categories: ['gold-rings', 'gold-necklaces', 'gold-earrings', 'gold-bracelets'],
    heroImage: '/images/diamond-dark-bg-1.jpg',
    featured: true,
  },
  {
    id: 'bridal-forever',
    name: 'Forever Bridal',
    subtitle: 'For Life\'s Most Precious Moments',
    description: 'Engagement rings, wedding bands, and bridal sets designed to mark the beginning of forever. Each piece is crafted with the understanding that some moments deserve nothing less than perfection.',
    categories: ['wedding-bridal', 'diamond-rings'],
    heroImage: '/images/diamond-velvet-1.jpg',
    featured: true,
  },
  {
    id: 'investment-stones',
    name: 'Investment Grade',
    subtitle: 'Certified Excellence',
    description: 'Loose diamonds and melee parcels for collectors, investors, and designers. Every stone comes with full certification and provenance documentation.',
    categories: ['loose-diamonds'],
    heroImage: '/images/diamond-facets-1.jpg',
    featured: false,
  },
  {
    id: 'statement-pieces',
    name: 'Statement Pieces',
    subtitle: 'Bold by Design',
    description: 'Show-stopping pieces that command attention. From chandelier earrings to sculptural cuffs, these are the pieces that define a personal style.',
    categories: ['diamond-earrings', 'diamond-bracelets', 'gold-earrings', 'gold-bracelets'],
    heroImage: '/images/diamond-bokeh-1.jpg',
    featured: false,
  },
]

export function getCollection(id: string): Collection | undefined {
  return collections.find((c) => c.id === id)
}

export function getFeaturedCollections(): Collection[] {
  return collections.filter((c) => c.featured)
}
