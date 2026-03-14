import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Fungsi untuk memverifikasi Signature Key dari Midtrans
const verifySignature = (
  orderId: string,
  statusCode: string,
  grossAmount: string,
  serverKey: string,
  signatureKey: string
) => {
  const hash = crypto.createHash('sha512');
  hash.update(`${orderId}${statusCode}${grossAmount}${serverKey}`);
  const calculatedSignature = hash.digest('hex');
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

    const serverKey = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-xW0LgT8Xh0-Yf0nE40tA2J-h';

    // 1. Verifikasi Signature Key untuk memastikan request asli dari Midtrans
    const isValidSignature = verifySignature(
      order_id,
      status_code,
      gross_amount,
      serverKey,
      signature_key
    );

    if (!isValidSignature) {
      console.warn("Invalid Midtrans Signature Key received!");
      return NextResponse.json({ error: 'Invalid signature key' }, { status: 403 });
    }

    // 2. Tentukan status akhir berdasarkan transaction_status dan fraud_status
    let finalStatus = 'PENDING';
    
    if (transaction_status == 'capture') {
        if (fraud_status == 'challenge'){
            finalStatus = 'PENDING'; // Menunggu verifikasi manual dari dashboard Midtrans
        } else if (fraud_status == 'accept'){
            finalStatus = 'PAID';
        }
    } else if (transaction_status == 'settlement'){
        finalStatus = 'PAID';
    } else if (transaction_status == 'cancel' || transaction_status == 'deny' || transaction_status == 'expire'){
        finalStatus = 'CANCELLED';
    } else if (transaction_status == 'pending'){
        finalStatus = 'PENDING';
    }

    // Karena format Booking ID dan Order ID sama (UUID), kita tidak tahu pasti ini pesanan yang mana
    // Jadi kita coba update Order dulu, jika tidak ada, baru coba Booking
    
    try {
      // Coba cari di model Booking terlebih dahulu (asumsi jika ID ditemukan, itu booking)
      const booking = await prisma.booking.findUnique({
        where: { id: order_id }
      });

      if (booking) {
        // Ini adalah transaksi Booking Playground
        await prisma.booking.update({
          where: { id: order_id },
          data: { 
            // Ubah PAID jadi CONFIRMED khusus untuk terminology booking
            status: finalStatus === 'PAID' ? 'CONFIRMED' : finalStatus 
          }
        });
        console.log(`Midtrans Webhook: Booking ${order_id} updated to ${finalStatus}`);
        return NextResponse.json({ success: true, message: 'Booking status updated' });
      }

      // Jika bukan booking, coba cari di model Order
      const order = await prisma.order.findUnique({
        where: { id: order_id }
      });

      if (order) {
        // Ini adalah transaksi Order Toko
        await prisma.order.update({
          where: { id: order_id },
          data: { status: finalStatus }
        });
        console.log(`Midtrans Webhook: Order ${order_id} updated to ${finalStatus}`);
        return NextResponse.json({ success: true, message: 'Order status updated' });
      }

      console.warn(`Midtrans Webhook: Order/Booking ID ${order_id} not found in database.`);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    } catch (dbError) {
      console.error("Database error during webhook update:", dbError);
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error processing Midtrans Webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
