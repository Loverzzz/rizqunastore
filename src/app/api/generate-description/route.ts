import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { productName, category } = await request.json();

    if (!productName) {
      return NextResponse.json(
        { error: "Product name is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        description: `${productName} berkualitas tinggi untuk kebutuhan sehari-hari Anda.`,
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: "Kamu membuat deskripsi produk singkat untuk toko kelontong/general store bernama Rizquna. Tulis deskripsi dalam Bahasa Indonesia, max 2 kalimat, menarik dan informatif. Jangan pakai emoji. Langsung tulis deskripsinya saja tanpa awalan.",
              },
            ],
          },
          contents: [
            {
              parts: [
                {
                  text: `Buatkan deskripsi untuk produk: "${productName}" (kategori: ${category || "Umum"})`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 100,
            temperature: 0.8,
          },
        }),
      },
    );

    if (!response.ok) {
      return NextResponse.json({
        description: `${productName} berkualitas tinggi untuk kebutuhan sehari-hari Anda.`,
      });
    }

    const data = await response.json();
    const description =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      `${productName} berkualitas.`;

    return NextResponse.json({ description });
  } catch (error) {
    console.error("Generate description error:", error);
    return NextResponse.json({
      description: "Produk berkualitas untuk kebutuhan Anda.",
    });
  }
}
