import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, unknown> = {};

  try {
    // Test basic connection
    const result = await prisma.$queryRaw`SELECT 1 as ok`;
    checks.connection = { ok: true, result };
  } catch (e: unknown) {
    checks.connection = {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }

  try {
    // Test product count
    const count = await prisma.product.count();
    checks.products = { ok: true, count };
  } catch (e: unknown) {
    checks.products = {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }

  try {
    // Test variant query
    const count = await prisma.productVariant.count();
    checks.variants = { ok: true, count };
  } catch (e: unknown) {
    checks.variants = {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }

  try {
    // Test order count
    const count = await prisma.order.count();
    checks.orders = { ok: true, count };
  } catch (e: unknown) {
    checks.orders = {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }

  const allOk = Object.values(checks).every(
    (c) => (c as { ok: boolean }).ok,
  );

  return NextResponse.json(
    {
      status: allOk ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      checks,
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 30) + "...",
      },
    },
    { status: allOk ? 200 : 500 },
  );
}
