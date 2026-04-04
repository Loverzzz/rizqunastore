"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrder(data: {
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  deliveryMethod?: string;
  deliveryAddress?: string;
  deliveryFee?: number;
  deliveryDistance?: number;
  items: {
    productId: string;
    quantity: number;
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
    for (const item of data.items) {
      if (!item.quantity || item.quantity < 1) {
        return { success: false, error: "Jumlah item harus minimal 1." };
      }
    }

    // Semua logika (validasi stok + hitung harga + buat order) di dalam satu transaction
    // untuk mencegah race condition dan manipulasi harga dari klien
    const order = await prisma.$transaction(async (tx) => {
      let serverCalculatedTotal = 0;
      const trustedItems: {
        productId: string;
        quantity: number;
        price: number;
      }[] = [];

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
            `Stok "${product.name}" tidak cukup. Tersisa ${product.stock} item.`,
          );
        }

        // Gunakan harga dari database, bukan dari klien
        serverCalculatedTotal += product.price * item.quantity;
        trustedItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price, // harga resmi dari DB
        });

        // Stok TIDAK dikurangi di sini — hanya dikurangi saat status berubah ke PAID
      }

      // Validasi dan hitung ongkir di server
      const deliveryFee =
        data.deliveryMethod === "delivery"
          ? Math.max(0, data.deliveryFee || 0)
          : 0;

      // Buat order dengan total yang dihitung server + ongkir
      return tx.order.create({
        data: {
          customerName: data.customerName.trim(),
          customerPhone: data.customerPhone.trim(),
          totalAmount: serverCalculatedTotal + deliveryFee,
          deliveryMethod: data.deliveryMethod || "pickup",
          deliveryAddress:
            data.deliveryMethod === "delivery"
              ? data.deliveryAddress?.trim() || null
              : null,
          deliveryFee: deliveryFee,
          deliveryDistance:
            data.deliveryMethod === "delivery"
              ? data.deliveryDistance || null
              : null,
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
    const message =
      error instanceof Error ? error.message : "Gagal membuat pesanan.";
    return { success: false, error: message };
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Ambil order beserta items dan status saat ini
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      if (!order) {
        throw new Error("Pesanan tidak ditemukan.");
      }

      // Jika status berubah ke PAID dan sebelumnya BUKAN PAID → kurangi stok
      if (status === "PAID" && order.status !== "PAID") {
        for (const item of order.items) {
          const product = await tx.product.findUnique({
            where: { id: item.productId },
          });
          if (!product || product.stock < item.quantity) {
            throw new Error(
              `Stok "${product?.name || "produk"}" tidak cukup untuk memproses pembayaran.`,
            );
          }
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }

      // Jika status berubah ke CANCELLED dan sebelumnya PAID → kembalikan stok
      if (status === "CANCELLED" && order.status === "PAID") {
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          });
        }
      }

      // Update status order
      return tx.order.update({
        where: { id: orderId },
        data: { status },
      });
    });

    revalidatePath("/admin/orders");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error updating order status:", error);
    const message =
      error instanceof Error ? error.message : "Gagal mengubah status pesanan.";
    return { success: false, error: message };
  }
}
