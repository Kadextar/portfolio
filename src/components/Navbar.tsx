"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AmbientAudio } from "./AmbientAudio";

type NavSegment = "work" | "info" | "contact";

export function Navbar() {
  const t = useTranslations("nav");
  const tHero = useTranslations("hero");
  const pathname = usePathname();
  const isInfoPage = pathname?.includes("/info") ?? false;
  const isContactPage = pathname?.includes("/contact") ?? false;
  const segment: NavSegment = isContactPage ? "contact" : isInfoPage ? "info" : "work";

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWork = () => {
    if (isInfoPage) return; // Link handles navigation
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const headerStyle = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 print:hidden",
    isScrolled ? "glass py-3 md:py-4" : "bg-transparent py-4 md:py-5"
  );

  const btnGroupClass =
    "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-zinc-300 backdrop-blur-sm transition-colors hover:bg-white/[0.08] hover:border-white/15 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] shrink-0";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={headerStyle}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        {/* Left: name + subtitle */}
        <Link
          href="/"
          className="flex flex-col min-w-0"
        >
          <span className="font-display text-lg md:text-xl font-semibold tracking-tight text-zinc-100 hover:text-accent transition-colors duration-200 truncate">
            {t("fullName")}
          </span>
          <span className="text-[10px] md:text-xs font-medium tracking-wide text-zinc-500 mt-0.5 line-clamp-2 max-w-[140px] sm:max-w-[180px] md:max-w-none">
            {tHero("subtitle")}
          </span>
        </Link>

        {/* Center: Work | Info | Contact */}
        <div
          role="tablist"
          className="flex rounded-xl border border-white/10 bg-white/[0.06] p-1 backdrop-blur-sm"
        >
          {segment === "work" ? (
            <button
              type="button"
              role="tab"
              aria-selected
              onClick={handleWork}
              className={cn(
                "relative px-3 py-2 rounded-lg text-sm font-medium transition-colors min-w-[56px] sm:min-w-[72px] md:min-w-[80px]",
                "text-white"
              )}
            >
              <motion.span
                layoutId="nav-segment"
                className="absolute inset-0 rounded-lg bg-white/10 border border-white/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              <span className="relative z-10">{t("work")}</span>
            </button>
          ) : (
            <Link
              href="/"
              className={cn(
                "relative px-3 py-2 rounded-lg text-sm font-medium transition-colors min-w-[56px] sm:min-w-[72px] md:min-w-[80px] block text-center",
                "text-zinc-400 hover:text-white"
              )}
            >
              <span className="relative z-10">{t("work")}</span>
            </Link>
          )}
          <Link
            href="/info"
            role="tab"
            aria-selected={segment === "info"}
            className={cn(
              "relative px-3 py-2 rounded-lg text-sm font-medium transition-colors min-w-[56px] sm:min-w-[72px] md:min-w-[80px] block text-center",
              segment === "info" ? "text-white" : "text-zinc-400 hover:text-zinc-300"
            )}
          >
            {segment === "info" && (
              <motion.span
                layoutId="nav-segment"
                className="absolute inset-0 rounded-lg bg-white/10 border border-white/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{t("info")}</span>
          </Link>
          <Link
            href="/contact"
            role="tab"
            aria-selected={segment === "contact"}
            className={cn(
              "relative px-3 py-2 rounded-lg text-sm font-medium transition-colors min-w-[56px] sm:min-w-[72px] md:min-w-[80px] block text-center",
              segment === "contact" ? "text-white" : "text-zinc-400 hover:text-zinc-300"
            )}
          >
            {segment === "contact" && (
              <motion.span
                layoutId="nav-segment"
                className="absolute inset-0 rounded-lg bg-white/10 border border-white/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{t("contact")}</span>
          </Link>
        </div>

        {/* Right: resume + language + music */}
        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            download
            className={cn(btnGroupClass, "text-xs font-medium px-3")}
            aria-label={t("downloadResume")}
          >
            {t("downloadResume")}
          </a>
          <LanguageSwitcher />
          <AmbientAudio embedded className={btnGroupClass} />
        </div>
      </nav>
    </motion.header>
  );
}
