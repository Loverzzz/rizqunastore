import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export const dynamic = "force-dynamic";

// Verifikasi Signature Key dari Midtrans
const verifySignature = (
  orderId: string,
  statusCode: string,
  grossAmount: string,
  serverKey: string,
  signatureKey: string,
) => {
  const hash = crypto.createHash("sha512");
  hash.update(`${orderId}${statusCode}${grossAmount}${serverKey}`);
  const calculatedSignature = hash.digest("hex");
  return calculatedSignature === signatureKey;
};

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = payload;

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      console.error("MIDTRANS_SERVER_KEY is not configured.");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // 1. Verifikasi Signature Key
    const isValidSignature = verifySignature(
      order_id,
      status_code,
      gross_amount,
      serverKey,
      signature_key,
    );

    if (!isValidSignature) {
      console.warn("Invalid Midtrans Signature Key received!");
      return NextResponse.json(
        { error: "Invalid signature key" },
        { status: 403 },
      );
    }

    // 2. Tentukan status akhir berdasarkan transaction_status dan fraud_status
    let finalStatus = "PENDING";

    if (transaction_status == "capture") {
      if (fraud_status == "accept") {
        finalStatus = "PAID";
      }
      // fraud_status == 'challenge' → tetap PENDING
    } else if (transaction_status == "settlement") {
      finalStatus = "PAID";
    } else if (
      transaction_status == "cancel" ||
      transaction_status == "deny" ||
      transaction_status == "expire"
    ) {
      finalStatus = "CANCELLED";
    } else if (transaction_status == "pending") {
      finalStatus = "PENDING";
    }

    // 3. Cari transaksi berdasarkan midtransOrderId
    //    order_id dari webhook = midtransOrderId yang kita generate (FORMAT: "ORDER-xxx" atau "BOOK-xxx")

    try {
      // Cek apakah ini Booking (prefix "BOOK-")
      if (order_id.startsWith("BOOK-")) {
        const booking = await prisma.booking.findUnique({
          where: { midtransOrderId: order_id },
        });

        if (!booking) {
          console.warn(
            `Webhook: Booking with midtransOrderId ${order_id} not found.`,
          );
          return NextResponse.json(
            { error: "Booking not found" },
            { status: 404 },
          );
        }

        await prisma.booking.update({
          where: { id: booking.id },
          data: {
            status: finalStatus === "PAID" ? "CONFIRMED" : finalStatus,
          },
        });

        console.log(`Webhook: Booking ${booking.id} updated to ${finalStatus}`);
        return NextResponse.json({
          success: true,
          message: "Booking status updated",
        });
      }

      // Cek apakah ini Order (prefix "ORDER-")
      if (order_id.startsWith("ORDER-")) {
        const order = await prisma.order.findUnique({
          where: { midtransOrderId: order_id },
          include: { items: true },
        });

        if (!order) {
          console.warn(
            `Webhook: Order with midtransOrderId ${order_id} not found.`,
          );
          return NextResponse.json(
            { error: "Order not found" },
            { status: 404 },
          );
        }

        // Jika PAID dan sebelumnya bukan PAID → kurangi stok
        if (finalStatus === "PAID" && order.status !== "PAID") {
          for (const item of order.items) {
            await prisma.product.update({
              where: { id: item.productId },
              data: { stock: { decrement: item.quantity } },
            });
          }
          await prisma.order.update({
            where: { id: order.id },
            data: { status: finalStatus },
          });
          console.log(`Webhook: Order ${order.id} PAID → stock decremented`);
        } else if (finalStatus === "CANCELLED" && order.status === "PAID") {
          // Jika CANCELLED dari PAID → kembalikan stok
          for (const item of order.items) {
            await prisma.product.update({
              where: { id: item.productId },
              data: { stock: { increment: item.quantity } },
            });
          }
          await prisma.order.update({
            where: { id: order.id },
            data: { status: finalStatus },
          });
          console.log(
            `Webhook: Order ${order.id} CANCELLED from PAID → stock restored`,
          );
        } else {
          // Update status saja (PENDING, CANCELLED dari PENDING, dll)
          await prisma.order.update({
            where: { id: order.id },
            data: { status: finalStatus },
          });
          console.log(`Webhook: Order ${order.id} updated to ${finalStatus}`);
        }

        return NextResponse.json({
          success: true,
          message: "Order status updated",
        });
      }

      // Fallback: coba cari langsung di kedua tabel (untuk backward compatibility)
      const booking = await prisma.booking.findUnique({
        where: { id: order_id },
      });
      if (booking) {
        await prisma.booking.update({
          where: { id: order_id },
          data: { status: finalStatus === "PAID" ? "CONFIRMED" : finalStatus },
        });
        return NextResponse.json({
          success: true,
          message: "Booking status updated (legacy)",
        });
      }

      const order = await prisma.order.findUnique({
        where: { id: order_id },
        include: { items: true },
      });
      if (order) {
        if (finalStatus === "CANCELLED" && order.status !== "CANCELLED") {
          for (const item of order.items) {
            await prisma.product.update({
              where: { id: item.productId },
              data: { stock: { increment: item.quantity } },
            });
          }
          await prisma.order.update({
            where: { id: order.id },
            data: { status: finalStatus },
          });
        } else {
          await prisma.order.update({
            where: { id: order_id },
            data: { status: finalStatus },
          });
        }
        return NextResponse.json({
          success: true,
          message: "Order status updated (legacy)",
        });
      }

      console.warn(`Webhook: ID ${order_id} not found in any table.`);
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 },
      );
    } catch (dbError) {
      console.error("Database error during webhook update:", dbError);
      return NextResponse.json(
        { error: "Database update failed" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error processing Midtrans Webhook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
