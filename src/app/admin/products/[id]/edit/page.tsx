import prisma from "@/lib/prisma";
import { updateProduct } from "@/actions/product";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import EditProductForm from "./EditProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { variants: { orderBy: { label: "asc" } } },
  });

  if (!product) {
    redirect("/admin/products");
  }

  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/products"
          className="p-2 text-[#7A3B1E] hover:text-[#1C0A00] dark:text-[#C4946A] dark:hover:text-[#F5E6D3] bg-white dark:bg-[#2D1506] rounded-lg hover:bg-[#FDF6EF] dark:hover:bg-[#3D1F0A] transition-colors border border-[#F0D5C8] dark:border-brand-900/40"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#1C0A00] dark:text-[#F5E6D3]">
            Edit Produk
          </h1>
          <p className="text-[#7A3B1E] dark:text-[#C4946A] mt-1">
            Perbarui informasi produk {product.name}.
          </p>
        </div>
      </div>

      <EditProductForm
        action={updateProductWithId}
        product={{
          name: product.name,
          category: product.category,
          description: product.description || "",
          price: product.price,
          stock: product.stock,
          imageUrl: product.imageUrl || "",
          variants: product.variants.map((v) => ({
            id: v.id,
            label: v.label,
            price: v.price,
            stock: v.stock,
          })),
        }}
      />
    </div>
  );
}
