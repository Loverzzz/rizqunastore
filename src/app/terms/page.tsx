export const dynamic = 'force-static';

export default function TermsPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-8 mb-4">
            Syarat & Ketentuan
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Terakhir diperbarui: 22 Maret 2026
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-slate-700 text-gray-700 dark:text-gray-300 space-y-8 h-full">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Pengenalan</h2>
            <p className="leading-relaxed">
              Selamat datang di Rizquna Store & Playground. Syarat dan Ketentuan berikut adalah perjanjian hukum antara Anda (Pengguna) dan Rizquna terkait dengan penggunaan situs web ini, layanan e-commerce, maupun layanan reservasi area bermain. Dengan mengakses dan menggunakan situs ini, Anda setuju untuk terikat dan mematuhi sepenuhnya semua Syarat dan Ketentuan yang berlaku.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Layanan Kami</h2>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li><strong>Toko (E-commerce):</strong> Kami menjual berbagai kategori produk fisik mulai dari kebutuhan pokok, alat tulis, jajanan, dll yang dapat dikirimkan ke alamat Anda. Stok dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.</li>
              <li><strong>Playground:</strong> Kami menyediakan layanan pemesanan tiket untuk fasilitas bermain fisik. Tiket memiliki batas waktu (time-slot) yang berlaku sesuai jadwal reservasi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Akun dan Privasi</h2>
            <p className="leading-relaxed mb-2">
              Privasi Anda penting bagi kami. Segala bentuk data pribadi yang Anda berikan melalui situs ini, seperti nama, email, dan nomor telepon, akan digunakan semata-mata untuk memproses pesanan dan tidak akan dijual atau dibagikan ke pihak ketiga secara bebas tanpa izin tertulis dari Anda, kecuali diwajibkan oleh hukum.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Proses Pemesanan & Pembayaran</h2>
            <p className="leading-relaxed mb-4">
              Semua harga di situs web ditampilkan dalam Rupiah (Rp). Kami menerima pembayaran yang difasilitasi oleh payment gateway pihak ketiga (Midtrans).
            </p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li>Pesanan baru akan diproses dan diubah statusnya menjadi "PAID" atau "CONFIRMED" jika kami telah menerima verifikasi sukses dari penyedia gerbang pembayaran.</li>
              <li>Sistem akan menahan (mengurangi) stok sementara. Jika pembayaran gagal, kedaluwarsa, atau dibatalkan, maka stok akan kami kembalikan ke etalase secara otomatis.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Ketentuan Playground</h2>
            <p className="leading-relaxed">
              Pengguna fasilitas Playground diwajibkan mematuhi aturan standar keselamatan dan kepantasan. Anak-anak di bawah umur wajib berada dalam pengawasan penuh orang tua atau wali yang sah selama berada dalam area Playground Rizquna. Pihak manajemen berhak menolak atau meminta pengunjung keluar dari area tanpa pengembalian dana jika terjadi pelanggaran berat terhadap aturan keselamatan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Perubahan Kebijakan</h2>
            <p className="leading-relaxed">
              Kami berhak untuk memperbarui, mengubah, atau memodifikasi Syarat dan Ketentuan ini kapan saja tanpa pemberitahuan sebelumnya. Kebijakan yang baru akan langsung berlaku setelah diterbitkan di halaman ini. Anda diharapkan secara berkala mengecek halaman ini.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Kontak Kami</h2>
            <p className="leading-relaxed">
              Jika Anda memiliki pertanyaan seputar Syarat dan Ketentuan, silakan hubungi Customer Service kami di:
            </p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed mt-2 text-brand-600 dark:text-brand-400 font-medium">
              <li>Email: reynaldmlbb4@gmail.com</li>
              <li>Telepon/WhatsApp: 0819-1596-7694</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
