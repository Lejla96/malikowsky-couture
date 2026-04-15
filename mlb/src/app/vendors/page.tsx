import VendorsContent from "@/components/vendors/VendorsContent";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function VendorsPage() {
  const [categories, vendors] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.vendor.findMany({
      where: { approved: true },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { rating: "desc" }],
    }),
  ]);

  const cities = [...new Set(vendors.map((v) => v.city))].sort();

  return (
    <VendorsContent
      initialVendors={JSON.parse(JSON.stringify(vendors))}
      categories={JSON.parse(JSON.stringify(categories))}
      cities={cities}
    />
  );
}
