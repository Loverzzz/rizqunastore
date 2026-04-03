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
    <nav className="sticky top-0 z-50 glass bg-white/70 dark:bg-slate-900/70 border-b border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
                Rizquna
              </span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Beranda
            </Link>
            <Link
              href="/products"
              className="text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Toko
            </Link>
            <Link
              href="/playground"
              className="text-gray-700 dark:text-gray-300 hover:text-accent-500 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Playground
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-brand-500 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {mounted && totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-500 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              >
                {isOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden glass border-t border-gray-200 dark:border-slate-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-500 hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Beranda
              </Link>
              <Link
                href="/products"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-500 hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Toko
              </Link>
              <Link
                href="/playground"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-accent-500 hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Playground
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
