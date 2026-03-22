import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import midtransClient from 'midtrans-client';

export const dynamic = 'force-dynamic';

// Inisialisasi Midtrans Snap Client
const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
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

    // Generate unique Midtrans order ID
    const midtransOrderId = `BOOK-${booking.id.split('-')[0]}-${Date.now()}`;

    // Hindari selisih pembulatan (misal 100 / 3 tamu = 33)
    const itemPriceRound = Math.round(booking.totalAmount / booking.guests);
    const calculatedGrossAmount = itemPriceRound * booking.guests;

    const parameter = {
      transaction_details: {
        order_id: midtransOrderId,
        gross_amount: calculatedGrossAmount, 
      },
      customer_details: {
        first_name: booking.customerName,
        phone: booking.customerPhone,
      },
      item_details: [{
        id: "TICKET-PLAYGROUND",
        price: itemPriceRound,
        quantity: booking.guests,
        name: `Tiket PG (${booking.timeSlot})`,
      }]
    };

    const transaction = await snap.createTransaction(parameter);
    
    // Simpan midtransOrderId dan payment link
    await prisma.booking.update({
      where: { id: booking.id },
      data: { 
        paymentLink: transaction.redirect_url,
        midtransOrderId: midtransOrderId,
      }
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
