import { NextResponse } from "next/server";
import { vendors, vendorRegistrations, bookingsStore, reviewsStore } from "@/lib/data";

export async function GET() {
  const allVendors = [...vendors, ...vendorRegistrations];
  return NextResponse.json({
    totalVendors: allVendors.length,
    pendingVendors: allVendors.filter(v => !v.approved).length,
    approvedVendors: allVendors.filter(v => v.approved).length,
    totalBookings: bookingsStore.length,
    pendingBookings: bookingsStore.filter(b => b.status === "pending").length,
    totalReviews: reviewsStore.length,
    pendingReviews: reviewsStore.filter(r => !r.approved).length,
  });
}
