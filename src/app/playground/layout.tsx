import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pesan Tiket Playground Happy Kids",
  description:
    "Pesan tiket area bermain anak indoor Happy Kids di Rizquna Store. Cepat, mudah, dan aman dengan pembayaran online via Midtrans.",
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
