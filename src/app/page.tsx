"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
  Gamepad2,
  Sparkles,
  Clock,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100 via-background to-background dark:from-slate-800 dark:via-background dark:to-background"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400 text-sm font-medium mb-6 border border-brand-100 dark:border-slate-700 shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>Satu Tempat, Berbagai Kebutuhan</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
                Belanja Nyaman, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-accent-500">
                  Anak Senang.
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Rizquna menghadirkan toko serba ada terlengkap dan Playground
                Happy Kids yang interaktif. Temukan alat tulis, sembako,
                jajanan, hingga arena bermain anak dalam satu destinasi!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-medium transition-all shadow-lg hover:shadow-brand-500/30"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Mulai Belanja
                </Link>
                <Link
                  href="/playground"
                  className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 hover:border-accent-500 dark:hover:border-accent-500 font-medium transition-all shadow-sm hover:shadow-md"
                >
                  <Gamepad2 className="w-5 h-5 text-accent-500" />
                  Pesan Tiket Playground
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video lg:aspect-square"
            >
              {/* Store hero image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-900 to-accent-900">
                <Image
                  src="/rizquna.jpg"
                  alt="Tampak depan toko Rizquna Store"
                  fill
                  className="object-cover opacity-80"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Layanan Utama Kami
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Kami menyediakan dua layanan utama untuk memenuhi kebutuhan
              belanja Anda dan hiburan untuk si buah hati.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Store Card */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-500">
                <ShoppingBag className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-6">
                  <ShoppingBag className="w-8 h-8 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Rizquna Store
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Toko perlengkapan alat tulis terlengkap, sembako segar, dan
                  aneka jajanan favorit keluarga. Semua yang Anda cari ada di
                  sini.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center text-brand-600 dark:text-brand-400 font-semibold hover:text-brand-700 group-hover:gap-2 transition-all"
                >
                  Lihat Katalog Produk <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
            </motion.div>

            {/* Playground Card */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-500">
                <Gamepad2 className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center mb-6">
                  <Gamepad2 className="w-8 h-8 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Playground Happy Kids
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Area bermain luas yang aman dan edukatif. Dilengkapi berbagai
                  wahana menyenangkan untuk melatih motorik anak.
                </p>
                <Link
                  href="/playground"
                  className="inline-flex items-center text-accent-600 dark:text-accent-400 font-semibold hover:text-accent-700 group-hover:gap-2 transition-all"
                >
                  Pesan Tiket Sekarang <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info / Hours Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-4xl p-10 md:p-14 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
              <Clock className="w-96 h-96" />
            </div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Jam Operasional Kami
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-2">Senin - Minggu</h3>
                  <div className="text-3xl font-bold text-accent-300">
                    08:00 - 20:00
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-2">Istirahat</h3>
                  <div className="text-3xl font-bold text-accent-300">
                    12:00 - 13:00
                  </div>
                </div>
              </div>

              <p className="mt-8 text-brand-100">
                Store dan Playground buka setiap hari. Istirahat 12.00–13.00.
                Kunjungi kami untuk pengalaman belanja dan bermain terbaik.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
