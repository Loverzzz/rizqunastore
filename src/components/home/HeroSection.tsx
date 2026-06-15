"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Gamepad2, Sparkles } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0 z-[-2] hero-mesh animate-aurora-drift" />
      <div className="absolute inset-0 z-[-1] playful-grid opacity-80" />
      <div className="absolute inset-x-0 bottom-0 z-[-1] h-32 bg-gradient-to-t from-[#FDF6EF] to-transparent dark:from-[#1A0800]" />

      {/* Decorative floating blobs */}
      <div className="absolute top-16 right-8 w-80 h-80 bg-brand-200/30 dark:bg-brand-700/10 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-8 left-4 w-64 h-64 bg-accent-200/40 dark:bg-accent-700/10 rounded-full blur-3xl pointer-events-none animate-float-delay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-100/20 dark:bg-brand-900/5 rounded-full blur-3xl pointer-events-none" />
      <Sparkles
        className="absolute left-[8%] top-28 hidden h-10 w-10 text-accent-300/60 drop-shadow-lg md:block animate-orbit-spark"
        aria-hidden="true"
      />
      <Gamepad2
        className="absolute right-[10%] bottom-24 hidden h-12 w-12 text-accent-300/50 drop-shadow-lg md:block animate-float-delay"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/75 dark:bg-brand-900/45 text-brand-600 dark:text-brand-300 text-sm font-bold mb-6 border border-white/70 dark:border-brand-800/60 shadow-lg shadow-brand-500/10 backdrop-blur select-none animate-reveal-up">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              <Sparkles className="w-4 h-4" />
              <span>Satu Tempat, Berbagai Kebutuhan</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight animate-reveal-up delay-120">
              Belanja Nyaman, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-accent-500 to-brand-400">
                Anak Senang.
              </span>
            </h1>

            <p className="text-xl text-[#5C2A10] dark:text-gray-300 mb-8 max-w-2xl leading-relaxed animate-reveal-up delay-240">
              Rizquna menghadirkan toko serba ada terlengkap dan Playground
              Happy Kids yang interaktif. Temukan alat tulis, sembako,
              jajanan, hingga arena bermain anak dalam satu destinasi!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-reveal-up delay-240">
              <Link
                href="/products"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-[#2D1506] hover:bg-brand-600 text-white font-semibold transition-all shadow-xl shadow-brand-700/20 hover:shadow-brand-500/40 animate-pulse-glow"
              >
                <ShoppingBag className="w-5 h-5" />
                Mulai Belanja
              </Link>
              <Link
                href="/playground"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-accent-500 hover:bg-accent-400 text-[#1C0A00] font-semibold transition-all shadow-xl shadow-accent-700/20 hover:shadow-accent-500/40 animate-pulse-glow-accent"
              >
                <Gamepad2 className="w-5 h-5" />
                Pesan Tiket Playground
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-900/20 aspect-video lg:aspect-square border border-white/70 dark:border-brand-800/50 animate-soft-pan"
          >
            {/* Store hero image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-900 to-accent-900">
              <Image
                src="/rizquna.jpg"
                alt="Tampak depan toko Rizquna Store"
                fill
                className="object-cover opacity-80"
                priority
                quality={75}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/18 p-4 text-white shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent-200">
                    Rizquna Store
                  </p>
                  <p className="text-lg font-black">Belanja + Playground</p>
                </div>
                <div className="rounded-full bg-accent-400 px-3 py-1 text-xs font-black text-[#1C0A00]">
                  Open
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}