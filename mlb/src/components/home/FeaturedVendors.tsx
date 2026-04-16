"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/content";

interface Vendor {
  id: string; businessName: string; slug: string; description: string;
  descriptionMk?: string | null; city: string; rating: number; reviewCount: number;
  priceRange?: string | null; coverPhoto?: string | null;
  category: { name: string; nameMk: string; slug: string };
}

export default function FeaturedVendors({ vendors, content }: { vendors: Vendor[]; content: SiteContent["featured"] }) {
  const { locale } = useTranslation();
  if (!vendors.length) return null;

  return (
    <section className="py-24 luxury-gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-400 font-semibold mb-3">
            {locale === "mk" ? "Истакнати" : "Featured"}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-charcoal-900 mb-4">
            {locale === "mk" ? content.titleMk : content.titleEn}
          </h2>
          <p className="text-base text-charcoal-500 max-w-lg mx-auto font-light text-center">
            {locale === "mk" ? content.subtitleMk : content.subtitleEn}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {vendors.slice(0, 6).map((vendor, index) => (
            <motion.div key={vendor.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <Link href={`/vendors/${vendor.slug}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden border border-rose-100/40 shadow-sm premium-card">
                  <div className="relative h-52 bg-gradient-to-br from-rose-50 to-champagne-50 overflow-hidden">
                    {vendor.coverPhoto ? (
                      <img src={vendor.coverPhoto} alt={vendor.businessName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl font-serif font-light text-rose-200">{vendor.businessName.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[11px] font-semibold text-rose-500">
                      {locale === "mk" ? vendor.category.nameMk : vendor.category.name}
                    </div>
                    {vendor.priceRange && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-charcoal-900/70 backdrop-blur-sm rounded-full text-[11px] font-semibold text-white">
                        {vendor.priceRange}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-serif font-semibold text-charcoal-900 group-hover:text-rose-500 transition-colors mb-2">{vendor.businessName}</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-champagne-400 fill-champagne-400" />
                        <span className="text-xs font-semibold text-charcoal-800">{vendor.rating.toFixed(1)}</span>
                        <span className="text-[11px] text-charcoal-400">({vendor.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-charcoal-400">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs">{vendor.city}</span>
                      </div>
                    </div>
                    <p className="text-xs text-charcoal-500 line-clamp-2 leading-relaxed font-light">
                      {locale === "mk" && vendor.descriptionMk ? vendor.descriptionMk : vendor.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-14">
          <Link href="/vendors"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-charcoal-900 text-white text-sm font-semibold rounded-full hover:bg-charcoal-800 transition-all group">
            {locale === "mk" ? "Прикажи ги сите" : "View All Vendors"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
