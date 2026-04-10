"use client";

import { ShoppingCart, Check, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useState } from "react";
import Image from "next/image";

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

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isWishlisted } = useWishlistStore();
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const hasVariants = product.variants && product.variants.length > 0;

  // Sort variants numerically (e.g., "Uk 3" before "Uk 10")
  const sortedVariants = hasVariants
    ? [...product.variants!].sort((a, b) => {
        const numA = parseInt(a.label.replace(/\D/g, "")) || 0;
        const numB = parseInt(b.label.replace(/\D/g, "")) || 0;
        return numA - numB || a.label.localeCompare(b.label);
      })
    : [];

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    sortedVariants.length > 0 ? sortedVariants[0] : null,
  );

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentStock = selectedVariant ? selectedVariant.stock : product.stock;

  const handleAddToCart = () => {
    if (hasVariants && !selectedVariant) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id || null,
      variantLabel: selectedVariant?.label || null,
      name: product.name,
      price: currentPrice,
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
      <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 p-6"
            loading="lazy"
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
        <button
          onClick={() => toggleItem(product.id)}
          className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full border border-gray-100 dark:border-slate-600 hover:scale-110 transition-transform z-10"
          aria-label="Wishlist"
        >
          <Heart
            className={`w-4 h-4 ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
          {product.description || "Tidak ada deskripsi."}
        </p>

        {/* Variant / Size Picker */}
        {hasVariants && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Pilih Ukuran:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sortedVariants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  disabled={v.stock === 0}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${
                    selectedVariant?.id === v.id
                      ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                      : v.stock === 0
                        ? "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500 dark:border-slate-600"
                        : "bg-white text-gray-700 border-gray-200 hover:border-brand-400 dark:bg-slate-700 dark:text-gray-300 dark:border-slate-600"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
            {selectedVariant && (
              <p className="text-[11px] text-gray-400 mt-1.5">
                Stok: {selectedVariant.stock}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
          <span className="text-xl font-black text-brand-600 dark:text-brand-400">
            {formatRupiah(currentPrice)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={currentStock === 0}
            className={`p-3 ${added ? "bg-green-500 text-white" : currentStock === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500" : "bg-brand-50 hover:bg-brand-500 text-brand-600 hover:text-white dark:bg-slate-700 dark:hover:bg-brand-500 dark:text-brand-400 dark:hover:text-white"} rounded-full transition-colors flex mt-1 items-center gap-1 active:scale-95 cursor-pointer z-10`}
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
