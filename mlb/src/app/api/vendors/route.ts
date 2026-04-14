import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    const eventType = searchParams.get("eventType");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const sort = searchParams.get("sort") || "featured";
    const approved = searchParams.get("approved");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const where: Record<string, unknown> = {};

    if (approved !== "all") {
      where.approved = true;
    }

    if (category) {
      where.category = { slug: category };
    }

    if (location) {
      where.city = { contains: location };
    }

    if (eventType) {
      where.eventTypes = { contains: eventType };
    }

    if (search) {
      where.OR = [
        { businessName: { contains: search } },
        { description: { contains: search } },
        { city: { contains: search } },
      ];
    }

    if (featured === "true") {
      where.featured = true;
    }

    let orderBy: Record<string, string> = {};
    switch (sort) {
      case "rating": orderBy = { rating: "desc" }; break;
      case "name": orderBy = { businessName: "asc" }; break;
      case "newest": orderBy = { createdAt: "desc" }; break;
      default: orderBy = { featured: "desc" }; break;
    }

    const [vendors, total] = await Promise.all([
      prisma.vendor.findMany({
        where,
        include: { category: true },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.vendor.count({ where }),
    ]);

    return NextResponse.json({ vendors, total, page, limit });
  } catch (error) {
    console.error("Vendors fetch error:", error);
    return NextResponse.json({ vendors: [], total: 0 }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const slug = data.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

    const existing = await prisma.vendor.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "A vendor with a similar name already exists" }, { status: 400 });
    }

    const vendor = await prisma.vendor.create({
      data: {
        ...data,
        slug,
        photos: JSON.stringify(data.photos || []),
        eventTypes: JSON.stringify(data.eventTypes || []),
        approved: false,
        featured: false,
      },
    });

    return NextResponse.json(vendor, { status: 201 });
  } catch (error) {
    console.error("Vendor creation error:", error);
    return NextResponse.json({ error: "Failed to create vendor" }, { status: 500 });
  }
}
