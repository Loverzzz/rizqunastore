import prisma from "@/lib/prisma";
import { Clock, CheckCircle, XCircle, Users, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <Clock className="w-3.5 h-3.5" /> Menunggu Pembayaran
          </span>
        );
      case "PAID":
      case "CONFIRMED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
            <CheckCircle className="w-3.5 h-3.5" /> Lunas / Terkonfirmasi
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">
            <XCircle className="w-3.5 h-3.5" /> Dibatalkan
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FDF6EF] text-[#5C2A10] dark:bg-[#3D1F0A] dark:text-[#C4946A] border border-[#E8C9B0] dark:border-brand-900/40">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1C0A00] dark:text-[#F5E6D3]">
            Booking Playground
          </h1>
          <p className="text-[#7A3B1E] dark:text-[#C4946A] mt-1">
            Kelola reservasi tiket dan jadwal kunjungan area bermain anak.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#2D1506] rounded-2xl shadow-sm border border-[#F0D5C8] dark:border-brand-900/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FDF6EF] dark:bg-[#1A0800]/50 border-b border-[#F0D5C8] dark:border-brand-900/40">
                <th className="px-6 py-4 text-xs font-semibold text-[#7A3B1E] dark:text-[#C4946A] uppercase tracking-wider">
                  ID Reservasi
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-[#7A3B1E] dark:text-[#C4946A] uppercase tracking-wider">
                  Pelanggan
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-[#7A3B1E] dark:text-[#C4946A] uppercase tracking-wider">
                  Jadwal & Anak
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-[#7A3B1E] dark:text-[#C4946A] uppercase tracking-wider">
                  Total & Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0D5C8] dark:divide-brand-900/30">
              {bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-[#7A3B1E] dark:text-[#C4946A]"
                  >
                    Belum ada reservasi masuk.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-[#FDF6EF]/50 dark:hover:bg-[#3D1F0A]/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-mono text-xs text-brand-600 dark:text-brand-400 mb-1">
                        {booking.id.split("-")[0].toUpperCase()}
                      </div>
                      <div className="text-xs text-[#7A3B1E] dark:text-[#C4946A]">
                        {new Date(booking.createdAt).toLocaleDateString(
                          "id-ID",
                          { dateStyle: "medium" },
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#1C0A00] dark:text-[#F5E6D3]">
                        {booking.customerName}
                      </div>
                      <div className="text-sm text-[#7A3B1E] dark:text-[#C4946A] mt-0.5">
                        {booking.customerPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-[#5C2A10] dark:text-[#D4A882] border border-[#E8C9B0] dark:border-brand-900/40 bg-[#FDF6EF] dark:bg-[#1A0800]/50 px-2 py-1.5 rounded-md inline-flex w-fit">
                          <Calendar className="w-4 h-4 text-brand-500" />
                          <span className="font-medium">
                            {new Date(booking.date).toLocaleDateString(
                              "id-ID",
                              { dateStyle: "medium" },
                            )}
                          </span>
                          <span className="text-[#E8C9B0] dark:text-brand-800">|</span>
                          <span className="text-accent-500 dark:text-accent-400 font-bold">
                            {booking.timeSlot}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#7A3B1E] dark:text-[#C4946A]">
                          <Users className="w-3.5 h-3.5" />
                          <span>{booking.guests} Tiket Anak</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-2">
                        {formatRupiah(booking.totalAmount)}
                      </div>
                      {getStatusBadge(booking.status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}