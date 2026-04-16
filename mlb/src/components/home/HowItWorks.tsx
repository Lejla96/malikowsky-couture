"use client";

import { useTranslation } from "@/i18n";
import { Search, Users, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/content";

export default function HowItWorks({ content }: { content: SiteContent["howItWorks"] }) {
  const { locale } = useTranslation();

  const steps = [
    { icon: Search, title: locale === "mk" ? content.step1TitleMk : content.step1TitleEn, desc: locale === "mk" ? content.step1DescMk : content.step1DescEn, step: "01" },
    { icon: Users, title: locale === "mk" ? content.step2TitleMk : content.step2TitleEn, desc: locale === "mk" ? content.step2DescMk : content.step2DescEn, step: "02" },
    { icon: PartyPopper, title: locale === "mk" ? content.step3TitleMk : content.step3TitleEn, desc: locale === "mk" ? content.step3DescMk : content.step3DescEn, step: "03" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-400 font-semibold mb-3">
            {locale === "mk" ? "Процес" : "Process"}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-charcoal-900 mb-4">
            {locale === "mk" ? content.titleMk : content.titleEn}
          </h2>
          <p className="text-base text-charcoal-500 max-w-lg mx-auto font-light text-center">
            {locale === "mk" ? content.subtitleMk : content.subtitleEn}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div key={step.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}
              className="text-center group">
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 bg-rose-50 group-hover:bg-rose-100 rounded-full flex items-center justify-center transition-colors duration-300">
                  <step.icon className="w-8 h-8 text-rose-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-charcoal-900 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">{step.step}</span>
                </div>
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal-900 mb-3">{step.title}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed max-w-xs mx-auto font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
