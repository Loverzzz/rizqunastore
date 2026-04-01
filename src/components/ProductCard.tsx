"use client";

import { ShoppingCart, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-slate-700 transition-all flex flex-col h-full group"
    >
      <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-6 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-gray-400 dark:text-gray-500 font-medium">
            No Image
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full text-xs font-semibold text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-slate-600">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
          {product.description || "Tidak ada deskripsi."}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
          <span className="text-xl font-black text-brand-600 dark:text-brand-400">
            {formatRupiah(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className={`p-3 ${added ? "bg-green-500 text-white" : "bg-brand-50 hover:bg-brand-500 text-brand-600 hover:text-white dark:bg-slate-700 dark:hover:bg-brand-500 dark:text-brand-400 dark:hover:text-white"} rounded-full transition-colors flex mt-1 items-center gap-1 active:scale-95 cursor-pointer z-10`}
            aria-label="Tambah ke keranjang"
          >
            {added ? (
              <Check className="w-5 h-5" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
