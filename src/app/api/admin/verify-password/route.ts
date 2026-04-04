import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { valid: false, error: "Not configured" },
      { status: 500 },
    );
  }

  return NextResponse.json({ valid: password === ADMIN_PASSWORD });
}
