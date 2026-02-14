"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { localeNames, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const locales: Locale[] = ["en", "ru", "uz"];

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const effectiveLocale = useLocale() as Locale;

  const switchLocale = (locale: Locale) => {
    if (locale === effectiveLocale) return;
    router.replace(pathname ?? "/", { locale });
  };

  return (
    <div className="flex items-center gap-0.5 rounded-full glass px-1 py-0.5">
      {locales.map((locale) => (
        <motion.button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={cn(
            "relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-300",
            effectiveLocale === locale
              ? "text-[#ff7a1a]"
              : "text-zinc-500 hover:text-zinc-300"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            {effectiveLocale === locale && (
              <motion.span
                layoutId="lang-active"
                className="absolute inset-0 rounded-full bg-[#ff7a1a]/15 border border-[#ff7a1a]/30"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
          </AnimatePresence>
          <span className="relative z-10">{localeNames[locale]}</span>
        </motion.button>
      ))}
    </div>
  );
}
