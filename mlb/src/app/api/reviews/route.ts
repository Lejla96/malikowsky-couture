import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const vendorId = searchParams.get("vendorId");
    const approved = searchParams.get("approved");

    const where: Record<string, unknown> = {};
    if (vendorId) where.vendorId = vendorId;
    if (approved !== "all") where.approved = approved === "true";

    const reviews = await prisma.review.findMany({
      where,
      include: { vendor: { select: { businessName: true, slug: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Reviews fetch error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const review = await prisma.review.create({
      data: {
        vendorId: data.vendorId,
        name: data.name,
        email: data.email,
        rating: data.rating,
        comment: data.comment,
        approved: false,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Review creation error:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
