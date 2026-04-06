import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keranjang Belanja | Rizquna Store",
  description: "Lihat dan kelola keranjang belanja Anda di Rizquna Store.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
