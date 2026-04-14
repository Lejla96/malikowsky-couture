"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n";
import {
  LayoutDashboard, Store, Calendar, MessageSquare, LogOut,
  Users, Clock, CheckCircle, XCircle, Trash2, Eye, Edit2,
  ChevronRight, Star, MapPin, Loader2
} from "lucide-react";

type Tab = "overview" | "vendors" | "bookings" | "reviews";

interface Stats {
  totalVendors: number;
  pendingVendors: number;
  approvedVendors: number;
  totalBookings: number;
  pendingBookings: number;
  totalReviews: number;
  pendingReviews: number;
}

interface Vendor {
  id: string;
  businessName: string;
  slug: string;
  email: string;
  phone: string;
  city: string;
  approved: boolean;
  featured: boolean;
  rating: number;
  createdAt: string;
  category: { name: string };
}

interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventType: string;
  preferredDate: string;
  status: string;
  message?: string;
  createdAt: string;
  vendor: { businessName: string; slug: string };
}

interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
  vendor: { businessName: string; slug: string };
}

export default function AdminDashboard() {
  const { t } = useTranslation();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) throw new Error("Not authenticated");
      setAuthenticated(true);
    } catch {
      router.push("/admin/login");
    }
  }, [router]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, vendorsRes, bookingsRes, reviewsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/vendors?approved=all&limit=100"),
        fetch("/api/bookings"),
        fetch("/api/reviews?approved=all"),
      ]);

      setStats(await statsRes.json());
      const vendorData = await vendorsRes.json();
      setVendors(vendorData.vendors || []);
      setBookings(await bookingsRes.json());
      setReviews(await reviewsRes.json());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth().then(() => fetchData());
  }, [checkAuth, fetchData]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("mlb-admin-token");
    router.push("/admin/login");
  };

  const approveVendor = async (slug: string, approved: boolean) => {
    await fetch(`/api/vendors/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved }),
    });
    fetchData();
  };

  const toggleFeatured = async (slug: string, featured: boolean) => {
    await fetch(`/api/vendors/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured }),
    });
    fetchData();
  };

  const deleteVendor = async (slug: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/vendors/${slug}`, { method: "DELETE" });
    fetchData();
  };

  const updateBookingStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  const approveReview = async (id: string, approved: boolean) => {
    await fetch(`/api/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved }),
    });
    fetchData();
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    fetchData();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-champagne-600" />
      </div>
    );
  }

  const tabs = [
    { id: "overview" as Tab, label: t.admin.dashboard, icon: LayoutDashboard },
    { id: "vendors" as Tab, label: t.admin.vendors, icon: Store },
    { id: "bookings" as Tab, label: t.admin.bookings, icon: Calendar },
    { id: "reviews" as Tab, label: t.admin.reviews, icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-ivory-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-charcoal-900 min-h-screen p-6 hidden lg:block fixed left-0 top-20">
          <div className="mb-8">
            <h2 className="text-xl font-serif font-bold text-white">MLB Admin</h2>
            <p className="text-sm text-ivory-400">{t.admin.dashboard}</p>
          </div>

          <nav className="space-y-1">
            {tabs.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  tab === item.id
                    ? "bg-champagne-600 text-white"
                    : "text-ivory-300 hover:text-white hover:bg-charcoal-800"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 mt-8 text-ivory-400 hover:text-white hover:bg-charcoal-800 rounded-xl text-sm font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {t.nav.logout}
          </button>
        </aside>

        {/* Mobile tabs */}
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-white border-b border-champagne-100 z-40 px-4 py-2 flex gap-2 overflow-x-auto">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                tab === item.id
                  ? "bg-champagne-600 text-white"
                  : "text-charcoal-600 bg-champagne-50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6 lg:p-8 mt-14 lg:mt-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-champagne-600" />
            </div>
          ) : (
            <>
              {/* Overview */}
              {tab === "overview" && stats && (
                <div>
                  <h1 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">{t.admin.dashboard}</h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                      { label: t.admin.totalVendors, value: stats.totalVendors, icon: Store, color: "from-champagne-500 to-champagne-600" },
                      { label: t.admin.pendingApproval, value: stats.pendingVendors, icon: Clock, color: "from-amber-500 to-amber-600" },
                      { label: t.admin.totalBookings, value: stats.totalBookings, icon: Calendar, color: "from-blue-500 to-blue-600" },
                      { label: t.admin.totalReviews, value: stats.totalReviews, icon: MessageSquare, color: "from-purple-500 to-purple-600" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-2xl shadow-sm border border-champagne-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                            <stat.icon className="w-6 h-6 text-white" />
                          </div>
                          <ChevronRight className="w-5 h-5 text-charcoal-300" />
                        </div>
                        <p className="text-3xl font-bold text-charcoal-900">{stat.value}</p>
                        <p className="text-sm text-charcoal-500 mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-champagne-100 p-6">
                      <h3 className="font-serif font-semibold text-charcoal-900 mb-4">
                        Recent Bookings
                      </h3>
                      <div className="space-y-3">
                        {bookings.slice(0, 5).map((b) => (
                          <div key={b.id} className="flex items-center justify-between py-2 border-b border-champagne-50 last:border-0">
                            <div>
                              <p className="text-sm font-medium text-charcoal-800">{b.firstName} {b.lastName}</p>
                              <p className="text-xs text-charcoal-400">{b.vendor.businessName} - {b.eventType}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              b.status === "pending" ? "bg-amber-100 text-amber-700" :
                              b.status === "confirmed" ? "bg-green-100 text-green-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {b.status}
                            </span>
                          </div>
                        ))}
                        {bookings.length === 0 && <p className="text-sm text-charcoal-400">No bookings yet</p>}
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-champagne-100 p-6">
                      <h3 className="font-serif font-semibold text-charcoal-900 mb-4">
                        Pending Vendors
                      </h3>
                      <div className="space-y-3">
                        {vendors.filter(v => !v.approved).slice(0, 5).map((v) => (
                          <div key={v.id} className="flex items-center justify-between py-2 border-b border-champagne-50 last:border-0">
                            <div>
                              <p className="text-sm font-medium text-charcoal-800">{v.businessName}</p>
                              <p className="text-xs text-charcoal-400">{v.category.name} - {v.city}</p>
                            </div>
                            <button
                              onClick={() => approveVendor(v.slug, true)}
                              className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                            >
                              Approve
                            </button>
                          </div>
                        ))}
                        {vendors.filter(v => !v.approved).length === 0 && (
                          <p className="text-sm text-charcoal-400">No pending vendors</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Vendors Management */}
              {tab === "vendors" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-serif font-bold text-charcoal-900">{t.admin.vendors}</h1>
                    <span className="text-sm text-charcoal-500">{vendors.length} total</span>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-champagne-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-ivory-50 border-b border-champagne-100">
                          <tr>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase">Vendor</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase">Category</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase">Location</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase">Status</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase">Rating</th>
                            <th className="text-right px-6 py-4 text-xs font-semibold text-charcoal-500 uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-champagne-50">
                          {vendors.map((vendor) => (
                            <tr key={vendor.id} className="hover:bg-ivory-50 transition-colors">
                              <td className="px-6 py-4">
                                <p className="font-medium text-charcoal-900">{vendor.businessName}</p>
                                <p className="text-xs text-charcoal-400">{vendor.email}</p>
                              </td>
                              <td className="px-6 py-4 text-sm text-charcoal-600">{vendor.category.name}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-1 text-sm text-charcoal-600">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {vendor.city}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                  <span className={`inline-flex w-fit px-2 py-1 text-xs font-medium rounded-full ${
                                    vendor.approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                                  }`}>
                                    {vendor.approved ? "Approved" : "Pending"}
                                  </span>
                                  {vendor.featured && (
                                    <span className="inline-flex w-fit px-2 py-1 text-xs font-medium rounded-full bg-champagne-100 text-champagne-700">
                                      Featured
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-champagne-500 fill-champagne-500" />
                                  <span className="text-sm font-medium">{vendor.rating.toFixed(1)}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <a href={`/vendors/${vendor.slug}`} target="_blank" className="p-2 text-charcoal-400 hover:text-charcoal-600 transition-colors">
                                    <Eye className="w-4 h-4" />
                                  </a>
                                  {!vendor.approved ? (
                                    <button onClick={() => approveVendor(vendor.slug, true)} className="p-2 text-green-500 hover:text-green-700 transition-colors">
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                  ) : (
                                    <button onClick={() => approveVendor(vendor.slug, false)} className="p-2 text-amber-500 hover:text-amber-700 transition-colors">
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button onClick={() => toggleFeatured(vendor.slug, !vendor.featured)} className="p-2 text-champagne-500 hover:text-champagne-700 transition-colors">
                                    <Star className={`w-4 h-4 ${vendor.featured ? "fill-champagne-500" : ""}`} />
                                  </button>
                                  <button onClick={() => deleteVendor(vendor.slug)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Bookings Management */}
              {tab === "bookings" && (
                <div>
                  <h1 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">{t.admin.bookings}</h1>

                  <div className="space-y-4">
                    {bookings.length === 0 ? (
                      <div className="bg-white rounded-2xl shadow-sm border border-champagne-100 p-12 text-center">
                        <Calendar className="w-12 h-12 text-charcoal-300 mx-auto mb-4" />
                        <p className="text-charcoal-500">No bookings yet</p>
                      </div>
                    ) : (
                      bookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-2xl shadow-sm border border-champagne-100 p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-charcoal-900">{booking.firstName} {booking.lastName}</h3>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  booking.status === "pending" ? "bg-amber-100 text-amber-700" :
                                  booking.status === "confirmed" ? "bg-green-100 text-green-700" :
                                  "bg-red-100 text-red-700"
                                }`}>
                                  {booking.status}
                                </span>
                              </div>
                              <div className="text-sm text-charcoal-500 space-y-1">
                                <p>Vendor: <span className="font-medium text-charcoal-700">{booking.vendor.businessName}</span></p>
                                <p>Event: {booking.eventType} | Date: {new Date(booking.preferredDate).toLocaleDateString()}</p>
                                <p>Contact: {booking.email} | {booking.phone}</p>
                                {booking.message && <p className="italic">&ldquo;{booking.message}&rdquo;</p>}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {booking.status === "pending" && (
                                <>
                                  <button
                                    onClick={() => updateBookingStatus(booking.id, "confirmed")}
                                    className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => updateBookingStatus(booking.id, "cancelled")}
                                    className="px-4 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Reviews Management */}
              {tab === "reviews" && (
                <div>
                  <h1 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">{t.admin.reviews}</h1>

                  <div className="space-y-4">
                    {reviews.length === 0 ? (
                      <div className="bg-white rounded-2xl shadow-sm border border-champagne-100 p-12 text-center">
                        <MessageSquare className="w-12 h-12 text-charcoal-300 mx-auto mb-4" />
                        <p className="text-charcoal-500">No reviews yet</p>
                      </div>
                    ) : (
                      reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-champagne-100 p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-charcoal-900">{review.name}</h3>
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-champagne-500 fill-champagne-500" : "text-charcoal-200"}`} />
                                  ))}
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  review.approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                                }`}>
                                  {review.approved ? "Approved" : "Pending"}
                                </span>
                              </div>
                              <p className="text-sm text-charcoal-500 mb-1">For: {review.vendor.businessName}</p>
                              <p className="text-sm text-charcoal-600">{review.comment}</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              {!review.approved && (
                                <button
                                  onClick={() => approveReview(review.id, true)}
                                  className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors"
                                >
                                  Approve
                                </button>
                              )}
                              <button
                                onClick={() => deleteReview(review.id)}
                                className="p-2 text-red-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
