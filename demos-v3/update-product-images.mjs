// Map product slugs to their best matching images from /images/products/
const imageMap = {
  'celestial-diamond-ring': ['/images/products/diamond-solitaire-ring.jpg', '/images/products/diamond-round-ring.jpg'],
  'aurora-cocktail-ring': ['/images/products/diamond-round-ring.jpg', '/images/products/diamond-solitaire-ring.jpg'],
  'eternity-diamond-band': ['/images/products/diamond-eternity-ring.jpg', '/images/products/diamond-wedding-ring.jpg'],
  'aurora-pendant-necklace': ['/images/products/diamond-pendant-necklace.jpg', '/images/products/classic-pendant.jpg'],
  'riviere-diamond-necklace': ['/images/products/diamond-halo-pendant.jpg', '/images/products/diamond-pendant-necklace.jpg'],
  'solitaire-pendant': ['/images/products/classic-pendant.jpg', '/images/products/diamond-pendant-necklace.jpg'],
  'classic-diamond-studs': ['/images/products/classic-diamond-studs.jpg', '/images/products/diamond-stud-earrings.jpg'],
  'chandelier-diamond-earrings': ['/images/products/diamond-chandelier-earrings.jpg', '/images/products/chandelier-earrings-white.jpg'],
  'diamond-hoop-earrings': ['/images/products/gold-hoop-earrings.jpg', '/images/products/gold-mini-hoops.jpg'],
  'eternal-tennis-bracelet': ['/images/products/diamond-tennis-bracelet.jpg', '/images/products/classic-tennis-bracelet.jpg'],
  'diamond-bangle': ['/images/products/gold-bangle-bracelet.jpg', '/images/products/bracelet-on-wrist.jpg'],
  'diamond-cuff-bracelet': ['/images/products/gold-cuff-bracelet.jpg', '/images/products/gold-chain-bracelet.jpg'],
  'heritage-signet-ring': ['/images/products/gold-signet-ring.jpg', '/images/products/classic-gold-ring.jpg'],
  'minimalist-gold-band': ['/images/products/gold-minimalist-ring.jpg', '/images/products/classic-gold-ring.jpg'],
  'statement-gold-ring': ['/images/products/classic-gold-ring.jpg', '/images/products/gold-signet-ring.jpg'],
  'sovereign-gold-chain': ['/images/products/gold-chain-necklace.jpg', '/images/products/gold-pendant-necklace.jpg'],
  'layered-gold-necklace': ['/images/products/gold-pendant-necklace.jpg', '/images/products/gold-chain-necklace.jpg'],
  'gold-pendant-necklace': ['/images/products/gold-pendant-necklace.jpg', '/images/products/heart-pendant.jpg'],
  'infinity-hoop-earrings': ['/images/products/gold-hoop-earrings.jpg', '/images/products/gold-mini-hoops.jpg'],
  'gold-huggie-earrings': ['/images/products/gold-mini-hoops.jpg', '/images/products/gold-stud-earrings.jpg'],
  'gold-statement-earrings': ['/images/products/statement-earrings.jpg', '/images/products/gold-hoop-earrings.jpg'],
  'gold-bangle-bracelet': ['/images/products/gold-bangle-bracelet.jpg', '/images/products/gold-bangles-set.jpg'],
  'gold-link-bracelet': ['/images/products/gold-chain-bracelet.jpg', '/images/products/bracelet-on-wrist.jpg'],
  'gold-cuff-bracelet': ['/images/products/gold-cuff-bracelet.jpg', '/images/products/gold-bangle-bracelet.jpg'],
  'round-melee-parcel-vvs': ['/images/products/loose-diamonds-collection.jpg', '/images/products/loose-round-diamond.jpg'],
  'fancy-cut-parcel': ['/images/products/loose-round-diamond.jpg', '/images/products/loose-pear-diamond.jpg'],
  'collector-certified-stone': ['/images/products/loose-diamond-tweezers.jpg', '/images/products/loose-round-diamond.jpg'],
  'custom-engagement-setting': ['/images/products/classic-engagement-ring.jpg', '/images/products/diamond-wedding-ring.jpg'],
  'legacy-diamond-choker': ['/images/products/diamond-halo-pendant.jpg', '/images/products/diamond-chandelier-earrings.jpg'],
  'brilliance-eternity-band': ['/images/products/classic-wedding-bands.jpg', '/images/products/wedding-rings-pair.jpg'],
};

import { readFileSync, writeFileSync } from 'fs';

let content = readFileSync('src/data/products.ts', 'utf-8');

for (const [slug, images] of Object.entries(imageMap)) {
  // Find the images array for this product and replace it
  const regex = new RegExp(
    `(slug: '${slug}'[\\s\\S]*?images: \\[)[^\\]]+\\]`,
    'g'
  );
  const replacement = `$1${images.map(i => `'${i}'`).join(', ')}]`;
  content = content.replace(regex, replacement);
}

writeFileSync('src/data/products.ts', content);
console.log('Updated all product image paths');
