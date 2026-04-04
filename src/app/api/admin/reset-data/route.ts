import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { password, target } = await request.json();
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Password salah" }, { status: 401 });
  }

  const validTargets = ["orders", "bookings", "all"];
  if (!validTargets.includes(target)) {
    return NextResponse.json({ error: "Target tidak valid" }, { status: 400 });
  }

  const results: string[] = [];

  if (target === "orders" || target === "all") {
    // Delete order items first (FK constraint)
    const deletedItems = await prisma.orderItem.deleteMany({});
    const deletedOrders = await prisma.order.deleteMany({});
    results.push(
      `${deletedOrders.count} pesanan & ${deletedItems.count} item dihapus`,
    );
  }

  if (target === "bookings" || target === "all") {
    const deletedBookings = await prisma.booking.deleteMany({});
    results.push(`${deletedBookings.count} booking dihapus`);
  }

  return NextResponse.json({ success: true, message: results.join(", ") });
}
