"use client";

import { createContext, useCallback, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const SCROLL_KEY = "locale-transition-scroll";

type ContextValue = {
  hasProvider: boolean;
  isExiting: boolean;
  isEntering: boolean;
  startLocaleTransition: (locale: Locale) => void;
  onExitComplete: () => void;
  onEnterComplete: () => void;
};

const defaultValue: ContextValue = {
  hasProvider: false,
  isExiting: false,
  isEntering: false,
  startLocaleTransition: () => {},
  onExitComplete: () => {},
  onEnterComplete: () => {},
};

export const LocaleTransitionContext = createContext<ContextValue>(defaultValue);

export function LocaleTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isExiting, setIsExiting] = useState(false);
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);
  const [nextPageShouldEnter, setNextPageShouldEnter] = useState(false);

  const startLocaleTransition = useCallback(
    (locale: Locale) => {
      if (pendingLocale === locale) return;
      typeof window !== "undefined" &&
        sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
      setPendingLocale(locale);
      setIsExiting(true);
    },
    [pendingLocale]
  );

  const onExitComplete = useCallback(() => {
    if (!pendingLocale) return;
    setNextPageShouldEnter(true);
    router.replace(pathname ?? "/", { locale: pendingLocale });
    setPendingLocale(null);
    setIsExiting(false);
  }, [pendingLocale, pathname, router]);

  const onEnterComplete = useCallback(() => {
    const raw = typeof window !== "undefined" && sessionStorage.getItem(SCROLL_KEY);
    if (raw) {
      const y = parseInt(raw, 10);
      if (!isNaN(y)) requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "auto" }));
      sessionStorage.removeItem(SCROLL_KEY);
    }
    setNextPageShouldEnter(false);
  }, []);

  const value: ContextValue = {
    hasProvider: true,
    isExiting,
    isEntering: nextPageShouldEnter,
    startLocaleTransition,
    onExitComplete,
    onEnterComplete,
  };

  return (
    <LocaleTransitionContext.Provider value={value}>
      {children}
    </LocaleTransitionContext.Provider>
  );
}
