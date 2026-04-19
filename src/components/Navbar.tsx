"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight text-brand-600 dark:text-brand-400">
              Rizquna
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center gap-1">
            {[
              { href: "/", label: "Beranda" },
              { href: "/products", label: "Toko" },
              { href: "/store", label: "Lokasi" },
              { href: "/playground", label: "Playground" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#1C0A00] dark:text-[#F5E6D3] hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-[#1C0A00] dark:text-[#F5E6D3] hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-lg text-[#1C0A00] dark:text-[#F5E6D3] hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"
            >
              <ShoppingCart className="w-6 h-6" />
              {mounted && totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-600 rounded-full transform translate-x-1/4 -translate-y-1/4">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* CTA Button */}
            <Link
              href="/playground"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#2D1506] hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 text-white text-sm font-semibold transition-all shadow-md"
            >
              Pesan Tiket
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="sm:hidden p-2 rounded-lg text-[#1C0A00] dark:text-[#F5E6D3] hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-t border-brand-100/50 dark:border-brand-900/30 bg-[#FDF6EF] dark:bg-[#1A0800]"
          >
            <div className="px-4 py-3 space-y-1">
              {[
                { href: "/", label: "Beranda" },
                { href: "/products", label: "Toko" },
                { href: "/store", label: "Lokasi" },
                { href: "/playground", label: "Playground" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 rounded-xl font-medium text-[#1C0A00] dark:text-[#F5E6D3] hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/playground"
                onClick={() => setIsOpen(false)}
                className="block mt-3 text-center px-4 py-2.5 rounded-xl bg-[#2D1506] text-white font-semibold hover:bg-brand-600 transition-all"
              >
                Pesan Tiket Sekarang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
