"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

function SparklesText({ text }: { text: string }) {
  return (
    <span className="relative inline-block">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            textShadow: [
              "0 0 0px #D4AF37",
              "0 0 8px #D4AF37",
              "0 0 0px #D4AF37",
            ],
          }}
          transition={{
            duration: 3,
            delay: i * 0.15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      points.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (points.current.length > 50) points.current.shift();
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      points.current.forEach((p, i) => {
        p.age += 0.02;
        const alpha = Math.max(0, 1 - p.age);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${alpha * 0.6})`;
        ctx.fill();
      });
      points.current = points.current.filter((p) => p.age < 1);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
}

export default function VaultHome() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdInterval = useRef<NodeJS.Timeout | null>(null);

  const startHold = useCallback(() => {
    holdInterval.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          if (holdInterval.current) clearInterval(holdInterval.current);
          setIsUnlocked(true);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
  }, []);

  const cancelHold = useCallback(() => {
    if (holdInterval.current) clearInterval(holdInterval.current);
    if (holdProgress < 100) setHoldProgress(0);
  }, [holdProgress]);

  const featured = products.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#EAEAEA] font-cinzel noise-overlay">
      <MouseTrail />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.section
            key="gate"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-screen flex flex-col items-center justify-center relative"
          >
            <p className="text-[10px] tracking-luxury-wide uppercase opacity-30 mb-12 font-light font-sans">
              Press and hold to enter
            </p>

            <motion.div
              onPointerDown={startHold}
              onPointerUp={cancelHold}
              onPointerLeave={cancelHold}
              whileTap={{ scale: 0.95 }}
              className="relative w-40 h-40 rounded-full cursor-pointer flex items-center justify-center"
              style={{
                background: `conic-gradient(#D4AF37 ${holdProgress}%, transparent 0)`,
              }}
            >
              <div className="w-36 h-36 rounded-full bg-[#0A0A0A] flex items-center justify-center">
                <div className="text-center">
                  <SparklesText text="VM" />
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1 }}
              className="mt-12 text-[11px] tracking-luxury uppercase font-light font-sans"
            >
              Vault Maison
            </motion.p>
          </motion.section>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center">
              <Link href="/" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury font-sans">
                ← Gallery
              </Link>
              <span className="text-[11px] tracking-luxury-wide uppercase opacity-60">Vault Maison</span>
              <Link href="/vault/products" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury font-sans">
                Collection →
              </Link>
            </nav>

            {/* Hero */}
            <section className="h-screen flex flex-col items-center justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-[0.06em]"
              >
                <SparklesText text="THE VAULT" />
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="h-px bg-[#D4AF37] mt-8"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.2 }}
                className="mt-6 text-[12px] tracking-luxury font-light font-sans"
              >
                Curated Melee Diamonds · By Invitation
              </motion.p>
            </section>

            {/* Featured */}
            <section className="py-section px-8 md:px-16">
              <p className="text-[10px] tracking-luxury-wide uppercase opacity-30 mb-16 font-sans">
                Featured Acquisitions
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
                {featured.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  >
                    <Link href={`/vault/products/${p.id}`}>
                      <div className="group relative overflow-hidden bg-[#111]">
                        <div className="aspect-[4/3] relative">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            className="object-cover opacity-60 group-hover:opacity-100 transition-luxury group-hover:scale-[1.03]"
                            style={{ transitionDuration: "1200ms" }}
                          />
                        </div>
                        <div className="p-8">
                          <p className="text-[10px] tracking-luxury-wide uppercase opacity-30 mb-2 font-sans">
                            {p.lotNumber}
                          </p>
                          <h3 className="text-lg tracking-[0.04em] mb-1">{p.name}</h3>
                          <p className="text-[12px] opacity-40 font-light font-sans">{p.subtitle}</p>
                          <p className="text-[#D4AF37] text-sm mt-4 font-sans font-light">{p.priceFormatted}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-16 text-center">
                <Link
                  href="/vault/products"
                  className="inline-block px-12 py-4 text-[11px] tracking-luxury-wide uppercase border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-luxury font-sans"
                >
                  View Full Collection
                </Link>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
