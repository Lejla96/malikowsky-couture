import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [totalVendors, pendingVendors, approvedVendors, totalBookings, pendingBookings, totalReviews, pendingReviews] = await Promise.all([
      prisma.vendor.count(),
      prisma.vendor.count({ where: { approved: false } }),
      prisma.vendor.count({ where: { approved: true } }),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "pending" } }),
      prisma.review.count(),
      prisma.review.count({ where: { approved: false } }),
    ]);

    return NextResponse.json({
      totalVendors,
      pendingVendors,
      approvedVendors,
      totalBookings,
      pendingBookings,
      totalReviews,
      pendingReviews,
    });
  } catch (error) {
    console.error("Stats fetch error:", error);
    return NextResponse.json({}, { status: 500 });
  }
}
