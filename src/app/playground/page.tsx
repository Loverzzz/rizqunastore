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
import { createBooking } from "@/actions/booking";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "Berapa harga tiket masuk Playground Happy Kids?",
    answer: "Harga tiket masuk adalah Rp 10.000 per anak. Setiap tiket sudah termasuk gratis 1 pendamping dewasa. Anak bisa bermain sepuasnya tanpa batas waktu.",
  },
  {
    question: "Jam operasional Playground Happy Kids?",
    answer: "Playground buka setiap hari Senin - Minggu pukul 08:00 - 20:00 WITA, dengan waktu istirahat pukul 12:00 - 13:00 WITA.",
  },
  {
    question: "Apakah wajib memakai kaos kaki?",
    answer: "Ya, anak dan pendamping wajib memakai kaos kaki selama berada di area bermain. Kaos kaki bisa dibawa sendiri atau dibeli di lokasi.",
  },
  {
    question: "Apakah boleh membawa makanan ke dalam area bermain?",
    answer: "Tidak diperbolehkan membawa makanan atau minuman ke dalam zona karpet bermain. Hal ini untuk menjaga kebersihan area permainan.",
  },
  {
    question: "Apakah tersedia tempat parkir?",
    answer: "Ya, tersedia area parkir yang luas dan aman untuk roda dua maupun roda empat di sekitar lokasi Rizquna Store & Playground.",
  },
  {
    question: "Bagaimana cara memesan tiket secara online?",
    answer: "Anda bisa memesan tiket melalui halaman ini dengan mengisi formulir pemesanan di atas. Pembayaran dilakukan secara online melalui Midtrans (QRIS, Transfer Bank, E-Wallet). Setelah pembayaran berhasil, Anda akan menerima konfirmasi pemesanan.",
  },
];

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqItems.map((item, i) => (
        <div
          key={i}
          className="bg-white dark:bg-[#2D1506] rounded-2xl border border-[#F0D5C8] dark:border-brand-900/40 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left"
          >
            <span className="font-semibold text-[#1C0A00] dark:text-[#F5E6D3] pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-brand-500 flex-shrink-0 transition-transform duration-300 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-4"
            >
              <p className="text-[#5C2A10] dark:text-[#D4A882] leading-relaxed">
                {item.answer}
              </p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function PlaygroundPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const ticketPrice = 10000; // Harga tiket

  const isValidIndonesianPhone = (phone: string) => {
    const cleaned = phone.replace(/[\s\-\.]/g, "");
    return /^(\+62|62|0)8[1-9][0-9]{7,10}$/.test(cleaned);
  };

  // Get today's date in local timezone (YYYY-MM-DD)
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !customerName || !customerPhone) return;
    if (!isValidIndonesianPhone(customerPhone)) {
      setPhoneError("Nomor tidak valid. Gunakan format: 08xx-xxxx-xxxx");
      return;
    }

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
                router.push(`/order-success?type=booking&status=paid`);
              },
              onPending: function () {
                router.push(`/order-success?type=booking&status=pending`);
              },
              onError: function () {
                alert("Pembayaran gagal. Silakan coba lagi.");
              },
              onClose: function () {
                alert(
                  "Popup pembayaran ditutup. Booking Anda belum selesai dibayar.",
                );
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
    <div className="py-12 bg-[#FDF6EF] dark:bg-[#1A0800] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C0A00] dark:text-[#F5E6D3] mb-6">
            Playground{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">
              Happy Kids
            </span>
          </h1>
          <p className="text-xl text-[#5C2A10] dark:text-[#D4A882]">
            Fasilitas bermain anak indoor yang aman, nyaman, dan edukatif.
            Dilengkapi dengan wahana ketangkasan, area mandi bola, dan berbagai
            mainan interaktif.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info & Rules */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-[#2D1506] rounded-3xl p-8 shadow-sm border border-[#F0D5C8] dark:border-brand-900/40">
              <h3 className="text-2xl font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-6 flex items-center gap-3">
                <Ticket className="w-6 h-6 text-accent-500" /> Harga Tiket Masuk
              </h3>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-black text-brand-600 dark:text-brand-400">
                  Rp 10.000
                </span>
                <span className="text-[#7A4A2A] dark:text-[#A87050] mb-1">
                  / anak (sepuasnya)
                </span>
              </div>
              <p className="text-sm text-[#7A4A2A] dark:text-[#A87050]">
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

            {/* Fasilitas Gallery */}
            <div className="bg-white dark:bg-[#2D1506] rounded-3xl p-8 shadow-sm border border-[#F0D5C8] dark:border-brand-900/40">
              <h3 className="text-2xl font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-6 flex items-center gap-3">
                <Ticket className="w-6 h-6 text-accent-500" /> Fasilitas Playground
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Mandi Bola & Perosotan",
                    desc: "Kolam bola luas dengan perosotan ganda aman untuk melatih ketangkasan anak.",
                    img: "/mandi-bola.png",
                  },
                  {
                    title: "Trampolin Ketangkasan",
                    desc: "Melatih keseimbangan dan motorik kasar anak secara aktif dengan melompat ceria.",
                    img: "/trampolin.png",
                  },
                  {
                    title: "Pojok Kreatif & Edukatif",
                    desc: "Menyusun balok, mainan lego, dan aneka aktivitas motorik halus yang melatih kreativitas.",
                    img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=400&auto=format&fit=crop",
                  },
                  {
                    title: "Wahana Rintangan Mini",
                    desc: "Jembatan mini dan rintangan lunak yang dirancang aman untuk sensori anak.",
                    img: "/wahana-rintangan-mini.png",
                  },
                ].map((facility, i) => (
                  <div key={i} className="group rounded-2xl overflow-hidden border border-brand-100 dark:border-brand-900/30 bg-[#FDF6EF]/50 dark:bg-[#1A0800]/20 hover:shadow-md transition-all flex flex-col">
                    <div className="relative aspect-video w-full overflow-hidden bg-brand-50">
                      <img
                        src={facility.img}
                        alt={facility.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 flex-grow select-none">
                      <h4 className="font-bold text-sm text-[#1C0A00] dark:text-[#F5E6D3] mb-1">{facility.title}</h4>
                      <p className="text-xs text-[#7A4A2A] dark:text-[#A87050] leading-relaxed">{facility.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-[#2D1506] rounded-3xl p-8 shadow-2xl border border-[#F0D5C8] dark:border-brand-900/40 relative overflow-hidden"
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
                <h3 className="text-2xl font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-2">
                  Pemesanan Selesai
                </h3>
                <p className="text-[#5C2A10] dark:text-[#D4A882] mb-8 max-w-sm mx-auto">
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
                <h3 className="text-2xl font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-6">
                  Pesan Tiket Sekarang
                </h3>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5C2A10] dark:text-[#D4A882] mb-2 flex items-center gap-2">
                        <User className="w-4 h-4 text-brand-500" /> Nama
                        Ayah/Bunda
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8C9B0] dark:border-brand-900/50 bg-[#FDF6EF] dark:bg-[#3D1F0A]/50 text-[#1C0A00] dark:text-[#F5E6D3] focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#5C2A10] dark:text-[#D4A882] mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-brand-500" /> No WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => {
                          setCustomerPhone(e.target.value);
                          if (
                            e.target.value &&
                            !isValidIndonesianPhone(e.target.value)
                          ) {
                            setPhoneError(
                              "Nomor tidak valid. Gunakan format: 08xx-xxxx-xxxx",
                            );
                          } else {
                            setPhoneError("");
                          }
                        }}
                        placeholder="0812xxxxxx"
                        className={`w-full px-4 py-3 rounded-xl border bg-[#FDF6EF] dark:bg-[#3D1F0A]/50 text-[#1C0A00] dark:text-[#F5E6D3] focus:ring-2 focus:ring-brand-500 outline-none transition-shadow ${
                          phoneError
                            ? "border-red-400 focus:ring-red-400"
                            : "border-[#E8C9B0] dark:border-brand-900/50"
                        }`}
                      />
                      {phoneError && (
                        <p className="mt-1 text-xs text-red-500">
                          {phoneError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#5C2A10] dark:text-[#D4A882] mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-500" /> Tanggal
                      Kunjungan
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={todayStr}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8C9B0] dark:border-brand-900/50 bg-[#FDF6EF] dark:bg-[#3D1F0A]/50 text-[#1C0A00] dark:text-[#F5E6D3] focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5C2A10] dark:text-[#D4A882] mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-brand-500" /> Jam
                        Kedatangan
                      </label>
                      <select
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#E8C9B0] dark:border-brand-900/50 bg-[#FDF6EF] dark:bg-[#3D1F0A]/50 text-[#1C0A00] dark:text-[#F5E6D3] focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                      >
                        <option value="">Pilih Jam</option>
                        {[8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20].map(
                          (hour) => {
                            const timeString = `${hour.toString().padStart(2, "0")}:00`;
                            return (
                              <option key={timeString} value={timeString}>
                                {timeString}
                              </option>
                            );
                          },
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#5C2A10] dark:text-[#D4A882] mb-2 flex items-center gap-2">
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
                        className="w-full px-4 py-3 rounded-xl border border-[#E8C9B0] dark:border-brand-900/50 bg-[#FDF6EF] dark:bg-[#3D1F0A]/50 text-[#1C0A00] dark:text-[#F5E6D3] focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#F0D5C8] dark:border-brand-900/40 flex items-center justify-between mb-8">
                  <span className="text-[#5C2A10] dark:text-[#D4A882]">
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

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-4">
              Pertanyaan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">
                yang Sering Diajukan
              </span>
            </h2>
            <p className="text-[#5C2A10] dark:text-[#D4A882] max-w-xl mx-auto">
              Ada yang ingin Anda tanyakan? Berikut jawaban atas pertanyaan umum seputar Playground Happy Kids.
            </p>
          </div>
          <FaqAccordion />
        </div>
      </div>
    </div>
  );
}
