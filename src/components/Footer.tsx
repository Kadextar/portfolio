"use client";

import { useTranslations } from "next-intl";
import { Link as I18nLink } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 overflow-hidden print:hidden">
      <div className="absolute inset-x-0 top-0 h-24 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" aria-hidden />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-500 text-sm">
            © {currentYear} {t("copyright")}
          </p>
          <div className="flex items-center gap-8">
            <I18nLink
              href="#about"
              className="text-zinc-500 hover:text-accent text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus-visible:rounded"
            >
              {t("about")}
            </I18nLink>
            <I18nLink
              href="#research"
              className="text-zinc-500 hover:text-accent text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus-visible:rounded"
            >
              {t("research")}
            </I18nLink>
            <I18nLink
              href="/contact"
              className="text-zinc-500 hover:text-accent text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus-visible:rounded"
            >
              {t("contact")}
            </I18nLink>
          </div>
        </div>
        <p className="mt-6 text-center text-zinc-600 text-xs">{t("tagline")}</p>
      </div>
    </footer>
  );
}
