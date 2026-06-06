"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
  Gamepad2,
  Sparkles,
  Clock,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1500; // 1.5 seconds animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercent = Math.min(progress / duration, 1);

      // Easing out quadratic
      const ease = progressPercent * (2 - progressPercent);
      const current = Math.floor(ease * target);

      setCount(current);

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={elementRef}
      className="text-4xl md:text-5xl font-black text-brand-600 dark:text-brand-400"
    >
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

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

function TestimonialSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = testimonials.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
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
          {/* Main Card */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-[#FDF6EF] dark:bg-[#2D1506] rounded-3xl p-8 md:p-12 border border-[#F0D5C8] dark:border-brand-900/40 shadow-xl relative"
          >
            {/* Quote icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="w-16 h-16 text-brand-600" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-accent-400 text-accent-400"
                />
              ))}
            </div>

            {/* Text */}
            <blockquote className="text-xl md:text-2xl text-[#3D1506] dark:text-[#F5E6D3] font-medium leading-relaxed mb-8">
              &ldquo;{t.text}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-3xl select-none">
                {t.avatar}
              </div>
              <div>
                <div className="font-bold text-[#1C0A00] dark:text-[#F5E6D3]">
                  {t.name}
                </div>
                <div className="text-sm text-[#7A3B1E] dark:text-[#C4946A]">
                  {t.role}
                </div>
              </div>
              <div className="ml-auto">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60">
                  {t.badge}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100 via-[#FDF6EF] to-[#FDF6EF] dark:from-brand-900/40 dark:via-[#1A0800] dark:to-[#1A0800]"></div>

        {/* Decorative floating blobs */}
        <div className="absolute top-16 right-8 w-80 h-80 bg-brand-200/25 dark:bg-brand-700/10 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-8 left-4 w-64 h-64 bg-accent-200/30 dark:bg-accent-700/10 rounded-full blur-3xl pointer-events-none animate-float-delay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-100/20 dark:bg-brand-900/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-sm font-medium mb-6 border border-brand-100 dark:border-brand-900/50 shadow-sm select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                <Sparkles className="w-4 h-4" />
                <span>Satu Tempat, Berbagai Kebutuhan</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
                Belanja Nyaman, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-accent-500">
                  Anak Senang.
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Rizquna menghadirkan toko serba ada terlengkap dan Playground
                Happy Kids yang interaktif. Temukan alat tulis, sembako,
                jajanan, hingga arena bermain anak dalam satu destinasi!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-[#2D1506] hover:bg-brand-600 text-white font-semibold transition-all shadow-lg hover:shadow-brand-500/40 animate-pulse-glow"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Mulai Belanja
                </Link>
                <Link
                  href="/playground"
                  className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-[#2D1506] text-[#1C0A00] dark:text-[#F5E6D3] border border-[#E8C9B0] dark:border-brand-800 hover:border-brand-500 dark:hover:border-brand-500 font-medium transition-all shadow-sm hover:shadow-md"
                >
                  <Gamepad2 className="w-5 h-5 text-accent-500" />
                  Pesan Tiket Playground
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video lg:aspect-square"
            >
              {/* Store hero image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-900 to-accent-900">
                <Image
                  src="/rizquna.jpg"
                  alt="Tampak depan toko Rizquna Store"
                  fill
                  className="object-cover opacity-80"
                  priority
                  quality={80}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-12 bg-[#F5EDE4] dark:bg-[#2D1506]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C0A00] dark:text-[#F5E6D3]">
              Belanja{" "}
              <span className="text-brand-600 dark:text-brand-400">
                per Kategori
              </span>
            </h2>
            <Link
              href="/products"
              className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-5 select-none">
            {[
              {
                icon: "📚",
                label: "Alat Tulis",
                href: "/products?category=Alat%20Tulis",
                bg: "bg-sky-50 dark:bg-sky-900/20 border-sky-100 dark:border-sky-900/40 hover:border-sky-400",
                iconBg: "bg-sky-100 dark:bg-sky-900/30",
              },
              {
                icon: "🛒",
                label: "Sembako",
                href: "/products?category=Sembako",
                bg: "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/40 hover:border-green-400",
                iconBg: "bg-green-100 dark:bg-green-900/30",
              },
              {
                icon: "👕",
                label: "Seragam",
                href: "/products?category=Seragam",
                bg: "bg-brand-50 dark:bg-brand-900/20 border-brand-100 dark:border-brand-900/40 hover:border-brand-400",
                iconBg: "bg-brand-100 dark:bg-brand-900/30",
              },
              {
                icon: "🎒",
                label: "Tas & Koper",
                href: "/products?category=Tas%20%26%20Koper",
                bg: "bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/40 hover:border-purple-400",
                iconBg: "bg-purple-100 dark:bg-purple-900/30",
              },
              {
                icon: "🎮",
                label: "Playground",
                href: "/playground",
                bg: "bg-accent-100 dark:bg-accent-900/20 border-accent-200 dark:border-accent-900/40 hover:border-accent-400",
                iconBg: "bg-accent-200 dark:bg-accent-900/30",
              },
            ].map(({ icon, label, href, bg, iconBg }) => (
              <Link
                key={label}
                href={href}
                className={`flex flex-col items-center gap-3 p-4 md:p-5 rounded-2xl border hover:shadow-md transition-all group text-center ${bg}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform ${iconBg}`}
                >
                  {icon}
                </div>
                <span className="text-xs md:text-sm font-semibold text-[#1C0A00] dark:text-[#F5E6D3] group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stat Counters Section */}
      <section className="py-16 bg-white dark:bg-[#1A0800]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                count: 1000,
                suffix: "+",
                label: "Pelanggan Puas",
                icon: "👨‍👩‍👧‍👦",
                color: "from-brand-500 to-brand-600",
              },
              {
                count: 500,
                suffix: "+",
                label: "Pilihan Produk",
                icon: "📦",
                color: "from-sky-500 to-sky-600",
              },
              {
                count: 5,
                suffix: "+",
                label: "Wahana Playground",
                icon: "🎡",
                color: "from-accent-500 to-accent-600",
              },
              {
                count: 100,
                suffix: "%",
                label: "Aman & Terpercaya",
                icon: "🛡️",
                color: "from-green-500 to-green-600",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-[#FDF6EF] dark:bg-[#2D1506]/30 rounded-3xl border border-[#F0D5C8]/60 dark:border-brand-900/20 hover:shadow-lg transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl mx-auto mb-3 shadow-md`}
                >
                  {stat.icon}
                </div>
                <Counter target={stat.count} suffix={stat.suffix} />
                <p className="text-sm font-semibold text-[#7A3B1E] dark:text-[#C4946A] mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[#F5EDE4]/30 dark:bg-[#2D1506]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Kenapa Memilih{" "}
              <span className="text-brand-600 dark:text-brand-400">
                Rizquna?
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Komitmen kami adalah memberikan kenyamanan berbelanja kebutuhan
              keluarga dan keceriaan bermain anak yang terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🛍️",
                title: "Produk Terlengkap",
                desc: "Dari ATK, seragam sekolah, sembako, hingga jajanan harian anak-anak semua ada dalam satu toko.",
                accentColor: "border-t-brand-500",
                iconBg:
                  "bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/40 dark:to-brand-800/20",
              },
              {
                icon: "💳",
                title: "Pembayaran Mudah",
                desc: "Dukungan pembayaran online aman via Midtrans untuk Qris, Transfer Bank, E-Wallet, dan kartu kredit.",
                accentColor: "border-t-sky-500",
                iconBg:
                  "bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-900/40 dark:to-sky-800/20",
              },
              {
                icon: "🛡️",
                title: "Playground Aman & Edukatif",
                desc: "Fasilitas bermain indoor yang bersih, aman, dan dirancang khusus untuk menstimulasi motorik anak.",
                accentColor: "border-t-green-500",
                iconBg:
                  "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/20",
              },
              {
                icon: "🌟",
                title: "Layanan Ramah",
                desc: "Tim kami yang ramah dan responsif selalu siap melayani kebutuhan belanja serta bermain keluarga Anda.",
                accentColor: "border-t-accent-500",
                iconBg:
                  "bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900/40 dark:to-accent-800/20",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`p-8 bg-white dark:bg-[#2D1506] rounded-3xl border-t-4 border ${item.accentColor} border-[#F0D5C8] dark:border-brand-900/40 hover:shadow-xl transition-all flex flex-col items-center text-center group card-hover-glow`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${item.iconBg} shadow-sm flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform select-none`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#7A3B1E] dark:text-[#C4946A] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* Promo Banner */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#2D1506] dark:bg-[#3D1F0A] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
              <Sparkles className="w-72 h-72 text-accent-400" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 text-accent-300 text-xs font-bold mb-3 border border-accent-500/30 select-none">
                <span className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse"></span>
                PROMO SPESIAL
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Tiket Playground Happy Kids
              </h3>
              <p className="text-brand-200 text-sm">
                Gratis 1 pendamping dewasa setiap pembelian tiket anak!
              </p>
            </div>
            <div className="relative z-10 flex flex-col items-center md:items-end gap-3 select-none">
              <div className="text-4xl font-extrabold text-accent-400">
                Rp 10.000
              </div>
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-400 text-[#1C0A00] font-bold text-sm transition-all shadow-lg shadow-accent-500/30"
              >
                Pesan Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#F5EDE4] dark:bg-[#2D1506]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Layanan Utama Kami
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Kami menyediakan dua layanan utama untuk memenuhi kebutuhan
              belanja Anda dan hiburan untuk si buah hati.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Store Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-[#2D1506] rounded-3xl p-8 shadow-xl border border-[#F0D5C8] dark:border-brand-900/40 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-500 select-none">
                <ShoppingBag className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-6">
                  <ShoppingBag className="w-8 h-8 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="text-2xl font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-4">
                  Rizquna Store
                </h3>
                <p className="text-[#5C2A10] dark:text-[#D4A882] mb-6">
                  Toko perlengkapan alat tulis terlengkap, sembako segar, dan
                  aneka jajanan favorit keluarga. Semua yang Anda cari ada di
                  sini.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center text-brand-600 dark:text-brand-400 font-semibold hover:text-brand-700 group-hover:gap-2 transition-all"
                >
                  Lihat Katalog Produk <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
            </motion.div>

            {/* Playground Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-[#2D1506] rounded-3xl p-8 shadow-xl border border-[#F0D5C8] dark:border-brand-900/40 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-500 select-none">
                <Gamepad2 className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center mb-6">
                  <Gamepad2 className="w-8 h-8 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="text-2xl font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-4">
                  Playground Happy Kids
                </h3>
                <p className="text-[#5C2A10] dark:text-[#D4A882] mb-6">
                  Area bermain luas yang aman dan edukatif. Dilengkapi berbagai
                  wahana menyenangkan untuk melatih motorik anak.
                </p>
                <Link
                  href="/playground"
                  className="inline-flex items-center text-accent-600 dark:text-accent-400 font-semibold hover:text-accent-700 group-hover:gap-2 transition-all"
                >
                  Pesan Tiket Sekarang <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info / Hours Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-4xl p-10 md:p-14 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10 select-none">
              <Clock className="w-96 h-96" />
            </div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Jam Operasional Kami
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-2">Senin - Minggu</h3>
                  <div className="text-3xl font-bold text-accent-300">
                    08:00 - 20:00
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-2">Istirahat</h3>
                  <div className="text-3xl font-bold text-accent-300">
                    12:00 - 13:00
                  </div>
                </div>
              </div>

              <p className="mt-8 text-brand-100">
                Store dan Playground buka setiap hari. Istirahat 12.00–13.00.
                Kunjungi kami untuk pengalaman belanja dan bermain terbaik.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
