"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Store,
  Heart,
  Users,
  Target,
  Eye,
  Award,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  CheckCircle2,
  Gamepad2,
  ShoppingBag,
  Star,
  Navigation,
} from "lucide-react";

const timelineEvents = [
  {
    year: "2023",
    title: "Awal Mula Rizquna",
    desc: "Rizquna Store didirikan sebagai toko serba ada kecil yang melayani kebutuhan sehari-hari warga sekitar Plumpang, Tuban.",
    icon: "🏪",
  },
  {
    year: "2024",
    title: "Ekspansi Produk",
    desc: "Katalog produk berkembang pesat — dari sembako dan alat tulis hingga seragam sekolah, jilbab, dan aneka jajanan favorit keluarga.",
    icon: "📦",
  },
  {
    year: "2025",
    title: "Playground Happy Kids",
    desc: "Meluncurkan Playground Happy Kids, area bermain indoor yang aman dan edukatif untuk anak-anak, lengkap dengan mandi bola, trampolin, dan wahana rintangan.",
    icon: "🎡",
  },
  {
    year: "2026",
    title: "Go Digital",
    desc: "Rizquna hadir secara online! Katalog produk dan pemesanan tiket playground kini bisa diakses kapan saja melalui website resmi.",
    icon: "🌐",
  },
];

const values = [
  {
    icon: Heart,
    title: "Pelayanan dari Hati",
    desc: "Kami percaya setiap pelanggan adalah keluarga. Keramahan dan kejujuran adalah fondasi layanan kami.",
    color: "from-rose-500 to-pink-600",
    bgLight: "bg-rose-50 dark:bg-rose-900/20",
    borderLight: "border-rose-100 dark:border-rose-900/40",
  },
  {
    icon: Users,
    title: "Keluarga Utama",
    desc: "Setiap keputusan bisnis kami berpusat pada kebutuhan keluarga Indonesia — produk terjangkau, berkualitas, dan bermanfaat.",
    color: "from-sky-500 to-blue-600",
    bgLight: "bg-sky-50 dark:bg-sky-900/20",
    borderLight: "border-sky-100 dark:border-sky-900/40",
  },
  {
    icon: Award,
    title: "Kualitas Terjamin",
    desc: "Kami selektif memilih produk yang dijual. Setiap item melewati standar kualitas agar pelanggan mendapat yang terbaik.",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50 dark:bg-amber-900/20",
    borderLight: "border-amber-100 dark:border-amber-900/40",
  },
  {
    icon: Sparkles,
    title: "Inovasi Berkelanjutan",
    desc: "Terus bertumbuh dan berinovasi — dari toko fisik hingga platform digital — untuk melayani pelanggan lebih baik setiap hari.",
    color: "from-emerald-500 to-green-600",
    bgLight: "bg-emerald-50 dark:bg-emerald-900/20",
    borderLight: "border-emerald-100 dark:border-emerald-900/40",
  },
];

