"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n";
import { CheckCircle, Loader2, Users, Star, Heart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  nameMk: string;
}

export default function JoinContent({ categories }: { categories: Category[] }) {
  const { locale, t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    ownerSurname: "",
    email: "",
    phone: "",
    categoryId: "",
    location: "",
    city: "",
    description: "",
    website: "",
    facebook: "",
    instagram: "",
    tiktok: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          location: `${form.city}, Macedonia`,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed");
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.join.error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-ivory-50 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all";

  const benefits = [
    { icon: Users, text: t.join.benefits.reach },
    { icon: Star, text: t.join.benefits.profile },
    { icon: Heart, text: t.join.benefits.bookings },
    { icon: TrendingUp, text: t.join.benefits.support },
  ];

  if (success) {
    return (
      <div className="min-h-screen luxury-gradient flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-xl p-12 border border-rose-100"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-serif font-bold text-charcoal-900 mb-3">
            {locale === "mk" ? "Апликацијата е поднесена!" : "Application Submitted!"}
          </h2>
          <p className="text-charcoal-500">{t.join.success}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen luxury-gradient py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-900 mb-4">
            {t.join.title}
          </h1>
          <p className="text-lg text-charcoal-500 max-w-2xl mx-auto">
            {t.join.subtitle}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-300 to-rose-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Benefits Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-charcoal-900 rounded-2xl p-8 text-white sticky top-28">
              <h3 className="text-xl font-serif font-semibold mb-6">{t.join.benefits.title}</h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-rose-300" />
                    </div>
                    <p className="text-ivory-200 text-sm leading-relaxed">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-rose-100 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Info */}
                <div>
                  <h3 className="text-lg font-serif font-semibold text-charcoal-900 mb-4">
                    {locale === "mk" ? "Информации за бизнисот" : "Business Information"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.join.businessName} *</label>
                      <input type="text" required value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.join.ownerFirstName} *</label>
                      <input type="text" required value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.join.ownerLastName} *</label>
                      <input type="text" required value={form.ownerSurname} onChange={(e) => setForm({ ...form, ownerSurname: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.join.email} *</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.join.phone} *</label>
                      <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.join.category} *</label>
                      <select required value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className={inputClass}>
                        <option value="">{t.join.selectCategory}</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {locale === "mk" ? cat.nameMk : cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.join.city} *</label>
                      <input type="text" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass} placeholder="e.g. Skopje" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.join.description} *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder={t.join.descriptionPlaceholder}
                    className={inputClass}
                  />
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-serif font-semibold text-charcoal-900 mb-4">
                    {locale === "mk" ? "Социјални мрежи" : "Social Media & Links"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.join.website}</label>
                      <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={inputClass} placeholder="https://" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.join.facebook}</label>
                      <input type="url" value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} className={inputClass} placeholder="https://facebook.com/..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.join.instagram}</label>
                      <input type="url" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} className={inputClass} placeholder="https://instagram.com/..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.join.tiktok}</label>
                      <input type="url" value={form.tiktok} onChange={(e) => setForm({ ...form, tiktok: e.target.value })} className={inputClass} placeholder="https://tiktok.com/@..." />
                    </div>
                  </div>
                </div>

                {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-rose-400 to-rose-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-rose-700 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {t.join.submit}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
