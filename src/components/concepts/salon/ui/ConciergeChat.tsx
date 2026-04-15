'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react'
import { S } from '../SalonLayout'

interface ChatMessage {
  id: string
  sender: 'sophie' | 'user'
  text: string
  timestamp: Date
  products?: { name: string; price: string; image: string; href: string }[]
  quickActions?: string[]
}

const INITIAL_GREETING: ChatMessage = {
  id: '1',
  sender: 'sophie',
  text: "Welcome to Vault Maison. I'm Sophie, your personal advisor. I'd love to help you find something special today. ✨",
  timestamp: new Date(),
  quickActions: ['Find a gift', 'Engagement rings', 'Custom design', 'Just browsing'],
}

const CONVERSATION_FLOWS: Record<string, ChatMessage[]> = {
  'Find a gift': [
    {
      id: 'gift-1', sender: 'sophie', timestamp: new Date(),
      text: "How lovely! I'd be happy to help you find the perfect gift. What's the occasion?",
      quickActions: ['Birthday', 'Anniversary', 'Just because', 'Engagement'],
    },
  ],
  'Birthday': [
    {
      id: 'bday-1', sender: 'sophie', timestamp: new Date(),
      text: "A birthday gift — how thoughtful! Here are some of our most-loved pieces that make wonderful birthday surprises:",
      products: [
        { name: 'Diamond Stud Earrings', price: '$2,400', image: '/images/products/diamond-stud-earrings.jpg', href: '/salon/product/diamond-stud-earrings' },
        { name: 'Gold Chain Necklace', price: '$1,800', image: '/images/products/gold-chain-necklace.jpg', href: '/salon/product/gold-chain-necklace' },
      ],
    },
  ],
  'Anniversary': [
    {
      id: 'ann-1', sender: 'sophie', timestamp: new Date(),
      text: "An anniversary — how special! Here are some pieces that beautifully mark the occasion:",
      products: [
        { name: 'Diamond Tennis Bracelet', price: '$8,500', image: '/images/products/diamond-tennis-bracelet.jpg', href: '/salon/product/diamond-tennis-bracelet' },
        { name: 'Diamond Eternity Band', price: '$4,200', image: '/images/products/diamond-eternity-band.jpg', href: '/salon/product/diamond-eternity-band' },
      ],
    },
  ],
  'Engagement rings': [
    {
      id: 'eng-1', sender: 'sophie', timestamp: new Date(),
      text: "Congratulations! Finding the perfect engagement ring is such a meaningful journey. Let me show you some of our most breathtaking options:",
      products: [
        { name: 'Celestial Diamond Ring', price: '$12,500', image: '/images/products/diamond-solitaire-ring.jpg', href: '/salon/product/celestial-diamond-ring' },
        { name: 'Aurora Cocktail Ring', price: '$8,900', image: '/images/products/diamond-halo-ring.jpg', href: '/salon/product/aurora-cocktail-ring' },
      ],
      quickActions: ['Book a viewing', 'Tell me more', 'Custom design'],
    },
  ],
  'Custom design': [
    {
      id: 'custom-1', sender: 'sophie', timestamp: new Date(),
      text: "I love custom projects! Our bespoke service lets you create something truly one-of-a-kind. We'll work with you from initial sketch to the final setting. Would you like to schedule a consultation?",
      quickActions: ['Yes, schedule me', 'Tell me more', 'See examples'],
    },
  ],
  'Just browsing': [
    {
      id: 'browse-1', sender: 'sophie', timestamp: new Date(),
      text: "Of course! Take your time exploring. I'm right here if you need any guidance. Here are some pieces our clients have been loving lately:",
      products: [
        { name: 'Gold Hoop Earrings', price: '$950', image: '/images/products/gold-hoop-earrings.jpg', href: '/salon/product/gold-hoop-earrings' },
        { name: 'Diamond Pendant', price: '$3,200', image: '/images/products/diamond-pendant-necklace.jpg', href: '/salon/product/diamond-pendant-necklace' },
      ],
    },
  ],
  'Just because': [
    {
      id: 'jb-1', sender: 'sophie', timestamp: new Date(),
      text: "The best kind of gift! Something chosen with love, just because. Here are some beautiful options:",
      products: [
        { name: 'Gold Bangle Bracelet', price: '$2,100', image: '/images/products/gold-bangle-bracelet.jpg', href: '/salon/product/gold-bangle-bracelet' },
        { name: 'Gold Signet Ring', price: '$1,400', image: '/images/products/gold-signet-ring.jpg', href: '/salon/product/gold-signet-ring' },
      ],
    },
  ],
  'default': [
    {
      id: 'def-1', sender: 'sophie', timestamp: new Date(),
      text: "That sounds wonderful! I'd be happy to help. Would you like me to show you some options, or would you prefer to schedule a private consultation?",
      quickActions: ['Show me options', 'Schedule consultation', 'Just browsing'],
    },
  ],
}

