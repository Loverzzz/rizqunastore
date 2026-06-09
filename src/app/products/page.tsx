import prisma from "@/lib/prisma";
import ProductList from "@/components/ProductList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Produk | Rizquna Store",
  description:
    "Temukan berbagai kebutuhan harian Anda di Rizquna Store. Alat tulis, sembako, jajanan, dan lainnya.",
};

// Cache page for 60 seconds, then revalidate in background
export const revalidate = 60;

export default async function ProductsPage() {
  let products: Parameters<typeof ProductList>[0]["products"] = [];
  try {
    const rawProducts = await prisma.product.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        imageUrl: true,
        category: true,
        stock: true,
        createdAt: true,
        updatedAt: true,
        variants: {
          orderBy: { label: "asc" },
          select: { id: true, label: true, price: true, stock: true },
        },
      },
    });
    products = rawProducts.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  } catch (e) {
    console.error("Failed to fetch products:", e);
    products = [];
  }

  return (
    <div className="py-12 bg-[#FDF6EF] min-h-screen dark:bg-[#1A0800]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductList products={products} />
      </div>
    </div>
  );
}