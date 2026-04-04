"use client";

import Link from "next/link";
import { Save, Upload } from "lucide-react";
import { useState } from "react";

interface EditProductFormProps {
  action: (formData: FormData) => Promise<void>;
  product: {
    name: string;
    category: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
  };
}

export default function EditProductForm({
  action,
  product,
}: EditProductFormProps) {
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product.imageUrl || null,
  );
  const [useUrl, setUseUrl] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
      } else {
        alert(data.error || "Upload gagal");
        setImagePreview(product.imageUrl || null);
      }
    } catch {
      alert("Upload gagal");
      setImagePreview(product.imageUrl || null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden p-6 md:p-8">
      <form action={action} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Nama Produk *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={product.name}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Kategori *
            </label>
            <select
              id="category"
              name="category"
              defaultValue={product.category}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
            >
              <option value="Sembako">Sembako</option>
              <option value="Alat Tulis">Alat Tulis</option>
              <option value="Jajanan">Jajanan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Deskripsi
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={product.description}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Harga (Rp) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              defaultValue={product.price}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="stock"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Stok *
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              min="0"
              defaultValue={product.stock}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Gambar Produk (Opsional)
            </label>
            <button
              type="button"
              onClick={() => {
                setUseUrl(!useUrl);
                setImagePreview(null);
                setImageUrl("");
              }}
              className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium"
            >
              {useUrl ? "Upload File" : "Pakai Link URL"}
            </button>
          </div>
          <input type="hidden" name="imageUrl" value={imageUrl} />
          {useUrl ? (
            <div className="space-y-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImagePreview(e.target.value || null);
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                placeholder="https://example.com/image.jpg"
              />
              {imagePreview && (
                <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-600">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ) : imagePreview ? (
            <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-600">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setImageUrl("");
                }}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl cursor-pointer hover:border-brand-500 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">
                Klik untuk upload gambar
              </span>
              <span className="text-xs text-gray-400 mt-1">
                JPG, PNG, WebP (maks 5MB)
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="pt-6 border-t border-gray-100 dark:border-slate-700 flex justify-end gap-4">
          <Link
            href="/admin/products"
            className="px-6 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-all shadow-sm"
          >
            <Save className="w-5 h-5" />
            Perbarui Produk
          </button>
        </div>
      </form>
    </div>
  );
}
