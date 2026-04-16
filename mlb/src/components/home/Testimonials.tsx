"use client";

import { useTranslation } from "@/i18n";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/content";

export default function Testimonials({ content }: { content: SiteContent["testimonials"] }) {
  const { locale } = useTranslation();

  return (
    <section className="py-24 dark-luxury-gradient text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-300 font-semibold mb-3">
            {locale === "mk" ? "Искуства" : "Testimonials"}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold mb-4">
            {locale === "mk" ? content.titleMk : content.titleEn}
          </h2>
          <p className="text-base text-ivory-400 max-w-lg mx-auto font-light text-center">
            {locale === "mk" ? content.subtitleMk : content.subtitleEn}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {content.items.map((testimonial, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}
              className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-7 border border-white/[0.06] hover:border-rose-400/20 transition-colors duration-300">
              <Quote className="w-8 h-8 text-rose-400/30 mb-4" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-champagne-400 fill-champagne-400" />
                ))}
              </div>
              <p className="text-ivory-300 leading-relaxed mb-6 text-sm font-light italic">
                &ldquo;{locale === "mk" ? testimonial.textMk : testimonial.textEn}&rdquo;
              </p>
              <div>
                <p className="font-serif font-semibold text-white text-sm">{testimonial.name}</p>
                <p className="text-xs text-rose-300/70">{locale === "mk" ? testimonial.eventMk : testimonial.eventEn}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
