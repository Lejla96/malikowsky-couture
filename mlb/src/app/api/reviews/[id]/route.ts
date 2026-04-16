import { NextRequest, NextResponse } from "next/server";
import { reviewsStore } from "@/lib/data";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();
  const review = reviewsStore.find(r => r.id === id);
  if (!review) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }
  review.approved = data.approved;
  return NextResponse.json(review);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const idx = reviewsStore.findIndex(r => r.id === id);
  if (idx !== -1) reviewsStore.splice(idx, 1);
  return NextResponse.json({ success: true });
}
