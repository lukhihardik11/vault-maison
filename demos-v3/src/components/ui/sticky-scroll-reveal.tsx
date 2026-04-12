"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export type StickyScrollContent = {
  title: string;
  description: string;
  content?: React.ReactNode;
};

export const StickyScrollReveal = ({
  content,
  contentClassName,
  className,
}: {
  content: StickyScrollContent[];
  contentClassName?: string;
  className?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("relative flex gap-10 lg:gap-20 px-6 md:px-16", className)}
    >
      {/* Left scrolling text */}
      <div className="relative flex-1">
        <div className="space-y-20 md:space-y-40 py-20 md:py-40">
          {content.map((item, index) => (
            <div key={item.title + index} className="max-w-lg">
              <motion.h3
                initial={{ opacity: 0.3 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl font-light tracking-wide"
              >
                {item.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0.3 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
                className="text-sm md:text-base mt-6 leading-relaxed opacity-70"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-20" />
        </div>
      </div>

      {/* Right sticky visual */}
      <div
        className={cn(
          "hidden lg:block sticky top-20 h-[calc(100vh-10rem)] w-[400px] rounded-xl overflow-hidden",
          contentClassName
        )}
      >
        {content.map((item, index) => (
          <motion.div
            key={item.title + index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeCard === index ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            {item.content}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
