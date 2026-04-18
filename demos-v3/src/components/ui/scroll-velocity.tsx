"use client";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { cn } from "@/lib/utils";

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export const ScrollVelocity = ({
  children,
  baseVelocity = 2,
  className,
  damping = 50,
  stiffness = 300,
}: {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping,
    stiffness,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      const reps = Math.ceil(containerWidth / textWidth) + 2;
      setRepetitions(reps);
    }
  }, [children]);

  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden whitespace-nowrap", className)}
    >
      <motion.div className="inline-flex" style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span
            key={i}
            ref={i === 0 ? textRef : undefined}
            className="inline-block"
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
