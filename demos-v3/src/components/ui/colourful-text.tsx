"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const colors = [
  "rgb(131, 179, 32)",
  "rgb(47, 195, 106)",
  "rgb(42, 169, 210)",
  "rgb(4, 112, 202)",
  "rgb(107, 10, 255)",
  "rgb(183, 0, 218)",
  "rgb(218, 0, 171)",
  "rgb(230, 64, 92)",
  "rgb(232, 98, 63)",
  "rgb(249, 129, 47)",
];

// Luxury gold/champagne palette for jewelry
const luxuryColors = [
  "rgb(212, 175, 55)",
  "rgb(197, 164, 126)",
  "rgb(169, 132, 103)",
  "rgb(184, 156, 128)",
  "rgb(207, 181, 59)",
  "rgb(218, 165, 32)",
  "rgb(196, 180, 151)",
  "rgb(175, 142, 89)",
  "rgb(229, 197, 138)",
  "rgb(163, 138, 105)",
];

export const ColourfulText = ({
  text,
  className,
  luxury = false,
}: {
  text: string;
  className?: string;
  luxury?: boolean;
}) => {
  const palette = luxury ? luxuryColors : colors;
  const [currentColors, setCurrentColors] = useState<string[]>(
    text.split("").map(() => palette[Math.floor(Math.random() * palette.length)])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColors(
        text
          .split("")
          .map(() => palette[Math.floor(Math.random() * palette.length)])
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [text, palette]);

  return (
    <span className={cn("inline-flex", className)}>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          animate={{
            color: currentColors[index],
            scale: [1, 1.02, 1],
            filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};
