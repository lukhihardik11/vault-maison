"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Shield, Gem, Award, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const GOLD = '#D4AF37';
const BG = '#0A0A0A';
const SURFACE = '#141414';
const TEXT = '#EAEAEA';

interface FeatureChip {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

const DEFAULT_CHIPS: FeatureChip[] = [
  { id: 1, title: "GIA Certified", description: "Every stone independently graded", icon: Shield },
  { id: 2, title: "Master Crafted", description: "Handmade by expert artisans", icon: Gem },
  { id: 3, title: "Lifetime Warranty", description: "Complimentary care forever", icon: Award },
  { id: 4, title: "Heritage Since 1972", description: "50+ years of excellence", icon: Clock },
];

interface VaultFeatureBucketProps {
  chips?: FeatureChip[];
  title?: string;
  subtitle?: string;
}

export function VaultFeatureBucket({
  chips = DEFAULT_CHIPS,
  title = "The Vault Promise",
  subtitle = "Every piece carries our uncompromising commitment",
}: VaultFeatureBucketProps) {
  const [items, setItems] = useState(chips);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 40, width: '100%', padding: '0 24px',
    }}>
      {/* Title */}
      <div style={{ textAlign: 'center' }}>
        <span style={{
          fontSize: 11, letterSpacing: '0.3em', color: GOLD,
          textTransform: 'uppercase', fontWeight: 500,
        }}>
          {subtitle}
        </span>
        <h2 style={{
          fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 400, color: TEXT, marginTop: 12,
        }}>
          {title}
        </h2>
      </div>

      {/* Bucket Visual */}
      <div style={{
        position: 'relative', width: '100%', maxWidth: 680,
        aspectRatio: isMobile ? '1/0.8' : '655/420',
      }}>
        {/* 3D Isometric Bucket SVG */}
        <svg
          width="100%"
          height="60%"
          viewBox="0 0 655 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
        >
          {/* Bucket body - dark with gold accents */}
          <defs>
            <linearGradient id="vaultBucketGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(212,175,55,0.15)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0.03)" />
            </linearGradient>
            <linearGradient id="vaultBucketTop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(212,175,55,0.08)" />
              <stop offset="50%" stopColor="rgba(212,175,55,0.2)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0.08)" />
            </linearGradient>
            <filter id="vaultGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Back flap left */}
          <path
            d="M123 80L56 32C48 27 44 39 44 42L123 80Z"
            fill="rgba(212,175,55,0.06)"
            stroke="rgba(212,175,55,0.15)"
            strokeWidth="0.5"
          />
          {/* Back flap right */}
          <path
            d="M536 79L590 24C604 32 611 36 610 42L536 79Z"
            fill="rgba(212,175,55,0.06)"
            stroke="rgba(212,175,55,0.15)"
            strokeWidth="0.5"
          />
          {/* Top face */}
          <path
            d="M488 43L172 43L123 79L536 79L488 43Z"
            fill="url(#vaultBucketTop)"
            stroke="rgba(212,175,55,0.2)"
            strokeWidth="0.5"
          />
          {/* Left triangle */}
          <path
            d="M172 79V43L123 79L172 79Z"
            fill="rgba(212,175,55,0.04)"
            stroke="rgba(212,175,55,0.12)"
            strokeWidth="0.5"
          />
          {/* Right triangle */}
          <path
            d="M488 79V43L536 79L488 79Z"
            fill="rgba(212,175,55,0.04)"
            stroke="rgba(212,175,55,0.12)"
            strokeWidth="0.5"
          />
          {/* Main bucket front */}
          <rect
            x="124"
            y="79"
            width="412"
            height="190"
            rx="4"
            fill="url(#vaultBucketGrad)"
            stroke="rgba(212,175,55,0.12)"
            strokeWidth="0.5"
          />
          {/* Inner glow line */}
          <line x1="124" y1="82" x2="536" y2="82" stroke="rgba(212,175,55,0.15)" strokeWidth="0.5" />
          {/* Gold accent line at bottom */}
          <line x1="160" y1="260" x2="500" y2="260" stroke={GOLD} strokeWidth="1" opacity="0.3" />
        </svg>

        {/* Floating Feature Chips */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: isMobile ? '100%' : '80%',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 8, zIndex: 10,
        }}>
          <AnimatePresence mode="popLayout">
            {items.map((chip, index) => (
              <motion.div
                key={chip.id}
                layout
                initial={{ opacity: 0, y: -30, scale: 0.9 }}
                animate={{
                  opacity: index === 0 ? 1 : Math.max(0.3, 1 - index * 0.25),
                  y: 0,
                  scale: index === 0 ? 1 : Math.max(0.85, 1 - index * 0.05),
                }}
                exit={{ opacity: 0, y: 40, scale: 0.8 }}
                transition={{
                  type: "spring", stiffness: 300, damping: 25,
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                }}
                style={{
                  width: '100%', maxWidth: 420,
                  padding: isMobile ? '14px 18px' : '16px 24px',
                  borderRadius: 10,
                  backgroundColor: index === 0 ? 'rgba(212,175,55,0.08)' : 'rgba(20,20,20,0.8)',
                  border: `1px solid ${index === 0 ? 'rgba(212,175,55,0.3)' : 'rgba(212,175,55,0.08)'}`,
                  backdropFilter: 'blur(12px)',
                  display: 'flex', alignItems: 'center', gap: 16,
                  boxShadow: index === 0
                    ? '0 8px 32px rgba(212,175,55,0.1), 0 0 0 1px rgba(212,175,55,0.1)'
                    : '0 4px 16px rgba(0,0,0,0.3)',
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  backgroundColor: index === 0 ? 'rgba(212,175,55,0.15)' : 'rgba(212,175,55,0.05)',
                  border: `1px solid ${index === 0 ? 'rgba(212,175,55,0.3)' : 'rgba(212,175,55,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {React.createElement(chip.icon, { size: 18, color: GOLD })}
                </div>
                <div>
                  <div style={{
                    fontSize: 14, fontWeight: 500, color: TEXT,
                    fontFamily: 'Inter, sans-serif', marginBottom: 2,
                  }}>
                    {chip.title}
                  </div>
                  <div style={{
                    fontSize: 12, color: 'rgba(234,234,234,0.45)',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    {chip.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
