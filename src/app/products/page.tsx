import prisma from "@/lib/prisma";
import ProductList from "@/components/ProductList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Produk | Rizquna Store",
  description:
    "Temukan berbagai kebutuhan harian Anda di Rizquna Store. Alat tulis, sembako, jajanan, dan lainnya.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let products;
  try {
    const rawProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { variants: { orderBy: { label: "asc" } } },
    });
    products = rawProducts.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  } catch (e) {
    console.error("Failed to fetch products with variants:", e);
    // Fallback: fetch without variants
    const rawProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    products = rawProducts.map((p) => ({
      ...p,
      variants: [],
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductList products={products} />
      </div>
    </div>
  );
}
