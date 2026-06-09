"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { MapPin, Sparkles } from "lucide-react";

export default function ParallaxZoomReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Image zooms from 1.0 → 1.25 as user scrolls through
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.0, 1.25]);
  // Overlay fades from dark to transparent then back
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75],
    [0.7, 0.3, 0.15, 0.6]
  );
  // Text fades in at 30-50% scroll
  const textOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.55, 0.75],
    [0, 1, 1, 0]
  );
  const textY = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.55, 0.75],
    [60, 0, 0, -40]
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[80vh] min-h-[500px] overflow-hidden"
      aria-label="Tentang Rizquna"
    >
      {/* Zooming background image */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src="/rizquna.jpg"
          alt="Tampak depan toko Rizquna Store"
          fill
          className="object-cover"
          sizes="100vw"
          quality={80}
        />
      </motion.div>

      {/* Dark overlay that fades */}
      <motion.div
        className="absolute inset-0 bg-black/70"
        style={{ opacity: overlayOpacity }}
      />

      {/* Gradient edges for blending */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F5EDE4] to-transparent dark:from-[#2D1506]/30" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FDF6EF] to-transparent dark:from-[#1A0800]" />

      {/* Reveal text content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ opacity: textOpacity, y: textY }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white/90 text-sm font-bold mb-6 border border-white/20 backdrop-blur-md select-none">
          <Sparkles className="w-4 h-4 text-accent-300" />
          <span>Sudah Sejak 2023 Melayani Keluarga</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
          Lebih Dari Sekadar{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-brand-300">
            Toko Biasa
          </span>
        </h2>

        <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-8 drop-shadow-md">
          Rizquna adalah tempat di mana kebutuhan harian keluarga bertemu
          keceriaan anak-anak. Satu lokasi, dua pengalaman tak terlupakan.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-white text-sm font-medium">
            <MapPin className="w-4 h-4 text-accent-300" />
            Jl. P. Diponegoro, Bima
          </div>
          <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-accent-500/80 backdrop-blur-md text-[#1C0A00] text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            Store + Playground
          </div>
        </div>
      </motion.div>
    </section>
  );
}