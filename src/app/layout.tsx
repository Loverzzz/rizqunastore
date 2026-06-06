import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidgetWrapper from "@/components/ChatWidgetWrapper";
import ScrollToTop from "@/components/ScrollToTop";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://rizquna.com"),
  title: {
    default: "Rizquna Store & Playground Happy Kids",
    template: "%s | Rizquna Store & Playground"
  },
  description:
    "Rizquna Store & Playground Happy Kids — Toko kebutuhan sehari-hari, alat tulis, sembako, dan jajanan. Pesan tiket playground anak secara online. Bayar mudah via Midtrans.",
  openGraph: {
    title: "Rizquna Store & Playground Happy Kids",
    description: "Toko kebutuhan sehari-hari, alat tulis, sembako, jajanan, dan arena playground bermain anak terpercaya di Tuban.",
    url: "/",
    siteName: "Rizquna Store & Playground",
    images: [
      {
        url: "/rizquna.jpg",
        width: 1200,
        height: 630,
        alt: "Rizquna Store tampak depan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizquna Store & Playground Happy Kids",
    description: "Toko kebutuhan sehari-hari, alat tulis, sembako, jajanan, dan arena playground bermain anak terpercaya di Tuban.",
    images: ["/rizquna.jpg"],
  },
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
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-[#FDF6EF] dark:bg-[#1A0800] text-[#1C0A00] dark:text-[#F5E6D3]`}
        suppressHydrationWarning
      >
        <Script
          src={
            process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true"
              ? "https://app.midtrans.com/snap/snap.js"
              : "https://app.sandbox.midtrans.com/snap/snap.js"
          }
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="lazyOnload"
        />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ChatWidgetWrapper />
        <ScrollToTop />
      </body>
    </html>
  );
}
