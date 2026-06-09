"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { PackageSearch, Search } from "lucide-react";

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

function ProductListContent({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "Semua";

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("terbaru");
  const activeCategory = selectedCategory ?? categoryParam;

  const categories = [
    "Semua",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      activeCategory === "Semua" ||
      p.category.toLowerCase() === activeCategory.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query)) ||
      p.category.toLowerCase().includes(query) ||
      p.price.toString().includes(query);
    return matchCategory && matchSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "termurah") return a.price - b.price;
    if (sortBy === "termahal") return b.price - a.price;
    if (sortBy === "az") return a.name.localeCompare(b.name);
    return 0; // 'terbaru'
  });

  return (
    <>
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari produk... (nama, kategori, deskripsi)"
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E8C9B0] dark:border-brand-900/40 bg-white dark:bg-[#2D1506] text-[#1C0A00] dark:text-[#F5E6D3] placeholder-[#C4946A] dark:placeholder-[#8B5A35] focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeCategory.toLowerCase() === cat.toLowerCase()
                ? "bg-[#2D1506] text-white shadow-md dark:bg-brand-600"
                : "bg-white dark:bg-[#2D1506] text-[#5C2A10] dark:text-[#D4A882] hover:bg-brand-50 hover:text-brand-600 border border-[#E8C9B0] dark:border-brand-900/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort & Count Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-4 border-b border-[#F0D5C8]/40 dark:border-brand-900/20">
        <p className="text-sm text-[#7A3B1E] dark:text-[#C4946A]">
          Menampilkan{" "}
          <span className="font-semibold text-brand-600 dark:text-brand-400">
            {sortedProducts.length}
          </span>{" "}
          produk
        </p>
        <div className="flex items-center gap-2 select-none">
          <label
            htmlFor="sort-select"
            className="text-xs font-semibold text-[#5C2A10] dark:text-[#D4A882] whitespace-nowrap"
          >
            Urutkan:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-[#E8C9B0] dark:border-brand-900/40 bg-white dark:bg-[#2D1506] text-xs font-medium text-[#1C0A00] dark:text-[#F5E6D3] focus:ring-1 focus:ring-brand-500 outline-none cursor-pointer"
          >
            <option value="terbaru">Terbaru</option>
            <option value="termurah">Harga Termurah</option>
            <option value="termahal">Harga Termahal</option>
            <option value="az">Nama A-Z</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white dark:bg-[#2D1506] rounded-3xl border border-[#F0D5C8] dark:border-brand-900/40">
          <PackageSearch className="w-16 h-16 mx-auto text-[#E8C9B0] dark:text-brand-800 mb-4" />
          <h3 className="text-xl font-semibold text-[#1C0A00] dark:text-[#F5E6D3]">
            Tidak ada produk
          </h3>
          <p className="text-[#7A3B1E] dark:text-[#C4946A] mt-2">
            Kategori ini belum memiliki produk.
          </p>
        </div>
      )}
    </>
  );
}

export default function ProductList({ products }: { products: Product[] }) {
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

      <Suspense
        fallback={
          <div className="text-center py-20 select-none">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600 mx-auto"></div>
            <p className="text-xs text-[#7A3B1E] dark:text-[#C4946A] mt-2">
              Memuat katalog...
            </p>
          </div>
        }
      >
        <ProductListContent products={products} />
      </Suspense>
    </>
  );
}
