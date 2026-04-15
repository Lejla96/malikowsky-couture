import { NextRequest, NextResponse } from "next/server";
import { reviewsStore, vendors } from "@/lib/data";

export async function GET() {
  return NextResponse.json(reviewsStore);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const vendor = vendors.find(v => v.id === data.vendorId);

    const review = {
      id: `r-${Date.now()}`,
      vendorId: data.vendorId,
      name: data.name,
      email: data.email,
      rating: data.rating,
      comment: data.comment,
      approved: false,
      createdAt: new Date().toISOString(),
      vendor: {
        businessName: vendor?.businessName || "Unknown",
        slug: vendor?.slug || "",
      },
    };

    reviewsStore.push(review);
    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
