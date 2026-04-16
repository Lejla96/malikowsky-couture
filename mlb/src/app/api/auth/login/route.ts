import { NextRequest, NextResponse } from "next/server";

const ADMIN_ACCOUNTS = [
  { email: "admin@mlb.mk", password: "Admin123!" },
  { email: "saitovicleila@gmail.com", password: "Admin123!" },
];

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const envEmail = process.env.ADMIN_EMAIL;
    const envPassword = process.env.ADMIN_PASSWORD || "Admin123!";
    if (envEmail) {
      ADMIN_ACCOUNTS.push({ email: envEmail, password: envPassword });
    }

    const account = ADMIN_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );

    if (!account) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = Buffer.from(
      JSON.stringify({ email: account.email, role: "admin", exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })
    ).toString("base64");

    const response = NextResponse.json({
      user: { id: "admin-1", email: account.email, name: "MLB Admin", role: "admin" },
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
