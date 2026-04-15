"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n";
import {
  LayoutDashboard, Store, Calendar, MessageSquare, LogOut,
  Clock, CheckCircle, XCircle, Trash2, Eye, Edit2,
  ChevronRight, Star, MapPin, Loader2, FileText, Save, X
} from "lucide-react";

type Tab = "overview" | "vendors" | "bookings" | "reviews" | "content";

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
  ownerName: string;
  ownerSurname: string;
  email: string;
  phone: string;
  city: string;
  location: string;
  description: string;
  descriptionMk?: string | null;
  website?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  priceRange?: string | null;
  availability?: string | null;
  approved: boolean;
  featured: boolean;
  rating: number;
  createdAt: string;
  category: { name: string; nameMk: string; slug: string };
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
  message?: string | null;
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
  vendor?: { businessName: string; slug: string };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ContentData = Record<string, any>;

export default function AdminDashboard() {
  const { t } = useTranslation();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [savingContent, setSavingContent] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

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
      const [statsRes, vendorsRes, bookingsRes, reviewsRes, contentRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/vendors?approved=all&limit=100"),
        fetch("/api/bookings"),
        fetch("/api/reviews?approved=all"),
        fetch("/api/content"),
      ]);
      setStats(await statsRes.json());
      const vendorData = await vendorsRes.json();
      setVendors(vendorData.vendors || []);
      setBookings(await bookingsRes.json());
      setReviews(await reviewsRes.json());
      setContent(await contentRes.json());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { checkAuth().then(() => fetchData()); }, [checkAuth, fetchData]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("mlb-admin-token");
    router.push("/admin/login");
  };

  const approveVendor = async (slug: string, approved: boolean) => {
    await fetch(`/api/vendors/${slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ approved }) });
    fetchData();
  };

  const toggleFeatured = async (slug: string, featured: boolean) => {
    await fetch(`/api/vendors/${slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ featured }) });
    fetchData();
  };

  const deleteVendor = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this vendor?")) return;
    await fetch(`/api/vendors/${slug}`, { method: "DELETE" });
    fetchData();
  };

  const saveVendorEdit = async () => {
    if (!editingVendor) return;
    await fetch(`/api/vendors/${editingVendor.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingVendor),
    });
    setEditingVendor(null);
    fetchData();
  };

  const updateBookingStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    fetchData();
  };

  const approveReview = async (id: string, approved: boolean) => {
    await fetch(`/api/reviews/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ approved }) });
    fetchData();
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    fetchData();
  };

  const saveContentSection = async (section: string) => {
    if (!content) return;
    setSavingContent(section);
    setSaveSuccess(null);
    try {
      await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data: content[section] }),
      });
      setSaveSuccess(section);
      setTimeout(() => setSaveSuccess(null), 2000);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSavingContent(null);
    }
  };

  const updateContentField = (section: string, field: string, value: string) => {
    if (!content) return;
    setContent({ ...content, [section]: { ...content[section], [field]: value } });
  };

  const updateTestimonial = (index: number, field: string, value: string) => {
    if (!content) return;
    const items = [...content.testimonials.items];
    items[index] = { ...items[index], [field]: value };
    setContent({ ...content, testimonials: { ...content.testimonials, items } });
  };

  if (!authenticated) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-champagne-600" /></div>;
  }

  const tabs = [
    { id: "overview" as Tab, label: t.admin.dashboard, icon: LayoutDashboard },
    { id: "vendors" as Tab, label: t.admin.vendors, icon: Store },
    { id: "bookings" as Tab, label: t.admin.bookings, icon: Calendar },
    { id: "reviews" as Tab, label: t.admin.reviews, icon: MessageSquare },
    { id: "content" as Tab, label: t.admin.content, icon: FileText },
  ];

  const inputClass = "w-full px-3 py-2.5 bg-ivory-50 border border-champagne-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-champagne-300";
  const labelClass = "block text-xs font-semibold text-charcoal-500 uppercase tracking-wide mb-1";

  const ContentField = ({ section, field, label, multiline }: { section: string; field: string; label: string; multiline?: boolean }) => (
    <div>
      <label className={labelClass}>{label}</label>
      {multiline ? (
        <textarea rows={3} value={content?.[section]?.[field] || ""} onChange={(e) => updateContentField(section, field, e.target.value)} className={inputClass} />
      ) : (
        <input type="text" value={content?.[section]?.[field] || ""} onChange={(e) => updateContentField(section, field, e.target.value)} className={inputClass} />
      )}
    </div>
  );

  const SectionCard = ({ title, section, children }: { title: string; section: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-champagne-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-serif font-semibold text-charcoal-900">{title}</h3>
        <button onClick={() => saveContentSection(section)} disabled={savingContent === section}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-champagne-600 to-champagne-700 text-white text-sm font-semibold rounded-lg hover:from-champagne-700 hover:to-champagne-800 transition-all disabled:opacity-50">
          {savingContent === section ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saveSuccess === section ? "Saved!" : "Save"}
        </button>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );

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
              <button key={item.id} onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${tab === item.id ? "bg-champagne-600 text-white" : "text-ivory-300 hover:text-white hover:bg-charcoal-800"}`}>
                <item.icon className="w-5 h-5" />{item.label}
              </button>
            ))}
          </nav>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 mt-8 text-ivory-400 hover:text-white hover:bg-charcoal-800 rounded-xl text-sm font-medium transition-colors">
            <LogOut className="w-5 h-5" />{t.nav.logout}
          </button>
        </aside>

        {/* Mobile tabs */}
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-white border-b border-champagne-100 z-40 px-4 py-2 flex gap-2 overflow-x-auto">
          {tabs.map((item) => (
            <button key={item.id} onClick={() => setTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${tab === item.id ? "bg-champagne-600 text-white" : "text-charcoal-600 bg-champagne-50"}`}>
              <item.icon className="w-4 h-4" />{item.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6 lg:p-8 mt-14 lg:mt-0">
          {loading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-champagne-600" /></div>
          ) : (
            <>
              {/* ===== OVERVIEW ===== */}
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
                </div>
              )}

              {/* ===== VENDORS ===== */}
              {tab === "vendors" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-serif font-bold text-charcoal-900">{t.admin.vendors}</h1>
                    <span className="text-sm text-charcoal-500">{vendors.length} total</span>
                  </div>

                  {/* Edit Vendor Modal */}
                  {editingVendor && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditingVendor(null)}>
                      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-serif font-bold text-charcoal-900">Edit Vendor: {editingVendor.businessName}</h2>
                          <button onClick={() => setEditingVendor(null)}><X className="w-5 h-5 text-charcoal-400" /></button>
                        </div>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div><label className={labelClass}>Business Name</label><input type="text" value={editingVendor.businessName} onChange={(e) => setEditingVendor({ ...editingVendor, businessName: e.target.value })} className={inputClass} /></div>
                            <div><label className={labelClass}>Email</label><input type="email" value={editingVendor.email} onChange={(e) => setEditingVendor({ ...editingVendor, email: e.target.value })} className={inputClass} /></div>
                            <div><label className={labelClass}>Phone</label><input type="text" value={editingVendor.phone} onChange={(e) => setEditingVendor({ ...editingVendor, phone: e.target.value })} className={inputClass} /></div>
                            <div><label className={labelClass}>City</label><input type="text" value={editingVendor.city} onChange={(e) => setEditingVendor({ ...editingVendor, city: e.target.value })} className={inputClass} /></div>
                            <div><label className={labelClass}>Location</label><input type="text" value={editingVendor.location} onChange={(e) => setEditingVendor({ ...editingVendor, location: e.target.value })} className={inputClass} /></div>
                            <div><label className={labelClass}>Price Range</label><input type="text" value={editingVendor.priceRange || ""} onChange={(e) => setEditingVendor({ ...editingVendor, priceRange: e.target.value })} className={inputClass} placeholder="$, $$, or $$$" /></div>
                            <div><label className={labelClass}>Website</label><input type="url" value={editingVendor.website || ""} onChange={(e) => setEditingVendor({ ...editingVendor, website: e.target.value })} className={inputClass} /></div>
                            <div><label className={labelClass}>Facebook</label><input type="url" value={editingVendor.facebook || ""} onChange={(e) => setEditingVendor({ ...editingVendor, facebook: e.target.value })} className={inputClass} /></div>
                            <div><label className={labelClass}>Instagram</label><input type="url" value={editingVendor.instagram || ""} onChange={(e) => setEditingVendor({ ...editingVendor, instagram: e.target.value })} className={inputClass} /></div>
                            <div><label className={labelClass}>Availability</label><input type="text" value={editingVendor.availability || ""} onChange={(e) => setEditingVendor({ ...editingVendor, availability: e.target.value })} className={inputClass} /></div>
                          </div>
                          <div><label className={labelClass}>Description (English)</label><textarea rows={4} value={editingVendor.description} onChange={(e) => setEditingVendor({ ...editingVendor, description: e.target.value })} className={inputClass} /></div>
                          <div><label className={labelClass}>Description (Macedonian)</label><textarea rows={4} value={editingVendor.descriptionMk || ""} onChange={(e) => setEditingVendor({ ...editingVendor, descriptionMk: e.target.value })} className={inputClass} /></div>
                          <div className="flex justify-end gap-3 pt-4">
                            <button onClick={() => setEditingVendor(null)} className="px-6 py-2.5 border border-champagne-200 rounded-lg text-sm font-medium text-charcoal-700 hover:bg-champagne-50">Cancel</button>
                            <button onClick={saveVendorEdit} className="px-6 py-2.5 bg-gradient-to-r from-champagne-600 to-champagne-700 text-white font-semibold rounded-lg hover:from-champagne-700 hover:to-champagne-800 flex items-center gap-2"><Save className="w-4 h-4" />Save Changes</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

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
                              <td className="px-6 py-4"><p className="font-medium text-charcoal-900">{vendor.businessName}</p><p className="text-xs text-charcoal-400">{vendor.email}</p></td>
                              <td className="px-6 py-4 text-sm text-charcoal-600">{vendor.category.name}</td>
                              <td className="px-6 py-4"><div className="flex items-center gap-1 text-sm text-charcoal-600"><MapPin className="w-3.5 h-3.5" />{vendor.city}</div></td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                  <span className={`inline-flex w-fit px-2 py-1 text-xs font-medium rounded-full ${vendor.approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{vendor.approved ? "Approved" : "Pending"}</span>
                                  {vendor.featured && <span className="inline-flex w-fit px-2 py-1 text-xs font-medium rounded-full bg-champagne-100 text-champagne-700">Featured</span>}
                                </div>
                              </td>
                              <td className="px-6 py-4"><div className="flex items-center gap-1"><Star className="w-4 h-4 text-champagne-500 fill-champagne-500" /><span className="text-sm font-medium">{vendor.rating.toFixed(1)}</span></div></td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button onClick={() => setEditingVendor(vendor)} className="p-2 text-blue-500 hover:text-blue-700 transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>
                                  <a href={`/vendors/${vendor.slug}`} target="_blank" className="p-2 text-charcoal-400 hover:text-charcoal-600 transition-colors" title="View"><Eye className="w-4 h-4" /></a>
                                  {!vendor.approved ? (
                                    <button onClick={() => approveVendor(vendor.slug, true)} className="p-2 text-green-500 hover:text-green-700 transition-colors" title="Approve"><CheckCircle className="w-4 h-4" /></button>
                                  ) : (
                                    <button onClick={() => approveVendor(vendor.slug, false)} className="p-2 text-amber-500 hover:text-amber-700 transition-colors" title="Unapprove"><XCircle className="w-4 h-4" /></button>
                                  )}
                                  <button onClick={() => toggleFeatured(vendor.slug, !vendor.featured)} className="p-2 text-champagne-500 hover:text-champagne-700 transition-colors" title="Toggle Featured"><Star className={`w-4 h-4 ${vendor.featured ? "fill-champagne-500" : ""}`} /></button>
                                  <button onClick={() => deleteVendor(vendor.slug)} className="p-2 text-red-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
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

              {/* ===== BOOKINGS ===== */}
              {tab === "bookings" && (
                <div>
                  <h1 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">{t.admin.bookings}</h1>
                  <div className="space-y-4">
                    {bookings.length === 0 ? (
                      <div className="bg-white rounded-2xl shadow-sm border border-champagne-100 p-12 text-center"><Calendar className="w-12 h-12 text-charcoal-300 mx-auto mb-4" /><p className="text-charcoal-500">No bookings yet</p></div>
                    ) : bookings.map((booking) => (
                      <div key={booking.id} className="bg-white rounded-2xl shadow-sm border border-champagne-100 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-charcoal-900">{booking.firstName} {booking.lastName}</h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${booking.status === "pending" ? "bg-amber-100 text-amber-700" : booking.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{booking.status}</span>
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
                                <button onClick={() => updateBookingStatus(booking.id, "confirmed")} className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors">Confirm</button>
                                <button onClick={() => updateBookingStatus(booking.id, "cancelled")} className="px-4 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors">Cancel</button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== REVIEWS ===== */}
              {tab === "reviews" && (
                <div>
                  <h1 className="text-2xl font-serif font-bold text-charcoal-900 mb-6">{t.admin.reviews}</h1>
                  <div className="space-y-4">
                    {reviews.length === 0 ? (
                      <div className="bg-white rounded-2xl shadow-sm border border-champagne-100 p-12 text-center"><MessageSquare className="w-12 h-12 text-charcoal-300 mx-auto mb-4" /><p className="text-charcoal-500">No reviews yet</p></div>
                    ) : reviews.map((review) => (
                      <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-champagne-100 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-charcoal-900">{review.name}</h3>
                              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => (<Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-champagne-500 fill-champagne-500" : "text-charcoal-200"}`} />))}</div>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${review.approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{review.approved ? "Approved" : "Pending"}</span>
                            </div>
                            <p className="text-sm text-charcoal-500 mb-1">For: {review.vendor?.businessName}</p>
                            <p className="text-sm text-charcoal-600">{review.comment}</p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            {!review.approved && <button onClick={() => approveReview(review.id, true)} className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors">Approve</button>}
                            <button onClick={() => deleteReview(review.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== CONTENT MANAGEMENT ===== */}
              {tab === "content" && content && (
                <div>
                  <h1 className="text-2xl font-serif font-bold text-charcoal-900 mb-2">Website Content</h1>
                  <p className="text-charcoal-500 mb-6">Edit all text content on the website. Changes are saved per section.</p>

                  {/* Hero Section */}
                  <SectionCard title="Hero Section (Homepage Banner)" section="hero">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ContentField section="hero" field="titleEn" label="Title (English)" />
                      <ContentField section="hero" field="titleMk" label="Title (Macedonian)" />
                      <ContentField section="hero" field="subtitleEn" label="Subtitle (English)" multiline />
                      <ContentField section="hero" field="subtitleMk" label="Subtitle (Macedonian)" multiline />
                      <ContentField section="hero" field="ctaEn" label="CTA Button (English)" />
                      <ContentField section="hero" field="ctaMk" label="CTA Button (Macedonian)" />
                      <ContentField section="hero" field="ctaSecondaryEn" label="Secondary Button (English)" />
                      <ContentField section="hero" field="ctaSecondaryMk" label="Secondary Button (Macedonian)" />
                      <ContentField section="hero" field="searchPlaceholderEn" label="Search Placeholder (English)" />
                      <ContentField section="hero" field="searchPlaceholderMk" label="Search Placeholder (Macedonian)" />
                      <ContentField section="hero" field="badge" label="Badge Text" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-champagne-100">
                      <ContentField section="hero" field="stat1Number" label="Stat 1 Number" />
                      <ContentField section="hero" field="stat1Label" label="Stat 1 Label" />
                      <ContentField section="hero" field="stat2Number" label="Stat 2 Number" />
                      <ContentField section="hero" field="stat2Label" label="Stat 2 Label" />
                      <ContentField section="hero" field="stat3Number" label="Stat 3 Number" />
                      <ContentField section="hero" field="stat3Label" label="Stat 3 Label" />
                    </div>
                  </SectionCard>

                  {/* Categories */}
                  <SectionCard title="Categories Section" section="categories">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ContentField section="categories" field="titleEn" label="Title (English)" />
                      <ContentField section="categories" field="titleMk" label="Title (Macedonian)" />
                      <ContentField section="categories" field="subtitleEn" label="Subtitle (English)" multiline />
                      <ContentField section="categories" field="subtitleMk" label="Subtitle (Macedonian)" multiline />
                    </div>
                  </SectionCard>

                  {/* Featured */}
                  <SectionCard title="Featured Vendors Section" section="featured">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ContentField section="featured" field="titleEn" label="Title (English)" />
                      <ContentField section="featured" field="titleMk" label="Title (Macedonian)" />
                      <ContentField section="featured" field="subtitleEn" label="Subtitle (English)" multiline />
                      <ContentField section="featured" field="subtitleMk" label="Subtitle (Macedonian)" multiline />
                    </div>
                  </SectionCard>

                  {/* How It Works */}
                  <SectionCard title="How It Works Section" section="howItWorks">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ContentField section="howItWorks" field="titleEn" label="Section Title (English)" />
                      <ContentField section="howItWorks" field="titleMk" label="Section Title (Macedonian)" />
                      <ContentField section="howItWorks" field="subtitleEn" label="Section Subtitle (English)" />
                      <ContentField section="howItWorks" field="subtitleMk" label="Section Subtitle (Macedonian)" />
                    </div>
                    <div className="pt-4 border-t border-champagne-100">
                      <p className="text-sm font-semibold text-charcoal-700 mb-3">Step 1</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ContentField section="howItWorks" field="step1TitleEn" label="Title (English)" />
                        <ContentField section="howItWorks" field="step1TitleMk" label="Title (Macedonian)" />
                        <ContentField section="howItWorks" field="step1DescEn" label="Description (English)" multiline />
                        <ContentField section="howItWorks" field="step1DescMk" label="Description (Macedonian)" multiline />
                      </div>
                    </div>
                    <div className="pt-4 border-t border-champagne-100">
                      <p className="text-sm font-semibold text-charcoal-700 mb-3">Step 2</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ContentField section="howItWorks" field="step2TitleEn" label="Title (English)" />
                        <ContentField section="howItWorks" field="step2TitleMk" label="Title (Macedonian)" />
                        <ContentField section="howItWorks" field="step2DescEn" label="Description (English)" multiline />
                        <ContentField section="howItWorks" field="step2DescMk" label="Description (Macedonian)" multiline />
                      </div>
                    </div>
                    <div className="pt-4 border-t border-champagne-100">
                      <p className="text-sm font-semibold text-charcoal-700 mb-3">Step 3</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ContentField section="howItWorks" field="step3TitleEn" label="Title (English)" />
                        <ContentField section="howItWorks" field="step3TitleMk" label="Title (Macedonian)" />
                        <ContentField section="howItWorks" field="step3DescEn" label="Description (English)" multiline />
                        <ContentField section="howItWorks" field="step3DescMk" label="Description (Macedonian)" multiline />
                      </div>
                    </div>
                  </SectionCard>

                  {/* Testimonials */}
                  <SectionCard title="Testimonials Section" section="testimonials">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <ContentField section="testimonials" field="titleEn" label="Section Title (English)" />
                      <ContentField section="testimonials" field="titleMk" label="Section Title (Macedonian)" />
                      <ContentField section="testimonials" field="subtitleEn" label="Section Subtitle (English)" />
                      <ContentField section="testimonials" field="subtitleMk" label="Section Subtitle (Macedonian)" />
                    </div>
                    {content.testimonials.items.map((item: { name: string; eventEn: string; eventMk: string; textEn: string; textMk: string }, idx: number) => (
                      <div key={idx} className="pt-4 border-t border-champagne-100">
                        <p className="text-sm font-semibold text-charcoal-700 mb-3">Testimonial {idx + 1}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Name</label><input type="text" value={item.name} onChange={(e) => updateTestimonial(idx, "name", e.target.value)} className={inputClass} /></div>
                          <div><label className={labelClass}>Event (English)</label><input type="text" value={item.eventEn} onChange={(e) => updateTestimonial(idx, "eventEn", e.target.value)} className={inputClass} /></div>
                          <div><label className={labelClass}>Event (Macedonian)</label><input type="text" value={item.eventMk} onChange={(e) => updateTestimonial(idx, "eventMk", e.target.value)} className={inputClass} /></div>
                          <div className="md:col-span-2"><label className={labelClass}>Review Text (English)</label><textarea rows={2} value={item.textEn} onChange={(e) => updateTestimonial(idx, "textEn", e.target.value)} className={inputClass} /></div>
                          <div className="md:col-span-2"><label className={labelClass}>Review Text (Macedonian)</label><textarea rows={2} value={item.textMk} onChange={(e) => updateTestimonial(idx, "textMk", e.target.value)} className={inputClass} /></div>
                        </div>
                      </div>
                    ))}
                  </SectionCard>

                  {/* CTA */}
                  <SectionCard title="Call-to-Action Section" section="cta">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ContentField section="cta" field="badgeEn" label="Badge (English)" />
                      <ContentField section="cta" field="badgeMk" label="Badge (Macedonian)" />
                      <ContentField section="cta" field="titleEn" label="Title (English)" />
                      <ContentField section="cta" field="titleMk" label="Title (Macedonian)" />
                      <ContentField section="cta" field="subtitleEn" label="Subtitle (English)" multiline />
                      <ContentField section="cta" field="subtitleMk" label="Subtitle (Macedonian)" multiline />
                    </div>
                  </SectionCard>

                  {/* About */}
                  <SectionCard title="About Page" section="about">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ContentField section="about" field="titleEn" label="Title (English)" />
                      <ContentField section="about" field="titleMk" label="Title (Macedonian)" />
                      <ContentField section="about" field="introEn" label="Intro (English)" multiline />
                      <ContentField section="about" field="introMk" label="Intro (Macedonian)" multiline />
                      <ContentField section="about" field="missionTitleEn" label="Mission Title (English)" />
                      <ContentField section="about" field="missionTitleMk" label="Mission Title (Macedonian)" />
                      <ContentField section="about" field="missionText1En" label="Mission Text 1 (English)" multiline />
                      <ContentField section="about" field="missionText1Mk" label="Mission Text 1 (Macedonian)" multiline />
                      <ContentField section="about" field="missionText2En" label="Mission Text 2 (English)" multiline />
                      <ContentField section="about" field="missionText2Mk" label="Mission Text 2 (Macedonian)" multiline />
                    </div>
                  </SectionCard>

                  {/* Footer */}
                  <SectionCard title="Footer" section="footer">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ContentField section="footer" field="aboutEn" label="About Text (English)" multiline />
                      <ContentField section="footer" field="aboutMk" label="About Text (Macedonian)" multiline />
                      <ContentField section="footer" field="copyrightEn" label="Copyright (English)" />
                      <ContentField section="footer" field="copyrightMk" label="Copyright (Macedonian)" />
                      <ContentField section="footer" field="madeWithEn" label="Made With (English)" />
                      <ContentField section="footer" field="madeWithMk" label="Made With (Macedonian)" />
                      <ContentField section="footer" field="email" label="Contact Email" />
                      <ContentField section="footer" field="phone" label="Contact Phone" />
                      <ContentField section="footer" field="address" label="Address" />
                    </div>
                  </SectionCard>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
