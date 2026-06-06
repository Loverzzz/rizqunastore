"use client";

import { ShoppingCart, Check, Heart, ImageOff } from "lucide-react";
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
      className="bg-white dark:bg-[#2D1506] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#F0D5C8] dark:border-brand-900/40 transition-all flex flex-col h-full group"
    >
      <div className="relative aspect-square bg-gradient-to-br from-[#FDF6EF] to-[#F0E4D4] dark:from-[#2D1506]/60 dark:to-[#1A0800] flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          product.imageUrl.startsWith("data:") ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 p-6"
              loading="lazy"
            />
          ) : (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 p-6"
              loading="lazy"
            />
          )
        ) : (
          <div className="text-gray-300 dark:text-gray-600 flex flex-col items-center gap-2 select-none">
            <ImageOff className="w-10 h-10 stroke-[1.5]" />
            <span className="text-xs font-semibold tracking-wide">
              Tidak Ada Gambar
            </span>
          </div>
        )}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
          <span className="px-3 py-1 bg-white/80 dark:bg-[#1A0800]/80 backdrop-blur-md rounded-full text-xs font-semibold text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900/50">
            {product.category}
          </span>
          {currentStock === 0 && (
            <span className="px-2.5 py-0.5 bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              Habis
            </span>
          )}
        </div>
        <button
          onClick={() => toggleItem(product.id)}
          className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-[#1A0800]/80 backdrop-blur-md rounded-full border border-[#F0D5C8] dark:border-brand-900/50 hover:scale-110 transition-transform z-10"
          aria-label="Wishlist"
        >
          <Heart
            className={`w-4 h-4 ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-[#7A3B1E] dark:text-[#C4946A] mb-4 line-clamp-2 flex-grow">
          {product.description || "Tidak ada deskripsi."}
        </p>

        {/* Variant / Size Picker */}
        {hasVariants && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-[#5C2A10] dark:text-[#D4A882] mb-2">
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
                        ? "bg-[#F5EDE4] text-[#C4946A] border-[#E8C9B0] cursor-not-allowed dark:bg-[#3D1F0A] dark:text-[#8B5A35] dark:border-brand-900/40"
                        : "bg-white text-[#1C0A00] border-[#E8C9B0] hover:border-brand-400 dark:bg-[#3D1F0A] dark:text-[#F5E6D3] dark:border-brand-900/40"
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

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F0D5C8] dark:border-brand-900/30">
          <div>
            <span className="text-xl font-black text-brand-600 dark:text-brand-400">
              {formatRupiah(currentPrice)}
            </span>
            {currentStock > 0 && currentStock <= 5 && (
              <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
                Sisa {currentStock}!
              </p>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={currentStock === 0}
            className={`p-3 ${added ? "bg-green-500 text-white shadow-md shadow-green-500/30" : currentStock === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500" : "bg-brand-600 hover:bg-brand-500 text-white dark:bg-brand-700 dark:hover:bg-brand-500 shadow-md shadow-brand-600/20 hover:shadow-brand-500/40"} rounded-full transition-all flex mt-1 items-center gap-1 active:scale-95 cursor-pointer z-10`}
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
