'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoGalleryProps {
  images: GalleryImage[];
  width?: number;
  height?: number;
}

export function PhotoGallery({
  images,
  width = 360,
  height = 480,
}: PhotoGalleryProps) {
  const [stack, setStack] = useState(images.map((_, i) => i));
  const [dragging, setDragging] = useState(false);

  const handleDragEnd = (index: number, info: { offset: { x: number; y: number } }) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold || Math.abs(info.offset.y) > threshold) {
      // Move to back of stack
      setStack((prev) => {
        const newStack = prev.filter((i) => i !== index);
        return [...newStack, index];
      });
    }
    setDragging(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        width,
        height: height + 60,
        margin: '0 auto',
      }}
    >
      <AnimatePresence>
        {stack.map((imageIndex, stackPos) => {
          const img = images[imageIndex];
          const isTop = stackPos === 0;
          const offset = stackPos * 4;
          const rotation = (stackPos - Math.floor(stack.length / 2)) * 3;
          const scale = 1 - stackPos * 0.02;

          return (
            <motion.div
              key={imageIndex}
              drag={isTop}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.7}
              onDragStart={() => setDragging(true)}
              onDragEnd={(_, info) => handleDragEnd(imageIndex, info)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale,
                opacity: 1,
                y: offset,
                rotate: rotation,
                zIndex: stack.length - stackPos,
              }}
              exit={{ scale: 0.5, opacity: 0, x: 200 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                position: 'absolute',
                width,
                height,
                borderRadius: 12,
                overflow: 'hidden',
                cursor: isTop ? 'grab' : 'default',
                boxShadow: isTop
                  ? '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.1)'
                  : '0 10px 30px rgba(0,0,0,0.4)',
              }}
              whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
                draggable={false}
              />

              {/* Dark gradient overlay at bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(10,10,10,0.9), transparent)',
                  pointerEvents: 'none',
                }}
              />

              {img.caption && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    left: 24,
                    right: 24,
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.9rem',
                    letterSpacing: '0.1em',
                    color: '#EAEAEA',
                    pointerEvents: 'none',
                  }}
                >
                  {img.caption}
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Drag hint */}
      {!dragging && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#8A8A8A',
            opacity: 0.6,
          }}
        >
          Drag to explore
        </div>
      )}
    </div>
  );
}
