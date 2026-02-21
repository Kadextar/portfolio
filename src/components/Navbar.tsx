"use client";

import { useState, useEffect, useCallback } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AmbientAudio } from "./AmbientAudio";
import { ThemeToggle } from "./ThemeToggle";
import { trackEvent, PlausibleEvents } from "@/lib/plausible";

type NavSegment = "work" | "info" | "contact";

export function Navbar() {
  const t = useTranslations("nav");
  const tHero = useTranslations("hero");
  const pathname = usePathname();
  const isInfoPage = pathname?.includes("/info") ?? false;
  const isContactPage = pathname?.includes("/contact") ?? false;
  const segment: NavSegment = isContactPage ? "contact" : isInfoPage ? "info" : "work";

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleWork = useCallback(() => {
    if (isInfoPage) return;
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }, [isInfoPage]);

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

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
      <a
        href="#main"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:w-auto focus:h-auto focus:p-4 focus:m-0 focus:overflow-visible focus:[clip:auto] focus:whitespace-normal focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-white"
      >
        {t("skipToContent")}
      </a>
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 md:gap-4"
        aria-label="Main navigation"
      >
        {/* Left: name — на мобиле с truncate, подзаголовок только на десктопе */}
        <Link href="/" className="flex flex-col min-w-0 max-w-[60vw] md:max-w-none shrink-0">
          <span className="font-display text-base md:text-lg lg:text-xl font-semibold tracking-tight text-zinc-100 hover:text-accent transition-colors duration-200 truncate">
            {t("fullName")}
          </span>
          <span className="hidden md:block text-[10px] md:text-xs font-medium tracking-wide text-zinc-400 mt-0.5 line-clamp-2 max-w-[140px] sm:max-w-[180px] lg:max-w-none">
            {tHero("subtitle")}
          </span>
        </Link>

        {/* Desktop: center nav (no tablist to avoid aria-required-children with <a>) */}
        <div
          className="hidden md:flex rounded-xl border border-white/10 bg-white/[0.06] p-1 backdrop-blur-sm"
          role="group"
          aria-label="Main sections"
        >
          {segment === "work" ? (
            <button
              type="button"
              onClick={handleWork}
              className={cn(
                "relative px-3 py-2 rounded-lg text-sm font-medium transition-colors min-w-[56px] sm:min-w-[72px] md:min-w-[80px]",
                "text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
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
                "text-zinc-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              )}
            >
              <span className="relative z-10">{t("work")}</span>
            </Link>
          )}
          <Link
            href="/info"
            className={cn(
              "relative px-3 py-2 rounded-lg text-sm font-medium transition-colors min-w-[56px] sm:min-w-[72px] md:min-w-[80px] block text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
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
            className={cn(
              "relative px-3 py-2 rounded-lg text-sm font-medium transition-colors min-w-[56px] sm:min-w-[72px] md:min-w-[80px] block text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
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

        {/* Desktop: resume + language + music */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="/resume.pdf"
            download
            onClick={() => trackEvent(PlausibleEvents.ResumeClicked)}
            className="flex h-10 items-center rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:border-white/15 hover:bg-white/[0.08] hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 shrink-0"
            aria-label={t("downloadResume")}
          >
            {t("downloadResume")}
          </a>
          <ThemeToggle />
          <LanguageSwitcher />
          <AmbientAudio embedded className={btnGroupClass} />
        </div>

        {/* Mobile: кнопка меню */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-zinc-300 backdrop-blur-sm transition-colors hover:bg-white/[0.08] hover:border-white/15 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 shrink-0"
        >
          {mobileMenuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-black/80 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden
          >
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="mt-20 mx-4 rounded-2xl border border-white/10 bg-zinc-900/95 p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[10px] font-medium tracking-wider text-zinc-400 uppercase mb-4">{tHero("subtitle")}</p>
              <div className="flex flex-col gap-1 mb-6">
                {segment === "work" ? (
                  <button
                    type="button"
                    onClick={() => {
                      handleWork();
                      closeMenu();
                    }}
                    className="text-left px-3 py-2 rounded-lg text-sm font-medium text-white"
                  >
                    {t("work")}
                  </button>
                ) : (
                  <Link href="/" onClick={closeMenu} className="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white">
                    {t("work")}
                  </Link>
                )}
                <Link href="/info" onClick={closeMenu} className={`block px-3 py-2 rounded-lg text-sm font-medium ${segment === "info" ? "text-white" : "text-zinc-400 hover:text-white"}`}>
                  {t("info")}
                </Link>
                <Link href="/contact" onClick={closeMenu} className={`block px-3 py-2 rounded-lg text-sm font-medium ${segment === "contact" ? "text-white" : "text-zinc-400 hover:text-white"}`}>
                  {t("contact")}
                </Link>
              </div>
              <a
                href="/resume.pdf"
                download
                onClick={() => { trackEvent(PlausibleEvents.ResumeClicked); closeMenu(); }}
                className="flex items-center justify-center w-full h-11 rounded-xl border border-white/10 bg-white/[0.06] text-sm font-medium text-zinc-300 hover:bg-white/[0.08] hover:text-accent mb-6"
              >
                {t("downloadResume")}
              </a>
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
                <span className="text-xs text-zinc-400">Theme</span>
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/10">
                <span className="text-xs text-zinc-400">Language</span>
                <LanguageSwitcher />
              </div>
              <div className="flex items-center justify-between gap-4 pt-3">
                <span className="text-xs text-zinc-400">Sound</span>
                <AmbientAudio embedded className={btnGroupClass} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
