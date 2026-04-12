"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const DirectionAwareHover = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className,
}: {
  imageUrl: string;
  children: React.ReactNode;
  childrenClassName?: string;
  imageClassName?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<
    "top" | "bottom" | "left" | "right" | string
  >("left");

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!ref.current) return;
    const direction = getDirection(event, ref.current);
    switch (direction) {
      case 0:
        setDirection("top");
        break;
      case 1:
        setDirection("right");
        break;
      case 2:
        setDirection("bottom");
        break;
      case 3:
        setDirection("left");
        break;
      default:
        setDirection("left");
        break;
    }
  };

  const getDirection = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    obj: HTMLElement
  ) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
    const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      ref={ref}
      className={cn(
        "group/card relative overflow-hidden rounded-lg bg-transparent",
        className
      )}
    >
      <AnimatePresenceWrapper direction={direction}>
        <motion.div className="relative h-full w-full" initial="initial" whileHover="hover">
          <motion.div className="absolute inset-0 z-10 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
          <motion.div
            className={cn("h-full w-full relative bg-gray-50 dark:bg-black", imageClassName)}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <motion.div
            variants={getVariants(direction)}
            className={cn(
              "absolute bottom-0 left-0 right-0 z-40 p-4",
              childrenClassName
            )}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresenceWrapper>
    </motion.div>
  );
};

function AnimatePresenceWrapper({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: string;
}) {
  return <>{children}</>;
}

function getVariants(direction: string) {
  return {
    initial: {
      x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
      y: direction === "top" ? -20 : direction === "bottom" ? 20 : 0,
      opacity: 0,
    },
    hover: {
      x: 0,
      y: 0,
      opacity: 1,
    },
  };
}
