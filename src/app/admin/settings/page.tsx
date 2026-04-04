"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Shield, Store, RefreshCw } from "lucide-react";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyPassword = async () => {
    setIsVerifying(true);
    setLoginMessage("");
    try {
      const res = await fetch("/api/admin/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: currentPassword }),
      });
      const data = await res.json();
      if (data.valid) {
        setLoginMessage("✅ Password benar dan aktif.");
      } else {
        setLoginMessage("❌ Password salah.");
      }
    } catch {
      setLoginMessage("❌ Gagal memverifikasi.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Pengaturan
        </h1>
        <p className="text-gray-500 mt-1">
          Konfigurasi dan informasi admin panel.
        </p>
      </div>

      {/* Info Toko */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-900/30">
            <Store className="w-6 h-6 text-brand-600 dark:text-brand-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Informasi Toko
            </h2>
            <p className="text-sm text-gray-500">Detail toko Rizquna.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
              Nama Toko
            </p>
            <p className="font-semibold text-gray-900 dark:text-white">
              Rizquna Store
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
              Payment Gateway
            </p>
            <p className="font-semibold text-gray-900 dark:text-white">
              Midtrans (Sandbox)
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
              Database
            </p>
            <p className="font-semibold text-gray-900 dark:text-white">
              PostgreSQL
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
              Framework
            </p>
            <p className="font-semibold text-gray-900 dark:text-white">
              Next.js 15
            </p>
          </div>
        </div>
      </div>

      {/* Keamanan */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/30">
            <Shield className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Keamanan
            </h2>
            <p className="text-sm text-gray-500">
              Verifikasi password admin saat ini.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Verifikasi Password Admin
            </label>
            <div className="flex gap-3">
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Masukkan password admin..."
                className="flex-1 px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleVerifyPassword}
                disabled={isVerifying || !currentPassword}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                {isVerifying ? "Memeriksa..." : "Verifikasi"}
              </button>
            </div>
            {loginMessage && (
              <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                {loginMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Aksi Cepat */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/30">
            <RefreshCw className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Aksi Cepat
            </h2>
            <p className="text-sm text-gray-500">
              Tindakan admin yang tersedia.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => router.push("/admin")}
            className="p-4 text-left bg-gray-50 dark:bg-slate-900/50 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors border border-gray-200 dark:border-slate-600"
          >
            <p className="font-semibold text-gray-900 dark:text-white">
              🏠 Kembali ke Dashboard
            </p>
            <p className="text-sm text-gray-500 mt-1">Lihat overview toko.</p>
          </button>
          <button
            onClick={() => router.push("/admin/products")}
            className="p-4 text-left bg-gray-50 dark:bg-slate-900/50 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors border border-gray-200 dark:border-slate-600"
          >
            <p className="font-semibold text-gray-900 dark:text-white">
              📦 Kelola Produk
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Tambah, edit, atau hapus produk.
            </p>
          </button>
          <button
            onClick={() => router.push("/admin/orders")}
            className="p-4 text-left bg-gray-50 dark:bg-slate-900/50 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors border border-gray-200 dark:border-slate-600"
          >
            <p className="font-semibold text-gray-900 dark:text-white">
              🛒 Lihat Pesanan
            </p>
            <p className="text-sm text-gray-500 mt-1">Kelola pesanan masuk.</p>
          </button>
          <button
            onClick={() => router.push("/admin/bookings")}
            className="p-4 text-left bg-gray-50 dark:bg-slate-900/50 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors border border-gray-200 dark:border-slate-600"
          >
            <p className="font-semibold text-gray-900 dark:text-white">
              🎫 Lihat Booking
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Kelola reservasi playground.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
