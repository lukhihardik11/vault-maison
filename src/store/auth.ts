'use client'

import { create } from 'zustand'

interface User {
  id: string
  email: string
  fullName?: string
  loyaltyTier?: string
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  isAuthModalOpen: boolean
  setUser: (user: User | null) => void
  fetchUser: () => Promise<void>
  signOut: () => Promise<void>
  openAuthModal: () => void
  closeAuthModal: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  isAuthModalOpen: false,

  setUser: (user) => set({ user, isLoading: false }),

  fetchUser: async () => {
    try {
      const res = await fetch('/api/auth/profile')
      if (res.ok) {
        const data = await res.json()
        set({ user: data.user, isLoading: false })
      } else {
        set({ user: null, isLoading: false })
      }
    } catch {
      set({ user: null, isLoading: false })
    }
  },

  signOut: async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' })
    } catch {
      // Silently fail
    }
    set({ user: null })
  },

  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
}))
