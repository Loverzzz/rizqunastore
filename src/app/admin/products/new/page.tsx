"use client";

import { createProduct } from "@/actions/product";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles, Upload, ImageIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useState } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <Save className="w-5 h-5" />
      {pending ? "Menyimpan..." : "Simpan Produk"}
    </button>
  );
}

export default function NewProductPage() {
  const [description, setDescription] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
      } else {
        alert(data.error || "Upload gagal");
        setImagePreview(null);
      }
    } catch {
      alert("Upload gagal");
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const generateDescription = async () => {
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const categoryInput = document.getElementById("category") as HTMLSelectElement;
    if (!nameInput?.value) return;
    
    setAiLoading(true);
    try {
      const res = await fetch("/api/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          productName: nameInput.value, 
          category: categoryInput?.value 
        }),
      });
      const data = await res.json();
      setDescription(data.description || "");
    } catch {
      // silent fail
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/products"
          className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tambah Produk Baru</h1>
          <p className="text-gray-500 mt-1">Masukkan informasi detail produk yang akan dijual.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden p-6 md:p-8">
        <form action={createProduct} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Nama Produk *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                placeholder="Contoh: Beras Premium 5Kg"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Kategori *
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
              >
                <option value="">Pilih Kategori</option>
                <option value="Sembako">Sembako</option>
                <option value="Alat Tulis">Alat Tulis</option>
                <option value="Jajanan">Jajanan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Deskripsi
              </label>
              <button
                type="button"
                onClick={generateDescription}
                disabled={aiLoading}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg transition-colors disabled:opacity-50"
              >
                <Sparkles className="w-3 h-3" />
                {aiLoading ? "Generating..." : "AI Generate"}
              </button>
            </div>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow resize-none"
              placeholder="Jelaskan detail produk ini..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Harga (Rp) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                placeholder="Contoh: 15000"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="stock" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Stok Awal *
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                min="0"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                placeholder="Contoh: 50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Gambar Produk (Opsional)
            </label>
            <input type="hidden" name="imageUrl" value={imageUrl} />
            {imagePreview ? (
              <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-600">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                {uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => { setImagePreview(null); setImageUrl(""); }}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl cursor-pointer hover:border-brand-500 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Klik untuk upload gambar</span>
                <span className="text-xs text-gray-400 mt-1">JPG, PNG, WebP (maks 5MB)</span>
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
            <SubmitButton />
          </div>

        </form>
      </div>
    </div>
  );
}
