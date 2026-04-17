"use client";
import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const CursorSpotlight = ({
  children,
  className,
  spotlightColor = "rgba(120, 119, 198, 0.08)",
  spotlightSize = 600,
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 rounded-inherit"
        style={{
          background: isHovered
            ? `radial-gradient(${spotlightSize}px circle at ${smoothX.get()}px ${smoothY.get()}px, ${spotlightColor}, transparent 80%)`
            : "none",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        animate={{
          background: `radial-gradient(${spotlightSize}px circle at var(--x) var(--y), ${spotlightColor}, transparent 80%)`,
        }}
      />
      {/* Re-render spotlight position via CSS custom properties */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-10"
        style={{
          background: `radial-gradient(${spotlightSize}px circle at ${smoothX}px ${smoothY}px, ${spotlightColor}, transparent 80%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
};
