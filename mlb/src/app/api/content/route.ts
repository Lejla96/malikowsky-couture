import { NextRequest, NextResponse } from "next/server";
import { getContent, updateContent } from "@/lib/content";

export async function GET() {
  return NextResponse.json(getContent());
}

export async function PUT(req: NextRequest) {
  try {
    const { section, data } = await req.json();
    if (!section || !data) {
      return NextResponse.json({ error: "Missing section or data" }, { status: 400 });
    }
    updateContent(section, data);
    return NextResponse.json({ success: true, content: getContent() });
  } catch {
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
