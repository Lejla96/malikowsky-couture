"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n";
import { Search, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/content";

export default function HeroSection({ content }: { content: SiteContent["hero"] }) {
  const { locale } = useTranslation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/vendors?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const title = locale === "mk" ? content.titleMk : content.titleEn;
  const subtitle = locale === "mk" ? content.subtitleMk : content.subtitleEn;
  const cta = locale === "mk" ? content.ctaMk : content.ctaEn;
  const ctaSecondary = locale === "mk" ? content.ctaSecondaryMk : content.ctaSecondaryEn;
  const placeholder = locale === "mk" ? content.searchPlaceholderMk : content.searchPlaceholderEn;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 luxury-gradient" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c47323' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
      />
      <div className="absolute top-20 right-10 w-72 h-72 bg-champagne-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-champagne-100/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-champagne-100/80 backdrop-blur-sm rounded-full mb-8 border border-champagne-200/50">
            <Star className="w-4 h-4 text-champagne-600 fill-champagne-600" />
            <span className="text-sm font-medium text-champagne-800">{content.badge}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-charcoal-900 leading-tight mb-6">
            {title.split(" ").map((word, i) => (
              <span key={i}>
                {i >= title.split(" ").length - 2 ? (
                  <span className="gold-shimmer">{word} </span>
                ) : (
                  <span>{word} </span>
                )}
              </span>
            ))}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-charcoal-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {subtitle}
          </motion.p>

          <motion.form initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-champagne-200/30 border border-champagne-100 overflow-hidden">
              <Search className="absolute left-5 w-5 h-5 text-charcoal-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-14 pr-4 py-5 text-charcoal-900 placeholder-charcoal-400 bg-transparent focus:outline-none text-lg" />
              <button type="submit"
                className="flex-shrink-0 mr-2 px-6 py-3 bg-gradient-to-r from-champagne-600 to-champagne-700 text-white font-semibold rounded-xl hover:from-champagne-700 hover:to-champagne-800 transition-all">
                {locale === "mk" ? "Пребарај" : "Search"}
              </button>
            </div>
          </motion.form>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/vendors"
              className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal-900 text-white font-semibold rounded-xl hover:bg-charcoal-800 transition-all shadow-lg hover:shadow-xl group">
              {cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/vendors"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-charcoal-900 font-semibold rounded-xl border-2 border-champagne-200 hover:border-champagne-400 hover:bg-champagne-50 transition-all">
              {ctaSecondary}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { number: content.stat1Number, label: content.stat1Label },
              { number: content.stat2Number, label: content.stat2Label },
              { number: content.stat3Number, label: content.stat3Label },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-champagne-700">{stat.number}</div>
                <div className="text-sm text-charcoal-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
