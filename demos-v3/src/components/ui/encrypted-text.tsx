"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

export const EncryptedText = ({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}: {
  text: string;
  className?: string;
  revealDelayMs?: number;
  charset?: string;
  flipDelayMs?: number;
  encryptedClassName?: string;
  revealedClassName?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);

  const getRandomChar = useCallback(() => {
    return charset[Math.floor(Math.random() * charset.length)];
  }, [charset]);

  // Initialize with gibberish
  useEffect(() => {
    setDisplayText(text.split("").map((c) => (c === " " ? " " : getRandomChar())));
  }, [text, getRandomChar]);

  // Flip unrevealed characters
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev.map((char, i) => {
          if (i < revealedCount || text[i] === " ") return char;
          return getRandomChar();
        })
      );
    }, flipDelayMs);
    return () => clearInterval(interval);
  }, [isInView, revealedCount, text, flipDelayMs, getRandomChar]);

  // Gradually reveal characters
  useEffect(() => {
    if (!isInView) return;
    if (revealedCount >= text.length) return;
    const timeout = setTimeout(() => {
      setRevealedCount((prev) => prev + 1);
      setDisplayText((prev) =>
        prev.map((char, i) => {
          if (i <= revealedCount) return text[i];
          return char;
        })
      );
    }, revealDelayMs);
    return () => clearTimeout(timeout);
  }, [isInView, revealedCount, text, revealDelayMs]);

  return (
    <span ref={ref} className={cn("font-mono", className)}>
      {displayText.map((char, i) => (
        <span
          key={i}
          className={cn(
            i < revealedCount
              ? revealedClassName || "text-current"
              : encryptedClassName || "text-current/40"
          )}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
