"use client";

import * as RdxHoverCard from "@radix-ui/react-hover-card";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'

function useHoverState(followMouse: boolean) {
  const [isPeeking, setPeeking] = useState(false);
  const mouseX = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 20 };
  const followX = useSpring(mouseX, springConfig);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!followMouse) return;
      const target = event.currentTarget;
      const targetRect = target.getBoundingClientRect();
      const eventOffsetX = event.clientX - targetRect.left;
      const offsetFromCenter = (eventOffsetX - targetRect.width / 2) * 0.3;
      mouseX.set(offsetFromCenter);
    },
    [mouseX, followMouse]
  );

  const handleOpenChange = useCallback((open: boolean) => {
    setPeeking(open);
    if (!open) mouseX.set(0);
  }, [mouseX]);

  return { isPeeking, handleOpenChange, handlePointerMove, followX };
}

type VaultHoverPeekProps = {
  children: React.ReactNode;
  imageSrc: string;
  label?: string;
  peekWidth?: number;
  peekHeight?: number;
  enableMouseFollow?: boolean;
  className?: string;
};

export function VaultHoverPeek({
  children,
  imageSrc,
  label,
  peekWidth = 280,
  peekHeight = 200,
  enableMouseFollow = true,
  className,
}: VaultHoverPeekProps) {
  const [imageLoadFailed, setImageLoadFailed] = useState(false);
  const { isPeeking, handleOpenChange, handlePointerMove, followX } = useHoverState(enableMouseFollow);

  useEffect(() => {
    setImageLoadFailed(false);
  }, [imageSrc]);

  useEffect(() => {
    if (!isPeeking) setImageLoadFailed(false);
  }, [isPeeking]);

  const cardMotionVariants = {
    initial: { opacity: 0, y: 8, scale: 0.96 },
    animate: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 22 }
    },
    exit: { opacity: 0, y: 8, scale: 0.96, transition: { duration: 0.15 } },
  };

  const triggerChild = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        className: [
          (children.props as Record<string, unknown>).className || '',
          className || ''
        ].filter(Boolean).join(' '),
        onPointerMove: handlePointerMove,
      })
    : <span className={className} onPointerMove={handlePointerMove}>{children}</span>;

  return (
    <RdxHoverCard.Root
      openDelay={100}
      closeDelay={200}
      onOpenChange={handleOpenChange}
    >
      <RdxHoverCard.Trigger asChild>
        {triggerChild}
      </RdxHoverCard.Trigger>

      <RdxHoverCard.Portal>
        <RdxHoverCard.Content
          className="z-50"
          side="top"
          align="center"
          sideOffset={14}
          style={{ perspective: '800px' }}
        >
          <AnimatePresence>
            {isPeeking && (
              <motion.div
                variants={cardMotionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  x: enableMouseFollow ? followX : 0,
                  pointerEvents: 'auto',
                }}
              >
                <div
                  style={{
                    width: peekWidth,
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor: SURFACE,
                    border: `1px solid rgba(212,175,55,0.2)`,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(212,175,55,0.08)`,
                  }}
                >
                  {imageLoadFailed ? (
                    <div
                      style={{
                        width: peekWidth,
                        height: peekHeight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: BG,
                        color: 'rgba(234,234,234,0.3)',
                        fontSize: 12,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      Preview unavailable
                    </div>
                  ) : (
                    <img
                      src={imageSrc}
                      width={peekWidth}
                      height={peekHeight}
                      style={{
                        display: 'block',
                        width: peekWidth,
                        height: peekHeight,
                        objectFit: 'cover',
                        filter: 'brightness(0.85)',
                      }}
                      alt={label || 'Preview'}
                      onError={() => setImageLoadFailed(true)}
                      loading="lazy"
                    />
                  )}
                  {label && (
                    <div style={{
                      padding: '10px 14px',
                      borderTop: `1px solid rgba(212,175,55,0.1)`,
                    }}>
                      <span style={{
                        fontSize: 11,
                        fontFamily: 'Cinzel, serif',
                        color: '#EAEAEA',
                        letterSpacing: '0.08em',
                      }}>
                        {label}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </RdxHoverCard.Content>
      </RdxHoverCard.Portal>
    </RdxHoverCard.Root>
  );
}
