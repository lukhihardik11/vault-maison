'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Product } from '@/data/products'

interface WishlistStore {
  items: Product[]
  isLoading: boolean
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  toggleItem: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  syncWithServer: () => Promise<void>
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addItem: (product) => {
        set((state) => {
          if (state.items.find((i) => i.id === product.id)) return state
          return { items: [...state.items, product] }
        })
        // Fire-and-forget server sync
        fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product.id }),
        }).catch(() => {})
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        }))
        fetch(`/api/wishlist?productId=${productId}`, {
          method: 'DELETE',
        }).catch(() => {})
      },

      toggleItem: (product) => {
        const exists = get().items.find((i) => i.id === product.id)
        if (exists) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((i) => i.id === productId)
      },

      clearWishlist: () => set({ items: [] }),

      syncWithServer: async () => {
        try {
          set({ isLoading: true })
          const res = await fetch('/api/wishlist')
          if (res.ok) {
            const data = await res.json()
            if (data.items?.length) {
              // Server returns wishlist items - would need to map back to Product objects
              // For now, server sync is best-effort
            }
          }
        } catch {
          // Silently fail
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'vault-maison-wishlist',
    }
  )
)
