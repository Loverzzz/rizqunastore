"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Sun, Moon, Store } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const pathname = usePathname();

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

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/products", label: "Toko" },
    { href: "/store", label: "Lokasi" },
    { href: "/playground", label: "Playground" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass shadow-sm" aria-label="Navigasi utama">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-md group-hover:shadow-brand-400/40 transition-shadow">
              <Store className="w-4 h-4 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-brand-600 dark:text-brand-400">
              Rizquna
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const isActive =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "text-brand-600 dark:text-brand-400 font-semibold"
                      : "text-[#1C0A00] dark:text-[#F5E6D3] hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20"
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-brand-500 dark:bg-brand-400" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-[#1C0A00] dark:text-[#F5E6D3] hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"
                aria-label={darkMode ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
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
              aria-label={`Keranjang belanja${mounted && totalItems > 0 ? `, ${totalItems} item` : ""}`}
              className={`relative p-2 rounded-lg transition-all ${
                pathname === "/cart"
                  ? "text-brand-600 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-900/20"
                  : "text-[#1C0A00] dark:text-[#F5E6D3] hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20"
              }`}
            >
              <ShoppingCart className="w-6 h-6" aria-hidden="true" />
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
              aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={isOpen}
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
              {navLinks.map(({ href, label }) => {
                const isActive =
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl font-medium transition-all ${
                      isActive
                        ? "text-brand-600 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-900/20 font-semibold"
                        : "text-[#1C0A00] dark:text-[#F5E6D3] hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
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
