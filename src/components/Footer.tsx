"use client";

import { useTranslations } from "next-intl";
import { Link as I18nLink } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-500 text-sm">
            © {currentYear} {t("copyright")}
          </p>
          <div className="flex items-center gap-8">
            <I18nLink
              href="#about"
              className="text-zinc-500 hover:text-accent text-sm transition-colors"
            >
              {t("about")}
            </I18nLink>
            <I18nLink
              href="#research"
              className="text-zinc-500 hover:text-accent text-sm transition-colors"
            >
              {t("research")}
            </I18nLink>
            <I18nLink
              href="#contact"
              className="text-zinc-500 hover:text-accent text-sm transition-colors"
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
