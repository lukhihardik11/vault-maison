'use client'

import { useState } from 'react'

interface ShareButtonProps {
  productName: string
  productUrl?: string
  accentColor?: string
  textColor?: string
}

export function ShareButton({ productName, productUrl, accentColor = '#D4AF37', textColor = '#EAEAEA' }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const url = productUrl || (typeof window !== 'undefined' ? window.location.href : '')
  const text = `Check out ${productName} from Vault Maison`

  const share = async (platform: string) => {
    switch (platform) {
      case 'copy':
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'pinterest':
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`, '_blank')
        break
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`, '_blank')
        break
    }
    setShowMenu(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 text-xs tracking-widest uppercase transition-colors duration-200"
        style={{ color: `${textColor}80` }}
        onMouseOver={e => (e.currentTarget.style.color = accentColor)}
        onMouseOut={e => (e.currentTarget.style.color = `${textColor}80`)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="4" cy="8" r="2" />
          <circle cx="12" cy="4" r="2" />
          <circle cx="12" cy="12" r="2" />
          <path d="M6 7L10 5M6 9L10 11" />
        </svg>
        Share
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div
            className="absolute right-0 top-full mt-2 w-48 py-2 z-50 shadow-xl"
            style={{ backgroundColor: '#1A1A1A', border: `1px solid ${accentColor}20` }}
          >
            {[
              { key: 'copy', label: copied ? 'Copied!' : 'Copy Link', icon: '🔗' },
              { key: 'email', label: 'Email', icon: '✉️' },
              { key: 'twitter', label: 'X (Twitter)', icon: '𝕏' },
              { key: 'facebook', label: 'Facebook', icon: 'f' },
              { key: 'pinterest', label: 'Pinterest', icon: 'P' },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => share(item.key)}
                className="w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors duration-150"
                style={{ color: textColor }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = `${accentColor}10`)}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span className="w-5 text-center text-xs">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
