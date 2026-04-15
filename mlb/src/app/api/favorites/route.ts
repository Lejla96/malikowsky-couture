import { NextRequest, NextResponse } from "next/server";

const favoritesStore = new Map<string, Set<string>>();

export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get("mlb-session")?.value;
  if (!sessionId) return NextResponse.json([]);
  const favs = favoritesStore.get(sessionId);
  return NextResponse.json(favs ? [...favs] : []);
}

export async function POST(req: NextRequest) {
  const { vendorId } = await req.json();
  let sessionId = req.cookies.get("mlb-session")?.value;

  if (!sessionId) {
    sessionId = crypto.randomUUID();
  }

  if (!favoritesStore.has(sessionId)) {
    favoritesStore.set(sessionId, new Set());
  }

  const favs = favoritesStore.get(sessionId)!;
  const wasFavorited = favs.has(vendorId);

  if (wasFavorited) {
    favs.delete(vendorId);
  } else {
    favs.add(vendorId);
  }

  const response = NextResponse.json({ favorited: !wasFavorited });
  response.cookies.set("mlb-session", sessionId, { maxAge: 365 * 24 * 60 * 60, path: "/" });
  return response;
}
