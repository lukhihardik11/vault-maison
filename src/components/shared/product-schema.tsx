import { type Product } from '@/data/products'

interface ProductSchemaProps {
  product: Product
  conceptId: string
}

export function ProductSchema({ product, conceptId }: ProductSchemaProps) {
  const baseUrl = 'https://vault-maison.vercel.app'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map(img => `${baseUrl}${img}`),
    brand: {
      '@type': 'Brand',
      name: 'Vault Maison',
    },
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/${conceptId}/product/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Vault Maison',
      },
    },
    material: product.material,
    category: product.category,
    sku: product.id,
    ...(product.isNew && { additionalProperty: { '@type': 'PropertyValue', name: 'New Arrival', value: 'true' } }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
