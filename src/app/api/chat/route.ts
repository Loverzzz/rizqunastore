import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        reply: 'Fitur AI Chatbot belum diaktifkan. Silakan hubungi admin.' 
      });
    }

    // Fetch store context for the AI
    const products = await prisma.product.findMany({
      select: { name: true, price: true, category: true, stock: true },
      take: 50,
      orderBy: { createdAt: 'desc' },
    });

    const productList = products.map(p => 
      `- ${p.name} (${p.category}): Rp ${p.price.toLocaleString('id-ID')}, stok: ${p.stock}`
    ).join('\n');

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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: message }] }],
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error('Gemini API error:', response.status);
      return NextResponse.json({ 
        reply: 'Maaf, saya sedang mengalami gangguan. Silakan coba lagi atau hubungi kami via WhatsApp di 0819-1596-7694.' 
      });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, saya tidak bisa menjawab saat ini.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ 
      reply: 'Terjadi kesalahan. Silakan hubungi kami via WhatsApp di 0819-1596-7694.' 
    });
  }
}
