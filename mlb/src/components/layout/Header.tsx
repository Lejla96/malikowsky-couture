"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation, type Locale } from "@/i18n";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { locale, setLocale, t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/vendors", label: t.nav.vendors },
    { href: "/join", label: t.nav.joinMlb },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-rose-100/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-rose-300 to-rose-400 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-serif font-bold text-base">M</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-champagne-300 rounded-full border-2 border-white" />
            </div>
            <div>
              <span className="text-xl font-serif font-semibold text-charcoal-900 tracking-tight">MLB</span>
              <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-rose-400 font-medium -mt-0.5">
                Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-charcoal-500 hover:text-charcoal-900 transition-colors text-[13px] font-medium tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-charcoal-500 hover:text-charcoal-800 transition-colors px-2.5 py-1.5 rounded-full hover:bg-rose-50"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="text-xs font-medium uppercase">{locale}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg shadow-rose-100/50 border border-rose-100/60 py-1.5 z-50"
                  >
                    {(["en", "mk"] as Locale[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setLocale(lang); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-rose-50 transition-colors rounded-lg mx-0 ${
                          locale === lang ? "text-rose-500 font-semibold" : "text-charcoal-600"
                        }`}
                      >
                        {t.common.languages[lang]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <Link
              href="/vendors"
              className="hidden sm:inline-flex items-center px-5 py-2 bg-charcoal-900 text-white text-xs font-semibold rounded-full hover:bg-charcoal-800 transition-all tracking-wide"
            >
              {t.nav.planEvent}
            </Link>

            {/* Mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-charcoal-600 hover:text-charcoal-900 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-rose-100/40"
          >
            <nav className="px-4 py-5 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-charcoal-600 hover:text-charcoal-900 hover:bg-rose-50 rounded-xl transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/vendors"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 bg-charcoal-900 text-white text-center rounded-xl font-semibold mt-3 text-sm"
              >
                {t.nav.planEvent}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
