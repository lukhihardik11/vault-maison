'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Product } from '@/data/products'

interface RecentlyViewedState {
  items: Product[]
  addItem: (product: Product) => void
  getItems: (limit?: number) => Product[]
  clear: () => void
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const filtered = state.items.filter((p) => p.id !== product.id)
          return { items: [product, ...filtered].slice(0, 20) }
        })
      },

      getItems: (limit = 8) => {
        return get().items.slice(0, limit)
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: 'vault-maison-recently-viewed',
    }
  )
)
