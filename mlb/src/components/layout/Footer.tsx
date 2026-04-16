"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-charcoal-900 text-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-500 rounded-full flex items-center justify-center">
                <span className="text-white font-serif font-semibold text-sm">M</span>
              </div>
              <span className="text-lg font-serif font-semibold text-white tracking-tight">MLB</span>
            </div>
            <p className="text-ivory-400 text-sm leading-relaxed mb-6">{t.footer.about}</p>
            <div className="flex gap-2.5">
              <a href="#" className="w-9 h-9 bg-charcoal-800 hover:bg-rose-500 rounded-full flex items-center justify-center transition-all duration-300" aria-label="Facebook">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="#" className="w-9 h-9 bg-charcoal-800 hover:bg-rose-500 rounded-full flex items-center justify-center transition-all duration-300" aria-label="Instagram">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-5">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: t.nav.home },
                { href: "/vendors", label: t.nav.vendors },
                { href: "/about", label: t.nav.about },
                { href: "/contact", label: t.nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ivory-400 hover:text-rose-300 transition-colors text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-5">{t.footer.forVendors}</h4>
            <ul className="space-y-3">
              <li><Link href="/join" className="text-ivory-400 hover:text-rose-300 transition-colors text-sm">{t.nav.joinMlb}</Link></li>
              <li><Link href="/admin/login" className="text-ivory-400 hover:text-rose-300 transition-colors text-sm">{t.nav.admin}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-5">{t.common.contactUs}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-ivory-400 text-sm"><Mail className="w-4 h-4 text-rose-400 flex-shrink-0" />info@mlb.mk</li>
              <li className="flex items-center gap-3 text-ivory-400 text-sm"><Phone className="w-4 h-4 text-rose-400 flex-shrink-0" />+389 2 XXX XXXX</li>
              <li className="flex items-center gap-3 text-ivory-400 text-sm"><MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />Skopje, Macedonia</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ivory-500 text-xs">{t.footer.copyright}</p>
          <p className="text-ivory-500 text-xs flex items-center gap-1">
            {t.footer.madeWith} <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}
