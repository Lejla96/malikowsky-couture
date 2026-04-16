"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/content";

export default function CTASection({ content }: { content: SiteContent["cta"] }) {
  const { locale } = useTranslation();

  return (
    <section className="py-24 luxury-gradient relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-champagne-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-champagne-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-champagne-100 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-champagne-600" />
            <span className="text-sm font-semibold text-champagne-700">
              {locale === "mk" ? content.badgeMk : content.badgeEn}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-900 mb-6 leading-tight">
            {locale === "mk" ? content.titleMk : content.titleEn}
          </h2>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto mb-10">
            {locale === "mk" ? content.subtitleMk : content.subtitleEn}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/vendors"
              className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal-900 text-white font-semibold rounded-xl hover:bg-charcoal-800 transition-all shadow-lg group">
              {locale === "mk" ? "Планирај го настанот" : "Plan Your Event"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/join"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-charcoal-900 font-semibold rounded-xl border-2 border-champagne-200 hover:border-champagne-400 transition-all">
              {locale === "mk" ? "Придружи се на MLB" : "Join MLB"}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
