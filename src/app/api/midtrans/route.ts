import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import midtransClient from 'midtrans-client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

// Inisialisasi Midtrans Snap Client
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-xW0LgT8Xh0-Yf0nE40tA2J-h', // Dummy fallback keys
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-rF2m0nQ9R4c4X6L_', // Dummy fallback keys
});

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // Ambil detail pesanan asli dari database SQLite kita
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!order) {
      return NextResponse.json({ error: 'Pesanan tidak ditemukan' }, { status: 404 });
    }

    // Siapkan parameter transaksi untuk dikirim ke Midtrans
    const parameter = {
      transaction_details: {
        order_id: order.id,
        gross_amount: Math.round(order.totalAmount), // Total harga IDR, wajib integer
      },
      customer_details: {
        first_name: order.customerName,
        phone: order.customerPhone,
      },
      item_details: order.items.map(item => ({
        id: item.productId.substring(0, 50),
        price: Math.round(item.price), // Wajib Integer
        quantity: item.quantity,
        name: item.product.name.substring(0, 50), // Midtrans membatasi nama item maksimal 50 karakter
      }))
    };

    // Minta Token Snap (pop-up pembayaran) dari server Midtrans
    const transaction = await snap.createTransaction(parameter);
    
    // Simpan link pembayaran Midtrans ke database web-mu
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentLink: transaction.redirect_url }
    });

    return NextResponse.json({ 
      token: transaction.token,
      redirect_url: transaction.redirect_url 
    });

  } catch (error) {
    console.error('Error saat membuat transaksi Midtrans:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
