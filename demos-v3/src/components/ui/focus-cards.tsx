"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type FocusCard = {
  title: string;
  subtitle?: string;
  src: string;
  href?: string;
};

const Card = ({
  card,
  index,
  hovered,
  setHovered,
}: {
  card: FocusCard;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}) => (
  <motion.div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      "rounded-lg relative overflow-hidden cursor-pointer transition-all duration-500 ease-out",
      "h-60 md:h-[28rem]",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
    )}
  >
    <Image
      src={card.src}
      alt={card.title}
      fill
      className="object-cover absolute inset-0 transition-transform duration-700 ease-out"
      style={{
        transform: hovered === index ? "scale(1.05)" : "scale(1)",
      }}
    />
    <div
      className={cn(
        "absolute inset-0 flex flex-col justify-end p-6 md:p-8 transition-opacity duration-500",
        "bg-gradient-to-t from-black/80 via-black/20 to-transparent",
        hovered === index ? "opacity-100" : "opacity-0"
      )}
    >
      {card.subtitle && (
        <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
          {card.subtitle}
        </p>
      )}
      <h3 className="text-lg md:text-2xl font-light text-white tracking-wide">
        {card.title}
      </h3>
    </div>
  </motion.div>
);

export const FocusCards = ({
  cards,
  className,
}: {
  cards: FocusCard[];
  className?: string;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
        className
      )}
    >
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
};
