"use client";
import { useRef } from "react";
import { motion, useInView, Variant } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const getInitialTransform = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance, x: 0 };
    case "down":
      return { y: -distance, x: 0 };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    case "none":
      return { x: 0, y: 0 };
  }
};

export const ScrollReveal = ({
  children,
  className,
  direction = "up",
  distance = 40,
  duration = 0.7,
  delay = 0,
  once = true,
  blur = false,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  blur?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const initial = getInitialTransform(direction, distance);

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{
        opacity: 0,
        ...initial,
        filter: blur ? "blur(6px)" : "none",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              filter: blur ? "blur(0px)" : "none",
            }
          : {
              opacity: 0,
              ...initial,
              filter: blur ? "blur(6px)" : "none",
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};
