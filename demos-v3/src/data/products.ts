import { type ProductCategory } from './concepts'

export interface Product {
  id: string
  slug: string
  name: string
  subtitle: string
  category: ProductCategory
  price: number
  priceDisplay: string
  material: 'Diamond' | 'Gold' | 'Diamond & Gold' | 'Platinum'
  goldKarat?: '14K' | '18K' | '24K'
  goldColor?: 'Yellow' | 'White' | 'Rose'
  diamondSpecs?: {
    carat: string
    cut: string
    color: string
    clarity: string
    shape: string
    origin: 'Lab-Grown' | 'Natural'
    certification: string
  }
  images: string[]
  description: string
  features: string[]
  inStock: boolean
  isNew?: boolean
  isBestseller?: boolean
  isLimited?: boolean
}

export const products: Product[] = [
  // ═══════════════════════════════════════
  // DIAMOND RINGS ($2K-$25K)
  // ═══════════════════════════════════════
  {
    id: 'celestial-diamond-ring',
    slug: 'celestial-diamond-ring',
    name: 'Celestial Solitaire',
    subtitle: '1.5ct Round Brilliant · 18K White Gold',
    category: 'diamond-rings',
    price: 12500,
    priceDisplay: '$12,500',
    material: 'Diamond & Gold',
    goldKarat: '18K',
    goldColor: 'White',
    diamondSpecs: {
      carat: '1.50',
      cut: 'Ideal',
      color: 'D',
      clarity: 'VVS1',
      shape: 'Round Brilliant',
      origin: 'Natural',
      certification: 'GIA 2215847902',
    },
    images: ['/images/products/diamond-solitaire-ring.jpg', '/images/products/diamond-round-ring.jpg'],
    description: 'A breathtaking solitaire engagement ring featuring a 1.5-carat round brilliant diamond set in a cathedral 18K white gold mounting. The six-prong setting maximizes light return while the thin band draws all attention to the extraordinary center stone.',
    features: ['Cathedral setting', 'Six-prong mounting', 'Comfort-fit band', 'Laser-inscribed girdle', 'Lifetime warranty'],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 'aurora-cocktail-ring',
    slug: 'aurora-cocktail-ring',
    name: 'Aurora Cocktail Ring',
    subtitle: '2.0ct Oval · 18K Rose Gold Halo',
    category: 'diamond-rings',
    price: 18750,
    priceDisplay: '$18,750',
    material: 'Diamond & Gold',
    goldKarat: '18K',
    goldColor: 'Rose',
    diamondSpecs: {
      carat: '2.00',
      cut: 'Excellent',
      color: 'E',
      clarity: 'VS1',
      shape: 'Oval',
      origin: 'Natural',
      certification: 'GIA 6214587301',
    },
    images: ['/images/products/diamond-round-ring.jpg', '/images/products/diamond-solitaire-ring.jpg'],
    description: 'A statement cocktail ring featuring a 2.0-carat oval diamond surrounded by a delicate halo of 0.45ct melee diamonds. The rose gold setting adds warmth to the exceptional white center stone, creating a piece that commands attention at every occasion.',
    features: ['Double halo setting', 'Split shank design', 'Micro-pavé band', 'Hidden diamond detail', 'Certificate of authenticity'],
    inStock: true,
    isNew: true,
  },
  {
    id: 'eternity-diamond-band',
    slug: 'eternity-diamond-band',
    name: 'Infinite Eternity Band',
    subtitle: '3.2ct Total · Platinum',
    category: 'diamond-rings',
    price: 8900,
    priceDisplay: '$8,900',
    material: 'Platinum',
    diamondSpecs: {
      carat: '3.20 total',
      cut: 'Ideal',
      color: 'F',
      clarity: 'VS2',
      shape: 'Round Brilliant',
      origin: 'Natural',
      certification: 'GIA Certified',
    },
    images: ['/images/products/diamond-eternity-ring.jpg', '/images/products/diamond-wedding-ring.jpg'],
    description: 'A full eternity band featuring 22 perfectly matched round brilliant diamonds set in platinum. Each stone is hand-selected for identical fire and brilliance, creating an unbroken circle of light that symbolizes eternal commitment.',
    features: ['Full eternity design', 'Shared prong setting', 'Platinum 950', 'Matched stone set', 'Complimentary sizing'],
    inStock: true,
    isBestseller: true,
  },

  // ═══════════════════════════════════════
  // DIAMOND NECKLACES ($1.5K-$18K)
  // ═══════════════════════════════════════
  {
    id: 'aurora-pendant-necklace',
    slug: 'aurora-pendant-necklace',
    name: 'Aurora Pendant',
    subtitle: '0.75ct Pear Drop · 18K White Gold',
    category: 'diamond-necklaces',
    price: 4200,
    priceDisplay: '$4,200',
    material: 'Diamond & Gold',
    goldKarat: '18K',
    goldColor: 'White',
    diamondSpecs: {
      carat: '0.75',
      cut: 'Excellent',
      color: 'D',
      clarity: 'VS1',
      shape: 'Pear',
      origin: 'Natural',
      certification: 'GIA 1216547890',
    },
    images: ['/images/products/diamond-pendant-necklace.jpg', '/images/products/classic-pendant.jpg'],
    description: 'An elegant pear-shaped diamond pendant suspended from an 18-inch cable chain in 18K white gold. The bezel setting protects the stone while allowing maximum light entry, creating a luminous teardrop that rests perfectly at the collarbone.',
    features: ['Bezel setting', '18-inch adjustable chain', 'Lobster clasp', 'Hallmarked 750', 'Gift box included'],
    inStock: true,
    isNew: true,
  },
  {
    id: 'riviere-diamond-necklace',
    slug: 'riviere-diamond-necklace',
    name: 'Rivière Necklace',
    subtitle: '8.5ct Total · 18K White Gold',
    category: 'diamond-necklaces',
    price: 16500,
    priceDisplay: '$16,500',
    material: 'Diamond & Gold',
    goldKarat: '18K',
    goldColor: 'White',
    diamondSpecs: {
      carat: '8.50 total',
      cut: 'Excellent',
      color: 'E-F',
      clarity: 'VS1-VS2',
      shape: 'Round Brilliant',
      origin: 'Natural',
      certification: 'GIA Certified',
    },
    images: ['/images/products/diamond-halo-pendant.jpg', '/images/products/diamond-pendant-necklace.jpg'],
    description: 'A graduated rivière necklace featuring 45 round brilliant diamonds that increase in size from the clasp to the center stone. Each diamond is individually set in a four-prong white gold mounting, creating a seamless river of light around the neck.',
    features: ['Graduated design', 'Box clasp with safety', '16-inch length', 'Individual GIA dossiers', 'Insurance appraisal included'],
    inStock: true,
    isLimited: true,
  },
  {
    id: 'solitaire-pendant',
    slug: 'solitaire-pendant',
    name: 'Floating Solitaire Pendant',
    subtitle: '0.50ct Round · 14K Yellow Gold',
    category: 'diamond-necklaces',
    price: 1850,
    priceDisplay: '$1,850',
    material: 'Diamond & Gold',
    goldKarat: '14K',
    goldColor: 'Yellow',
    diamondSpecs: {
      carat: '0.50',
      cut: 'Ideal',
      color: 'G',
      clarity: 'VS2',
      shape: 'Round Brilliant',
      origin: 'Natural',
      certification: 'GIA 5214789012',
    },
    images: ['/images/products/classic-pendant.jpg', '/images/products/diamond-pendant-necklace.jpg'],
    description: 'A minimalist floating solitaire pendant where the diamond appears to hover on an invisible setting. The 14K yellow gold chain adds warmth while the clean design ensures the diamond remains the sole focus.',
    features: ['Invisible setting illusion', '16-18 inch adjustable', 'Spring ring clasp', 'Polished finish', 'Everyday luxury'],
    inStock: true,
  },

  // ═══════════════════════════════════════
  // DIAMOND EARRINGS ($800-$12K)
  // ═══════════════════════════════════════
  {
    id: 'classic-diamond-studs',
    slug: 'classic-diamond-studs',
    name: 'Classic Diamond Studs',
    subtitle: '1.0ct Total · 18K White Gold',
    category: 'diamond-earrings',
    price: 3800,
    priceDisplay: '$3,800',
    material: 'Diamond & Gold',
    goldKarat: '18K',
    goldColor: 'White',
    diamondSpecs: {
      carat: '1.00 total',
      cut: 'Ideal',
      color: 'E',
      clarity: 'VS1',
      shape: 'Round Brilliant',
      origin: 'Natural',
      certification: 'GIA Matched Pair',
    },
    images: ['/images/products/classic-diamond-studs.jpg', '/images/products/diamond-stud-earrings.jpg'],
    description: 'The quintessential diamond stud earrings featuring a perfectly matched pair of 0.50ct round brilliant diamonds. Four-prong basket settings in 18K white gold with secure screw-back posts ensure these become your everyday luxury.',
    features: ['Matched pair', 'Screw-back posts', 'Basket setting', 'Hypoallergenic', 'Lifetime tightening service'],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 'chandelier-diamond-earrings',
    slug: 'chandelier-diamond-earrings',
    name: 'Chandelier Drops',
    subtitle: '3.5ct Total · 18K White Gold',
    category: 'diamond-earrings',
    price: 11200,
    priceDisplay: '$11,200',
    material: 'Diamond & Gold',
    goldKarat: '18K',
    goldColor: 'White',
    diamondSpecs: {
      carat: '3.50 total',
      cut: 'Excellent',
      color: 'D-E',
      clarity: 'VS1-VS2',
      shape: 'Mixed',
      origin: 'Natural',
      certification: 'GIA Certified',
    },
    images: ['/images/products/diamond-chandelier-earrings.jpg', '/images/products/chandelier-earrings-white.jpg'],
    description: 'Dramatic chandelier earrings featuring cascading tiers of pear, marquise, and round brilliant diamonds. Each tier moves independently, creating a mesmerizing play of light with every gesture.',
    features: ['Three-tier cascade', 'Lever-back closure', 'Articulated joints', 'Red carpet worthy', 'Custom sizing available'],
    inStock: true,
    isLimited: true,
  },
  {
    id: 'diamond-hoop-earrings',
    slug: 'diamond-hoop-earrings',
    name: 'Pavé Diamond Hoops',
    subtitle: '1.2ct Total · 14K White Gold',
    category: 'diamond-earrings',
    price: 2400,
    priceDisplay: '$2,400',
    material: 'Diamond & Gold',
    goldKarat: '14K',
    goldColor: 'White',
    diamondSpecs: {
      carat: '1.20 total',
      cut: 'Very Good',
      color: 'F-G',
      clarity: 'VS2-SI1',
      shape: 'Round Brilliant',
      origin: 'Natural',
      certification: 'IGI Certified',
    },
    images: ['/images/products/gold-hoop-earrings.jpg', '/images/products/gold-mini-hoops.jpg'],
    description: 'Inside-out pavé diamond hoops featuring diamonds set along both the inner and outer surfaces. The 25mm diameter creates a versatile size perfect for both day and evening wear.',
    features: ['Inside-out setting', 'Hinged snap closure', '25mm diameter', 'Micro-pavé technique', 'Versatile sizing'],
    inStock: true,
  },

  // ═══════════════════════════════════════
  // DIAMOND BRACELETS ($3K-$30K)
  // ═══════════════════════════════════════
  {
    id: 'eternal-tennis-bracelet',
    slug: 'eternal-tennis-bracelet',
    name: 'Eternal Tennis Bracelet',
    subtitle: '5.0ct Total · 18K White Gold',
    category: 'diamond-bracelets',
    price: 12800,
    priceDisplay: '$12,800',
    material: 'Diamond & Gold',
    goldKarat: '18K',
    goldColor: 'White',
    diamondSpecs: {
      carat: '5.00 total',
      cut: 'Ideal',
      color: 'E-F',
      clarity: 'VS1',
      shape: 'Round Brilliant',
      origin: 'Natural',
      certification: 'GIA Certified',
    },
    images: ['/images/products/diamond-tennis-bracelet.jpg', '/images/products/classic-tennis-bracelet.jpg'],
    description: 'The definitive tennis bracelet featuring 50 perfectly matched round brilliant diamonds in a continuous line of brilliance. Each stone is set in a four-prong basket with a hidden safety clasp ensuring security without compromising elegance.',
    features: ['50 matched diamonds', 'Four-prong baskets', 'Hidden safety clasp', '7-inch length', 'Flexible articulation'],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 'diamond-bangle',
    slug: 'diamond-bangle',
    name: 'Pavé Diamond Bangle',
    subtitle: '2.8ct Total · 18K Yellow Gold',
    category: 'diamond-bracelets',
    price: 8500,
    priceDisplay: '$8,500',
    material: 'Diamond & Gold',
    goldKarat: '18K',
    goldColor: 'Yellow',
    diamondSpecs: {
      carat: '2.80 total',
      cut: 'Excellent',
      color: 'F-G',
      clarity: 'VS2',
      shape: 'Round Brilliant',
      origin: 'Natural',
      certification: 'GIA Certified',
    },
    images: ['/images/products/gold-bangle-bracelet.jpg', '/images/products/bracelet-on-wrist.jpg'],
    description: 'A hinged bangle bracelet with diamonds pavé-set across the entire front half. The 18K yellow gold provides a warm contrast to the white diamonds, creating a piece that transitions seamlessly from office to evening.',
    features: ['Hinged opening', 'Half-pavé design', 'Push-button clasp', 'Safety chain', 'Stackable design'],
    inStock: true,
  },
  {
    id: 'diamond-cuff-bracelet',
    slug: 'diamond-cuff-bracelet',
    name: 'Sculptural Diamond Cuff',
    subtitle: '4.2ct Total · Platinum',
    category: 'diamond-bracelets',
    price: 24500,
    priceDisplay: '$24,500',
    material: 'Platinum',
    diamondSpecs: {
      carat: '4.20 total',
      cut: 'Excellent',
      color: 'D-E',
      clarity: 'VVS2-VS1',
      shape: 'Mixed',
      origin: 'Natural',
      certification: 'GIA Certified',
    },
    images: ['/images/products/gold-cuff-bracelet.jpg', '/images/products/gold-chain-bracelet.jpg'],
    description: 'An architectural platinum cuff bracelet featuring an asymmetric arrangement of baguette and round brilliant diamonds. The open-back design allows for comfortable wear while the sculptural form makes a bold artistic statement.',
    features: ['Open cuff design', 'Mixed diamond shapes', 'Platinum 950', 'Adjustable fit', 'Signed and numbered'],
    inStock: true,
    isLimited: true,
  },

  // ═══════════════════════════════════════
  // GOLD RINGS ($500-$5K)
  // ═══════════════════════════════════════
  {
    id: 'heritage-signet-ring',
    slug: 'heritage-signet-ring',
    name: 'Heritage Signet Ring',
    subtitle: '18K Yellow Gold · Engravable',
    category: 'gold-rings',
    price: 2200,
    priceDisplay: '$2,200',
    material: 'Gold',
    goldKarat: '18K',
    goldColor: 'Yellow',
    images: ['/images/products/gold-signet-ring.jpg', '/images/products/classic-gold-ring.jpg'],
    description: 'A classic oval signet ring in solid 18K yellow gold with a polished face ready for custom engraving. The substantial weight and traditional proportions reference centuries of heraldic tradition while the modern finish ensures contemporary relevance.',
    features: ['Custom engraving available', 'Solid 18K gold', 'Oval face 12x10mm', 'Comfort-fit band', 'Hallmarked'],
    inStock: true,
  },
  {
    id: 'minimalist-gold-band',
    slug: 'minimalist-gold-band',
    name: 'Whisper Band',
    subtitle: '14K Rose Gold · 1.5mm',
    category: 'gold-rings',
    price: 580,
    priceDisplay: '$580',
    material: 'Gold',
    goldKarat: '14K',
    goldColor: 'Rose',
    images: ['/images/products/gold-minimalist-ring.jpg', '/images/products/classic-gold-ring.jpg'],
    description: 'An ultra-thin 1.5mm band in 14K rose gold, designed for stacking or as a delicate standalone piece. The hand-polished finish catches light at every angle, proving that the most refined luxury often comes in the smallest forms.',
    features: ['1.5mm width', 'Stackable design', 'Hand-polished', 'Sizes 3-13', 'Comfort-fit interior'],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 'statement-gold-ring',
    slug: 'statement-gold-ring',
    name: 'Sovereign Statement Ring',
    subtitle: '18K Yellow Gold · Bold Geometric',
    category: 'gold-rings',
    price: 3800,
    priceDisplay: '$3,800',
    material: 'Gold',
    goldKarat: '18K',
    goldColor: 'Yellow',
    images: ['/images/products/classic-gold-ring.jpg', '/images/products/gold-signet-ring.jpg'],
    description: 'A bold geometric statement ring in solid 18K yellow gold featuring an architectural dome design. The substantial 15-gram weight provides a satisfying heft while the brushed and polished dual finish adds visual depth.',
    features: ['Architectural design', 'Dual finish', '15g solid gold', 'Wide comfort band', 'Limited production'],
    inStock: true,
    isNew: true,
  },

  // ═══════════════════════════════════════
  // GOLD NECKLACES ($800-$8K)
  // ═══════════════════════════════════════
  {
    id: 'sovereign-gold-chain',
    slug: 'sovereign-gold-chain',
    name: 'Sovereign Curb Chain',
    subtitle: '18K Yellow Gold · 20 inch',
    category: 'gold-necklaces',
    price: 4500,
    priceDisplay: '$4,500',
    material: 'Gold',
    goldKarat: '18K',
    goldColor: 'Yellow',
    images: ['/images/products/gold-chain-necklace.jpg', '/images/products/gold-pendant-necklace.jpg'],
    description: 'A substantial curb-link chain in 18K yellow gold with a diamond-cut finish that catches light from every direction. At 5mm width and 20 inches, this chain strikes the perfect balance between presence and wearability.',
    features: ['Diamond-cut links', '5mm width', 'Lobster clasp', '20-inch length', '28g solid gold'],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 'layered-gold-necklace',
    slug: 'layered-gold-necklace',
    name: 'Triple Layer Necklace',
    subtitle: '14K Yellow Gold · Three Chains',
    category: 'gold-necklaces',
    price: 1800,
    priceDisplay: '$1,800',
    material: 'Gold',
    goldKarat: '14K',
    goldColor: 'Yellow',
    images: ['/images/products/gold-pendant-necklace.jpg', '/images/products/gold-chain-necklace.jpg'],
    description: 'Three delicate chains of varying lengths (16, 18, and 20 inches) connected by a single clasp for effortless layering. Each chain features a different link pattern — cable, box, and rope — creating visual depth without the tangle.',
    features: ['Three-in-one design', 'Tangle-free clasp', 'Mixed link styles', 'Adjustable lengths', 'Everyday luxury'],
    inStock: true,
    isNew: true,
  },
  {
    id: 'gold-pendant-necklace',
    slug: 'gold-pendant-necklace',
    name: 'Medallion Pendant',
    subtitle: '18K Yellow Gold · Coin Design',
    category: 'gold-necklaces',
    price: 2800,
    priceDisplay: '$2,800',
    material: 'Gold',
    goldKarat: '18K',
    goldColor: 'Yellow',
    images: ['/images/products/gold-pendant-necklace.jpg', '/images/products/heart-pendant.jpg'],
    description: 'A substantial coin-style medallion pendant in 18K yellow gold featuring a hand-engraved celestial motif. Suspended from a 22-inch rope chain, this piece bridges ancient numismatic tradition with contemporary jewelry design.',
    features: ['Hand-engraved motif', '22mm diameter', 'Rope chain 22 inch', 'Satin back finish', 'Collector piece'],
    inStock: true,
  },

  // ═══════════════════════════════════════
  // GOLD EARRINGS ($400-$4K)
  // ═══════════════════════════════════════
  {
    id: 'infinity-hoop-earrings',
    slug: 'infinity-hoop-earrings',
    name: 'Infinity Gold Hoops',
    subtitle: '18K Yellow Gold · 30mm',
    category: 'gold-earrings',
    price: 1600,
    priceDisplay: '$1,600',
    material: 'Gold',
    goldKarat: '18K',
    goldColor: 'Yellow',
    images: ['/images/products/gold-hoop-earrings.jpg', '/images/products/gold-mini-hoops.jpg'],
    description: 'Perfectly proportioned 30mm hoop earrings in 18K yellow gold with a high-polish finish. The 3mm tube thickness provides visual weight without heaviness, making these the ideal everyday luxury hoop.',
    features: ['30mm diameter', '3mm tube', 'Click-top closure', 'High-polish finish', 'Lightweight hollow design'],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 'gold-huggie-earrings',
    slug: 'gold-huggie-earrings',
    name: 'Sculpted Huggies',
    subtitle: '14K Rose Gold · Textured',
    category: 'gold-earrings',
    price: 680,
    priceDisplay: '$680',
    material: 'Gold',
    goldKarat: '14K',
    goldColor: 'Rose',
    images: ['/images/products/gold-mini-hoops.jpg', '/images/products/gold-stud-earrings.jpg'],
    description: 'Petite huggie earrings in 14K rose gold with a hammered texture that catches light beautifully. The hinged closure hugs the earlobe closely for a secure, comfortable fit that works from morning to midnight.',
    features: ['Hammered texture', 'Hinged closure', '12mm diameter', 'Rose gold warmth', 'Hypoallergenic posts'],
    inStock: true,
  },
  {
    id: 'gold-statement-earrings',
    slug: 'gold-statement-earrings',
    name: 'Cascade Statement Earrings',
    subtitle: '18K Yellow Gold · Articulated',
    category: 'gold-earrings',
    price: 3200,
    priceDisplay: '$3,200',
    material: 'Gold',
    goldKarat: '18K',
    goldColor: 'Yellow',
    images: ['/images/products/statement-earrings.jpg', '/images/products/gold-hoop-earrings.jpg'],
    description: 'Dramatic cascading earrings featuring five articulated gold discs that graduate in size. Each disc is hand-finished with alternating matte and polished surfaces, creating movement and light play with every turn of the head.',
    features: ['Five articulated discs', 'Dual finish', 'Post with omega back', '65mm total length', 'Statement piece'],
    inStock: true,
    isLimited: true,
  },

  // ═══════════════════════════════════════
  // GOLD BRACELETS ($600-$6K)
  // ═══════════════════════════════════════
  {
    id: 'gold-bangle-bracelet',
    slug: 'gold-bangle-bracelet',
    name: 'Classic Gold Bangle',
    subtitle: '18K Yellow Gold · 6mm Width',
    category: 'gold-bracelets',
    price: 3600,
    priceDisplay: '$3,600',
    material: 'Gold',
    goldKarat: '18K',
    goldColor: 'Yellow',
    images: ['/images/products/gold-bangle-bracelet.jpg', '/images/products/gold-bangles-set.jpg'],
    description: 'A timeless oval bangle in solid 18K yellow gold with a high-polish finish. The 6mm width and 2.5mm thickness provide substantial presence while the oval shape ensures a comfortable, secure fit on the wrist.',
    features: ['Solid 18K gold', '6mm width', 'Oval shape', 'Slip-on design', '22g weight'],
    inStock: true,
  },
  {
    id: 'gold-link-bracelet',
    slug: 'gold-link-bracelet',
    name: 'Figaro Link Bracelet',
    subtitle: '14K Yellow Gold · 7.5 inch',
    category: 'gold-bracelets',
    price: 1200,
    priceDisplay: '$1,200',
    material: 'Gold',
    goldKarat: '14K',
    goldColor: 'Yellow',
    images: ['/images/products/gold-chain-bracelet.jpg', '/images/products/bracelet-on-wrist.jpg'],
    description: 'A classic Figaro-link bracelet in 14K yellow gold featuring the traditional pattern of three short links followed by one elongated link. The 4.5mm width provides a refined presence suitable for daily wear.',
    features: ['Figaro link pattern', '4.5mm width', 'Lobster clasp', '7.5-inch length', 'Italian craftsmanship'],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 'gold-cuff-bracelet',
    slug: 'gold-cuff-bracelet',
    name: 'Sculptural Gold Cuff',
    subtitle: '18K Yellow Gold · Open Design',
    category: 'gold-bracelets',
    price: 5200,
    priceDisplay: '$5,200',
    material: 'Gold',
    goldKarat: '18K',
    goldColor: 'Yellow',
    images: ['/images/products/gold-cuff-bracelet.jpg', '/images/products/gold-bangle-bracelet.jpg'],
    description: 'An architectural open cuff bracelet in 18K yellow gold featuring a tapered design that widens from 8mm at the back to 25mm at the front. The brushed exterior contrasts with a polished interior for a sophisticated dual-finish effect.',
    features: ['Tapered design', 'Open cuff', 'Dual finish', 'Adjustable fit', '35g solid gold'],
    inStock: true,
    isNew: true,
  },

  // ═══════════════════════════════════════
  // LOOSE DIAMONDS ($450-$12.5K)
  // ═══════════════════════════════════════
  {
    id: 'round-melee-parcel-vvs',
    slug: 'round-melee-parcel-vvs',
    name: 'Premium Round Melee Parcel',
    subtitle: '100 Stones · 0.8–1.0mm · VVS',
    category: 'loose-diamonds',
    price: 2450,
    priceDisplay: '$2,450',
    material: 'Diamond',
    diamondSpecs: {
      carat: '0.8–1.0mm each',
      cut: 'Ideal',
      color: 'D-E',
      clarity: 'VVS1-VVS2',
      shape: 'Round Brilliant',
      origin: 'Natural',
      certification: 'GIA Certified Parcel',
    },
    images: ['/images/products/loose-diamonds-collection.jpg', '/images/products/loose-round-diamond.jpg'],
    description: 'A premium parcel of 100 round brilliant melee diamonds, each stone hand-selected for consistent fire and brilliance. VVS clarity ensures eye-clean perfection ideal for pavé settings and halo designs.',
    features: ['100 matched stones', 'VVS clarity grade', 'Calibrated sizing', 'Parcel certificate', 'Trade pricing available'],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 'fancy-cut-parcel',
    slug: 'fancy-cut-parcel',
    name: 'Fancy Shape Mixed Parcel',
    subtitle: '75 Stones · Princess, Emerald, Marquise',
    category: 'loose-diamonds',
    price: 3800,
    priceDisplay: '$3,800',
    material: 'Diamond',
    diamondSpecs: {
      carat: '1.0–1.5mm each',
      cut: 'Excellent',
      color: 'E-F',
      clarity: 'VS1-VS2',
      shape: 'Mixed Fancy',
      origin: 'Natural',
      certification: 'GIA Certified Parcel',
    },
    images: ['/images/products/loose-round-diamond.jpg', '/images/products/loose-pear-diamond.jpg'],
    description: 'A curated assortment of 75 fancy-shaped melee diamonds including princess, emerald, and marquise cuts. Each stone is precision-cut and color-matched, perfect for designers seeking variety within a single quality-matched parcel.',
    features: ['75 mixed shapes', 'Color-matched set', 'Individual sorting', 'Designer grade', 'Bulk pricing'],
    inStock: true,
  },
  {
    id: 'collector-certified-stone',
    slug: 'collector-certified-stone',
    name: 'Certified Collector Stone',
    subtitle: '2.01ct · D/IF · Triple Excellent',
    category: 'loose-diamonds',
    price: 12500,
    priceDisplay: '$12,500',
    material: 'Diamond',
    diamondSpecs: {
      carat: '2.01',
      cut: 'Excellent',
      color: 'D',
      clarity: 'IF',
      shape: 'Round Brilliant',
      origin: 'Natural',
      certification: 'GIA 2225891034',
    },
    images: ['/images/products/loose-diamond-tweezers.jpg', '/images/products/loose-round-diamond.jpg'],
    description: 'An exceptional 2.01-carat round brilliant diamond graded D color, Internally Flawless, with Triple Excellent cut grades. This is a collector-grade stone suitable for investment or as the centerpiece of a bespoke creation.',
    features: ['D/IF grading', 'Triple Excellent', 'GIA certified', 'Laser inscribed', 'Investment grade'],
    inStock: true,
    isLimited: true,
  },

  // ═══════════════════════════════════════
  // WEDDING & BRIDAL ($3K-$35K)
  // ═══════════════════════════════════════
  {
    id: 'custom-engagement-setting',
    slug: 'custom-engagement-setting',
    name: 'Custom Engagement Ring',
    subtitle: 'Design Your Own · Starting at $3,000',
    category: 'wedding-bridal',
    price: 3000,
    priceDisplay: 'From $3,000',
    material: 'Diamond & Gold',
    goldKarat: '18K',
    goldColor: 'White',
    diamondSpecs: {
      carat: 'Choose your stone',
      cut: 'Ideal to Excellent',
      color: 'D-H range',
      clarity: 'IF-VS2 range',
      shape: 'Any shape',
      origin: 'Natural',
      certification: 'GIA Certified',
    },
    images: ['/images/products/classic-engagement-ring.jpg', '/images/products/diamond-wedding-ring.jpg'],
    description: 'Begin your forever with a custom engagement ring designed to your exact specifications. Choose your diamond, select your setting style, and pick your metal. Our master jewelers bring your vision to life with a 6-8 week turnaround.',
    features: ['Custom design consultation', 'Choose your diamond', '3D CAD rendering', '6-8 week creation', 'Lifetime warranty'],
    inStock: true,
    isBestseller: true,
  },
  {
    id: 'legacy-diamond-choker',
    slug: 'legacy-diamond-choker',
    name: 'Legacy Bridal Choker',
    subtitle: '12ct Total · Platinum · Heirloom',
    category: 'wedding-bridal',
    price: 35000,
    priceDisplay: '$35,000',
    material: 'Platinum',
    diamondSpecs: {
      carat: '12.00 total',
      cut: 'Excellent',
      color: 'D-E',
      clarity: 'VVS1-VVS2',
      shape: 'Mixed',
      origin: 'Natural',
      certification: 'GIA Certified',
    },
    images: ['/images/products/diamond-halo-pendant.jpg', '/images/products/diamond-chandelier-earrings.jpg'],
    description: 'A breathtaking bridal choker featuring 12 carats of diamonds set in platinum. Designed as a future heirloom, this piece combines a central pear-shaped diamond with graduated round brilliants and baguette accents in an Art Deco-inspired design.',
    features: ['Heirloom quality', 'Art Deco design', 'Platinum setting', 'Custom fitting', 'Heritage documentation'],
    inStock: true,
    isLimited: true,
  },
  {
    id: 'brilliance-eternity-band',
    slug: 'brilliance-eternity-band',
    name: 'Brilliance Wedding Band Set',
    subtitle: 'His & Hers · 18K Gold',
    category: 'wedding-bridal',
    price: 4800,
    priceDisplay: '$4,800',
    material: 'Diamond & Gold',
    goldKarat: '18K',
    goldColor: 'Yellow',
    diamondSpecs: {
      carat: '0.75 total (hers)',
      cut: 'Ideal',
      color: 'F',
      clarity: 'VS1',
      shape: 'Round Brilliant',
      origin: 'Natural',
      certification: 'GIA Certified',
    },
    images: ['/images/products/classic-wedding-bands.jpg', '/images/products/wedding-rings-pair.jpg'],
    description: 'A perfectly matched wedding band set in 18K yellow gold. Hers features a half-eternity diamond band with 0.75ct total weight, while his is a classic 5mm comfort-fit band with a brushed finish. Both are engraved with matching serial numbers.',
    features: ['Matched serial numbers', 'His: 5mm comfort-fit', 'Hers: half-eternity', 'Custom engraving', 'Presentation box'],
    inStock: true,
    isBestseller: true,
  },
]

// ═══════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id || p.slug === id)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller)
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew)
}

export function getLimitedEditions(): Product[] {
  return products.filter((p) => p.isLimited)
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = getProduct(productId)
  if (!product) return []
  return products
    .filter((p) => p.category === product.category && p.id !== productId)
    .slice(0, limit)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
