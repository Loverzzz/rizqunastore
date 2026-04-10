import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Simple in-memory cache for product list (TTL: 5 minutes)
let cachedProductList: string | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000;

async function getProductList(): Promise<string> {
  const now = Date.now();
  if (cachedProductList && now - cacheTimestamp < CACHE_TTL) {
    return cachedProductList;
  }
  const products = await prisma.product.findMany({
    select: {
      name: true,
      price: true,
      category: true,
      stock: true,
      variants: { select: { label: true, price: true, stock: true } },
    },
    take: 50,
    orderBy: { createdAt: "desc" },
  });
  cachedProductList = products
    .map((p) => {
      if (p.variants.length > 0) {
        const sizes = p.variants
          .map(
            (v) =>
              `${v.label}: Rp${v.price.toLocaleString("id-ID")} (stok ${v.stock})`,
          )
          .join(", ");
        return `- ${p.name} (${p.category}): ${sizes}`;
      }
      return `- ${p.name} (${p.category}): Rp ${p.price.toLocaleString("id-ID")}, stok: ${p.stock}`;
    })
    .join("\n");
  cacheTimestamp = now;
  return cachedProductList;
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: "Fitur AI Chatbot belum diaktifkan. Silakan hubungi admin.",
      });
    }

    const productList = await getProductList();

    const systemPrompt = `Kamu adalah asisten virtual toko Rizquna Store & Playground Happy Kids. Kamu ramah, helpful, dan menjawab dalam Bahasa Indonesia.

Informasi toko:
- Rizquna adalah toko serba ada yang menjual alat tulis, sembako, jajanan, dan lainnya.
- Ada juga Playground Happy Kids untuk anak-anak dengan harga tiket Rp 25.000/anak (termasuk 1 pendamping dewasa gratis).
- Jam operasional: Senin-Jumat 09:00-21:00, Sabtu-Minggu 08:00-21:00
- WhatsApp: 0819-1596-7694
- Pembayaran online via Midtrans (semua metode: transfer bank, e-wallet, QRIS, dll)
- Website: rizqunastore.vercel.app

Daftar produk tersedia:
${productList}

Aturan:
- Jawab singkat dan jelas (max 3-4 kalimat)
- Jika ditanya produk, rekomendasikan dari daftar di atas
- Jika ditanya harga, berikan harga dari daftar
- Jika stok habis, beritahu dan rekomendasikan alternatif
- Untuk pertanyaan di luar kemampuan, arahkan ke WhatsApp`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      },
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      console.error("Groq API error:", response.status, errData);
      if (response.status === 429) {
        return NextResponse.json({
          reply:
            "Asisten sedang sibuk. Silakan coba lagi dalam beberapa detik atau hubungi kami via WhatsApp di 0819-1596-7694.",
        });
      }
      return NextResponse.json({
        reply:
          "Maaf, saya sedang mengalami gangguan. Silakan coba lagi atau hubungi kami via WhatsApp di 0819-1596-7694.",
      });
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "Maaf, saya tidak bisa menjawab saat ini.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({
      reply:
        "Terjadi kesalahan. Silakan hubungi kami via WhatsApp di 0819-1596-7694.",
    });
  }
}
