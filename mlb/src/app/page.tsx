import HomeContent from "@/components/home/HomeContent";
import { getCategories, getVendors } from "@/lib/data";
import { getContent } from "@/lib/content";

export default function HomePage() {
  const categories = getCategories();
  const featuredVendors = getVendors({ approved: true, featured: true })
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
  const content = getContent();

  return (
    <HomeContent
      categories={categories}
      featuredVendors={featuredVendors}
      content={content}
    />
  );
}
