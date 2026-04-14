"use client";

import { useState, useCallback, useMemo, type ReactNode } from "react";
import { LocaleContext, type Locale, translations } from "@/i18n";

export default function Providers({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("mlb-locale", newLocale);
      document.documentElement.lang = newLocale;
    }
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, t: translations[locale] }),
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}
