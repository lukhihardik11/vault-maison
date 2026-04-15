"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const PlaceholdersVanishInput = ({
  placeholders,
  onChange,
  onSubmit,
  className,
}: {
  placeholders: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [placeholders.length]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!value.trim()) return;
      setIsSubmitting(true);
      onSubmit?.(e);
      setTimeout(() => {
        setValue("");
        setIsSubmitting(false);
      }, 800);
    },
    [value, onSubmit]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full max-w-xl mx-auto",
        className
      )}
    >
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e);
          }}
          className={cn(
            "w-full bg-transparent border-b border-current/20 py-4 pr-12 text-base",
            "focus:outline-none focus:border-current/60 transition-colors duration-500",
            "placeholder:text-transparent",
            isSubmitting && "opacity-0 transition-opacity duration-300"
          )}
        />
        {/* Animated placeholder */}
        {!value && (
          <div className="absolute inset-0 flex items-center pointer-events-none py-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPlaceholder}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 0.4 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-base"
              >
                {placeholders[currentPlaceholder]}
              </motion.p>
            </AnimatePresence>
          </div>
        )}
        {/* Submit arrow */}
        <button
          type="submit"
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 p-2",
            "opacity-0 transition-opacity duration-300",
            value.trim() && "opacity-60 hover:opacity-100"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </form>
  );
};
