"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n";
import { CheckCircle, Loader2, X } from "lucide-react";

interface Props {
  vendorId: string;
  vendorName: string;
  onClose: () => void;
}

export default function BookingForm({ vendorId, vendorName, onClose }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    eventType: "",
    preferredDate: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, vendorId }),
      });

      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch {
      setError(t.booking.error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-serif font-semibold text-charcoal-900 mb-2">
          {t.booking.success.split("!")[0]}!
        </h3>
        <p className="text-sm text-charcoal-500">{t.booking.success}</p>
        <button onClick={onClose} className="mt-4 text-sm text-rose-600 font-medium hover:text-rose-700">
          {t.common.back}
        </button>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 bg-ivory-50 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all";

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-serif font-semibold text-charcoal-900">{t.booking.title}</h3>
        <button onClick={onClose} className="text-charcoal-400 hover:text-charcoal-600">
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-sm text-charcoal-500 mb-6">{vendorName}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.booking.firstName}</label>
            <input type="text" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.booking.lastName}</label>
            <input type="text" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.booking.email}</label>
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.booking.phone}</label>
          <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.booking.location}</label>
          <input type="text" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.booking.eventType}</label>
          <select required value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} className={inputClass}>
            <option value="">-- Select --</option>
            <option value="Wedding">{t.booking.eventTypes.wedding}</option>
            <option value="Engagement">{t.booking.eventTypes.engagement}</option>
            <option value="Birthday">{t.booking.eventTypes.birthday}</option>
            <option value="Corporate">{t.booking.eventTypes.corporate}</option>
            <option value="Other">{t.booking.eventTypes.other}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.booking.preferredDate}</label>
          <input type="date" required value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.booking.message}</label>
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder={t.booking.messagePlaceholder}
            className={inputClass}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-rose-400 to-rose-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-rose-700 transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
          {t.booking.submit}
        </button>
      </form>
    </div>
  );
}
