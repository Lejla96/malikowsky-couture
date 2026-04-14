"use client";

import { createContext, useContext } from "react";
import { en, type Translations } from "./en";
import { mk } from "./mk";

export type Locale = "en" | "mk";

export const translations: Record<Locale, Translations> = { en, mk };

export const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}>({
  locale: "en",
  setLocale: () => {},
  t: en,
});

export function useTranslation() {
  return useContext(LocaleContext);
}

export { en, mk };
export type { Translations };
