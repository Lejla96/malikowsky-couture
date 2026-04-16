"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n";
import {
  Star, MapPin, Phone, Mail, Globe, ArrowLeft,
  Heart, Share2, Calendar,
  ExternalLink, CheckCircle, Clock
} from "lucide-react";
import { motion } from "framer-motion";
import BookingForm from "@/components/forms/BookingForm";
import ReviewForm from "@/components/forms/ReviewForm";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Vendor {
  id: string;
  businessName: string;
  slug: string;
  ownerName: string;
  ownerSurname: string;
  email: string;
  phone: string;
  description: string;
  descriptionMk?: string | null;
  city: string;
  location: string;
  rating: number;
  reviewCount: number;
  priceRange?: string | null;
  coverPhoto?: string | null;
  photos: string;
  logo?: string | null;
  website?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  featured: boolean;
  availability?: string | null;
  eventTypes: string;
  mapLat?: number | null;
  mapLng?: number | null;
  createdAt: string;
  category: { name: string; nameMk: string; slug: string };
  reviews: Review[];
}

export default function VendorProfileContent({ vendor }: { vendor: Vendor }) {
  const { locale, t } = useTranslation();
  const [showBooking, setShowBooking] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const description = locale === "mk" && vendor.descriptionMk ? vendor.descriptionMk : vendor.description;
  let eventTypes: string[] = [];
  try { eventTypes = JSON.parse(vendor.eventTypes); } catch { /* ignore */ }

  const toggleFavorite = async () => {
    setIsFavorited(!isFavorited);
    try {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendorId: vendor.id }),
      });
    } catch { /* ignore */ }
  };

  return (
    <div className="min-h-screen bg-ivory-50">
      {/* Cover */}
      <div className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-rose-200 to-rose-300">
        {vendor.coverPhoto ? (
          <img src={vendor.coverPhoto} alt={vendor.businessName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-8xl font-serif font-bold text-rose-300/50">
              {vendor.businessName.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium text-charcoal-700 hover:bg-white transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.common.back}
          </Link>
        </div>

        {/* Actions */}
        <div className="absolute top-6 right-6 flex gap-2">
          <button
            onClick={toggleFavorite}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          >
            <Heart className={`w-5 h-5 ${isFavorited ? "text-red-500 fill-red-500" : "text-charcoal-600"}`} />
          </button>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
            <Share2 className="w-5 h-5 text-charcoal-600" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-rose-100 p-8 mb-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  {vendor.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 text-rose-600 text-xs font-semibold rounded-full mb-3">
                      <CheckCircle className="w-3.5 h-3.5" /> {t.common.featured}
                    </span>
                  )}
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 mb-2">
                    {vendor.businessName}
                  </h1>
                  <p className="text-rose-500 font-medium">
                    {locale === "mk" ? vendor.category.nameMk : vendor.category.name}
                  </p>
                </div>
                {vendor.priceRange && (
                  <span className="text-2xl font-bold text-charcoal-700">{vendor.priceRange}</span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <span className="font-bold text-lg">{vendor.rating.toFixed(1)}</span>
                  <span className="text-charcoal-400">({vendor.reviewCount} {t.common.reviews.toLowerCase()})</span>
                </div>
                <div className="flex items-center gap-1 text-charcoal-600">
                  <MapPin className="w-4 h-4" />
                  <span>{vendor.location}</span>
                </div>
              </div>

              {/* Event Types */}
              {eventTypes.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {eventTypes.map((type) => (
                    <span key={type} className="px-3 py-1.5 bg-ivory-100 text-charcoal-600 text-sm rounded-lg border border-rose-100">
                      {type}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="prose prose-charcoal max-w-none">
                <h3 className="text-xl font-serif font-semibold text-charcoal-900 mb-3">
                  {locale === "mk" ? "За нас" : "About"}
                </h3>
                <p className="text-charcoal-600 leading-relaxed whitespace-pre-wrap">{description}</p>
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-rose-100 p-8 mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-semibold text-charcoal-900">
                  {t.common.reviews} ({vendor.reviews.length})
                </h3>
                <button
                  onClick={() => setShowReview(!showReview)}
                  className="text-sm font-semibold text-rose-600 hover:text-rose-700"
                >
                  {locale === "mk" ? "Напиши рецензија" : "Write a Review"}
                </button>
              </div>

              {showReview && (
                <div className="mb-8 p-6 bg-ivory-50 rounded-xl border border-rose-100">
                  <ReviewForm vendorId={vendor.id} onClose={() => setShowReview(false)} />
                </div>
              )}

              {vendor.reviews.length === 0 ? (
                <p className="text-charcoal-400 text-center py-8">
                  {locale === "mk" ? "Сè уште нема рецензии." : "No reviews yet."}
                </p>
              ) : (
                <div className="space-y-6">
                  {vendor.reviews.map((review) => (
                    <div key={review.id} className="border-b border-rose-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-rose-600">
                              {review.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-charcoal-900">{review.name}</p>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < review.rating ? "text-rose-500 fill-rose-500" : "text-charcoal-200"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-charcoal-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-charcoal-600 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Book Consultation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-rose-100 p-6 mb-6 sticky top-28"
            >
              {!showBooking ? (
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                  <h3 className="text-xl font-serif font-semibold text-charcoal-900 mb-2">
                    {t.vendors.bookConsultation}
                  </h3>
                  <p className="text-sm text-charcoal-500 mb-6">
                    {locale === "mk"
                      ? "Поврзете се со овој продавач за вашиот настан"
                      : "Connect with this vendor for your event"}
                  </p>
                  <button
                    onClick={() => setShowBooking(true)}
                    className="w-full py-3.5 bg-gradient-to-r from-rose-400 to-rose-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-rose-700 transition-all shadow-md"
                  >
                    {t.vendors.bookConsultation}
                  </button>
                </div>
              ) : (
                <BookingForm vendorId={vendor.id} vendorName={vendor.businessName} onClose={() => setShowBooking(false)} />
              )}

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-rose-100 space-y-3">
                <a href={`tel:${vendor.phone}`} className="flex items-center gap-3 text-sm text-charcoal-600 hover:text-rose-600 transition-colors">
                  <Phone className="w-4 h-4 text-rose-500" />
                  {vendor.phone}
                </a>
                <a href={`mailto:${vendor.email}`} className="flex items-center gap-3 text-sm text-charcoal-600 hover:text-rose-600 transition-colors">
                  <Mail className="w-4 h-4 text-rose-500" />
                  {vendor.email}
                </a>
                {vendor.website && (
                  <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-charcoal-600 hover:text-rose-600 transition-colors">
                    <Globe className="w-4 h-4 text-rose-500" />
                    {locale === "mk" ? "Веб страна" : "Website"}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {/* Social Links */}
                <div className="flex gap-2 pt-2">
                  {vendor.facebook && (
                    <a href={vendor.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-rose-50 hover:bg-rose-100 rounded-lg flex items-center justify-center transition-colors" aria-label="Facebook">
                      <svg className="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    </a>
                  )}
                  {vendor.instagram && (
                    <a href={vendor.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-rose-50 hover:bg-rose-100 rounded-lg flex items-center justify-center transition-colors" aria-label="Instagram">
                      <svg className="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Availability */}
              {vendor.availability && (
                <div className="mt-6 pt-6 border-t border-rose-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-rose-500" />
                    <span className="text-sm font-semibold text-charcoal-800">{t.common.availability}</span>
                  </div>
                  <p className="text-sm text-charcoal-600">{vendor.availability}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
