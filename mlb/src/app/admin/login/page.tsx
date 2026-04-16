"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError(t.admin.login.error);
        return;
      }

      const data = await res.json();
      localStorage.setItem("mlb-admin-token", data.token);
      router.push("/admin/dashboard");
    } catch {
      setError(t.admin.login.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen luxury-gradient flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-charcoal-900">{t.admin.login.title}</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-rose-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.admin.login.email}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-ivory-50 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                placeholder="admin@mlb.mk"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">{t.admin.login.password}</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-ivory-50 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>

            {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-rose-400 to-rose-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-rose-700 transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {t.admin.login.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
