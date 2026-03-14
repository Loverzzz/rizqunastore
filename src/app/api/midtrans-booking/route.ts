import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import midtransClient from 'midtrans-client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

// Inisialisasi Midtrans Snap Client
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-xW0LgT8Xh0-Yf0nE40tA2J-h',
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-rF2m0nQ9R4c4X6L_',
});

export async function POST(request: Request) {
  try {
    const { bookingId } = await request.json();

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking tidak ditemukan' }, { status: 404 });
    }

    const parameter = {
      transaction_details: {
        order_id: booking.id, // Midtrans requires unique ID, Using Prisma's UUID
        gross_amount: Math.round(booking.totalAmount), 
      },
      customer_details: {
        first_name: booking.customerName,
        phone: booking.customerPhone,
      },
      item_details: [{
        id: "TICKET-PLAYGROUND",
        price: Math.round(booking.totalAmount / booking.guests), // Harga Satuan Integer
        quantity: booking.guests,
        name: `Tiket PG (${booking.timeSlot})`, // Keep it short, max 50 chars
      }]
    };

    const transaction = await snap.createTransaction(parameter);
    
    await prisma.booking.update({
      where: { id: booking.id },
      data: { paymentLink: transaction.redirect_url }
    });

    return NextResponse.json({ 
      token: transaction.token,
      redirect_url: transaction.redirect_url 
    });

  } catch (error) {
    console.error('Error saat membuat transaksi Midtrans Booking:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
