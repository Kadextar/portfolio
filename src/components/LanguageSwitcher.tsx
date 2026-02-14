"use client";

import { useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { localeNames, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const locales: Locale[] = ["en", "ru", "uz"];

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const effectiveLocale = useLocale() as Locale;
  const [isTransitioning, setIsTransitioning] = useState(false);

  const switchLocale = (locale: Locale) => {
    if (locale === effectiveLocale) return;
    setIsTransitioning(true);
    router.replace(pathname ?? "/", { locale });
    const t = setTimeout(() => setIsTransitioning(false), 400);
    return () => clearTimeout(t);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex items-center gap-0.5 rounded-full glass px-1 py-0.5 transition-opacity duration-300",
        isTransitioning && "opacity-70"
      )}
      role="group"
      aria-label="Switch language"
    >
      {locales.map((locale) => (
        <motion.button
          key={locale}
          type="button"
          onClick={() => switchLocale(locale)}
          className={cn(
            "relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-300",
            effectiveLocale === locale
              ? "text-accent"
              : "text-zinc-500 hover:text-zinc-300"
          )}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          aria-current={effectiveLocale === locale ? "true" : undefined}
          aria-label={`Switch to ${localeNames[locale]}`}
        >
          {effectiveLocale === locale && (
            <motion.span
              layoutId="lang-active"
              className="absolute inset-0 rounded-full bg-accent/15 border border-accent/25"
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 28,
              }}
            />
          )}
          <span className="relative z-10">{localeNames[locale]}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
