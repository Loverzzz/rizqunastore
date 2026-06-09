import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Define the tool for Groq
const tools = [
  {
    type: "function",
    function: {
      name: "search_products",
      description:
        "Mencari produk yang tersedia di toko Rizquna berdasarkan nama atau kategori. Gunakan ini saat user bertanya tentang produk, ketersediaan stok, harga produk, atau mencari nama/kategori barang.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description:
              "Kata kunci untuk pencarian produk (contoh: beras, celana, seragam pramuka, teh). Search query harus se-spesifik mungkin.",
          },
        },
        required: ["query"],
      },
    },
  },
];

const systemPrompt = `Kamu adalah asisten virtual toko Rizquna Store & Playground Happy Kids. Kamu ramah, helpful, logis, dan menjawab dalam Bahasa Indonesia.

Informasi toko:
- Rizquna adalah toko serba ada yang menjual perlengkapan sekolah, seragam, sembako, jajanan, tas, deterjen, dan lainnya.
- Ada Playground Happy Kids untuk anak-anak dengan tiket masuk Rp 10.000/anak (termasuk 1 pendamping dewasa gratis).
- Lokasi Toko: X3FX+892, Jl. Raya Plumpang, RW.7, Tanggungan, Kec. Plumpang, Kabupaten Tuban, Jawa Timur 62382
- Jam operasional: Senin-Jumat 09:00-21:00, Sabtu-Minggu 08:00-21:00
- WhatsApp: 0819-1596-7694
- Pembayaran online via Midtrans (berikut transfer bank, e-wallet, QRIS)
- Website: rizqunastore.vercel.app

Aturan:
- Jawab singkat, natural, dan jelas (max 3-4 kalimat).
- Gunakan tool "search_products" HANYA jika user menanyakan produk toko (barang dagangan seperti sembako, seragam, tas, dll), ketersediaan stok, atau harga barang toko. JANGAN gunakan search_products untuk pertanyaan tentang playground, tiket, jam buka, lokasi, atau info umum toko karena sudah ada di atas.
- Jika Tool memberikan daftar produk, informasikan harga dan stoknya kepada user dengan menarik (tampilkan harganya dalam format Rupiah).
- Jika setelah dicari stoknya habis atau produk tidak ditemukan, beritahu dengan ramah dan arahkan ke WhatsApp jika butuh bantuan lebih lanjut.
- Untuk pertanyaan di luar kemampuan atau di luar prosedur, arahkan ke WhatsApp.`;

type ChatRole = "system" | "user" | "assistant" | "tool";

type ChatMessage = {
  role: ChatRole;
  content: string | null;
  tool_call_id?: string;
  name?: string;
  tool_calls?: ToolCall[];
};

type ToolCall = {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
};

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

