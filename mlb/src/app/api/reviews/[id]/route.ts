import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    const review = await prisma.review.update({
      where: { id },
      data: { approved: data.approved },
    });

    if (data.approved) {
      const vendor = await prisma.vendor.findUnique({ where: { id: review.vendorId } });
      if (vendor) {
        const reviews = await prisma.review.findMany({
          where: { vendorId: review.vendorId, approved: true },
        });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await prisma.vendor.update({
          where: { id: review.vendorId },
          data: { rating: Number(avgRating.toFixed(1)), reviewCount: reviews.length },
        });
      }
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error("Review update error:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.review.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Review deletion error:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
