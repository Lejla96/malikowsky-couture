import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("mlb-admin-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    if (decoded.exp < Date.now()) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }

    return NextResponse.json({
      id: "admin-1",
      email: decoded.email,
      name: "MLB Admin",
      role: "admin",
    });
  } catch {
    return NextResponse.json({ error: "Auth check failed" }, { status: 401 });
  }
}
