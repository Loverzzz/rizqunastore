"use client";

import { motion } from "framer-motion";
import HomeCounter from "@/components/HomeCounter";

const stats = [
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
];

export default function StatCounters() {
  return (
    <section
      className="py-16 bg-white dark:bg-[#1A0800]"
      aria-label="Statistik toko"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
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
              <HomeCounter target={stat.count} suffix={stat.suffix} />
              <p className="text-sm font-semibold text-[#7A3B1E] dark:text-[#C4946A] mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}