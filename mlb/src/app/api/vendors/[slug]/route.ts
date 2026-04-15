import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const vendor = await prisma.vendor.findUnique({
      where: { slug },
      include: {
        category: true,
        reviews: { where: { approved: true }, orderBy: { createdAt: "desc" } },
      },
    });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    return NextResponse.json(vendor);
  } catch (error) {
    console.error("Vendor fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch vendor" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await req.json();

    const vendor = await prisma.vendor.update({
      where: { slug },
      data: {
        ...data,
        photos: data.photos ? JSON.stringify(data.photos) : undefined,
        eventTypes: data.eventTypes ? JSON.stringify(data.eventTypes) : undefined,
      },
    });

    return NextResponse.json(vendor);
  } catch (error) {
    console.error("Vendor update error:", error);
    return NextResponse.json({ error: "Failed to update vendor" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await prisma.vendor.delete({ where: { slug } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Vendor deletion error:", error);
    return NextResponse.json({ error: "Failed to delete vendor" }, { status: 500 });
  }
}
