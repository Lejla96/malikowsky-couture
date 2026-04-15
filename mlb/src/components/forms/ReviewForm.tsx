"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n";
import { Star, CheckCircle, Loader2 } from "lucide-react";

interface Props {
  vendorId: string;
  onClose: () => void;
}

export default function ReviewForm({ vendorId, onClose }: Props) {
  const { locale } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", comment: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError(locale === "mk" ? "Ве молиме изберете оцена" : "Please select a rating");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, vendorId, rating }),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch {
      setError(locale === "mk" ? "Нешто тргна наопаку" : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-4">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <p className="text-sm text-charcoal-600">
          {locale === "mk"
            ? "Вашата рецензија е поднесена и чека одобрување."
            : "Your review has been submitted and is pending approval."}
        </p>
        <button onClick={onClose} className="mt-3 text-sm text-champagne-700 font-medium">{locale === "mk" ? "Затвори" : "Close"}</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-charcoal-700 mb-2">
          {locale === "mk" ? "Оцена" : "Rating"}
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHoveredRating(i)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(i)}
              className="p-1"
            >
              <Star
                className={`w-7 h-7 transition-colors ${
                  i <= (hoveredRating || rating)
                    ? "text-champagne-500 fill-champagne-500"
                    : "text-charcoal-200"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal-700 mb-1">
          {locale === "mk" ? "Име" : "Name"}
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-champagne-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-champagne-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal-700 mb-1">
          {locale === "mk" ? "Е-пошта" : "Email"}
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-champagne-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-champagne-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal-700 mb-1">
          {locale === "mk" ? "Коментар" : "Comment"}
        </label>
        <textarea
          required
          rows={3}
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-champagne-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-champagne-300"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-champagne-600 to-champagne-700 text-white font-semibold rounded-xl hover:from-champagne-700 hover:to-champagne-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {locale === "mk" ? "Поднеси рецензија" : "Submit Review"}
      </button>
    </form>
  );
}
