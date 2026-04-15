'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuthStore } from '@/store/auth'
import { useCartStore } from '@/store/cart'
import { type ConceptConfig } from '@/data/concepts'

interface AuthModalProps {
  concept: ConceptConfig
}

type AuthTab = 'signin' | 'register'

export function AuthModal({ concept }: AuthModalProps) {
  const { isAuthModalOpen, closeAuthModal, setUser } = useAuthStore()
  const { syncWithServer: syncCart, addToast } = useCartStore()
  const [tab, setTab] = useState<AuthTab>('signin')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAuthModal()
    }
    if (isAuthModalOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isAuthModalOpen, closeAuthModal])

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeAuthModal()
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setFullName('')
    setError(null)
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Use Supabase auth via our API
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Sign in failed')
      }

      const data = await res.json()
      setUser(data.user)
      closeAuthModal()
      resetForm()
      addToast('Welcome back!', 'success')
      // Sync cart/wishlist with server
      syncCart().catch(() => {})
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Registration failed')
      }

      const data = await res.json()
      setUser(data.user)
      closeAuthModal()
      resetForm()
      addToast('Account created successfully!', 'success')
      syncCart().catch(() => {})
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthModalOpen) return null

  const accent = concept.palette.accent
  const surface = concept.palette.surface
  const text = concept.palette.text
  const muted = concept.palette.muted
  const bg = concept.palette.bg

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md relative animate-fade-in"
        style={{
          backgroundColor: surface,
          color: text,
          fontFamily: concept.fonts.body,
        }}
      >
        {/* Close button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 opacity-50 hover:opacity-100 transition-opacity"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <h2
            className="text-2xl tracking-wider"
            style={{ fontFamily: concept.fonts.heading }}
          >
            {tab === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs mt-2 opacity-60 tracking-wide">
            {tab === 'signin'
              ? 'Sign in to access your collection'
              : 'Join Vault Maison for an exclusive experience'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex px-8 gap-6 border-b" style={{ borderColor: muted }}>
          <button
            onClick={() => { setTab('signin'); setError(null) }}
            className="pb-3 text-xs tracking-widest uppercase transition-all"
            style={{
              borderBottom: tab === 'signin' ? `2px solid ${accent}` : '2px solid transparent',
              opacity: tab === 'signin' ? 1 : 0.5,
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('register'); setError(null) }}
            className="pb-3 text-xs tracking-widest uppercase transition-all"
            style={{
              borderBottom: tab === 'register' ? `2px solid ${accent}` : '2px solid transparent',
              opacity: tab === 'register' ? 1 : 0.5,
            }}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={tab === 'signin' ? handleSignIn : handleRegister}
          className="px-8 py-6 space-y-4"
        >
          {/* Error */}
          {error && (
            <div className="text-red-500 text-xs p-3 bg-red-50 rounded" style={{ backgroundColor: `${accent}10` }}>
              {error}
            </div>
          )}

          {/* Full Name (register only) */}
          {tab === 'register' && (
            <div>
              <label className="block text-xs tracking-wider uppercase mb-2 opacity-60">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-3 text-sm outline-none transition-all"
                style={{
                  backgroundColor: bg,
                  border: `1px solid ${muted}`,
                  color: text,
                }}
                placeholder="Your full name"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs tracking-wider uppercase mb-2 opacity-60">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm outline-none transition-all"
              style={{
                backgroundColor: bg,
                border: `1px solid ${muted}`,
                color: text,
              }}
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs tracking-wider uppercase mb-2 opacity-60">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 text-sm outline-none transition-all pr-12"
                style={{
                  backgroundColor: bg,
                  border: `1px solid ${muted}`,
                  color: text,
                }}
                placeholder="Min. 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password (register only) */}
          {tab === 'register' && (
            <div>
              <label className="block text-xs tracking-wider uppercase mb-2 opacity-60">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 text-sm outline-none transition-all"
                style={{
                  backgroundColor: bg,
                  border: `1px solid ${muted}`,
                  color: text,
                }}
                placeholder="Confirm your password"
              />
            </div>
          )}

          {/* Forgot password link */}
          {tab === 'signin' && (
            <div className="text-right">
              <button
                type="button"
                className="text-xs tracking-wide opacity-50 hover:opacity-100 transition-opacity"
                style={{ color: accent }}
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 text-xs tracking-widest uppercase font-medium transition-all
              disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ backgroundColor: accent, color: bg }}
          >
            {isLoading && <Loader2 size={14} className="animate-spin" />}
            {tab === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div className="px-8 pb-8">
          <p className="text-[10px] text-center opacity-40 tracking-wide">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
