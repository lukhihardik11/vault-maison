export type ProductCategory =
  | 'diamond-rings' | 'diamond-necklaces' | 'diamond-earrings' | 'diamond-bracelets'
  | 'gold-rings' | 'gold-necklaces' | 'gold-earrings' | 'gold-bracelets'
  | 'loose-diamonds' | 'wedding-bridal'

export interface ConceptConfig {
  id: string
  number: string
  name: string
  tagline: string
  dna: string
  palette: {
    bg: string
    text: string
    accent: string
    muted: string
    surface: string
  }
  fonts: {
    heading: string
    body: string
    headingClass: string
    bodyClass: string
  }
  components: string[]
  ctaText: {
    acquire: string
    browse: string
    contact: string
    viewCollection: string
    bespoke: string
  }
  route: string
  heroImage: string
  description: string
}

export const concepts: ConceptConfig[] = [
  {
    id: 'vault',
    number: '01',
    name: 'The Vault',
    tagline: 'Access Granted',
    dna: 'Gated · Monolithic · Intimate',
    palette: {
      bg: '#0A0A0A',
      text: '#EAEAEA',
      accent: '#D4AF37',
      muted: '#333333',
      surface: '#141414',
    },
    fonts: {
      heading: 'Cinzel',
      body: 'Inter',
      headingClass: 'font-cinzel',
      bodyClass: 'font-inter',
    },
    components: ['aurora-background', 'cinematic-landing-hero', 'spotlight-card', 'canvas-reveal-effect', 'sparkle-card', 'background-beams', 'animated-modal', 'view-magnifier', '3d-card', 'interactive-checkout'],
    ctaText: {
      acquire: 'Secure This Piece',
      browse: 'Enter the Vault',
      contact: 'Request Access',
      viewCollection: 'Unlock Collection',
      bespoke: 'Commission a Piece',
    },
    route: '/vault',
    heroImage: '/images/diamond-dark-bg-1.jpg',
    description: 'A gated, exclusive experience. Dark monolithic surfaces with gold accents. Every interaction feels like accessing a private vault of rare treasures.',
  },
  {
    id: 'observatory',
    number: '02',
    name: 'The Observatory',
    tagline: 'Precision Illuminated',
    dna: 'Analytical · Transparent · Authoritative',
    palette: {
      bg: '#0D1B2A',
      text: '#FFFFFF',
      accent: '#00E5FF',
      muted: '#1B3A5C',
      surface: '#112240',
    },
    fonts: {
      heading: 'IBM Plex Mono',
      body: 'IBM Plex Mono',
      headingClass: 'font-ibm-plex',
      bodyClass: 'font-ibm-plex',
    },
    components: ['hero-shader', 'container-scroll-animation', 'bento-grid', 'card-spotlight', 'view-magnifier', 'compare', 'background-lines', '3d-globe', 'interactive-checkout', 'order-confirmation-card'],
    ctaText: {
      acquire: 'Acquire Specimen',
      browse: 'Begin Analysis',
      contact: 'Schedule Consultation',
      viewCollection: 'View Dataset',
      bespoke: 'Custom Analysis',
    },
    route: '/observatory',
    heroImage: '/images/diamond-facets-1.jpg',
    description: 'A scientific, data-rich interface. Monospace typography and cyan accents create an analytical environment where every diamond specification is presented with laboratory precision.',
  },
  {
    id: 'gallery',
    number: '03',
    name: 'The Gallery',
    tagline: 'Curated Silence',
    dna: 'Editorial · Curated · Spacious',
    palette: {
      bg: '#FDFBF7',
      text: '#2C2C2C',
      accent: '#2C2C2C',
      muted: '#E8E4DE',
      surface: '#F5F2ED',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
      headingClass: 'font-playfair',
      bodyClass: 'font-inter',
    },
    components: ['hero', 'background-gradient', 'portfolio-gallery', 'apple-cards-carousel', 'image-zoom', 'animated-modal', 'card-hover-effect', 'images-slider', 'interactive-checkout'],
    ctaText: {
      acquire: 'Acquire',
      browse: 'View Exhibition',
      contact: 'Private Viewing',
      viewCollection: 'Enter Gallery',
      bespoke: 'Commission Art',
    },
    route: '/gallery',
    heroImage: '/images/diamond-velvet-1.jpg',
    description: 'An editorial, museum-like experience. Massive whitespace, serif typography, and curated layouts. Each piece is presented like a work of art on a gallery wall.',
  },
  {
    id: 'atelier',
    number: '04',
    name: 'The Atelier',
    tagline: 'Made for You',
    dna: 'Bespoke · Tactile · Process-driven',
    palette: {
      bg: '#F4F1EA',
      text: '#2B2B2B',
      accent: '#8C3A3A',
      muted: '#D9D4CA',
      surface: '#EDE9E0',
    },
    fonts: {
      heading: 'Cormorant Garamond',
      body: 'DM Sans',
      headingClass: 'font-cormorant',
      bodyClass: 'font-dm-sans',
    },
    components: ['hero', 'background-gradient-animation', 'product-reveal-card', 'feature-highlight-card', '3d-card', 'compare', 'moving-dot-card', 'card-stack', 'interactive-checkout'],
    ctaText: {
      acquire: 'Commission This Piece',
      browse: 'Explore Craft',
      contact: 'Begin Consultation',
      viewCollection: 'View Atelier',
      bespoke: 'Begin Your Commission',
    },
    route: '/atelier',
    heroImage: '/images/diamond-collection-1.jpg',
    description: 'A bespoke, warm experience centered on craftsmanship. Garnet accents on cream backgrounds. Every interaction emphasizes the human hand behind each piece.',
  },
  {
    id: 'salon',
    number: '05',
    name: 'The Salon',
    tagline: 'Your Personal Jeweler',
    dna: 'Intimate · Conversational · Warm',
    palette: {
      bg: '#FDF5E6',
      text: '#2B2B2B',
      accent: '#4A5D23',
      muted: '#E8DCC4',
      surface: '#F5EDD8',
    },
    fonts: {
      heading: 'Lora',
      body: 'Lora',
      headingClass: 'font-lora',
      bodyClass: 'font-lora',
    },
    components: ['background-gradient-animation', 'glass-card', 'card-hover-effect', 'animated-modal', 'animated-tooltip', 'basic-chat'],
    ctaText: {
      acquire: 'Reserve with Concierge',
      browse: 'Browse Selection',
      contact: 'Chat with Advisor',
      viewCollection: 'View Recommendations',
      bespoke: 'Design Together',
    },
    route: '/salon',
    heroImage: '/images/diamond-velvet-2.jpg',
    description: 'A chat-first, concierge-driven experience. Sage green accents on warm cream. Products appear as recommendations within an intimate conversational flow.',
  },
  {
    id: 'archive',
    number: '06',
    name: 'The Archive',
    tagline: 'Every Stone Has a Story',
    dna: 'Historical · Provenance · Deep',
    palette: {
      bg: '#2C1A1D',
      text: '#F5F0EB',
      accent: '#D4A574',
      muted: '#4A3035',
      surface: '#3A2428',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
      headingClass: 'font-playfair',
      bodyClass: 'font-inter',
    },
    components: ['background-beams', 'cinematic-landing-hero', 'card-stack', 'apple-cards-carousel', 'compare', 'images-slider', 'canvas-reveal-effect', 'order-confirmation-card'],
    ctaText: {
      acquire: 'Claim This Legacy',
      browse: 'Enter the Archive',
      contact: 'Provenance Inquiry',
      viewCollection: 'Browse Records',
      bespoke: 'Heritage Commission',
    },
    route: '/archive',
    heroImage: '/images/diamond-bokeh-1.jpg',
    description: 'A heritage-focused experience built around provenance and history. Dark mahogany with brass accents. Every piece comes with a documented lineage.',
  },
  {
    id: 'minimal',
    number: '07',
    name: 'The Minimal Machine',
    tagline: 'Nothing More',
    dna: 'Brutalist · Restrained · Precise',
    palette: {
      bg: '#FFFFFF',
      text: '#050505',
      accent: '#050505',
      muted: '#E5E5E5',
      surface: '#F5F5F5',
    },
    fonts: {
      heading: 'Helvetica Neue',
      body: 'Helvetica Neue',
      headingClass: '',
      bodyClass: '',
    },
    components: [],
    ctaText: {
      acquire: 'Purchase',
      browse: 'View',
      contact: 'Inquire',
      viewCollection: 'Collection',
      bespoke: 'Custom',
    },
    route: '/minimal',
    heroImage: '/images/diamond-melee-1.jpg',
    description: 'Brutalist restraint. Black and white only. No components, no animations. The smallest codebase. Restraint IS the luxury.',
  },
  {
    id: 'theater',
    number: '08',
    name: 'The Immersive Theater',
    tagline: 'Experience the Extraordinary',
    dna: 'Cinematic · Emotional · Enveloping',
    palette: {
      bg: '#1A1A24',
      text: '#F5F0EB',
      accent: '#E0C097',
      muted: '#2A2A38',
      surface: '#222230',
    },
    fonts: {
      heading: 'Bodoni Moda',
      body: 'Inter',
      headingClass: 'font-bodoni',
      bodyClass: 'font-inter',
    },
    components: ['hero-shader', 'aurora-background', 'canvas-reveal-effect', '3d-card', 'spotlight-card', 'animated-modal', 'background-beams', 'background-gradient-animation', 'container-scroll-animation', 'sparkle-card', 'interactive-checkout'],
    ctaText: {
      acquire: 'Experience This Piece',
      browse: 'Enter the Theater',
      contact: 'Private Showing',
      viewCollection: 'Begin Journey',
      bespoke: 'Private Commission',
    },
    route: '/theater',
    heroImage: '/images/diamond-parcel-1.jpg',
    description: 'A cinematic, immersive experience. Every animation component available is used. Letter-by-letter reveals, particle effects, and Z-axis dives create pure theater.',
  },
  {
    id: 'marketplace',
    number: '09',
    name: 'The Marketplace of Rarity',
    tagline: 'Bid. Win. Own.',
    dna: 'Urgent · Scarce · Event-driven',
    palette: {
      bg: '#1A1A1A',
      text: '#F2F2F2',
      accent: '#FF3B30',
      muted: '#333333',
      surface: '#242424',
    },
    fonts: {
      heading: 'Space Grotesk',
      body: 'Space Grotesk',
      headingClass: 'font-space-grotesk',
      bodyClass: 'font-space-grotesk',
    },
    components: ['background-lines', 'glowing-card', 'card-spotlight', 'images-slider', 'feature-highlight-card', 'moving-dot-card', 'animated-tooltip', 'interactive-checkout', 'order-confirmation-card'],
    ctaText: {
      acquire: 'Place Bid',
      browse: 'View Live Lots',
      contact: 'Register to Bid',
      viewCollection: 'Upcoming Auctions',
      bespoke: 'Private Sale',
    },
    route: '/marketplace',
    heroImage: '/images/emerald-cut-1.jpg',
    description: 'An auction-driven experience with urgency and scarcity. Crimson accents pulse with countdown timers. LIVE, UPCOMING, and SOLD badges create event-driven commerce.',
  },
  {
    id: 'maison',
    number: '10',
    name: 'The Modern Maison',
    tagline: 'Timeless, Reimagined',
    dna: 'Balanced · Performant · Timeless',
    palette: {
      bg: '#FAFAFA',
      text: '#1C1C1C',
      accent: '#8B7355',
      muted: '#E8E2DA',
      surface: '#F0ECE6',
    },
    fonts: {
      heading: 'Libre Baskerville',
      body: 'DM Sans',
      headingClass: 'font-libre',
      bodyClass: 'font-dm-sans',
    },
    components: ['hero', 'container-scroll-animation', 'product-reveal-card', 'apple-cards-carousel', 'gallery', 'view-magnifier', 'compare', 'card-hover-effect', 'background-gradient', 'interactive-checkout', 'animated-testimonials'],
    ctaText: {
      acquire: 'Add to Collection',
      browse: 'Explore Maison',
      contact: 'Book Appointment',
      viewCollection: 'View Collection',
      bespoke: 'Bespoke Service',
    },
    route: '/maison',
    heroImage: '/images/oval-cut-1.jpg',
    description: 'The most production-ready of all 10. If Cartier rebuilt in 2026. Clean, balanced, editorial. Filter sidebar, animated testimonials, and a polished checkout flow.',
  },
]

