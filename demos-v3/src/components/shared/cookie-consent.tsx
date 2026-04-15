'use client'

import { useState, useEffect } from 'react'

interface CookieConsentProps {
  accentColor?: string
  bgColor?: string
  textColor?: string
}

export function CookieConsent({ accentColor = '#D4AF37', bgColor = '#1A1A1A', textColor = '#EAEAEA' }: CookieConsentProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('vm_cookie_consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('vm_cookie_consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('vm_cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 transition-transform duration-500"
      style={{
        backgroundColor: bgColor,
        borderTop: `1px solid ${accentColor}30`,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm leading-relaxed" style={{ color: `${textColor}CC` }}>
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking &quot;Accept All&quot;, you consent to our use of cookies.{' '}
            <a href="#" className="underline" style={{ color: accentColor }}>
              Privacy Policy
            </a>
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2 text-xs tracking-widest uppercase border transition-colors duration-200"
            style={{ borderColor: `${textColor}40`, color: textColor }}
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-xs tracking-widest uppercase transition-colors duration-200"
            style={{ backgroundColor: accentColor, color: bgColor }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