function isIncomingMessage(value: unknown): value is IncomingMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as Record<string, unknown>;
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string"
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let chatMessages: IncomingMessage[] | undefined = Array.isArray(
      body.messages,
    )
      ? body.messages.filter(isIncomingMessage)
      : undefined;

    // Fallback for legacy requests sending { message: "text" }
    if (!chatMessages && body.message) {
      chatMessages = [{ role: "user", content: body.message }];
    }

    if (!chatMessages || chatMessages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: "Fitur AI Chatbot belum diaktifkan. Silakan hubungi admin.",
      });
    }

    // Build message array for Groq starting with system prompt
    const apiMessages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...chatMessages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const modelName = "llama-3.1-8b-instant"; // Higher rate limits on Groq free tier

    // 1st request to Groq LLM
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: modelName,
          messages: apiMessages,
          tools: tools,
          tool_choice: "auto",
          max_tokens: 400,
          temperature: 0.7,
        }),
      },
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      console.error(
        "Groq API error:",
        response.status,
        JSON.stringify(errData),
      );
      if (
        response.status === 429 ||
        errData?.error?.code === "rate_limit_exceeded"
      ) {
        return NextResponse.json({
          reply:
            "Asisten sedang sibuk. Silakan coba lagi dalam beberapa detik atau hubungi kami via WhatsApp di 0819-1596-7694.",
        });
      }
      if (response.status === 401) {
        return NextResponse.json({
          reply: "Konfigurasi AI belum aktif. Silakan hubungi admin.",
        });
      }
      return NextResponse.json({
        reply:
          "Maaf, saya sedang mengalami gangguan. Silakan coba lagi atau hubungi kami via WhatsApp di 0819-1596-7694.",
      });
    }

    const data = await response.json();
    const responseMessage = data.choices?.[0]?.message;

    if (!responseMessage) {
      return NextResponse.json({
        reply: "Maaf, saya tidak bisa menjawab saat ini.",
      });
    }

    // Fallback: detect raw function call text in content (small models sometimes do this)
    if (!responseMessage.tool_calls && responseMessage.content) {
      const rawContent: string = responseMessage.content;
      // Match patterns like: function=search_products> {"query": "..."} or <tool_call>...</tool_call>
      const inlineMatch =
        rawContent.match(/search_products[^{]*({[^}]+})/i) ||
        rawContent.match(/<tool_call>\s*({[\s\S]+?})\s*<\/tool_call>/i);
      if (inlineMatch) {
        try {
          const args = JSON.parse(inlineMatch[1]);
          const query: string = args.query || "";
          if (query) {
            // Inject a synthetic tool_calls so the existing block below handles it
            responseMessage.tool_calls = [
              {
                id: "synthetic_tool_0",
                type: "function",
                function: {
                  name: "search_products",
                  arguments: JSON.stringify({ query }),
                },
              },
            ];
            // Remove the raw text so it's not forwarded to 2nd call
            responseMessage.content = null;
          }
        } catch {
          // Could not parse – fall through to normal reply
        }
      }
    }

    // Check if the AI wants to call a tool
    if (responseMessage.tool_calls) {
      // Append the assistant's tool call message to history
      apiMessages.push(responseMessage);

      // Execute all tool calls
      for (const toolCall of responseMessage.tool_calls) {
        if (toolCall.function.name === "search_products") {
          let query = "";
          try {
            const args = JSON.parse(toolCall.function.arguments);
            query = args.query || "";
          } catch (e) {
            console.error("Failed to parse tool arguments", e);
          }

          let productResultText = "";
          try {
            // Find products using Prisma based on keyword in name or category
            // Assuming short keyword
            const products = await prisma.product.findMany({
              where: {
                OR: [
                  { name: { contains: query, mode: "insensitive" } },
                  { category: { contains: query, mode: "insensitive" } },
                ],
              },
              select: {
                name: true,
                price: true,
                stock: true,
                category: true,
                variants: {
                  select: { label: true, price: true, stock: true },
                },
              },
              take: 10,
            });

            if (products.length === 0) {
              productResultText = `Produk dengan kata kunci "${query}" tidak ditemukan atau stok kosong di database.`;
            } else {
              productResultText = products
                .map((p) => {
                  if (p.variants && p.variants.length > 0) {
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
            }
          } catch (e) {
            console.error("Prisma query error during tool execution:", e);
            productResultText =
              "Error internal sistem ketika mencari data produk.";
          }

          // Append the tool's result to history
          apiMessages.push({
            tool_call_id: toolCall.id,
            role: "tool",
            name: toolCall.function.name,
            content: productResultText,
          });
        }
      }

      // 2nd Request to Groq LLM to generate the final response
      const secondResponse = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: modelName,
            messages: apiMessages,
            max_tokens: 300,
            temperature: 0.7,
          }),
        },
      );

      if (!secondResponse.ok) {
        const errData2 = await secondResponse.json().catch(() => null);
        console.error("Groq 2nd call error:", secondResponse.status, errData2);
        return NextResponse.json({
          reply:
            "Maaf, saya sedang mengalami gangguan. Silakan coba lagi atau hubungi kami via WhatsApp di 0819-1596-7694.",
        });
      }

      const secondData = await secondResponse.json();
      const finalReply =
        secondData.choices?.[0]?.message?.content ||
        "Maaf, saya gagal merangkai jawaban produk tersebut.";

      return NextResponse.json({ reply: finalReply });
    }

    // No tool call needed, just a normal conversational reply
    const reply =
      responseMessage.content || "Maaf, saya bingung harus menjawab apa.";
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({
      reply:
        "Terjadi kesalahan internal. Silakan hubungi kami via WhatsApp di 0819-1596-7694.",
    });
  }
}
