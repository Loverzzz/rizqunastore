import Link from "next/link";
import { Clock, Mail, Phone, MapPin, AlertCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F5EDE4] dark:bg-[#1A0800] border-t border-[#E8C9B0] dark:border-brand-900/40 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent mb-4">
              Rizquna
            </h3>
            <p className="text-[#5C2A10] dark:text-[#D4A882] mb-4 max-w-xs">
              General store lengkap untuk kebutuhan sehari-hari dan playground
              interaktif untuk keceriaan anak-anak.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#1C0A00] dark:text-[#F5E6D3] mb-4">
              Jam Operasional
            </h4>
            <ul className="space-y-3 text-[#5C2A10] dark:text-[#D4A882]">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-500" />
                <span className="text-[#5C2A10] dark:text-[#D4A882]">
                  Senin - Minggu: 08:00 - 20:00
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent-500" />
                <span className="text-[#5C2A10] dark:text-[#D4A882]">
                  Istirahat: 12:00 - 13:00
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1C0A00] dark:text-[#F5E6D3] mb-4">
              Tautan Cepat
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-[#5C2A10] dark:text-[#D4A882] hover:text-brand-600 transition-colors"
                >
                  Toko Rizquna
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="text-[#5C2A10] dark:text-[#D4A882] hover:text-brand-600 transition-colors"
                >
                  Lokasi Toko
                </Link>
              </li>
              <li>
                <Link
                  href="/playground"
                  className="text-[#5C2A10] dark:text-[#D4A882] hover:text-accent-600 transition-colors"
                >
                  Playground Happy Kids
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/terms"
                  className="text-[#7A4A2A] dark:text-[#A87050] hover:text-brand-600 transition-colors text-sm"
                >
                  Syarat &amp; Ketentuan
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="text-[#7A4A2A] dark:text-[#A87050] hover:text-accent-600 transition-colors text-sm"
                >
                  Kebijakan Pengembalian
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1C0A00] dark:text-[#F5E6D3] mb-4">
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-[#5C2A10] dark:text-[#D4A882]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span className="text-sm text-[#5C2A10] dark:text-[#D4A882]">
                  X3FX+892, Jl. Raya Plumpang, RW.7,
                  <br />
                  Tanggungan, Kec. Plumpang,
                  <br />
                  Kabupaten Tuban, Jawa Timur 62382
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <a
                  href="https://wa.me/6281915967694"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C2A10] dark:text-[#D4A882] hover:text-brand-600 transition-colors"
                >
                  0819-1596-7694
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-500 shrink-0" />
                <a
                  href="mailto:reynaldmlbb4@gmail.com"
                  className="text-[#5C2A10] dark:text-[#D4A882] hover:text-accent-600 transition-colors break-words text-sm"
                >
                  reynaldmlbb4@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-200">
              <p className="font-semibold mb-1">Catatan Penting</p>
              <p>
                Gambar produk yang ditampilkan pada website dapat berbeda dengan
                barang asli. Untuk konfirmasi detail produk (warna, ukuran,
                kondisi, ketersediaan stok), silakan hubungi admin via WhatsApp
                atau datang langsung ke toko offline kami.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E8C9B0] dark:border-brand-900/40 pt-8 text-center text-[#7A4A2A] dark:text-[#A87050] text-sm">
          <p>
            © {new Date().getFullYear()} Rizquna Store & Playground. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
