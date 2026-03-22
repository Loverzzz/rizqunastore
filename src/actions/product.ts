"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const category = formData.get("category") as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (!name || isNaN(price) || isNaN(stock) || !category) {
    throw new Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
      category,
      imageUrl: imageUrl || null,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  });
  
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const category = formData.get("category") as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (!name || isNaN(price) || isNaN(stock) || !category) {
    throw new Error("Missing required fields");
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

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}
