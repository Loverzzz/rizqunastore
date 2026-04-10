"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (!token || token.value !== "authenticated") {
    throw new Error("Unauthorized: Admin access required.");
  }
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const category = formData.get("category") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const variantsJson = formData.get("variants") as string;

  if (!name || isNaN(price) || isNaN(stock) || !category) {
    throw new Error("Missing required fields");
  }

  let variants: { label: string; price: number; stock: number }[] = [];
  if (variantsJson) {
    try {
      variants = JSON.parse(variantsJson);
    } catch {
      // ignore invalid JSON
    }
  }

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
      category,
      imageUrl: imageUrl || null,
      variants:
        variants.length > 0
          ? {
              create: variants.map((v) => ({
                label: v.label,
                price: v.price,
                stock: v.stock,
              })),
            }
          : undefined,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireAdmin();

  // Check if product has associated order items
  const orderItemCount = await prisma.orderItem.count({
    where: { productId: id },
  });
  if (orderItemCount > 0) {
    throw new Error(
      "Produk ini tidak bisa dihapus karena sudah ada dalam riwayat pesanan.",
    );
  }

  await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const category = formData.get("category") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const variantsJson = formData.get("variants") as string;

  if (!name || isNaN(price) || isNaN(stock) || !category) {
    throw new Error("Missing required fields");
  }

  let variants: { id?: string; label: string; price: number; stock: number }[] =
    [];
  if (variantsJson) {
    try {
      variants = JSON.parse(variantsJson);
    } catch {
      // ignore invalid JSON
    }
  }

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      stock,
      category,
      imageUrl: imageUrl || null,
    },
  });

  if (variants.length > 0) {
    const existing = await prisma.productVariant.findMany({
      where: { productId: id },
      select: { id: true },
    });
    const existingIds = existing.map((v) => v.id);
    const incomingIds = variants.filter((v) => v.id).map((v) => v.id as string);

    // Delete removed variants (only if no order items reference them)
    const toDelete = existingIds.filter((eid) => !incomingIds.includes(eid));
    for (const vid of toDelete) {
      const orderCount = await prisma.orderItem.count({
        where: { variantId: vid },
      });
      if (orderCount === 0) {
        await prisma.productVariant.delete({ where: { id: vid } });
      }
    }

    // Upsert variants
    for (const v of variants) {
      if (v.id && existingIds.includes(v.id)) {
        await prisma.productVariant.update({
          where: { id: v.id },
          data: { label: v.label, price: v.price, stock: v.stock },
        });
      } else {
        await prisma.productVariant.create({
          data: {
            productId: id,
            label: v.label,
            price: v.price,
            stock: v.stock,
          },
        });
      }
    }
  } else {
    // If no variants submitted, delete all variants without orders
    const existing = await prisma.productVariant.findMany({
      where: { productId: id },
      select: { id: true },
    });
    for (const v of existing) {
      const orderCount = await prisma.orderItem.count({
        where: { variantId: v.id },
      });
      if (orderCount === 0) {
        await prisma.productVariant.delete({ where: { id: v.id } });
      }
    }
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}
