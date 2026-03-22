import Link from "next/link";
import { Clock, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent mb-4">
              Rizquna
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-xs">
              General store lengkap untuk kebutuhan sehari-hari dan playground interaktif untuk keceriaan anak-anak.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Jam Operasional</h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-500" />
                <span>Senin - Jumat: 09:00 - 21:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent-500" />
                <span>Sabtu - Minggu: 08:00 - 21:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors">Toko Rizquna</Link></li>
              <li><Link href="/playground" className="text-gray-600 dark:text-gray-400 hover:text-accent-500 transition-colors">Playground Happy Kids</Link></li>
              <li className="pt-2"><Link href="/terms" className="text-gray-500 dark:text-gray-500 hover:text-brand-500 transition-colors text-sm">Syarat & Ketentuan</Link></li>
              <li><Link href="/refund" className="text-gray-500 dark:text-gray-500 hover:text-accent-500 transition-colors text-sm">Kebijakan Pengembalian</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Hubungi Kami</h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <a href="https://wa.me/6281915967694" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors">
                  0819-1596-7694
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-500 shrink-0" />
                <a href="mailto:reynaldmlbb4@gmail.com" className="hover:text-accent-500 transition-colors break-words">
                  reynaldmlbb4@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-slate-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Rizquna Store & Playground. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
