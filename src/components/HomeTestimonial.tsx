"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Bunda Salma",
    role: "Ibu rumah tangga",
    avatar: "👩",
    rating: 5,
    text: "Belanja di Rizquna nyaman banget! ATK anak lengkap, harganya bersahabat, dan pelayanannya ramah. Jadi langganan tetap setiap bulan!",
    badge: "Pelanggan Setia",
  },
  {
    name: "Pak Hendra",
    role: "Ayah dari 2 anak",
    avatar: "👨",
    rating: 5,
    text: "Anak saya sangat suka Playground Happy Kids. Fasilitasnya bersih, aman, dan petugasnya ramah. Tiket Rp 10.000 sudah termasuk pendamping, sangat worth it!",
    badge: "Pelanggan Playground",
  },
  {
    name: "Bunda Fitri",
    role: "Guru SD",
    avatar: "👩‍🏫",
    rating: 5,
    text: "Sering belanja seragam dan alat tulis untuk siswa di sini. Stok selalu lengkap, harga kompetitif, dan bisa pesan dalam jumlah banyak. Recommended!",
    badge: "Pembelian Grosir",
  },
  {
    name: "Kak Dina",
    role: "Mahasiswi",
    avatar: "👩‍💻",
    rating: 5,
    text: "Aplikasinya mudah dipakai, bisa lihat produk dan langsung order. Pembayaran via QRIS praktis. Pengiriman cepat sampai! Sangat memuaskan.",
    badge: "Belanja Online",
  },
  {
    name: "Pak Rudi",
    role: "Pemilik warung",
    avatar: "👨‍💼",
    rating: 5,
    text: "Sembako di Rizquna lengkap dan fresh. Harganya bersaing dengan pasar tradisional, tapi tempatnya jauh lebih bersih dan nyaman. Saya rutin belanja setiap minggu.",
    badge: "Pelanggan Sembako",
  },
];

export default function HomeTestimonial() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = testimonials.length;

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    const start = () => {
      timer = setInterval(() => {
        setDirection(1);
        setActive((prev) => (prev + 1) % total);
      }, 5000);
    };

    const onVisibility = () => {
      if (document.hidden) {
        clearInterval(timer);
      } else {
        start();
      }
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [total]);

  const goTo = (idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };
  const prev = () => {
    setDirection(-1);
    setActive((a) => (a - 1 + total) % total);
  };
  const next = () => {
    setDirection(1);
    setActive((a) => (a + 1) % total);
  };

  const t = testimonials[active];

  return (
    <section className="py-20 bg-white dark:bg-[#1A0800] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400 text-sm font-medium mb-4 border border-accent-100 dark:border-accent-900/40">
            <Star className="w-4 h-4 fill-accent-500 text-accent-500" />
            <span>Apa Kata Pelanggan Kami</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Dipercaya Ribuan{" "}
            <span className="text-brand-600 dark:text-brand-400">Keluarga</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Kepuasan pelanggan adalah prioritas kami. Berikut pengalaman nyata
            dari keluarga yang telah mempercayai Rizquna.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-[#FDF6EF] dark:bg-[#2D1506] rounded-3xl p-8 md:p-12 border border-[#F0D5C8] dark:border-brand-900/40 shadow-xl relative"
          >
            <div className="absolute top-8 right-8 opacity-10" aria-hidden="true">
              <Quote className="w-16 h-16 text-brand-600" />
            </div>
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent-400 text-accent-400" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-[#3D1506] dark:text-[#F5E6D3] font-medium leading-relaxed mb-8">
              &ldquo;{t.text}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-3xl select-none">
                {t.avatar}
              </div>
              <div>
                <div className="font-bold text-[#1C0A00] dark:text-[#F5E6D3]">{t.name}</div>
                <div className="text-sm text-[#7A3B1E] dark:text-[#C4946A]">{t.role}</div>
              </div>
              <div className="ml-auto">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60">
                  {t.badge}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Testimonial sebelumnya"
              className="w-10 h-10 rounded-full bg-white dark:bg-[#2D1506] border border-[#F0D5C8] dark:border-brand-900/40 flex items-center justify-center hover:bg-brand-50 dark:hover:bg-[#3D1F0A] transition-all shadow-sm hover:shadow-md text-[#1C0A00] dark:text-[#F5E6D3]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 h-2.5 bg-brand-600 dark:bg-brand-400"
                      : "w-2.5 h-2.5 bg-[#E8C9B0] dark:bg-brand-900/60 hover:bg-brand-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Testimonial berikutnya"
              className="w-10 h-10 rounded-full bg-white dark:bg-[#2D1506] border border-[#F0D5C8] dark:border-brand-900/40 flex items-center justify-center hover:bg-brand-50 dark:hover:bg-[#3D1F0A] transition-all shadow-sm hover:shadow-md text-[#1C0A00] dark:text-[#F5E6D3]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mini summary row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "⭐", value: "5.0", label: "Rating Rata-rata" },
            { icon: "🏆", value: "1.000+", label: "Keluarga Puas" },
            { icon: "📦", value: "500+", label: "Produk Tersedia" },
            { icon: "🎡", value: "5+", label: "Wahana Playground" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-[#FDF6EF] dark:bg-[#2D1506]/30 border border-[#F0D5C8]/60 dark:border-brand-900/20"
            >
              <span className="text-2xl mb-1 select-none">{item.icon}</span>
              <span className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">
                {item.value}
              </span>
              <span className="text-xs text-[#7A3B1E] dark:text-[#C4946A] font-medium">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
