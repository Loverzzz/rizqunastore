import Link from "next/link";
import { ArrowRight, Sparkles, Clock } from "lucide-react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatCounters from "@/components/home/StatCounters";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesSection from "@/components/home/ServicesSection";
import HomeTestimonial from "@/components/HomeTestimonial";

// Below-the-fold: lazy load to reduce initial JS
const ParallaxZoomReveal = dynamic(
  () => import("@/components/ParallaxZoomReveal"),
);

export const metadata: Metadata = {
  title: "Rizquna Store & Playground Happy Kids",
  description:
    "Rizquna Store & Playground Happy Kids — Toko kebutuhan sehari-hari, alat tulis, sembako, dan jajanan. Pesan tiket playground anak secara online.",
};

// Fully static & cacheable homepage
export const revalidate = 3600;

const categories = [
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
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section (client island) */}
      <HeroSection />

      {/* Shop by Category Section (static, server-rendered) */}
      <section
        className="py-12 bg-[#F5EDE4] dark:bg-[#2D1506]/40"
        aria-label="Belanja per kategori"
      >
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
            {categories.map(({ icon, label, href, bg, iconBg }) => (
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

      {/* Stat Counters (client island) */}
      <StatCounters />

      {/* Why Choose Us (client island) */}
      <WhyChooseUs />

      {/* Testimonials (client island) */}
      <HomeTestimonial />

      {/* Promo Banner (static, server-rendered) */}
      <section className="py-10" aria-label="Promo tiket playground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#2D1506] dark:bg-[#3D1F0A] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
            <div
              className="absolute top-0 right-0 opacity-10 pointer-events-none"
              aria-hidden="true"
            >
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

      {/* Services Section (client island) */}
      <ServicesSection />

      {/* Parallax Zoom Reveal (lazy loaded client island) */}
      <ParallaxZoomReveal />

      {/* Info / Hours Section (static, server-rendered) */}
      <section
        className="py-20 relative overflow-hidden"
        aria-label="Jam operasional"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-4xl p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
            <div
              className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10 select-none"
              aria-hidden="true"
            >
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
          </div>
        </div>
      </section>
    </div>
  );
}