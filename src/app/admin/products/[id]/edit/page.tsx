import prisma from "@/lib/prisma";
import { updateProduct } from "@/actions/product";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { redirect } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    redirect("/admin/products");
  }

  // Pre-bind the ID to the server action so the client form doesn't need a hidden ID input
  const updateProductWithId = updateProduct.bind(null, product.id);

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Produk</h1>
          <p className="text-gray-500 mt-1">Perbarui informasi produk {product.name}.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden p-6 md:p-8">
        <form action={updateProductWithId} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
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
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
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
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={product.description || ""}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow resize-none"
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
                defaultValue={product.price}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="stock" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
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
            <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              URL Gambar (Opsional)
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              defaultValue={product.imageUrl || ""}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
            />
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
    </div>
  );
}
