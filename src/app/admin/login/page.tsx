"use client";

import { useFormStatus } from "react-dom";
import { loginAdmin } from "@/actions/auth";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? "Memverifikasi..." : "Masuk"}
    </button>
  );
}

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const res = await loginAdmin(formData);
    if (res?.error) {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF6EF] dark:bg-[#1A0800] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-[#2D1506] rounded-3xl p-8 shadow-xl border border-[#F0D5C8] dark:border-brand-900/40">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-brand-600 dark:text-brand-400" />
          </div>
          <h1 className="text-2xl font-black text-[#1C0A00] dark:text-[#F5E6D3]">
            Admin Login
          </h1>
          <p className="text-[#7A3B1E] dark:text-[#C4946A] mt-2">
            Masuk untuk mengelola toko Rizquna.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-[#5C2A10] dark:text-[#D4A882] mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-[#E8C9B0] dark:border-brand-900/40 bg-[#FDF6EF] dark:bg-[#3D1F0A] text-[#1C0A00] dark:text-[#F5E6D3] focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
            />
          </div>

          <SubmitButton />
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium"
          >
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
