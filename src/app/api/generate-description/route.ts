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

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        description: `${productName} berkualitas tinggi untuk kebutuhan sehari-hari Anda.`,
      });
    }

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
            {
              role: "system",
              content:
                "Kamu membuat deskripsi produk singkat untuk toko kelontong/general store bernama Rizquna. Tulis deskripsi dalam Bahasa Indonesia, max 2 kalimat, menarik dan informatif. Jangan pakai emoji. Langsung tulis deskripsinya saja tanpa awalan.",
            },
            {
              role: "user",
              content: `Buatkan deskripsi untuk produk: "${productName}" (kategori: ${category || "Umum"})`,
            },
          ],
          max_tokens: 100,
          temperature: 0.8,
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
      data.choices?.[0]?.message?.content || `${productName} berkualitas.`;

    return NextResponse.json({ description });
  } catch (error) {
    console.error("Generate description error:", error);
    return NextResponse.json({
      description: "Produk berkualitas untuk kebutuhan Anda.",
    });
  }
}
