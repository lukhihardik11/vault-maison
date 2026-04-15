'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Product } from '@/data/products'

export interface CartItem {
  product: Product
  quantity: number
  size?: string
  metal?: string
}

interface ToastItem {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  timestamp: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  toasts: ToastItem[]
  isLoading: boolean

  addItem: (product: Product, size?: string, metal?: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateSize: (productId: string, size: string) => void
  updateMetal: (productId: string, metal: string) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotal: () => number
  getSubtotal: () => number
  getItemCount: () => number
  getShipping: (method?: string) => number
  getTax: () => number
  getGrandTotal: (shippingMethod?: string) => number
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void
  removeToast: (id: string) => void

  // Server sync
  syncWithServer: () => Promise<void>
  pushToServer: () => Promise<void>
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toasts: [],
      isLoading: false,

      addItem: (product, size, metal) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.size === size && i.metal === metal
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.size === size && i.metal === metal
                  ? { ...i, quantity: Math.min(i.quantity + 1, 10) }
                  : i
              ),
            }
          }
          return {
            items: [...state.items, { product, quantity: 1, size, metal }],
          }
        })
        get().addToast(`${product.name} added to your collection`, 'success')
        get().pushToServer().catch(() => {})
      },

      removeItem: (productId) => {
        const item = get().items.find((i) => i.product.id === productId)
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }))
        if (item) get().addToast(`${item.product.name} removed from cart`, 'info')
        get().pushToServer().catch(() => {})
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId
              ? { ...i, quantity: Math.min(quantity, 10) }
              : i
          ),
        }))
      },

      updateSize: (productId, size) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, size } : i
          ),
        }))
      },

      updateMetal: (productId, metal) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, metal } : i
          ),
        }))
      },

      clearCart: () => {
        set({ items: [] })
        get().pushToServer().catch(() => {})
      },
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },

      getShipping: (method = 'standard') => {
        const subtotal = get().getSubtotal()
        if (subtotal >= 500) return 0
        switch (method) {
          case 'express': return 15
          case 'priority': return 30
          default: return 0
        }
      },

      getTax: () => get().getSubtotal() * 0.08,

      getGrandTotal: (shippingMethod = 'standard') => {
        return get().getSubtotal() + get().getShipping(shippingMethod) + get().getTax()
      },

      addToast: (message, type = 'success') => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
        set((state) => ({
          toasts: [...state.toasts.slice(-2), { id, message, type, timestamp: Date.now() }],
        }))
        setTimeout(() => {
          get().removeToast(id)
        }, 3000)
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }))
      },

      syncWithServer: async () => {
        try {
          set({ isLoading: true })
          const res = await fetch('/api/cart')
          if (res.ok) {
            const data = await res.json()
            if (data.items?.length) {
              // Server has items — could merge with local
            }
          }
        } catch {
          // Silently fail — local data is the fallback
        } finally {
          set({ isLoading: false })
        }
      },

      pushToServer: async () => {
        try {
          const items = get().items.map((i) => ({
            productId: i.product.id,
            productName: i.product.name,
            productImage: i.product.images?.[0] || '',
            price: i.product.price,
            quantity: i.quantity,
            size: i.size,
            metal: i.metal,
          }))
          await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items }),
          })
        } catch {
          // Silently fail — local persistence is the fallback
        }
      },
    }),
    {
      name: 'vault-maison-cart',
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
)
