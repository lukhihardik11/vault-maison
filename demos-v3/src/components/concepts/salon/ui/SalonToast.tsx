'use client'

import React, { useState, useEffect, useCallback, useId } from 'react'
import { X, ShoppingBag, Heart, MessageCircle } from 'lucide-react'

interface ToastMessage {
  icon: 'bag' | 'heart' | 'chat'
  text: string
}

interface SalonToastProps {
  messages: ToastMessage[]
  interval?: number
  initialDelay?: number
}

const iconMap = {
  bag: ShoppingBag,
  heart: Heart,
  chat: MessageCircle,
}

export function SalonToast({
  messages,
  interval = 12000,
  initialDelay = 5000,
}: SalonToastProps) {
  const uid = useId().replace(/:/g, '')
  const [current, setCurrent] = useState<ToastMessage | null>(null)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const showNext = useCallback(() => {
    if (dismissed) return
    const msg = messages[Math.floor(Math.random() * messages.length)]
    setCurrent(msg)
    setVisible(true)
    setTimeout(() => setVisible(false), 4000)
  }, [messages, dismissed])

  useEffect(() => {
    const initTimer = setTimeout(showNext, initialDelay)
    const loopTimer = setInterval(showNext, interval)
    return () => { clearTimeout(initTimer); clearInterval(loopTimer) }
  }, [showNext, initialDelay, interval])

  if (dismissed || !current) return null

  const Icon = iconMap[current.icon]

  return (
    <>
      <style>{`
        .st-${uid} {
          position: fixed;
          bottom: 100px;
          left: 24px;
          max-width: 320px;
          background: white;
          border: 1px solid #E8E0D4;
          border-radius: 12px;
          padding: 14px 40px 14px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          z-index: 9990;
          opacity: 0;
          transform: translateX(-20px) translateY(10px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        .st-${uid}.visible {
          opacity: 1;
          transform: translateX(0) translateY(0);
          pointer-events: auto;
        }
        .st-${uid} .st-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FDF6E9, #F5ECD9);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #8B6914;
        }
        .st-${uid} .st-text {
          font-family: 'Lora', serif;
          font-size: 0.78rem;
          color: #2D2A26;
          line-height: 1.4;
        }
        .st-${uid} .st-close {
          position: absolute;
          top: 8px;
          right: 8px;
          background: none;
          border: none;
          color: #B8B0A4;
          cursor: pointer;
          padding: 2px;
          display: flex;
          transition: color 0.2s;
        }
        .st-${uid} .st-close:hover { color: #2D2A26; }
        .st-${uid} .st-time {
          font-family: Inter, sans-serif;
          font-size: 0.6rem;
          color: #B8B0A4;
          margin-top: 2px;
        }
      `}</style>
      <div className={`st-${uid} ${visible ? 'visible' : ''}`}>
        <div className="st-icon"><Icon size={16} /></div>
        <div>
          <div className="st-text">{current.text}</div>
          <div className="st-time">Just now</div>
        </div>
        <button className="st-close" onClick={() => setDismissed(true)}>
          <X size={14} />
        </button>
      </div>
    </>
  )
}
