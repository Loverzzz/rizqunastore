import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Rizquna Store & Playground Happy Kids",
  description: "General store and interactive kids playground. Book tickets and buy items online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
        <Script 
          src={process.env.MIDTRANS_IS_PRODUCTION === 'true' 
            ? 'https://app.midtrans.com/snap/snap.js'
            : 'https://app.sandbox.midtrans.com/snap/snap.js'
          } 
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} 
          strategy="beforeInteractive" 
        />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
