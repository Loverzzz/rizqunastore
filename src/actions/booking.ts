"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function createBooking(data: {
  customerName: string;
  customerPhone: string;
  date: Date;
  timeSlot: string;
  guests: number;
  totalAmount: number;
}) {
  try {
    const booking = await prisma.booking.create({
      data: {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        date: data.date,
        timeSlot: data.timeSlot,
        guests: data.guests,
        totalAmount: data.totalAmount,
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
