"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, ImageOff } from "lucide-react";
import DeleteProductButton from "@/components/DeleteProductButton";

interface Variant {
  id: string;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  variants: Variant[];
}

interface Props {
  products: Product[];
}

const formatRupiah = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

export default function AdminProductsTable({ products }: Props) {
  const [filterNoImage, setFilterNoImage] = useState(false);

  const displayed = filterNoImage
    ? products.filter((p) => !p.imageUrl)
    : products;

  const noImageCount = products.filter((p) => !p.imageUrl).length;

  return (
    <>
      {/* Filter bar */}
      <div className="flex items-center gap-3 pb-2">
        <button
          onClick={() => setFilterNoImage(false)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !filterNoImage
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
          }`}
        >
          Semua ({products.length})
        </button>
        <button
          onClick={() => setFilterNoImage(true)}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterNoImage
              ? "bg-orange-500 text-white shadow-sm"
              : "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40"
          }`}
        >
          <ImageOff className="w-4 h-4" />
          Belum ada gambar ({noImageCount})
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Gambar
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Nama Produk
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Stok
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {displayed.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    {filterNoImage
                      ? "Semua produk sudah memiliki gambar."
                      : "Belum ada produk."}
                  </td>
                </tr>
              ) : (
                displayed.map((product) => (
                  <tr
                    key={product.id}
                    className={`hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors ${
                      !product.imageUrl
                        ? "bg-orange-50/30 dark:bg-orange-900/10"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-slate-700 overflow-hidden flex items-center justify-center p-1 border border-gray-200 dark:border-slate-600">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                          />
                        ) : (
                          <ImageOff className="w-5 h-5 text-orange-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white line-clamp-2">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {formatRupiah(product.price)}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {product.variants.length > 0
                        ? `${product.variants.reduce((s, v) => s + v.stock, 0)} (${product.variants.length} ukuran)`
                        : product.stock}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="inline-flex p-2 text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <DeleteProductButton
                        id={product.id}
                        name={product.name}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
