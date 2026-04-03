import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Rizquna Store & Playground Happy Kids",
  description:
    "Rizquna Store & Playground Happy Kids — Toko kebutuhan sehari-hari, alat tulis, sembako, dan jajanan. Pesan tiket playground anak secara online. Bayar mudah via Midtrans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            var t = localStorage.getItem('theme');
            if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          })();
        `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Script
          src={
            process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true"
              ? "https://app.midtrans.com/snap/snap.js"
              : "https://app.sandbox.midtrans.com/snap/snap.js"
          }
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="beforeInteractive"
        />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
