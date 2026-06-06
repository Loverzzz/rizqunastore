"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDF6EF] dark:bg-[#1A0800] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-100 dark:bg-brand-950/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-100 dark:bg-accent-950/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse pointer-events-none" style={{ animationDelay: "2s" }}></div>

      <div className="max-w-md w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-8xl md:text-9xl font-black text-brand-500 dark:text-brand-400 select-none tracking-widest drop-shadow-md">
            404
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-3xl font-extrabold text-[#1C0A00] dark:text-[#F5E6D3] mt-6 tracking-tight"
        >
          Halaman Tidak Ditemukan
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base text-[#7A4A2A] dark:text-[#C4946A] mt-4 max-w-sm mx-auto leading-relaxed"
        >
          Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan ke alamat lain.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-full transition-all shadow-md active:scale-95"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <a
            href="https://wa.me/6281915967694"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-[#2D1506] text-[#1C0A00] dark:text-[#F5E6D3] border border-[#E8C9B0] dark:border-brand-900/50 hover:border-brand-500 rounded-full transition-all shadow-sm active:scale-95"
          >
            <HelpCircle className="w-4 h-4 text-accent-500" />
            Hubungi Admin
          </a>
        </motion.div>
      </div>
    </div>
  );
}
