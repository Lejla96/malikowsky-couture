import { NextRequest, NextResponse } from "next/server";
import { bookingsStore, getVendorBySlug, vendors } from "@/lib/data";

export async function GET() {
  return NextResponse.json(bookingsStore);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const vendor = vendors.find(v => v.id === data.vendorId);

    const booking = {
      id: `b-${Date.now()}`,
      vendorId: data.vendorId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      location: data.location,
      eventType: data.eventType,
      preferredDate: data.preferredDate,
      message: data.message || null,
      status: "pending",
      createdAt: new Date().toISOString(),
      vendor: {
        businessName: vendor?.businessName || "Unknown",
        slug: vendor?.slug || "",
        email: vendor?.email || "",
      },
    };

    bookingsStore.push(booking);
    return NextResponse.json(booking, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
