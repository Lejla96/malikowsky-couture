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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-champagne-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-champagne-500 to-champagne-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-serif font-bold text-lg">M</span>
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-charcoal-900 tracking-tight">MLB</span>
              <span className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-champagne-600 -mt-1">
                Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-charcoal-700 hover:text-champagne-700 transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-charcoal-600 hover:text-champagne-700 transition-colors px-2 py-1 rounded-md hover:bg-champagne-50"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">{locale}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-xl border border-champagne-100 py-1 z-50"
                  >
                    {(["en", "mk"] as Locale[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setLocale(lang); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-champagne-50 transition-colors ${
                          locale === lang ? "text-champagne-700 font-semibold" : "text-charcoal-700"
                        }`}
                      >
                        {t.common.languages[lang]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <Link
              href="/vendors"
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-champagne-600 to-champagne-700 text-white text-sm font-semibold rounded-lg hover:from-champagne-700 hover:to-champagne-800 transition-all shadow-md hover:shadow-lg"
            >
              {t.nav.planEvent}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-charcoal-700 hover:text-champagne-700 transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white border-t border-champagne-100"
          >
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-charcoal-700 hover:text-champagne-700 hover:bg-champagne-50 rounded-lg transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/vendors"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 bg-gradient-to-r from-champagne-600 to-champagne-700 text-white text-center rounded-lg font-semibold mt-2"
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
