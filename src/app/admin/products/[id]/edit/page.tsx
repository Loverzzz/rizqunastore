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
          className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Edit Produk
          </h1>
          <p className="text-gray-500 mt-1">
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
        }}
      />
    </div>
  );
}
