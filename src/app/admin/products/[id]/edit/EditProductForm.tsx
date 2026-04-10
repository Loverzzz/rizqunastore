"use client";

import Link from "next/link";
import { Save, Upload, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface VariantData {
  id?: string;
  label: string;
  price: number;
  stock: number;
}

interface EditProductFormProps {
  action: (formData: FormData) => Promise<void>;
  product: {
    name: string;
    category: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    variants?: VariantData[];
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
  const [useUrl, setUseUrl] = useState(!!product.imageUrl);
  const [variants, setVariants] = useState<
    { id?: string; label: string; price: string; stock: string }[]
  >(
    (product.variants || []).map((v) => ({
      id: v.id,
      label: v.label,
      price: String(v.price),
      stock: String(v.stock),
    })),
  );

  const addVariant = () =>
    setVariants([...variants, { label: "", price: "", stock: "" }]);
  const removeVariant = (i: number) =>
    setVariants(variants.filter((_, idx) => idx !== i));
  const updateVariant = (i: number, field: string, value: string) => {
    const copy = [...variants];
    copy[i] = { ...copy[i], [field]: value };
    setVariants(copy);
  };

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

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setSaving(true);
    setError(null);
    try {
      await action(formData);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal menyimpan produk");
      setSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden p-6 md:p-8">
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
      <form action={handleSubmit} className="space-y-6">
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
              <option value="Tas">Tas</option>
              <option value="Seragam Sekolah">Seragam Sekolah</option>
              <option value="Seragam Pramuka">Seragam Pramuka</option>
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
              Varian Ukuran (Opsional)
            </label>
            <button
              type="button"
              onClick={addVariant}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-brand-50 hover:bg-brand-100 dark:bg-brand-900/30 dark:hover:bg-brand-900/50 text-brand-600 dark:text-brand-400 rounded-lg transition-colors"
            >
              <Plus className="w-3 h-3" />
              Tambah Ukuran
            </button>
          </div>
          {variants.length > 0 && (
            <input
              type="hidden"
              name="variants"
              value={JSON.stringify(
                variants
                  .filter((v) => v.label && v.price && v.stock)
                  .map((v) => ({
                    id: v.id,
                    label: v.label,
                    price: Number(v.price),
                    stock: Number(v.stock),
                  })),
              )}
            />
          )}
          {variants.length > 0 && (
            <div className="space-y-2">
              <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 px-1">
                <span>Label</span>
                <span>Harga (Rp)</span>
                <span>Stok</span>
                <span className="w-8" />
              </div>
              {variants.map((v, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center"
                >
                  <input
                    type="text"
                    placeholder="Uk 3"
                    value={v.label}
                    onChange={(e) => updateVariant(i, "label", e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="50000"
                    min="0"
                    value={v.price}
                    onChange={(e) => updateVariant(i, "price", e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="10"
                    min="0"
                    value={v.stock}
                    onChange={(e) => updateVariant(i, "stock", e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeVariant(i)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {variants.length === 0 && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Tambahkan varian jika produk memiliki beberapa ukuran dengan
              harga/stok berbeda.
            </p>
          )}
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
                type="text"
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
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {saving ? "Menyimpan..." : "Perbarui Produk"}
          </button>
        </div>
      </form>
    </div>
  );
}
