"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n";
import { Search, Star, MapPin, Filter, X, Heart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Vendor {
  id: string;
  businessName: string;
  slug: string;
  description: string;
  descriptionMk?: string | null;
  city: string;
  location: string;
  rating: number;
  reviewCount: number;
  priceRange?: string | null;
  coverPhoto?: string | null;
  featured: boolean;
  eventTypes: string;
  category: { name: string; nameMk: string; slug: string };
}

interface Category {
  id: string;
  name: string;
  nameMk: string;
  slug: string;
}

interface Props {
  initialVendors: Vendor[];
  categories: Category[];
  cities: string[];
}

export default function VendorsContent({ initialVendors, categories, cities }: Props) {
  const { locale, t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const eventTypes = ["Wedding", "Engagement", "Birthday", "Corporate", "Other"];

  const filteredVendors = useMemo(() => {
    let result = [...initialVendors];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (v) =>
          v.businessName.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter((v) => v.category.slug === selectedCategory);
    }

    if (selectedCity) {
      result = result.filter((v) => v.city === selectedCity);
    }

    if (selectedEventType) {
      result = result.filter((v) => {
        try {
          const types = JSON.parse(v.eventTypes);
          return types.includes(selectedEventType);
        } catch {
          return false;
        }
      });
    }

    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.businessName.localeCompare(b.businessName));
        break;
      case "newest":
        result.reverse();
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [initialVendors, search, selectedCategory, selectedCity, selectedEventType, sortBy]);

  const toggleFavorite = async (vendorId: string) => {
    const newFavs = new Set(favorites);
    if (newFavs.has(vendorId)) {
      newFavs.delete(vendorId);
    } else {
      newFavs.add(vendorId);
    }
    setFavorites(newFavs);
    try {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendorId }),
      });
    } catch { /* ignore */ }
  };

  const activeFilters = [selectedCategory, selectedCity, selectedEventType].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-ivory-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-champagne-50 to-ivory-50 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-900 mb-3">
              {t.vendors.title}
            </h1>
            <p className="text-lg text-charcoal-500 max-w-2xl mx-auto">
              {t.vendors.subtitle}
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative flex items-center bg-white rounded-xl shadow-md border border-champagne-100 overflow-hidden">
              <Search className="absolute left-4 w-5 h-5 text-charcoal-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.common.searchPlaceholder}
                className="w-full pl-12 pr-4 py-4 bg-transparent focus:outline-none text-charcoal-900"
              />
              {search && (
                <button onClick={() => setSearch("")} className="mr-3 text-charcoal-400 hover:text-charcoal-600">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-champagne-200 text-sm font-medium text-charcoal-700 hover:bg-champagne-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              {t.common.filter}
              {activeFilters > 0 && (
                <span className="w-5 h-5 bg-champagne-600 text-white text-xs rounded-full flex items-center justify-center">
                  {activeFilters}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white border-b border-champagne-100"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1">
                    {t.vendors.filterByCategory}
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-ivory-50 border border-champagne-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-champagne-300"
                  >
                    <option value="">{t.vendors.allCategories}</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {locale === "mk" ? cat.nameMk : cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1">
                    {t.vendors.filterByLocation}
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-ivory-50 border border-champagne-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-champagne-300"
                  >
                    <option value="">{t.vendors.allLocations}</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Event Type */}
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1">
                    {t.vendors.filterByEventType}
                  </label>
                  <select
                    value={selectedEventType}
                    onChange={(e) => setSelectedEventType(e.target.value)}
                    className="w-full px-3 py-2.5 bg-ivory-50 border border-champagne-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-champagne-300"
                  >
                    <option value="">{t.vendors.allEventTypes}</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1">
                    {t.common.sortBy}
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2.5 bg-ivory-50 border border-champagne-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-champagne-300"
                  >
                    <option value="featured">{t.vendors.sortByFeatured}</option>
                    <option value="rating">{t.vendors.sortByRating}</option>
                    <option value="name">{t.vendors.sortByName}</option>
                    <option value="newest">{t.vendors.sortByNewest}</option>
                  </select>
                </div>
              </div>

              {activeFilters > 0 && (
                <button
                  onClick={() => { setSelectedCategory(""); setSelectedCity(""); setSelectedEventType(""); }}
                  className="mt-4 text-sm text-champagne-700 hover:text-champagne-800 font-medium"
                >
                  {locale === "mk" ? "Исчисти ги сите филтри" : "Clear all filters"}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-charcoal-500 mb-6">
          <span className="font-semibold text-charcoal-800">{filteredVendors.length}</span> {t.vendors.resultsCount}
        </p>

        {filteredVendors.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-charcoal-300 mx-auto mb-4" />
            <p className="text-lg text-charcoal-500">{t.common.noResults}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor, index) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.5) }}
              >
                <div className="group bg-white rounded-2xl overflow-hidden border border-champagne-100/50 shadow-sm premium-card">
                  {/* Image */}
                  <div className="relative h-52 bg-gradient-to-br from-champagne-100 to-champagne-200">
                    {vendor.coverPhoto ? (
                      <img src={vendor.coverPhoto} alt={vendor.businessName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl font-serif font-bold text-champagne-300">
                          {vendor.businessName.charAt(0)}
                        </span>
                      </div>
                    )}

                    {vendor.featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-champagne-600 text-white text-xs font-semibold rounded-full shadow-sm">
                        {t.common.featured}
                      </div>
                    )}

                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={(e) => { e.preventDefault(); toggleFavorite(vendor.id); }}
                        className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${favorites.has(vendor.id) ? "text-red-500 fill-red-500" : "text-charcoal-500"}`} />
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-champagne-700">
                      {locale === "mk" ? vendor.category.nameMk : vendor.category.name}
                    </div>
                  </div>

                  {/* Content */}
                  <Link href={`/vendors/${vendor.slug}`} className="block p-5">
                    <h3 className="text-lg font-serif font-bold text-charcoal-900 group-hover:text-champagne-700 transition-colors mb-2">
                      {vendor.businessName}
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-champagne-500 fill-champagne-500" />
                        <span className="text-sm font-semibold">{vendor.rating.toFixed(1)}</span>
                        <span className="text-xs text-charcoal-400">({vendor.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-charcoal-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-sm">{vendor.city}</span>
                      </div>
                      {vendor.priceRange && (
                        <span className="text-sm font-semibold text-charcoal-600">{vendor.priceRange}</span>
                      )}
                    </div>
                    <p className="text-sm text-charcoal-500 line-clamp-2 leading-relaxed mb-4">
                      {locale === "mk" && vendor.descriptionMk ? vendor.descriptionMk : vendor.description}
                    </p>
                    <div className="flex gap-2">
                      <span className="flex-1 text-center py-2.5 bg-gradient-to-r from-champagne-600 to-champagne-700 text-white text-sm font-semibold rounded-lg hover:from-champagne-700 hover:to-champagne-800 transition-all">
                        {t.vendors.viewProfile}
                      </span>
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
