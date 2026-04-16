import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@mlb.mk";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!";

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = Buffer.from(JSON.stringify({ email, role: "admin", exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString("base64");

    const response = NextResponse.json({
      user: { id: "admin-1", email, name: "MLB Admin", role: "admin" },
      token,
    });

    response.cookies.set("mlb-admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
