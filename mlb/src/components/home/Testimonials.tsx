"use client";

import { useTranslation } from "@/i18n";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/content";

export default function Testimonials({ content }: { content: SiteContent["testimonials"] }) {
  const { locale } = useTranslation();

  return (
    <section className="py-24 dark-luxury-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
            {locale === "mk" ? content.titleMk : content.titleEn}
          </h2>
          <p className="text-lg text-ivory-300 max-w-2xl mx-auto">
            {locale === "mk" ? content.subtitleMk : content.subtitleEn}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-champagne-400 to-champagne-600 mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.items.map((testimonial, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}
              className="bg-charcoal-800/50 backdrop-blur-sm rounded-2xl p-8 border border-charcoal-700/50 hover:border-champagne-600/30 transition-colors">
              <Quote className="w-10 h-10 text-champagne-500/40 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-champagne-500 fill-champagne-500" />
                ))}
              </div>
              <p className="text-ivory-200 leading-relaxed mb-6 italic">
                &ldquo;{locale === "mk" ? testimonial.textMk : testimonial.textEn}&rdquo;
              </p>
              <div>
                <p className="font-serif font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-champagne-400">{locale === "mk" ? testimonial.eventMk : testimonial.eventEn}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
