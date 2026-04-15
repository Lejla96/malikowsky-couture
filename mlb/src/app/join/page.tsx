import JoinContent from "@/components/forms/JoinContent";
import { getCategories } from "@/lib/data";

export default function JoinPage() {
  const categories = getCategories();
  return <JoinContent categories={categories} />;
}
