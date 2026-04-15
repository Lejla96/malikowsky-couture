import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.cookies.get("mlb-session")?.value;
    if (!sessionId) return NextResponse.json([]);

    const favorites = await prisma.favorite.findMany({
      where: { sessionId },
      include: { vendor: { include: { category: true } } },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("Favorites fetch error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { vendorId } = await req.json();
    let sessionId = req.cookies.get("mlb-session")?.value;

    if (!sessionId) {
      sessionId = crypto.randomUUID();
    }

    const existing = await prisma.favorite.findUnique({
      where: { vendorId_sessionId: { vendorId, sessionId } },
    });

    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } });
      const response = NextResponse.json({ favorited: false });
      response.cookies.set("mlb-session", sessionId, { maxAge: 365 * 24 * 60 * 60, path: "/" });
      return response;
    }

    await prisma.favorite.create({ data: { vendorId, sessionId } });
    const response = NextResponse.json({ favorited: true });
    response.cookies.set("mlb-session", sessionId, { maxAge: 365 * 24 * 60 * 60, path: "/" });
    return response;
  } catch (error) {
    console.error("Favorite toggle error:", error);
    return NextResponse.json({ error: "Failed to toggle favorite" }, { status: 500 });
  }
}
