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
  // Overlay — keep subtle, avoid dark patches
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7],
    [0.5, 0.15, 0.1, 0.4],
  );
  // Text fades in at 30-50% scroll
  const textOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.55, 0.75],
    [0, 1, 1, 0],
  );
  const textY = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.55, 0.75],
    [60, 0, 0, -40],
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
        {/* Semi-transparent backdrop for readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 text-white text-sm font-bold mb-6 border border-white/25 backdrop-blur-lg select-none shadow-lg">
            <Sparkles className="w-4 h-4 text-accent-300" />
            <span>Sudah Sejak 2020 Melayani Keluarga</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
            Lebih Dari Sekadar{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-brand-300">
              Toko Biasa
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed mb-8 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            Rizquna adalah tempat di mana kebutuhan harian keluarga bertemu
            keceriaan anak-anak. Satu lokasi, dua pengalaman tak terlupakan.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/20 border border-white/25 backdrop-blur-lg text-white text-sm font-semibold shadow-lg [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">
              <MapPin className="w-4 h-4 text-accent-300 shrink-0" />
              <span className="text-left">
                Jl. Raya Plumpang, Tanggungan,
                <br />
                Kec. Plumpang, Kab. Tuban
              </span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-accent-500/90 backdrop-blur-lg text-[#1C0A00] text-sm font-bold shadow-lg">
              <Sparkles className="w-4 h-4" />
              Store + Playground
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}