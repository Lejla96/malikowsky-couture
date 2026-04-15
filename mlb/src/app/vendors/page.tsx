import VendorsContent from "@/components/vendors/VendorsContent";
import { getCategories, getVendors, getCities } from "@/lib/data";

export default function VendorsPage() {
  const categories = getCategories();
  const allVendors = getVendors({ approved: true });
  const cities = getCities();

  return (
    <VendorsContent
      initialVendors={allVendors}
      categories={categories}
      cities={cities}
    />
  );
}
