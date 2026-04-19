import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import AdminProductsTable from "./AdminProductsTable";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
    include: { variants: { select: { id: true, stock: true } } },
  });

  const serialized = products.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manajemen Produk
          </h1>
          <p className="text-gray-500 mt-1">
            Atur katalog produk toko fisik dan online Anda.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-all shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Tambah Produk Baru
        </Link>
      </div>

      <AdminProductsTable products={serialized} />
    </div>
  );
}
