"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Gamepad2, ArrowRight, Sparkles, Star } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden" aria-label="Hero">
      {/* Mesh Background */}
      <div className="absolute inset-0 z-0 hero-mesh animate-aurora-drift" />
      <div className="absolute inset-0 z-[1] playful-grid opacity-60" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-[10%] w-80 h-80 bg-brand-300/15 dark:bg-brand-500/8 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-20 left-[5%] w-64 h-64 bg-accent-300/20 dark:bg-accent-500/8 rounded-full blur-3xl pointer-events-none animate-float-delay" />
      <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-brand-400 rounded-full opacity-40 animate-pulse" />
      <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-accent-400 rounded-full opacity-50 animate-pulse delay-120" />

      {/* Gradient fade at bottom */}
      <div className="absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-t from-[#fafbfc] dark:from-[#0c1222] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/25 text-brand-700 dark:text-brand-300 text-sm font-semibold mb-6 border border-brand-200 dark:border-brand-800/40"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              <Sparkles className="w-3.5 h-3.5" />
              Belanja & Bermain dalam Satu Tempat
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              <span className="text-slate-900 dark:text-white">Toko Lengkap</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500">
                untuk Keluarga
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Pakaian, sembako, alat tulis, dan kebutuhan harian — semua tersedia di Rizquna Store. 
              Plus, area bermain seru untuk si kecil!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold transition-all shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-5 h-5" />
                Belanja Sekarang
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/playground"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold transition-all border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <Gamepad2 className="w-5 h-5 text-accent-500" />
                Pesan Tiket Playground
              </Link>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-6 justify-center lg:justify-start"
            >
              {[
                { value: "500+", label: "Produk" },
                { value: "1000+", label: "Pelanggan" },
                { value: "4.8", label: "Rating", icon: Star },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  {stat.icon && <stat.icon className="w-4 h-4 text-accent-500 fill-accent-500" />}
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual - Store Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-200/40 to-accent-200/30 dark:from-brand-800/20 dark:to-accent-800/15 rounded-[2.5rem] blur-2xl" />

              {/* Store Image */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-900/20 aspect-square border border-white/70 dark:border-brand-800/50">
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
                    <div className="rounded-full bg-accent-400 px-3 py-1 text-xs font-black text-slate-900">
                      Open
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-accent-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-accent-500/30 z-10"
              >
                🎉 Buka Setiap Hari
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
