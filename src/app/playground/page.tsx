"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Ticket,
  CheckCircle2,
  User,
  Phone,
} from "lucide-react";
import { createBooking, updateBookingStatus } from "@/actions/booking";
import { useRouter } from "next/navigation";

export default function PlaygroundPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const ticketPrice = 25000; // Harga tiket contoh

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !customerName || !customerPhone) return;

    startTransition(async () => {
      // Create Database Record
      const result = await createBooking({
        customerName,
        customerPhone,
        date: new Date(date),
        timeSlot: time,
        guests,
        totalAmount: guests * ticketPrice,
      });

      if (result.success && result.bookingId) {
        try {
          const response = await fetch("/api/midtrans-booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookingId: result.bookingId }),
          });

          const { token } = await response.json();

          if (token && window.snap) {
            window.snap.pay(token, {
              onSuccess: async function () {
                router.push(`/order-success?type=booking`);
              },
              onPending: function () {
                router.push(`/order-success?type=booking`);
              },
              onError: function () {
                alert("Pembayaran gagal. Silakan coba lagi.");
              },
              onClose: function () {
                // User menutup pop-up, tidak perlu action
              },
            });
          }
        } catch (error) {
          console.error("Error Triggering Snap:", error);
          alert("Terjadi kesalahan saat menghubungkan ke Midtrans.");
        }
      } else {
        alert(result.error);
      }
    });
  };

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="py-12 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Playground{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">
              Happy Kids
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Fasilitas bermain anak indoor yang aman, nyaman, dan edukatif.
            Dilengkapi dengan wahana ketangkasan, area mandi bola, dan berbagai
            mainan interaktif.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info & Rules */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Ticket className="w-6 h-6 text-accent-500" /> Harga Tiket Masuk
              </h3>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-black text-brand-600 dark:text-brand-400">
                  Rp 25.000
                </span>
                <span className="text-gray-500 dark:text-gray-400 mb-1">
                  / anak (sepuasnya)
                </span>
              </div>
              <p className="text-sm text-gray-500">
                *Satu tiket sudah termasuk gratis 1 pendamping dewasa.
              </p>
            </div>

            <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Aturan Bermain</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-300 flex-shrink-0" />
                  <span>
                    Anak & pendamping wajib memakai kaos kaki selama di area
                    bermain.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-300 flex-shrink-0" />
                  <span>
                    Dilarang membawa makanan ringan/minuman ke dalam zona
                    karpet.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-300 flex-shrink-0" />
                  <span>
                    Jaga kebersihan dan alat permainan, untuk keceriaan bersama.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-slate-700 relative overflow-hidden"
          >
            {isBooked ? (
              <div className="text-center py-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Pemesanan Selesai
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                  Tiket Playground untuk jadwal {time} atas nama {customerName}{" "}
                  telah berhasil dicatat.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsBooked(false);
                      setDate("");
                      setTime("");
                      setCustomerName("");
                      setCustomerPhone("");
                    }}
                    className="px-6 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Pesan Tiket Lain
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBooking}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Pesan Tiket Sekarang
                </h3>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <User className="w-4 h-4 text-brand-500" /> Nama
                        Ayah/Bunda
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-brand-500" /> No WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="0812xxxxxx"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-500" /> Tanggal
                      Kunjungan
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-brand-500" /> Jam
                        Kedatangan
                      </label>
                      <select
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                      >
                        <option value="">Pilih Jam</option>
                        {Array.from({ length: 13 }).map((_, i) => {
                          const hour = i + 9;
                          const timeString = `${hour.toString().padStart(2, "0")}:00`;
                          return (
                            <option key={timeString} value={timeString}>
                              {timeString}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-brand-500" /> Jumlah Anak
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        required
                        value={guests}
                        onChange={(e) =>
                          setGuests(
                            Math.min(
                              50,
                              Math.max(1, parseInt(e.target.value) || 1),
                            ),
                          )
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between mb-8">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Harga:
                  </span>
                  <span className="text-3xl font-black text-brand-600 dark:text-brand-400">
                    {formatRupiah(guests * ticketPrice)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-accent-500/30 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isPending ? "Memproses..." : "Konfirmasi & Bayar"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
