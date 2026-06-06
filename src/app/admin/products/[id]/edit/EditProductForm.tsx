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
  action: (formData: FormData) => Promise<{ success: boolean } | void>;
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
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await action(formData);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/admin/products";
      }, 500);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal menyimpan produk");
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[#E8C9B0] dark:border-brand-900/40 bg-[#FDF6EF] dark:bg-[#1A0800] text-[#1C0A00] dark:text-[#F5E6D3] focus:ring-2 focus:ring-brand-500 outline-none transition-shadow";
  const smallInputClass =
    "px-3 py-2 rounded-lg border border-[#E8C9B0] dark:border-brand-900/40 bg-[#FDF6EF] dark:bg-[#1A0800] text-[#1C0A00] dark:text-[#F5E6D3] text-sm focus:ring-2 focus:ring-brand-500 outline-none";
  const labelClass =
    "block text-sm font-semibold text-[#5C2A10] dark:text-[#D4A882]";

  return (
    <div className="bg-white dark:bg-[#2D1506] rounded-2xl shadow-sm border border-[#F0D5C8] dark:border-brand-900/40 overflow-hidden p-6 md:p-8">
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-sm text-green-600 dark:text-green-400">
          Produk berhasil diperbarui! Mengalihkan...
        </div>
      )}
      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className={labelClass}>
              Nama Produk *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={product.name}
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className={labelClass}>
              Kategori *
            </label>
            <select
              id="category"
              name="category"
              defaultValue={product.category}
              required
              className={inputClass}
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
          <label htmlFor="description" className={labelClass}>
            Deskripsi
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={product.description}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="price" className={labelClass}>
              Harga (Rp) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              defaultValue={product.price}
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="stock" className={labelClass}>
              Stok *
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              min="0"
              defaultValue={product.stock}
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className={labelClass}>Varian Ukuran (Opsional)</label>
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
              <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 text-xs font-medium text-[#7A3B1E] dark:text-[#C4946A] px-1">
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
                    className={smallInputClass}
                  />
                  <input
                    type="number"
                    placeholder="50000"
                    min="0"
                    value={v.price}
                    onChange={(e) => updateVariant(i, "price", e.target.value)}
                    className={smallInputClass}
                  />
                  <input
                    type="number"
                    placeholder="10"
                    min="0"
                    value={v.stock}
                    onChange={(e) => updateVariant(i, "stock", e.target.value)}
                    className={smallInputClass}
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
            <p className="text-xs text-[#7A3B1E] dark:text-[#C4946A]">
              Tambahkan varian jika produk memiliki beberapa ukuran dengan
              harga/stok berbeda.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className={labelClass}>Gambar Produk (Opsional)</label>
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
                className={inputClass}
                placeholder="https://example.com/image.jpg"
              />
              {imagePreview && (
                <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-[#E8C9B0] dark:border-brand-900/40">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ) : imagePreview ? (
            <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-[#E8C9B0] dark:border-brand-900/40">
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
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#E8C9B0] dark:border-brand-900/40 rounded-xl cursor-pointer hover:border-brand-500 hover:bg-[#FDF6EF] dark:hover:bg-[#3D1F0A] transition-colors">
              <Upload className="w-8 h-8 text-[#7A3B1E] dark:text-[#C4946A] mb-2" />
              <span className="text-sm text-[#7A3B1E] dark:text-[#C4946A]">
                Klik untuk upload gambar
              </span>
              <span className="text-xs text-[#7A3B1E]/60 dark:text-[#C4946A]/60 mt-1">
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

        <div className="pt-6 border-t border-[#F0D5C8] dark:border-brand-900/40 flex justify-end gap-4">
          <Link
            href="/admin/products"
            className="px-6 py-3 bg-[#FDF6EF] dark:bg-[#3D1F0A] text-[#5C2A10] dark:text-[#D4A882] font-medium rounded-xl hover:bg-[#F0E4D4] dark:hover:bg-[#4A2810] transition-colors"
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