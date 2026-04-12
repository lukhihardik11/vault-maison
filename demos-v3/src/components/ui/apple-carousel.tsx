"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type CarouselCard = {
  category: string;
  title: string;
  src: string;
  href?: string;
  content?: React.ReactNode;
};

const CarouselCardComponent = ({
  card,
  index,
  layout = false,
}: {
  card: CarouselCard;
  index: number;
  layout?: boolean;
}) => {
  return (
    <motion.div
      className={cn(
        "group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl",
        "w-[280px] md:w-[340px] h-[400px] md:h-[480px]"
      )}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Image
        src={card.src}
        alt={card.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-2">
          {card.category}
        </p>
        <h3 className="text-xl md:text-2xl font-light text-white tracking-wide leading-tight">
          {card.title}
        </h3>
      </div>
    </motion.div>
  );
};

export const AppleCarousel = ({
  cards,
  className,
  title,
}: {
  cards: CarouselCard[];
  className?: string;
  title?: string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, [checkScroll]);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 360;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={cn("relative", className)}>
      {title && (
        <div className="flex items-end justify-between mb-8 md:mb-12 px-6 md:px-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide">
            {title}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className={cn(
                "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300",
                canScrollLeft
                  ? "border-current/30 hover:border-current/60"
                  : "border-current/10 opacity-30 cursor-not-allowed"
              )}
              disabled={!canScrollLeft}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className={cn(
                "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300",
                canScrollRight
                  ? "border-current/30 hover:border-current/60"
                  : "border-current/10 opacity-30 cursor-not-allowed"
              )}
              disabled={!canScrollRight}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-6 md:px-16 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {cards.map((card, index) => (
          <CarouselCardComponent
            key={card.title + index}
            card={card}
            index={index}
          />
        ))}
        {/* Spacer for last card visibility */}
        <div className="flex-shrink-0 w-4" />
      </div>
    </div>
  );
};
