"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { PackageSearch, Search, AlertCircle, MapPin, Phone } from "lucide-react";

interface Variant {
  id: string;
  label: string;
  price: number;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  category: string;
  stock: number;
  variants?: Variant[];
}

export default function ProductList({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Semua",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      activeCategory === "Semua" || p.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query)) ||
      p.category.toLowerCase().includes(query) ||
      p.price.toString().includes(query);
    return matchCategory && matchSearch;
  });

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Katalog Rizquna
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Temukan berbagai kebutuhan harian Anda. Mulai dari alat tulis
            sekolah, sembako dapur, hingga aneka jajanan anak.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari produk... (nama, kategori, deskripsi)"
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-8">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-brand-600 text-white shadow-md"
                : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-brand-50 hover:text-brand-600 border border-gray-200 dark:border-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-1">Disclaimer Produk</p>
            <p className="mb-2">
              Gambar produk yang ditampilkan dapat berbeda dengan barang asli. 
              Untuk konfirmasi detail produk (warna, ukuran, kondisi), silakan hubungi admin WhatsApp atau datang langsung ke toko offline kami.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <a 
                href="https://wa.me/6281915967694" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-amber-700 dark:text-amber-300 hover:underline"
              >
                <Phone className="w-3 h-3" />
                Hubungi Admin WhatsApp
              </a>
              <a 
                href="https://share.google/TvhIwGbiWwDis9Kg6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-amber-700 dark:text-amber-300 hover:underline"
              >
                <MapPin className="w-3 h-3" />
                X3FX+892, Jl. Raya Plumpang, Tuban
              </a>
            </div>
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700">
          <PackageSearch className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Tidak ada produk
          </h3>
          <p className="text-gray-500 mt-2">
            Kategori ini belum memiliki produk.
          </p>
        </div>
      )}
    </>
  );
}
