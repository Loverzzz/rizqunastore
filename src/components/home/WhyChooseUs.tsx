"use client";

import { motion } from "framer-motion";

const features = [
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
];

export default function WhyChooseUs() {
  return (
    <section
      className="py-20 bg-[#F5EDE4]/30 dark:bg-[#2D1506]/10"
      aria-label="Keunggulan Rizquna"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Kenapa Memilih{" "}
            <span className="text-brand-600 dark:text-brand-400">Rizquna?</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Komitmen kami adalah memberikan kenyamanan berbelanja kebutuhan
            keluarga dan keceriaan bermain anak yang terbaik.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
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
  );
}