"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, Home, PartyPopper, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "order"; // "order" or "booking"

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Confetti-like decoration */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.1,
          }}
          className="relative mx-auto mb-8"
        >
          <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -10 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -top-2 -right-2"
          >
            <PartyPopper className="w-8 h-8 text-accent-500" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {type === "booking" ? "Booking Berhasil!" : "Pembayaran Berhasil!"}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Terima kasih atas {type === "booking" ? "booking" : "pesanan"} Anda!
          </p>

          <p className="text-gray-500 dark:text-gray-500 mb-10 max-w-sm mx-auto">
            {type === "booking"
              ? "Tiket playground Anda sudah tercatat. Kami tunggu kedatangannya ya!"
              : "Pesanan Anda sedang diproses. Kami akan segera menyiapkan barang-barang Anda."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm mb-8"
        >
          <div className="flex items-center justify-center gap-3 text-green-600 dark:text-green-400 mb-3">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold text-sm">
              Status: Pembayaran Diterima
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Konfirmasi pembayaran dikirim otomatis oleh sistem Midtrans.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={`https://wa.me/6281915967694?text=${encodeURIComponent(
              type === "booking" 
                ? "Halo Rizquna, saya baru saja melakukan booking tiket playground. Mohon konfirmasinya. Terima kasih!"
                : "Halo Rizquna, saya baru saja melakukan pemesanan produk. Mohon konfirmasinya. Terima kasih!"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-medium transition-all shadow-lg hover:shadow-green-500/30"
          >
            <MessageCircle className="w-5 h-5" />
            Konfirmasi via WhatsApp
          </a>
          <Link
            href="/products"
            className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-medium transition-all shadow-lg hover:shadow-brand-500/30"
          >
            <ShoppingBag className="w-5 h-5" />
            Lanjut Belanja
          </Link>
          <Link
            href="/"
            className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 hover:border-brand-500 font-medium transition-all shadow-sm"
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
          <div className="text-gray-400">Memuat...</div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