export function getConcept(id: string): ConceptConfig | undefined {
  return concepts.find((c) => c.id === id)
}

export function getConceptByRoute(route: string): ConceptConfig | undefined {
  return concepts.find((c) => c.route === route || c.route === `/${route}`)
}

export const categoryLabels: Record<ProductCategory, string> = {
  'diamond-rings': 'Diamond Rings',
  'diamond-necklaces': 'Diamond Necklaces',
  'diamond-earrings': 'Diamond Earrings',
  'diamond-bracelets': 'Diamond Bracelets',
  'gold-rings': 'Gold Rings',
  'gold-necklaces': 'Gold Necklaces',
  'gold-earrings': 'Gold Earrings',
  'gold-bracelets': 'Gold Bracelets',
  'loose-diamonds': 'Loose Diamonds & Melee',
  'wedding-bridal': 'Wedding & Bridal',
}

export const categoryDescriptions: Record<ProductCategory, string> = {
  'diamond-rings': 'Engagement rings, cocktail rings, eternity bands, and stackable designs crafted with precision-cut diamonds.',
  'diamond-necklaces': 'Pendants, chokers, chains, and layered necklaces featuring exceptional diamond centerpieces.',
  'diamond-earrings': 'Studs, hoops, drops, and chandelier earrings set with carefully matched diamonds.',
  'diamond-bracelets': 'Tennis bracelets, bangles, cuffs, and charm bracelets adorned with brilliant diamonds.',
  'gold-rings': 'Signet rings, bands, statement pieces, and minimalist designs in 14K, 18K, and 24K gold.',
  'gold-necklaces': 'Chains, pendants, layered pieces, and chokers crafted in yellow, white, and rose gold.',
  'gold-earrings': 'Hoops, studs, huggies, and statement earrings in pure gold designs.',
  'gold-bracelets': 'Bangles, cuffs, and link chain bracelets in various gold karats and colors.',
  'loose-diamonds': 'Round brilliant parcels, fancy cut parcels, matched sets, and certified collector stones.',
  'wedding-bridal': 'Engagement rings, wedding bands, bridal sets, and anniversary pieces for life\'s most precious moments.',
}

export const allCategories: ProductCategory[] = [
  'diamond-rings', 'diamond-necklaces', 'diamond-earrings', 'diamond-bracelets',
  'gold-rings', 'gold-necklaces', 'gold-earrings', 'gold-bracelets',
  'loose-diamonds', 'wedding-bridal',
]
