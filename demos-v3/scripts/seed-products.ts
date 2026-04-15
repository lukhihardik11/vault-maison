/**
 * Vault Maison — Product Seed Script
 * 
 * This script reads the existing products from src/data/products.ts
 * and generates SQL INSERT statements for the Supabase products table.
 * 
 * Usage:
 *   npx tsx scripts/seed-products.ts > supabase/migrations/002_seed_products.sql
 * 
 * Or run directly against Supabase:
 *   npx tsx scripts/seed-products.ts | npx supabase db push
 */

// We import the products directly from the data file
import { products } from '../src/data/products'

function escapeSQL(str: string): string {
  return str.replace(/'/g, "''")
}

function arrayToSQL(arr: string[]): string {
  const escaped = arr.map(s => `"${escapeSQL(s)}"`).join(',')
  return `'{${escaped}}'`
}

console.log('-- ═══════════════════════════════════════════════════════════════')
console.log('-- Vault Maison: Product Seed Data')
console.log(`-- Generated: ${new Date().toISOString()}`)
console.log(`-- Products: ${products.length}`)
console.log('-- ═══════════════════════════════════════════════════════════════')
console.log('')

for (const p of products) {
  const slug = escapeSQL(p.slug)
  const name = escapeSQL(p.name)
  const subtitle = escapeSQL(p.subtitle || '')
  const description = escapeSQL(p.description || '')
  const category = escapeSQL(p.category)
  const material = escapeSQL(p.material)
  const features = arrayToSQL(p.features || [])
  const images = arrayToSQL(p.images || [])

  console.log(`INSERT INTO public.products (
  slug, name, subtitle, description, category, base_price, material,
  gold_karat, gold_color,
  diamond_carat, diamond_cut, diamond_color, diamond_clarity, diamond_shape, diamond_origin, diamond_certification,
  features, images,
  is_active, is_new, is_bestseller, is_limited, stock_quantity
) VALUES (
  '${slug}', '${name}', '${subtitle}', '${description}', '${category}', ${p.price}, '${material}',
  ${p.goldKarat ? `'${p.goldKarat}'` : 'NULL'}, ${p.goldColor ? `'${p.goldColor}'` : 'NULL'},
  ${p.diamondSpecs?.carat ? `'${p.diamondSpecs.carat}'` : 'NULL'}, ${p.diamondSpecs?.cut ? `'${escapeSQL(p.diamondSpecs.cut)}'` : 'NULL'}, ${p.diamondSpecs?.color ? `'${p.diamondSpecs.color}'` : 'NULL'}, ${p.diamondSpecs?.clarity ? `'${p.diamondSpecs.clarity}'` : 'NULL'}, ${p.diamondSpecs?.shape ? `'${escapeSQL(p.diamondSpecs.shape)}'` : 'NULL'}, ${p.diamondSpecs?.origin ? `'${p.diamondSpecs.origin}'` : 'NULL'}, ${p.diamondSpecs?.certification ? `'${escapeSQL(p.diamondSpecs.certification)}'` : 'NULL'},
  ${features}, ${images},
  true, ${p.isNew || false}, ${p.isBestseller || false}, ${p.isLimited || false}, ${p.inStock ? 10 : 0}
);`)
  console.log('')
}

console.log('-- Seed complete')
