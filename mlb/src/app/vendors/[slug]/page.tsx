import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import VendorProfileContent from "@/components/vendors/VendorProfileContent";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function VendorProfilePage({ params }: Props) {
  const { slug } = await params;

  const vendor = await prisma.vendor.findUnique({
    where: { slug },
    include: {
      category: true,
      reviews: { where: { approved: true }, orderBy: { createdAt: "desc" } },
    },
  });

  if (!vendor) notFound();

  return <VendorProfileContent vendor={JSON.parse(JSON.stringify(vendor))} />;
}
