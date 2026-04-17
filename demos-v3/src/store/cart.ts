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
  timestamp: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  toasts: ToastItem[]
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
  getItemCount: () => number
  addToast: (message: string) => void
  removeToast: (id: string) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toasts: [],

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
        get().addToast(`${product.name} added to your collection`)
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }))
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

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },

      addToast: (message) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
        set((state) => ({
          toasts: [...state.toasts, { id, message, timestamp: Date.now() }],
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
    }),
    {
      name: 'vault-maison-cart',
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
)
