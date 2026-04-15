import HomeContent from "@/components/home/HomeContent";
import { getCategories, getVendors } from "@/lib/data";

export default function HomePage() {
  const categories = getCategories();
  const featuredVendors = getVendors({ approved: true, featured: true })
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <HomeContent
      categories={categories}
      featuredVendors={featuredVendors}
    />
  );
}
