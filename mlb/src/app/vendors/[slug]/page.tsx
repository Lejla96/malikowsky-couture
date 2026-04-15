import { notFound } from "next/navigation";
import VendorProfileContent from "@/components/vendors/VendorProfileContent";
import { getVendorBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function VendorProfilePage({ params }: Props) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);

  if (!vendor) notFound();

  return <VendorProfileContent vendor={vendor} />;
}
