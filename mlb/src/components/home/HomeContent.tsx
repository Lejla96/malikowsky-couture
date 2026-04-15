"use client";

import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import FeaturedVendors from "./FeaturedVendors";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import CTASection from "./CTASection";
import type { SiteContent } from "@/lib/content";

interface Props {
  categories: Array<{
    id: string;
    name: string;
    nameMk: string;
    slug: string;
    icon: string;
    _count?: { vendors: number };
  }>;
  featuredVendors: Array<{
    id: string;
    businessName: string;
    slug: string;
    description: string;
    descriptionMk?: string | null;
    city: string;
    rating: number;
    reviewCount: number;
    priceRange?: string | null;
    coverPhoto?: string | null;
    category: { name: string; nameMk: string; slug: string };
  }>;
  content: SiteContent;
}

export default function HomeContent({ categories, featuredVendors, content }: Props) {
  return (
    <>
      <HeroSection content={content.hero} />
      <CategoriesSection categories={categories} content={content.categories} />
      <FeaturedVendors vendors={featuredVendors} content={content.featured} />
      <HowItWorks content={content.howItWorks} />
      <Testimonials content={content.testimonials} />
      <CTASection content={content.cta} />
    </>
  );
}
