import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import midtransClient from "midtrans-client";

export const dynamic = "force-dynamic";

function getSnap() {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
  if (!serverKey || !clientKey) {
    throw new Error("MIDTRANS_SERVER_KEY and NEXT_PUBLIC_MIDTRANS_CLIENT_KEY must be configured.");
  }
  return new midtransClient.Snap({
    isProduction: process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true",
    serverKey,
    clientKey,
  });
}

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 },
      );
    }

    // Ambil detail pesanan dari database
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan" },
        { status: 404 },
      );
    }

    // Generate unique Midtrans order ID (untuk menghindari duplikat jika user retry)
    const midtransOrderId = `ORDER-${order.id.split("-")[0]}-${Date.now()}`;

    // Hitung gross_amount pasti berdasarkan item_details agar tidak ditolak Midtrans
    const itemDetails = order.items.map((item) => ({
      id: item.productId.substring(0, 50),
      price: Math.round(item.price),
      quantity: item.quantity,
      name: item.product.name.substring(0, 50),
    }));

    const calculatedGrossAmount = itemDetails.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    // Siapkan parameter transaksi untuk Midtrans
    const parameter = {
      transaction_details: {
        order_id: midtransOrderId,
        gross_amount: calculatedGrossAmount,
      },
      customer_details: {
        first_name: order.customerName,
        phone: order.customerPhone,
      },
      item_details: itemDetails,
    };

    // Minta Token Snap dari Midtrans
    const snap = getSnap();
    const transaction = await snap.createTransaction(parameter);

    // Simpan midtransOrderId dan payment link ke database
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentLink: transaction.redirect_url,
        midtransOrderId: midtransOrderId,
      },
    });

    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.error("Error saat membuat transaksi Midtrans:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
