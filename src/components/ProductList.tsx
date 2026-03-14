"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { PackageSearch } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  category: string;
  stock: number;
}

export default function ProductList({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  
  const categories = ["Semua", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = activeCategory === "Semua" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Katalog Rizquna
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Temukan berbagai kebutuhan harian Anda. Mulai dari alat tulis sekolah, sembako dapur, hingga aneka jajanan anak.
          </p>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat, i) => (
            <button 
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                ? 'bg-brand-600 text-white shadow-md' 
                : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-brand-50 hover:text-brand-600 border border-gray-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
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
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Tidak ada produk</h3>
          <p className="text-gray-500 mt-2">Kategori ini belum memiliki produk.</p>
        </div>
      )}
    </>
  );
}
