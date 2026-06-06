import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keranjang Belanja",
  description:
    "Selesaikan pesanan belanja Anda di Rizquna Store. Proses checkout cepat, aman, dan didukung pembayaran otomatis via Midtrans.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
