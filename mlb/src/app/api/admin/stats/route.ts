import { NextResponse } from "next/server";
import { vendors } from "@/lib/data";
import { getStoredVendors, getStoredBookings, getStoredReviews } from "@/lib/store";

export async function GET() {
  const storedVendors = getStoredVendors();
  const allVendors = [...vendors, ...storedVendors];
  const allBookings = getStoredBookings();
  const allReviews = getStoredReviews();

  return NextResponse.json({
    totalVendors: allVendors.length,
    pendingVendors: allVendors.filter(v => !v.approved).length,
    approvedVendors: allVendors.filter(v => v.approved).length,
    totalBookings: allBookings.length,
    pendingBookings: allBookings.filter(b => b.status === "pending").length,
    totalReviews: allReviews.length,
    pendingReviews: allReviews.filter(r => !r.approved).length,
  });
}
