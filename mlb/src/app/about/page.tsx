"use client";

import { useTranslation } from "@/i18n";
import { Heart, Users, Star, Award, Globe, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const { locale } = useTranslation();

  return (
    <div className="min-h-screen bg-ivory-50">
      {/* Hero */}
      <section className="luxury-gradient py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-charcoal-900 mb-6">
              {locale === "mk" ? "За MLB" : "About MLB"}
            </h1>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
              {locale === "mk"
                ? "MLB е премиерната дигитална платформа за планирање настани во Македонија, посветена на промовирање и поддршка на ромските бизниси и професионалци за настани."
                : "MLB is Macedonia's premier digital event planning platform, dedicated to promoting and supporting Roma-owned businesses and event professionals across the country."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 mb-6">
                {locale === "mk" ? "Нашата мисија" : "Our Mission"}
              </h2>
              <p className="text-charcoal-600 leading-relaxed mb-6">
                {locale === "mk"
                  ? "Веруваме дека секоја прослава заслужува совршенство. Нашата мисија е да ги поврземе паровите и семејствата со најталентираните професионалци за настани во Македонија, со посебен фокус на промовирање на ромските претприемачи и бизниси."
                  : "We believe every celebration deserves perfection. Our mission is to connect couples and families with the most talented event professionals in Macedonia, with a special focus on promoting Roma entrepreneurs and businesses."}
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                {locale === "mk"
                  ? "Преку MLB, создаваме премиум дигитален екосистем каде талентот се среќава со можноста, овозможувајќи им на ромските бизниси да растат додека им помагаме на клиентите да ги планираат нивните совршени настани."
                  : "Through MLB, we're creating a premium digital ecosystem where talent meets opportunity, empowering Roma businesses to grow while helping clients plan their perfect events."}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Heart, title: locale === "mk" ? "Заедница" : "Community", desc: locale === "mk" ? "Поддршка на ромските претприемачи" : "Supporting Roma entrepreneurs" },
                  { icon: Star, title: locale === "mk" ? "Квалитет" : "Quality", desc: locale === "mk" ? "Курирани, врвни продавачи" : "Curated, top-tier vendors" },
                  { icon: Globe, title: locale === "mk" ? "Пристапност" : "Access", desc: locale === "mk" ? "Лесна платформа за сите" : "Easy platform for everyone" },
                  { icon: Award, title: locale === "mk" ? "Доверба" : "Trust", desc: locale === "mk" ? "Верифицирани професионалци" : "Verified professionals" },
                ].map((item, i) => (
                  <div key={i} className="bg-ivory-50 rounded-2xl p-6 border border-champagne-100 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-champagne-100 to-champagne-200 rounded-2xl flex items-center justify-center">
                      <item.icon className="w-7 h-7 text-champagne-700" />
                    </div>
                    <h3 className="font-serif font-semibold text-charcoal-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-charcoal-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 dark-luxury-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-12">
            {locale === "mk" ? "Зошто MLB?" : "Why MLB?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: locale === "mk" ? "Верифицирани продавачи" : "Verified Vendors", desc: locale === "mk" ? "Секој продавач е внимателно прегледан и одобрен од нашиот тим." : "Every vendor is carefully reviewed and approved by our team." },
              { icon: Sparkles, title: locale === "mk" ? "Премиум искуство" : "Premium Experience", desc: locale === "mk" ? "Луксузен дизајн и беспрекорно корисничко искуство." : "Luxurious design and seamless user experience for planning your perfect event." },
              { icon: Heart, title: locale === "mk" ? "Од заедницата, за заедницата" : "By the Community, For the Community", desc: locale === "mk" ? "Промовирање на ромските бизниси и културата." : "Promoting Roma businesses and celebrating our rich cultural heritage." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-charcoal-800/50 backdrop-blur-sm rounded-2xl p-8 border border-charcoal-700/50"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-champagne-600/20 rounded-2xl flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-champagne-400" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">{item.title}</h3>
                <p className="text-ivory-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