export function ConciergeChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const addSophieResponse = (action: string) => {
    setIsTyping(true)
    const delay = 600 + Math.random() * 800

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: action,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])

    // Sophie responds after delay
    setTimeout(() => {
      const flow = CONVERSATION_FLOWS[action] || CONVERSATION_FLOWS['default']
      setMessages(prev => [...prev, ...flow.map(m => ({ ...m, id: `${m.id}-${Date.now()}`, timestamp: new Date() }))])
      setIsTyping(false)
    }, delay)
  }

  const handleSend = () => {
    if (!inputValue.trim()) return
    addSophieResponse(inputValue.trim())
    setInputValue('')
  }

  return (
    <>
      {/* Floating bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="salon-chat-bubble"
          style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
            width: 60, height: 60, borderRadius: '50%',
            background: `linear-gradient(135deg, ${S.accent}, ${S.accentHover})`,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 24px rgba(184, 134, 11, 0.3)`,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <MessageCircle size={24} color="#fff" />
          {/* Online indicator */}
          <div style={{
            position: 'absolute', top: 2, right: 2,
            width: 14, height: 14, borderRadius: '50%',
            background: S.success, border: '2px solid #fff',
          }} />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
          width: 380, maxHeight: 560,
          background: S.bg, borderRadius: S.radiusLg,
          boxShadow: `0 20px 60px rgba(44, 36, 32, 0.2)`,
          border: `1px solid ${S.border}`,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          animation: 'salonChatSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: S.surface,
            borderBottom: `1px solid ${S.border}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: `linear-gradient(135deg, ${S.accent}, ${S.accentHover})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.9rem', fontFamily: "'Cormorant Garamond', serif",
              color: '#fff', fontWeight: 400,
            }}>
              S
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 400, color: S.text, margin: 0 }}>
                Sophie
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: S.success, margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: S.success, display: 'inline-block' }} />
                Online now
              </p>
            </div>
            <button onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: S.textSecondary, cursor: 'pointer', padding: 4 }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px 16px 8px',
            maxHeight: 380,
          }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ marginBottom: 12 }}>
                {/* Message bubble */}
                <div style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: msg.sender === 'user'
                      ? `${S.radius} ${S.radius} 4px ${S.radius}`
                      : `${S.radius} ${S.radius} ${S.radius} 4px`,
                    background: msg.sender === 'user' ? S.chatBubbleYou : S.chatBubbleThem,
                    color: msg.sender === 'user' ? '#FFFFFF' : S.text,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.82rem',
                    lineHeight: 1.6,
                  }}>
                    {msg.text}
                  </div>
                </div>

                {/* Product cards in chat */}
                {msg.products && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 8, overflowX: 'auto', paddingBottom: 4 }}>
                    {msg.products.map((product, i) => (
                      <a key={i} href={product.href} style={{ textDecoration: 'none', color: 'inherit', flexShrink: 0 }}>
                        <div style={{
                          width: 140, background: S.surface, borderRadius: S.radiusSm,
                          border: `1px solid ${S.border}`, overflow: 'hidden',
                          transition: 'all 0.3s',
                        }}
                          className="salon-chat-product"
                        >
                          <div style={{ width: 140, height: 120, background: S.warmPanel, overflow: 'hidden' }}>
                            <img src={product.image} alt={product.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ padding: '8px 10px' }}>
                            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: S.text, margin: '0 0 2px', lineHeight: 1.2 }}>
                              {product.name}
                            </p>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: S.accent, margin: 0, fontWeight: 500 }}>
                              {product.price}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                {/* Quick actions */}
                {msg.quickActions && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    {msg.quickActions.map((action) => (
                      <button key={action}
                        onClick={() => addSophieResponse(action)}
                        style={{
                          fontFamily: 'Inter, sans-serif', fontSize: '0.7rem',
                          padding: '8px 14px', borderRadius: 20,
                          background: S.surface, border: `1px solid ${S.border}`,
                          color: S.text, cursor: 'pointer',
                          transition: 'all 0.3s',
                          display: 'flex', alignItems: 'center', gap: 4,
                        }}
                        className="salon-chat-quick-action"
                      >
                        {action} <ChevronRight size={12} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
                <div style={{
                  padding: '12px 16px', borderRadius: `${S.radius} ${S.radius} ${S.radius} 4px`,
                  background: S.chatBubbleThem,
                }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} style={{
                        width: 7, height: 7, borderRadius: '50%', background: S.textSecondary,
                        animation: `salonTypingDot 1.2s ${i * 0.2}s infinite`,
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 16px',
            borderTop: `1px solid ${S.border}`,
            background: S.surface,
            display: 'flex', gap: 8,
          }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
              style={{
                flex: 1, padding: '10px 14px',
                fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
                color: S.text, background: S.bg,
                border: `1px solid ${S.border}`, borderRadius: 24,
                outline: 'none', transition: 'border-color 0.3s',
              }}
            />
            <button onClick={handleSend}
              style={{
                width: 38, height: 38, borderRadius: '50%',
                background: inputValue.trim() ? S.accent : S.border,
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s',
              }}>
              <Send size={16} color="#fff" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes salonChatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes salonTypingDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
        .salon-chat-bubble:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 32px rgba(184, 134, 11, 0.4);
        }
        .salon-chat-quick-action:hover {
          background: ${S.accentSoft} !important;
          border-color: ${S.accent} !important;
          color: ${S.accent} !important;
        }
        .salon-chat-product:hover {
          border-color: ${S.accent}40 !important;
          box-shadow: 0 4px 12px ${S.shadow};
        }
      `}</style>
    </>
  )
}
