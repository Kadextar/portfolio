"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const STORAGE_KEY = "portfolio-locale";

export function LocaleRestore() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const didRestore = useRef(false);

  useEffect(() => {
    if (didRestore.current) return;
    const defaultLocale = routing.defaultLocale as string;
    const locales = routing.locales as readonly string[];
    if (locale !== defaultLocale || pathname !== "/") return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && locales.includes(stored) && stored !== defaultLocale) {
        didRestore.current = true;
        router.replace(pathname ?? "/", { locale: stored as "en" | "ru" | "uz" });
      }
    } catch (_) {}
  }, [locale, pathname, router]);

  return null;
}
