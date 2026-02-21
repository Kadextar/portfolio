"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { CinematicSection } from "@/components/effects/CinematicSection";
import { trackEvent, PlausibleEvents } from "@/lib/plausible";

const schedyScreenshots = [
  "/schedy/preview.png",
  "/schedy/2.png",
  "/schedy/3.png",
  "/schedy/4.png",
  "/schedy/5.png",
  "/schedy/6.png",
];

const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function getFocusables(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
  );
}

export function Projects() {
  const t = useTranslations("projects");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const openLightbox = useCallback((src: string) => {
    trackEvent(PlausibleEvents.ProjectOpened, { project: "Schedy" });
    setLightboxSrc(src);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null);
    previousActiveElement.current?.focus();
    previousActiveElement.current = null;
  }, []);

  useEffect(() => {
    if (!lightboxSrc) return;
    previousActiveElement.current = document.activeElement as HTMLElement | null;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [lightboxSrc, closeLightbox]);

  // Focus trap: move focus into lightbox and trap Tab
  useEffect(() => {
    if (!lightboxSrc || !lightboxRef.current) return;
    const container = lightboxRef.current;
    const focusables = getFocusables(container);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (focusables.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    container.addEventListener("keydown", onKeyDown);
    return () => container.removeEventListener("keydown", onKeyDown);
  }, [lightboxSrc]);

  return (
    <CinematicSection id="projects" depthScale={0.015} parallaxY={8}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-accent text-xs font-medium tracking-[0.28em] uppercase mb-4">
            {t("label")}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-white">
            {t("title")}
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Schedy — left: grid of 6 screenshots, right: info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-glow hover:border-white/12 transition-all duration-300 overflow-hidden hover:scale-[1.01] focus-within:ring-2 focus-within:ring-accent/30 focus-within:ring-offset-2 focus-within:ring-offset-zinc-950">
              <div className="flex flex-col md:flex-row md:min-h-0">
                <div className="md:w-[min(42%,320px)] shrink-0 bg-white/[0.03] p-4 md:p-5 flex flex-col justify-center">
                  <div className="grid grid-cols-3 gap-2 md:gap-2.5 max-w-[280px] mx-auto md:max-w-none">
                    {schedyScreenshots.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => openLightbox(src)}
                        className="aspect-[9/19] rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-lg cursor-pointer hover:border-white/20 hover:scale-[1.02] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 text-left"
                        aria-label={t("schedyTitle") + " " + (i + 1)}
                      >
                        <Image
                          src={src}
                          alt=""
                          width={120}
                          height={253}
                          className="w-full h-full object-cover object-top pointer-events-none"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <CardContent className="p-6 md:p-8 md:min-w-0 flex-1">
                  <span className="text-accent text-xs font-medium tracking-wide uppercase">
                    {t("schedyTag")}
                  </span>
                  <h3 className="mt-2 text-xl font-medium text-white">
                    {t("schedyTitle")}
                  </h3>
                  <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
                    {t("schedyDesc")}
                  </p>
                  <dl className="mt-6 space-y-4">
                    <div>
                      <dt className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        {t("contextLabel")}
                      </dt>
                      <dd className="mt-1 text-sm text-zinc-400 leading-relaxed">
                        {t("schedyProblem")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        {t("roleLabel")}
                      </dt>
                      <dd className="mt-1 text-sm text-zinc-400 leading-relaxed">
                        {t("schedyRole")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        {t("outcomeLabel")}
                      </dt>
                      <dd className="mt-1 text-sm text-zinc-400 leading-relaxed">
                        {t("schedyOutcome")}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-6 pt-4 border-t border-white/10">
                    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-400">
                      {t("schedyCta")}
                    </span>
                  </p>
                </CardContent>
              </div>
            </Card>
          </motion.div>

          {/* Kadextar — below, text-only card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            <Card className="glass-glow hover:border-white/12 transition-all duration-300 h-full hover:scale-[1.01] focus-within:ring-2 focus-within:ring-accent/30 focus-within:ring-offset-2 focus-within:ring-offset-zinc-950">
              <CardContent className="p-6 md:p-8">
                <span className="text-accent text-xs font-medium tracking-wide uppercase">
                  {t("kadextarTag")}
                </span>
                <h3 className="mt-2 text-xl font-medium text-white">
                  {t("kadextarTitle")}
                </h3>
                <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
                  {t("kadextarDesc")}
                </p>
                <dl className="mt-6 space-y-4">
                  <div>
                    <dt className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      {t("contextLabel")}
                    </dt>
                    <dd className="mt-1 text-sm text-zinc-400 leading-relaxed">
                      {t("kadextarProblem")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      {t("roleLabel")}
                    </dt>
                    <dd className="mt-1 text-sm text-zinc-400 leading-relaxed">
                      {t("kadextarRole")}
                    </dd>
                  </div>
                    <div>
                      <dt className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        {t("outcomeLabel")}
                      </dt>
                      <dd className="mt-1 text-sm text-zinc-400 leading-relaxed">
                        {t("kadextarOutcome")}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                    <a
                      href="https://youtube.com/@kadextar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                    >
                      {t("watchYouTube")}
                    </a>
                    <a
                      href="https://t.me/a_satullaev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                    >
                      {t("telegram")}
                    </a>
                    <a
                      href="https://instagram.com/a_satullayev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                    >
                      {t("instagram")}
                    </a>
                  </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={t("schedyTitle")}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-[60] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex-1 flex items-center justify-center p-4 min-h-0">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative max-h-[70vh] sm:max-h-[85vh] max-w-[min(90vw,360px)] aspect-[9/19] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={lightboxSrc}
                  alt=""
                  fill
                  className="object-contain rounded-xl shadow-2xl"
                  draggable={false}
                  unoptimized
                />
              </motion.div>
            </div>
            <div className="shrink-0 p-4 pb-[env(safe-area-inset-bottom)]">
              <button
                type="button"
                onClick={closeLightbox}
                className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-accent text-accent-foreground font-medium text-sm hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label={t("backToSite")}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t("backToSite")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CinematicSection>
  );
}