const teamMembers = [
  {
    name: "Tim Rizquna Store",
    role: "Pelayanan Pelanggan",
    desc: "Siap membantu Anda menemukan produk yang tepat dengan senyum dan keramahan khas Rizquna.",
    emoji: "🛍️",
    gradient: "from-brand-500 to-brand-600",
  },
  {
    name: "Tim Playground",
    role: "Pengawas & Fasilitator",
    desc: "Menjaga keamanan dan kenyamanan anak-anak selama bermain di area Playground Happy Kids.",
    emoji: "🎮",
    gradient: "from-accent-500 to-accent-600",
  },
  {
    name: "Tim Digital",
    role: "Pengembangan Website",
    desc: "Menghadirkan pengalaman belanja online yang mudah, aman, dan nyaman untuk semua pelanggan.",
    emoji: "💻",
    gradient: "from-sky-500 to-sky-600",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDF6EF] dark:bg-[#1A0800]">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-[-2] hero-mesh animate-aurora-drift" />
        <div className="absolute inset-0 z-[-1] playful-grid opacity-80" />
        <div className="absolute inset-x-0 bottom-0 z-[-1] h-32 bg-gradient-to-t from-[#FDF6EF] dark:from-[#1A0800] to-transparent" />

        {/* Decorative blobs */}
        <div className="absolute top-16 right-8 w-72 h-72 bg-brand-200/30 dark:bg-brand-700/10 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-8 left-4 w-56 h-56 bg-accent-200/40 dark:bg-accent-700/10 rounded-full blur-3xl pointer-events-none animate-float-delay" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/75 dark:bg-brand-900/45 text-brand-600 dark:text-brand-300 text-sm font-bold mb-6 border border-white/70 dark:border-brand-800/60 shadow-lg shadow-brand-500/10 backdrop-blur select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                <Heart className="w-4 h-4" />
                <span>Tentang Kami</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
                Cerita di Balik{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-accent-500 to-brand-400">
                  Rizquna
                </span>
              </h1>

              <p className="text-xl text-[#5C2A10] dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Lebih dari sekadar toko — Rizquna adalah tempat keluarga
                memenuhi kebutuhan sehari-hari dan anak-anak menemukan
                keceriaan. Berawal dari toko kecil di Plumpang, Tuban, kini
                kami tumbuh menjadi destinasi belanja dan bermain terfavorit.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-[#2D1506] hover:bg-brand-600 text-white font-semibold transition-all shadow-xl shadow-brand-700/20 hover:shadow-brand-500/40"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Lihat Katalog
                </Link>
                <Link
                  href="/store"
                  className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-white/80 dark:bg-brand-900/40 hover:bg-white dark:hover:bg-brand-900/60 text-[#1C0A00] dark:text-[#F5E6D3] font-semibold transition-all border border-[#E8C9B0] dark:border-brand-800/60 shadow-lg"
                >
                  <MapPin className="w-5 h-5" />
                  Kunjungi Toko
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-900/20 aspect-video lg:aspect-square border border-white/70 dark:border-brand-800/50"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-900 to-accent-900">
                <Image
                  src="/rizquna.jpg"
                  alt="Tampak depan toko Rizquna Store"
                  fill
                  className="object-cover opacity-80"
                  priority
                  quality={75}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/18 p-4 text-white shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent-200">
                      Sejak 2023
                    </p>
                    <p className="text-lg font-black">
                      Toko + Playground
                    </p>
                  </div>
                  <div className="rounded-full bg-accent-400 px-3 py-1 text-xs font-black text-[#1C0A00]">
                    Tuban
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-white dark:bg-[#2D1506]/50" aria-label="Statistik">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "2023", label: "Tahun Berdiri", icon: "📅" },
              { value: "500+", label: "Produk Tersedia", icon: "📦" },
              { value: "1000+", label: "Pelanggan Puas", icon: "👨‍👩‍👧‍👦" },
              { value: "5+", label: "Wahana Bermain", icon: "🎡" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-[#FDF6EF] dark:bg-[#2D1506]/30 border border-[#F0D5C8]/60 dark:border-brand-900/20"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-black text-brand-600 dark:text-brand-400">
                  {stat.value}
                </div>
                <p className="text-sm font-medium text-[#7A3B1E] dark:text-[#C4946A] mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-20 bg-[#F5EDE4]/30 dark:bg-[#2D1506]/10" aria-label="Visi dan Misi">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Visi &{" "}
              <span className="text-brand-600 dark:text-brand-400">Misi</span>{" "}
              Kami
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Fondasi yang menggerakkan setiap langkah Rizquna untuk melayani
              keluarga Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-[#2D1506] rounded-3xl p-8 md:p-10 shadow-xl border border-[#F0D5C8] dark:border-brand-900/40 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 select-none">
                <Eye className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mb-6 shadow-lg shadow-brand-500/30">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-4">
                  Visi
                </h3>
                <p className="text-[#5C2A10] dark:text-[#D4A882] leading-relaxed text-lg">
                  Menjadi destinasi utama keluarga Indonesia untuk memenuhi
                  kebutuhan belanja sehari-hari dan memberikan pengalaman
                  bermain yang aman, edukatif, dan menyenangkan bagi
                  anak-anak — semua dalam satu tempat.
                </p>
              </div>
            </motion.div>

            {/* Misi */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-[#2D1506] rounded-3xl p-8 md:p-10 shadow-xl border border-[#F0D5C8] dark:border-brand-900/40 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 select-none">
                <Target className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center mb-6 shadow-lg shadow-accent-500/30">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-4">
                  Misi
                </h3>
                <ul className="space-y-4">
                  {[
                    "Menyediakan produk kebutuhan keluarga yang berkualitas dengan harga terjangkau.",
                    "Menghadirkan fasilitas bermain anak yang aman, bersih, dan mendukung tumbuh kembang.",
                    "Memberikan pelayanan ramah, cepat, dan memuaskan untuk setiap pelanggan.",
                    "Terus berinovasi dalam layanan digital untuk kemudahan akses pelanggan.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                      <span className="text-[#5C2A10] dark:text-[#D4A882] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline / Perjalanan Section */}
      <section className="py-20 bg-white dark:bg-[#2D1506]/30" aria-label="Perjalanan Rizquna">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Perjalanan{" "}
              <span className="text-brand-600 dark:text-brand-400">
                Rizquna
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Dari toko kecil hingga menjadi destinasi belanja dan bermain
              keluarga — inilah cerita perjalanan kami.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-300 via-accent-400 to-brand-300 dark:from-brand-700 dark:via-accent-700 dark:to-brand-700 transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {timelineEvents.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 ${
                    i % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ml-16 md:ml-0 ${
                      i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                    }`}
                  >
                    <div className="bg-[#FDF6EF] dark:bg-[#1A0800] rounded-2xl p-6 border border-[#F0D5C8] dark:border-brand-900/40 shadow-sm hover:shadow-lg transition-all">
                      <span className="inline-block px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-sm font-bold mb-3">
                        {event.year}
                      </span>
                      <h3 className="text-lg font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-[#5C2A10] dark:text-[#D4A882] leading-relaxed">
                        {event.desc}
                      </p>
                    </div>
                  </div>

                  {/* Circle node */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-xl shadow-lg shadow-brand-500/30 z-10">
                    {event.icon}
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nilai-Nilai Section */}
      <section className="py-20 bg-[#F5EDE4] dark:bg-[#2D1506]/10" aria-label="Nilai-Nilai">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nilai-Nilai{" "}
              <span className="text-brand-600 dark:text-brand-400">
                Kami
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Empat pilar yang menjadi pedoman dalam setiap layanan dan
              keputusan bisnis Rizquna.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`p-8 bg-white dark:bg-[#2D1506] rounded-3xl border-t-4 border ${item.borderLight} hover:shadow-xl transition-all flex flex-col items-center text-center group card-hover-glow`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="w-8 h-8 text-white" />
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

      {/* Layanan Kami Section */}
      <section className="py-20 bg-white dark:bg-[#2D1506]/30" aria-label="Layanan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Apa yang Kami{" "}
              <span className="text-brand-600 dark:text-brand-400">
                Tawarkan
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Dua layanan utama dalam satu destinasi untuk kebutuhan belanja
              dan hiburan keluarga Anda.
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
              className="bg-[#FDF6EF] dark:bg-[#1A0800] rounded-3xl p-8 shadow-xl border border-[#F0D5C8] dark:border-brand-900/40 relative overflow-hidden group cursor-pointer"
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
                <p className="text-[#5C2A10] dark:text-[#D4A882] mb-4 leading-relaxed">
                  Toko serba ada yang menyediakan kebutuhan keluarga sehari-hari
                  — mulai dari alat tulis, sembako, seragam sekolah, jilbab,
                  tas, hingga aneka jajanan favorit anak-anak.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "500+ pilihan produk",
                    "Harga terjangkau",
                    "Pembayaran digital via Midtrans",
                    "Pemesanan online & ambil di toko",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#5C2A10] dark:text-[#D4A882]">
                      <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/products"
                  className="inline-flex items-center text-brand-600 dark:text-brand-400 font-semibold hover:text-brand-700 group-hover:gap-2 transition-all"
                >
                  Jelajahi Produk <ArrowRight className="w-5 h-5 ml-1" />
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
              className="bg-[#FDF6EF] dark:bg-[#1A0800] rounded-3xl p-8 shadow-xl border border-[#F0D5C8] dark:border-brand-900/40 relative overflow-hidden group cursor-pointer"
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
                <p className="text-[#5C2A10] dark:text-[#D4A882] mb-4 leading-relaxed">
                  Area bermain indoor yang aman, bersih, dan edukatif.
                  Dilengkapi berbagai wahana menyenangkan untuk melatih motorik
                  dan kreativitas anak.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Mandi bola & perosotan",
                    "Trampolin ketangkasan",
                    "Wahana rintangan mini",
                    "Tiket mulai dari Rp 10.000",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#5C2A10] dark:text-[#D4A882]">
                      <CheckCircle2 className="w-4 h-4 text-accent-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/playground"
                  className="inline-flex items-center text-accent-600 dark:text-accent-400 font-semibold hover:text-accent-700 group-hover:gap-2 transition-all"
                >
                  Pesan Tiket <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tim Kami Section */}
      <section className="py-20 bg-[#F5EDE4]/30 dark:bg-[#2D1506]/10" aria-label="Tim Kami">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tim{" "}
              <span className="text-brand-600 dark:text-brand-400">Kami</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Orang-orang hebat di balik layanan Rizquna yang siap melayani
              Anda dengan sepenuh hati.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white dark:bg-[#2D1506] rounded-3xl p-8 shadow-xl border border-[#F0D5C8] dark:border-brand-900/40 text-center hover:shadow-2xl transition-all group"
              >
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {member.emoji}
                </div>
                <h3 className="text-xl font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-brand-500 dark:text-brand-400 mb-4">
                  {member.role}
                </p>
                <p className="text-sm text-[#7A3B1E] dark:text-[#C4946A] leading-relaxed">
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Quote Section */}
      <section className="py-20 relative overflow-hidden" aria-label="Komitmen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-[2rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10 select-none" aria-hidden="true">
              <Star className="w-96 h-96" />
            </div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 opacity-10 select-none" aria-hidden="true">
              <Heart className="w-64 h-64" />
            </div>

            <div className="relative z-10 text-center">
              <div className="text-5xl mb-6">💛</div>
              <blockquote className="text-2xl md:text-3xl font-bold mb-6 leading-relaxed">
                &ldquo;Kami percaya bahwa setiap keluarga berhak mendapatkan
                produk berkualitas dan pengalaman bermain yang menyenangkan
                tanpa harus jauh-jauh mencarinya.&rdquo;
              </blockquote>
              <p className="text-brand-200 text-lg">
                — Tim Rizquna Store & Playground
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Kontak Section */}
      <section className="py-20 bg-[#F5EDE4] dark:bg-[#2D1506]/30" aria-label="Hubungi Kami">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Hubungi{" "}
              <span className="text-brand-600 dark:text-brand-400">Kami</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Punya pertanyaan atau ingin tahu lebih lanjut? Jangan ragu untuk
              menghubungi kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Alamat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#2D1506] rounded-3xl p-8 shadow-xl border border-[#F0D5C8] dark:border-brand-900/40 text-center hover:shadow-2xl transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-5">
                <MapPin className="w-7 h-7 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-lg font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-3">
                Alamat
              </h3>
              <p className="text-sm text-[#5C2A10] dark:text-[#D4A882] leading-relaxed mb-4">
                X3FX+892, Jl. Raya Plumpang
                <br />
                RW.7, Tanggungan, Kec. Plumpang
                <br />
                Kabupaten Tuban, Jawa Timur 62382
              </p>
              <a
                href="https://share.google/TvhIwGbiWwDis9Kg6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 transition-colors"
              >
                <Navigation className="w-4 h-4" /> Buka Maps
              </a>
            </motion.div>

            {/* Jam Operasional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-[#2D1506] rounded-3xl p-8 shadow-xl border border-[#F0D5C8] dark:border-brand-900/40 text-center hover:shadow-2xl transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center mx-auto mb-5">
                <Clock className="w-7 h-7 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-lg font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-3">
                Jam Buka
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#5C2A10] dark:text-[#D4A882]">
                  <span>Senin - Minggu</span>
                  <span className="font-semibold text-[#1C0A00] dark:text-[#F5E6D3]">
                    08:00 - 20:00
                  </span>
                </div>
                <div className="flex justify-between text-[#5C2A10] dark:text-[#D4A882]">
                  <span>Istirahat</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    12:00 - 13:00
                  </span>
                </div>
                <div className="flex justify-between text-[#5C2A10] dark:text-[#D4A882]">
                  <span>Hari Libur</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    Tetap Buka
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Kontak */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-[#2D1506] rounded-3xl p-8 shadow-xl border border-[#F0D5C8] dark:border-brand-900/40 text-center hover:shadow-2xl transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
                <Phone className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-[#1C0A00] dark:text-[#F5E6D3] mb-3">
                Kontak
              </h3>
              <p className="text-sm text-[#5C2A10] dark:text-[#D4A882] mb-4">
                Hubungi kami untuk konfirmasi produk atau pertanyaan lainnya.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/6281915967694"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat WhatsApp
                </a>
                <a
                  href="tel:081915967694"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#F5EDE4] dark:bg-[#3D1F0A] hover:bg-[#EDD9CA] dark:hover:bg-[#4D2A12] text-[#1C0A00] dark:text-[#F5E6D3] text-sm font-medium rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  0819-1596-7694
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" aria-label="Call to Action">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#2D1506] dark:bg-[#3D1F0A] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none" aria-hidden="true">
              <Sparkles className="w-72 h-72 text-accent-400" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Siap Belanja atau Bermain?
              </h3>
              <p className="text-brand-200 max-w-lg">
                Kunjungi Rizquna Store & Playground sekarang. Belanja
                kebutuhan keluarga dan biarkan anak-anak bermain sepuasnya!
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm transition-all shadow-lg shadow-brand-500/30"
              >
                <ShoppingBag className="w-4 h-4" /> Mulai Belanja
              </Link>
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-400 text-[#1C0A00] font-bold text-sm transition-all shadow-lg shadow-accent-500/30"
              >
                <Gamepad2 className="w-4 h-4" /> Pesan Tiket
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}