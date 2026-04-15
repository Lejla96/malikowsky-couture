"use client";

import { useTranslation } from "@/i18n";
import { Search, Users, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    { icon: Search, title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc, step: "01" },
    { icon: Users, title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc, step: "02" },
    { icon: PartyPopper, title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc, step: "03" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-900 mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-lg text-charcoal-500 max-w-2xl mx-auto">
            {t.howItWorks.subtitle}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-champagne-400 to-champagne-600 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative text-center group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-champagne-300 to-champagne-100" />
              )}

              {/* Step Number */}
              <div className="relative inline-flex">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-champagne-50 to-champagne-100 group-hover:from-champagne-100 group-hover:to-champagne-200 rounded-3xl flex items-center justify-center transition-colors duration-300 shadow-sm border border-champagne-100">
                  <step.icon className="w-12 h-12 text-champagne-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-champagne-500 to-champagne-700 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-bold">{step.step}</span>
                </div>
              </div>

              <h3 className="text-xl font-serif font-bold text-charcoal-900 mt-6 mb-3">
                {step.title}
              </h3>
              <p className="text-charcoal-500 leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
