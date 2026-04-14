"use client";

import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import FeaturedVendors from "./FeaturedVendors";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import CTASection from "./CTASection";

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
}

export default function HomeContent({ categories, featuredVendors }: Props) {
  return (
    <>
      <HeroSection />
      <CategoriesSection categories={categories} />
      <FeaturedVendors vendors={featuredVendors} />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </>
  );
}
