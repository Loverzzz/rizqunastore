"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrder(data: {
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}) {
  try {
    // 1. Validasi stok semua produk sebelum membuat order
    for (const item of data.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (!product) {
        return { success: false, error: `Produk tidak ditemukan.` };
      }
      if (product.stock < item.quantity) {
        return {
          success: false,
          error: `Stok "${product.name}" tidak cukup. Tersisa ${product.stock} item.`,
        };
      }
    }

    // 2. Gunakan transaction untuk atomic: kurangi stok + buat order
    const order = await prisma.$transaction(async (tx) => {
      // Kurangi stok setiap produk
      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // Buat order + order items
      return tx.order.create({
        data: {
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          totalAmount: data.totalAmount,
          status: "PENDING",
          items: {
            create: data.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });
    });

    revalidatePath("/admin/orders");
    revalidatePath("/products");

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Gagal membuat pesanan." };
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal mengubah status pesanan." };
  }
}
