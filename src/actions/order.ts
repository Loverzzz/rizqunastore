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
    variantId?: string;
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

    // Validasi stok dan hitung harga server-side
    let serverCalculatedTotal = 0;
    const trustedItems: {
      productId: string;
      variantId?: string;
      quantity: number;
      price: number;
    }[] = [];

    for (const item of data.items) {
      if (item.variantId) {
        const variant = await prisma.productVariant.findUnique({
          where: { id: item.variantId },
          include: { product: true },
        });

        if (!variant) {
          throw new Error(`Varian produk tidak ditemukan.`);
        }
        if (variant.stock < item.quantity) {
          throw new Error(
            `Stok "${variant.product.name} (${variant.label})" tidak cukup. Tersisa ${variant.stock} item.`,
          );
        }

        serverCalculatedTotal += variant.price * item.quantity;
        trustedItems.push({
          productId: variant.productId,
          variantId: variant.id,
          quantity: item.quantity,
          price: variant.price,
        });
      } else {
        const product = await prisma.product.findUnique({
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

        serverCalculatedTotal += product.price * item.quantity;
        trustedItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        });
      }
    }

    // Validasi dan hitung ongkir di server
    const deliveryFee =
      data.deliveryMethod === "delivery"
        ? Math.max(0, data.deliveryFee || 0)
        : 0;

    // Buat order dengan total yang dihitung server + ongkir
    const order = await prisma.order.create({
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
            variantId: item.variantId || null,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
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
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new Error("Pesanan tidak ditemukan.");
    }

    // Jika status berubah ke PAID dan sebelumnya BUKAN PAID → kurangi stok
    if (status === "PAID" && order.status !== "PAID") {
      for (const item of order.items) {
        if (item.variantId) {
          const variant = await prisma.productVariant.findUnique({
            where: { id: item.variantId },
            include: { product: true },
          });
          if (!variant || variant.stock < item.quantity) {
            throw new Error(
              `Stok "${variant?.product.name || "produk"} (${variant?.label || ""})" tidak cukup untuk memproses pembayaran.`,
            );
          }
          await prisma.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { decrement: item.quantity } },
          });
        } else {
          const product = await prisma.product.findUnique({
            where: { id: item.productId },
          });
          if (!product || product.stock < item.quantity) {
            throw new Error(
              `Stok "${product?.name || "produk"}" tidak cukup untuk memproses pembayaran.`,
            );
          }
          await prisma.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }
    }

    // Jika status berubah ke CANCELLED dan sebelumnya PAID → kembalikan stok
    if (status === "CANCELLED" && order.status === "PAID") {
      for (const item of order.items) {
        if (item.variantId) {
          await prisma.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { increment: item.quantity } },
          });
        } else {
          await prisma.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          });
        }
      }
    }

    // Update status order
    const result = await prisma.order.update({
      where: { id: orderId },
      data: { status },
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
