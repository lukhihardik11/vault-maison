'use client'

import { MinimalPage } from '../MinimalPage'
import { MinimalProductGrid } from '../MinimalProductGrid'
import { categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'

interface MinimalCategoryProps {
  category: ProductCategory
}

export function MinimalCategory({ category }: MinimalCategoryProps) {
  const products = getProductsByCategory(category)
  const label = categoryLabels[category]
  const description = categoryDescriptions[category]

  return (
    <MinimalPage title={label} subtitle={description}>
      <MinimalProductGrid products={products} />
    </MinimalPage>
  )
}
