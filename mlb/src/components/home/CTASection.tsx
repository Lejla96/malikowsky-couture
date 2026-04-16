"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n";
import { ArrowRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/content";

export default function CTASection({ content }: { content: SiteContent["cta"] }) {
  const { locale } = useTranslation();

  return (
    <section className="py-24 luxury-gradient relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-200/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-champagne-200/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100/60 rounded-full mb-6">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span className="text-xs font-semibold text-rose-600 tracking-wide">
              {locale === "mk" ? content.badgeMk : content.badgeEn}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-charcoal-900 mb-5 leading-tight">
            {locale === "mk" ? content.titleMk : content.titleEn}
          </h2>
          <p className="text-base text-charcoal-500 max-w-lg mx-auto mb-10 font-light text-center">
            {locale === "mk" ? content.subtitleMk : content.subtitleEn}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/vendors"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-rose-400 text-white text-sm font-semibold rounded-full hover:bg-rose-500 transition-all shadow-lg shadow-rose-300/25 group">
              {locale === "mk" ? "Планирај го настанот" : "Plan Your Event"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/join"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-charcoal-800 text-sm font-medium rounded-full border border-rose-200 hover:border-rose-300 hover:bg-rose-50 transition-all">
              {locale === "mk" ? "Придружи се на MLB" : "Join MLB"}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
