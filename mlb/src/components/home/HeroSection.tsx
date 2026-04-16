"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/content";

export default function HeroSection({ content }: { content: SiteContent["hero"] }) {
  const { locale } = useTranslation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) router.push(`/vendors?search=${encodeURIComponent(searchQuery)}`);
  };

  const title = locale === "mk" ? content.titleMk : content.titleEn;
  const subtitle = locale === "mk" ? content.subtitleMk : content.subtitleEn;
  const cta = locale === "mk" ? content.ctaMk : content.ctaEn;
  const ctaSecondary = locale === "mk" ? content.ctaSecondaryMk : content.ctaSecondaryEn;
  const placeholder = locale === "mk" ? content.searchPlaceholderMk : content.searchPlaceholderEn;
  const overlayOpacity = parseFloat(content.videoOverlayOpacity) || 0.45;

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Video Background */}
      {content.videoUrl ? (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            key={content.videoUrl}
          >
            <source src={content.videoUrl} type="video/mp4" />
          </video>
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(
              to bottom,
              rgba(0,0,0,${overlayOpacity * 0.8}) 0%,
              rgba(0,0,0,${overlayOpacity * 0.4}) 40%,
              rgba(0,0,0,${overlayOpacity * 0.3}) 60%,
              rgba(0,0,0,${overlayOpacity * 0.9}) 100%
            )`
          }} />
        </div>
      ) : (
        <div className="absolute inset-0 luxury-gradient" />
      )}

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="w-full max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-md rounded-full mb-8 border border-white/20 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
            <span className="text-xs font-semibold text-white tracking-wider uppercase">{content.badge}</span>
          </motion.div>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-semibold text-white leading-[1.05] mb-7 tracking-tight"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3), 0 4px 40px rgba(0,0,0,0.2)" }}>
            {title.split(" ").map((word, i) => (
              <span key={i}>
                {i >= title.split(" ").length - 2 ? (
                  <span className="italic" style={{ color: "#f9c4c4" }}>{word} </span>
                ) : (
                  <span>{word} </span>
                )}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light text-center"
            style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
            {subtitle}
          </motion.p>

          {/* Search */}
          <motion.form initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSearch} className="max-w-lg mx-auto mb-10">
            <div className="relative flex items-center bg-white/95 backdrop-blur-sm rounded-full shadow-2xl overflow-hidden">
              <Search className="absolute left-5 w-4 h-4 text-charcoal-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-4 text-charcoal-800 placeholder-charcoal-400 bg-transparent focus:outline-none text-sm" />
              <button type="submit"
                className="flex-shrink-0 mr-1.5 px-5 py-2.5 bg-charcoal-900 text-white text-xs font-semibold rounded-full hover:bg-charcoal-800 transition-all">
                {locale === "mk" ? "Пребарај" : "Search"}
              </button>
            </div>
          </motion.form>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/vendors"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full shadow-lg group transition-all"
              style={{ backgroundColor: "#e88b8b", color: "white" }}>
              {cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="/vendors"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30 hover:bg-white/30 transition-all">
              {ctaSecondary}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 flex items-center justify-center gap-12 sm:gap-16">
            {[
              { number: content.stat1Number, label: content.stat1Label },
              { number: content.stat2Number, label: content.stat2Label },
              { number: content.stat3Number, label: content.stat3Label },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-serif font-semibold text-white" style={{ textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}>{stat.number}</div>
                <div className="text-[11px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
