"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Vendor {
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
}

export default function FeaturedVendors({ vendors }: { vendors: Vendor[] }) {
  const { locale, t } = useTranslation();

  if (!vendors.length) return null;

  return (
    <section className="py-24 luxury-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-900 mb-4">
            {t.featured.title}
          </h2>
          <p className="text-lg text-charcoal-500 max-w-2xl mx-auto">
            {t.featured.subtitle}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-champagne-400 to-champagne-600 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Vendor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.slice(0, 6).map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/vendors/${vendor.slug}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden border border-champagne-100/50 shadow-sm premium-card">
                  {/* Image */}
                  <div className="relative h-56 bg-gradient-to-br from-champagne-100 to-champagne-200 overflow-hidden">
                    {vendor.coverPhoto ? (
                      <img src={vendor.coverPhoto} alt={vendor.businessName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl font-serif font-bold text-champagne-300">
                          {vendor.businessName.charAt(0)}
                        </span>
                      </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-champagne-700 shadow-sm">
                      {locale === "mk" ? vendor.category.nameMk : vendor.category.name}
                    </div>
                    {vendor.priceRange && (
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-charcoal-900/80 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                        {vendor.priceRange}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-charcoal-900 group-hover:text-champagne-700 transition-colors mb-2">
                      {vendor.businessName}
                    </h3>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-champagne-500 fill-champagne-500" />
                        <span className="text-sm font-semibold text-charcoal-800">{vendor.rating.toFixed(1)}</span>
                        <span className="text-xs text-charcoal-400">({vendor.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-charcoal-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-sm">{vendor.city}</span>
                      </div>
                    </div>
                    <p className="text-sm text-charcoal-500 line-clamp-2 leading-relaxed">
                      {locale === "mk" && vendor.descriptionMk ? vendor.descriptionMk : vendor.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal-900 text-white font-semibold rounded-xl hover:bg-charcoal-800 transition-all group"
          >
            {t.common.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
