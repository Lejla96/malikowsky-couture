"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n";
import { Music, UtensilsCrossed, Sparkles, Shirt, Palette, Camera } from "lucide-react";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/content";

const iconMap: Record<string, React.ElementType> = {
  Music, UtensilsCrossed, Sparkles, Shirt, Palette, Camera,
};

interface Category {
  id: string;
  name: string;
  nameMk: string;
  slug: string;
  icon: string;
  _count?: { vendors: number };
}

export default function CategoriesSection({ categories, content }: { categories: Category[]; content: SiteContent["categories"] }) {
  const { locale } = useTranslation();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-900 mb-4">
            {locale === "mk" ? content.titleMk : content.titleEn}
          </h2>
          <p className="text-lg text-charcoal-500 max-w-2xl mx-auto">
            {locale === "mk" ? content.subtitleMk : content.subtitleEn}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-champagne-400 to-champagne-600 mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Music;
            return (
              <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Link href={`/vendors?category=${category.slug}`}
                  className="group block p-6 bg-ivory-50 hover:bg-champagne-50 rounded-2xl border border-champagne-100/50 hover:border-champagne-300 transition-all duration-300 text-center premium-card">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-champagne-100 to-champagne-200 group-hover:from-champagne-200 group-hover:to-champagne-300 rounded-2xl flex items-center justify-center transition-colors shadow-sm">
                    <Icon className="w-7 h-7 text-champagne-700" />
                  </div>
                  <h3 className="font-serif font-semibold text-charcoal-800 group-hover:text-champagne-700 transition-colors text-sm leading-tight">
                    {locale === "mk" ? category.nameMk : category.name}
                  </h3>
                  {category._count && (
                    <p className="text-xs text-charcoal-400 mt-2">
                      {category._count.vendors} {locale === "mk" ? "продавачи" : "vendors"}
                    </p>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
