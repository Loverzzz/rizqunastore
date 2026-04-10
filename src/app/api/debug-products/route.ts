import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rawProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { variants: { orderBy: { label: "asc" } } },
    });
    const products = rawProducts.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
    const withImages = products.filter((p) => p.imageUrl).map((p) => ({
      id: p.id, name: p.name, imageUrl: p.imageUrl?.substring(0, 80),
    }));
    return NextResponse.json({ ok: true, count: products.length, withImages });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e), stack: e instanceof Error ? e.stack : undefined },
      { status: 500 }
    );
  }
}
