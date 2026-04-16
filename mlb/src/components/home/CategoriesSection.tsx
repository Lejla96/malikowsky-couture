"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n";
import { Music, UtensilsCrossed, Sparkles, Shirt, Palette, Camera } from "lucide-react";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/content";

const iconMap: Record<string, React.ElementType> = { Music, UtensilsCrossed, Sparkles, Shirt, Palette, Camera };

interface Category { id: string; name: string; nameMk: string; slug: string; icon: string; _count?: { vendors: number } }

export default function CategoriesSection({ categories, content }: { categories: Category[]; content: SiteContent["categories"] }) {
  const { locale } = useTranslation();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-400 font-semibold mb-3">
            {locale === "mk" ? "Категории" : "Categories"}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-charcoal-900 mb-4">
            {locale === "mk" ? content.titleMk : content.titleEn}
          </h2>
          <p className="text-base text-charcoal-500 max-w-lg mx-auto font-light text-center">
            {locale === "mk" ? content.subtitleMk : content.subtitleEn}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Music;
            return (
              <motion.div key={category.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <Link href={`/vendors?category=${category.slug}`}
                  className="group block p-6 bg-ivory-50 hover:bg-rose-50 rounded-2xl border border-transparent hover:border-rose-200/60 transition-all duration-300 text-center premium-card">
                  <div className="w-14 h-14 mx-auto mb-4 bg-white group-hover:bg-rose-100 rounded-2xl flex items-center justify-center transition-colors shadow-sm">
                    <Icon className="w-6 h-6 text-rose-400 group-hover:text-rose-500 transition-colors" />
                  </div>
                  <h3 className="font-serif font-semibold text-charcoal-800 group-hover:text-rose-600 transition-colors text-sm leading-tight">
                    {locale === "mk" ? category.nameMk : category.name}
                  </h3>
                  {category._count && (
                    <p className="text-[11px] text-charcoal-400 mt-2 font-medium">
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
