"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Gamepad2, ArrowRight } from "lucide-react";

export default function ServicesSection() {
  return (
    <section
      className="py-20 bg-[#F5EDE4] dark:bg-[#2D1506]/30"
      aria-label="Layanan utama"
    >
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-[#2D1506] rounded-3xl p-8 shadow-xl border border-[#F0D5C8] dark:border-brand-900/40 relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-500 select-none">
              <ShoppingBag className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-6">
                <ShoppingBag className="w-8 h-8 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-2xl font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-4">
                Rizquna Store
              </h3>
              <p className="text-[#5C2A10] dark:text-[#D4A882] mb-6">
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-[#2D1506] rounded-3xl p-8 shadow-xl border border-[#F0D5C8] dark:border-brand-900/40 relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-500 select-none">
              <Gamepad2 className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center mb-6">
                <Gamepad2 className="w-8 h-8 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-2xl font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-4">
                Playground Happy Kids
              </h3>
              <p className="text-[#5C2A10] dark:text-[#D4A882] mb-6">
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
  );
}