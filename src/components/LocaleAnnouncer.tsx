"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

const ANNOUNCE: Record<string, string> = {
  en: "Language changed to English.",
  ru: "Язык изменён на русский.",
  uz: "Til o'zbekchaga o'zgartirildi.",
};

export function LocaleAnnouncer() {
  const locale = useLocale();
  const prevLocale = useRef<string | null>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevLocale.current === null) {
      prevLocale.current = locale;
      return;
    }
    if (prevLocale.current !== locale && liveRef.current) {
      liveRef.current.textContent = ANNOUNCE[locale] ?? ANNOUNCE.en;
      prevLocale.current = locale;
      const t = setTimeout(() => {
        if (liveRef.current) liveRef.current.textContent = "";
        clearTimeout(t);
      }, 2000);
      return () => clearTimeout(t);
    }
    prevLocale.current = locale;
  }, [locale]);

  return (
    <div
      ref={liveRef}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  );
}
