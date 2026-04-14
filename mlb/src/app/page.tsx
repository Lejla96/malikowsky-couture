import HomeContent from "@/components/home/HomeContent";
import prisma from "@/lib/prisma";
import { seed } from "@/lib/seed";

export default async function HomePage() {
  await seed();

  const [categories, featuredVendors] = await Promise.all([
    prisma.category.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { vendors: { where: { approved: true } } } } },
    }),
    prisma.vendor.findMany({
      where: { approved: true, featured: true },
      include: { category: true },
      orderBy: { rating: "desc" },
      take: 6,
    }),
  ]);

  return (
    <HomeContent
      categories={JSON.parse(JSON.stringify(categories))}
      featuredVendors={JSON.parse(JSON.stringify(featuredVendors))}
    />
  );
}
