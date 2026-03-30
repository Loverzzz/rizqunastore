"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrder(data: {
  customerName: string;
  customerPhone: string;
  // totalAmount dari klien hanya sebagai estimasi — server akan hitung ulang dari DB
  totalAmount: number;
  items: {
    productId: string;
    quantity: number;
    // price dari klien diabaikan untuk keamanan — server fetch dari DB
    price: number;
  }[];
}) {
  try {
    // Validasi input dasar
    if (!data.customerName?.trim() || !data.customerPhone?.trim()) {
      return { success: false, error: "Nama dan nomor telepon wajib diisi." };
    }
    if (!data.items || data.items.length === 0) {
      return { success: false, error: "Keranjang belanja kosong." };
    }

    // Semua logika (validasi stok + hitung harga + buat order) di dalam satu transaction
    // untuk mencegah race condition dan manipulasi harga dari klien
    const order = await prisma.$transaction(async (tx) => {
      let serverCalculatedTotal = 0;
      const trustedItems: { productId: string; quantity: number; price: number }[] = [];

      for (const item of data.items) {
        // Fetch harga & stok resmi dari database (JANGAN percaya price dari klien)
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Produk tidak ditemukan.`);
        }
        if (product.stock < item.quantity) {
          throw new Error(
            `Stok "${product.name}" tidak cukup. Tersisa ${product.stock} item.`
          );
        }

        // Gunakan harga dari database, bukan dari klien
        serverCalculatedTotal += product.price * item.quantity;
        trustedItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price, // harga resmi dari DB
        });

        // Kurangi stok secara atomik di dalam transaction yang sama
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // Buat order dengan total yang dihitung server
      return tx.order.create({
        data: {
          customerName: data.customerName.trim(),
          customerPhone: data.customerPhone.trim(),
          totalAmount: serverCalculatedTotal, // total dari server, bukan klien
          status: "PENDING",
          items: {
            create: trustedItems.map((item) => ({
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
    const message = error instanceof Error ? error.message : "Gagal membuat pesanan.";
    return { success: false, error: message };
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
