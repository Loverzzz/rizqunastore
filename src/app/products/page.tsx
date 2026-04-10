import prisma from "@/lib/prisma";
import ProductList from "@/components/ProductList";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: "Katalog Produk | Rizquna Store",
  description:
    "Temukan berbagai kebutuhan harian Anda di Rizquna Store. Alat tulis, sembako, jajanan, dan lainnya.",
};

export const dynamic = "force-dynamic";

const getProducts = unstable_cache(
  async () => {
    const rawProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { variants: { orderBy: { label: "asc" } } },
    });
    return rawProducts.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  },
  ["products-list"],
  { revalidate: 60 },
);

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="py-12 bg-gray-50 min-h-screen dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductList products={products} />
      </div>
    </div>
  );
}
