import { NextRequest, NextResponse } from "next/server";
import { bookingsStore } from "@/lib/data";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();
  const booking = bookingsStore.find(b => b.id === id);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }
  booking.status = data.status;
  return NextResponse.json(booking);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const idx = bookingsStore.findIndex(b => b.id === id);
  if (idx !== -1) bookingsStore.splice(idx, 1);
  return NextResponse.json({ success: true });
}
