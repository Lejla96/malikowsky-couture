import { NextRequest, NextResponse } from "next/server";
import { getVendorBySlug } from "@/lib/data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);

  if (!vendor) {
    return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
  }

  return NextResponse.json(vendor);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) {
    return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
  }

  const data = await req.json();
  Object.assign(vendor, data);
  return NextResponse.json(vendor);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return NextResponse.json({ success: true, slug });
}
