export const dynamic = 'force-static';

export default function RefundPolicyPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-8 mb-4">
            Kebijakan Pengembalian (Refund)
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Terakhir diperbarui: 22 Maret 2026
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-slate-700 text-gray-700 dark:text-gray-300 space-y-8 h-full">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Kebijakan Pengembalian Barang (Toko)</h2>
            <p className="leading-relaxed mb-4">
              Kepuasan berbelanja Anda sangat penting bagi kami. Kami bersedia melakukan pengembalian dana (refund) atau penukaran barang untuk pembelian dari toko online jika memenuhi salah satu kondisi berikut:
            </p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li><strong>Barang Rusak/Cacat:</strong> Apabila barang yang Anda terima dalam kondisi fisik rusak akibat pengiriman, cacat pabrik, atau kedaluwarsa.</li>
              <li><strong>Kesalahan Pengiriman:</strong> Apabila barang yang diterima tidak sesuai dengan detail pesanan (beda varian, ukuran, atau salah produk).</li>
            </ul>
            <p className="leading-relaxed mt-4 italic text-sm text-gray-500">
              *Syarat mutlak: Anda diwajibkan menyertakan video unboxing (buka paket) tanpa jeda sebagai bukti proses verifikasi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Kebijakan Refund Tiket Playground</h2>
            <p className="leading-relaxed mb-4">
              Harap perhatikan bahwa tiket playground yang sudah dipesan secara online <strong>TIDAK DAPAT DIKEMBALIKAN (Non-Refundable)</strong> atas alasan keterlambatan kehadiran secara sepihak, kehilangan, atau perubahan pikiran. Refund tiket Playground HANYA berlaku jika:
            </p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li>Fasilitas taman bermain ditutup pada hari/jam operasional karena masalah teknis teknis mendadak dari pihak Rizquna.</li>
              <li>Keadaan Kahar (Force Majeure) seperti bencana alam, kebakaran, pemadaman listrik berkepanjangan, atau kondisi darurat lain yang menyebabkan area operasional Playground indoor terpaksa ditutup sepenuhnya.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Metode & Estimasi Waktu Refund</h2>
            <p className="leading-relaxed mb-4">
              Apabila permohonan pengembalian dana disetujui, dana Anda akan dikembalikan ke instrumen asal (rekening bank, e-wallet, atau kartu kredit yang digunakan untuk membayar lewat Midtrans).
            </p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li><strong>Transfer Bank/E-Wallet:</strong> Diproses dan masuk dalam jangka waktu 1 - 3 hari kerja.</li>
              <li><strong>Kartu Kredit:</strong> Tersedia di lembar tagihan dalam waktu 7 - 14 hari kerja (bergantung pada kebijakan bank penerbit kartu).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Cara Mengajukan Refund</h2>
            <p className="leading-relaxed mb-4">
              Untuk mengklaim Refund, silakan kirimkan permohonan maksimal dalam <strong>1x24 Jam</strong> setelah barang dinyatakan tiba oleh kurir, atau maksimal <strong>H-1</strong> sebelum jam bermain untuk tiket playground (hanya pada kondisi pengecualian yang diizinkan).
            </p>
            <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
              <li>Hubungi Customer Service kami via WhatsApp di <strong>0819-1596-7694</strong> atau melalui email ke <strong>reynaldmlbb4@gmail.com</strong>.</li>
              <li>Sertakan "Order ID" (misal: ORDER-xxxx), foto barang, nota, dan video unboxing.</li>
              <li>Tim kami akan langsung meninjau klaim dan membalas dalam kurun waktu rata-rata 24 jam.</li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
