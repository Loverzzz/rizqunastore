import { Metadata } from "next";
import { MapPin, Clock, Phone, AlertCircle, Navigation } from "lucide-react";

export const metadata: Metadata = {
  title: "Lokasi Toko | Rizquna Store",
  description: "Kunjungi toko offline Rizquna Store. Alamat lengkap, jam operasional, dan informasi kontak.",
};

export default function StorePage() {
  return (
    <div className="py-12 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Lokasi Toko
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Kunjungi toko offline kami untuk melihat produk secara langsung dan berbelanja dengan lebih nyaman.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-200">
              <p className="font-semibold mb-1">Disclaimer Produk</p>
              <p>
                Gambar produk yang ditampilkan pada website dapat berbeda dengan barang asli. 
                Untuk konfirmasi detail produk (warna, ukuran, kondisi, ketersediaan stok), 
                silakan hubungi admin via WhatsApp atau datang langsung ke toko offline kami.
              </p>
            </div>
          </div>
        </div>

        {/* Store Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Address Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-brand-100 dark:bg-brand-900/30 rounded-xl">
                <MapPin className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Alamat Lengkap</h2>
            </div>
            <div className="text-gray-600 dark:text-gray-400 space-y-1">
              <p className="font-medium text-gray-900 dark:text-white">Rizquna Store</p>
              <p>X3FX+892, Jl. Raya Plumpang</p>
              <p>RW.7, Tanggungan, Kec. Plumpang</p>
              <p>Kabupaten Tuban, Jawa Timur 62382</p>
              <p>Indonesia</p>
            </div>
            <a
              href="https://share.google/TvhIwGbiWwDis9Kg6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Buka di Google Maps
            </a>
          </div>

          {/* Hours Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-accent-100 dark:bg-accent-900/30 rounded-xl">
                <Clock className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Jam Operasional</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Senin - Jumat</span>
                <span className="font-semibold text-gray-900 dark:text-white">09:00 - 21:00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Sabtu - Minggu</span>
                <span className="font-semibold text-gray-900 dark:text-white">08:00 - 21:00</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-400">Hari Libur Nasional</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">Buka (09:00 - 20:00)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Kontak & Konfirmasi</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Untuk konfirmasi ketersediaan produk, detail barang, atau pertanyaan lainnya, 
            silakan hubungi kami melalui:
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/6281915967694"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat WhatsApp
            </a>
            <a
              href="tel:081915967694"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-medium rounded-xl transition-colors"
            >
              <Phone className="w-5 h-5" />
              0819-1596-7694
            </a>
          </div>
        </div>

        {/* Google Maps */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Peta Lokasi</h2>
          <a
            href="https://share.google/TvhIwGbiWwDis9Kg6"
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-video rounded-xl overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-accent-500/20 group-hover:from-brand-500/30 group-hover:to-accent-500/30 transition-all" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-lg mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-10 h-10 text-brand-600 dark:text-brand-400" />
              </div>
              <p className="text-gray-900 dark:text-white font-semibold text-lg">Lihat di Google Maps</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Klik untuk membuka peta lokasi</p>
            </div>
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 dark:bg-slate-800/90 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                X3FX+892, Jl. Raya Plumpang, RW.7, Tanggungan, Kec. Plumpang, Tuban 62382
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
