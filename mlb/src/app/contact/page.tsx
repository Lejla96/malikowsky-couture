"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n";
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const { locale } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSuccess(true);
    setLoading(false);
  };

  const inputClass = "w-full px-4 py-3 bg-ivory-50 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all";

  return (
    <div className="min-h-screen luxury-gradient py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-900 mb-4">
            {locale === "mk" ? "Контактирајте нè" : "Contact Us"}
          </h1>
          <p className="text-lg text-charcoal-500 max-w-2xl mx-auto">
            {locale === "mk"
              ? "Имате прашања? Ние сме тука да помогнеме."
              : "Have questions? We're here to help. Reach out to our team."}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-300 to-rose-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="space-y-6">
              {[
                { icon: Mail, title: locale === "mk" ? "Е-пошта" : "Email", value: "info@mlb.mk", link: "mailto:info@mlb.mk" },
                { icon: Phone, title: locale === "mk" ? "Телефон" : "Phone", value: "+389 2 XXX XXXX", link: "tel:+38920000000" },
                { icon: MapPin, title: locale === "mk" ? "Адреса" : "Address", value: "Skopje, Macedonia", link: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-rose-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-charcoal-900">{item.title}</h3>
                    <p className="text-sm text-charcoal-500 mt-1">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-rose-100 p-8">
              {success ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-serif font-semibold text-charcoal-900 mb-2">
                    {locale === "mk" ? "Пораката е испратена!" : "Message Sent!"}
                  </h3>
                  <p className="text-charcoal-500">
                    {locale === "mk" ? "Ќе ви одговориме наскоро." : "We'll get back to you shortly."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">
                        {locale === "mk" ? "Име" : "Name"} *
                      </label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">
                        {locale === "mk" ? "Е-пошта" : "Email"} *
                      </label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-1">
                      {locale === "mk" ? "Предмет" : "Subject"} *
                    </label>
                    <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-1">
                      {locale === "mk" ? "Порака" : "Message"} *
                    </label>
                    <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass} />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-rose-400 to-rose-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-rose-700 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    {locale === "mk" ? "Испрати порака" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
