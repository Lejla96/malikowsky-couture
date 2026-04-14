import JoinContent from "@/components/forms/JoinContent";
import prisma from "@/lib/prisma";

export default async function JoinPage() {
  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });
  return <JoinContent categories={JSON.parse(JSON.stringify(categories))} />;
}
