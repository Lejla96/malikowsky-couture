import { NextRequest, NextResponse } from "next/server";
import { getVendors, vendors, categories } from "@/lib/data";
import { getStoredVendors, addStoredVendor } from "@/lib/store";
import type { Vendor } from "@/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const city = searchParams.get("location") || undefined;
  const search = searchParams.get("search") || undefined;
  const featured = searchParams.get("featured") === "true" ? true : undefined;
  const showAll = searchParams.get("approved") === "all";

  let allVendors: Vendor[];

  if (showAll) {
    allVendors = [...vendors, ...getStoredVendors()];
  } else {
    allVendors = getVendors({ approved: true, featured, category, city, search });
    const storedApproved = getStoredVendors().filter(v => v.approved);
    allVendors = [...allVendors, ...storedApproved];
  }

  if (category) allVendors = allVendors.filter(v => v.category.slug === category);
  if (city) allVendors = allVendors.filter(v => v.city === city);
  if (search) {
    const q = search.toLowerCase();
    allVendors = allVendors.filter(v =>
      v.businessName.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.city.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ vendors: allVendors, total: allVendors.length });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const slug = data.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

    const cat = categories.find(c => c.id === data.categoryId);
    if (!cat) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const vendor: Vendor = {
      id: `v-reg-${Date.now()}`,
      businessName: data.businessName,
      ownerName: data.ownerName,
      ownerSurname: data.ownerSurname,
      email: data.email,
      phone: data.phone,
      categoryId: data.categoryId,
      category: cat,
      location: data.location || `${data.city}, Macedonia`,
      city: data.city || "Skopje",
      description: data.description,
      descriptionMk: null,
      slug,
      photos: "[]",
      coverPhoto: null,
      logo: null,
      website: data.website || null,
      facebook: data.facebook || null,
      instagram: data.instagram || null,
      tiktok: data.tiktok || null,
      priceRange: null,
      eventTypes: '["Wedding","Engagement","Birthday","Other"]',
      availability: null,
      featured: false,
      approved: false,
      rating: 0,
      reviewCount: 0,
      mapLat: null,
      mapLng: null,
      createdAt: new Date().toISOString(),
      reviews: [],
    };

    addStoredVendor(vendor);
    return NextResponse.json(vendor, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create vendor" }, { status: 500 });
  }
}
