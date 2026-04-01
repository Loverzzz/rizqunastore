"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const TICKET_PRICE = 25000;

export async function createBooking(data: {
  customerName: string;
  customerPhone: string;
  date: Date;
  timeSlot: string;
  guests: number;
  totalAmount: number;
}) {
  try {
    // Validate inputs
    if (!data.customerName?.trim() || !data.customerPhone?.trim()) {
      return { success: false, error: "Nama dan nomor telepon wajib diisi." };
    }
    if (!data.timeSlot) {
      return { success: false, error: "Silakan pilih jam kedatangan." };
    }
    if (data.guests < 1 || data.guests > 50) {
      return { success: false, error: "Jumlah anak harus antara 1 dan 50." };
    }

    // Validate date is not in the past
    const bookingDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDate < today) {
      return {
        success: false,
        error: "Tanggal booking tidak boleh di masa lalu.",
      };
    }

    // Recalculate totalAmount on server (don't trust client)
    const serverTotalAmount = data.guests * TICKET_PRICE;

    const booking = await prisma.booking.create({
      data: {
        customerName: data.customerName.trim(),
        customerPhone: data.customerPhone.trim(),
        date: bookingDate,
        timeSlot: data.timeSlot,
        guests: data.guests,
        totalAmount: serverTotalAmount,
        status: "PENDING",
      },
    });

    revalidatePath("/admin/bookings");

    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, error: "Gagal membuat pesanan booking." };
  }
}

export async function updateBookingStatus(bookingId: string, status: string) {
  try {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });
    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal mengubah status booking." };
  }
}
