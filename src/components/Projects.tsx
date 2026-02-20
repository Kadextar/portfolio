"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { CinematicSection } from "@/components/effects/CinematicSection";

const schedyScreenshots = [
  "/schedy/preview.png",
  "/schedy/2.png",
  "/schedy/3.png",
  "/schedy/4.png",
  "/schedy/5.png",
  "/schedy/6.png",
];

export function Projects() {
  const t = useTranslations("projects");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  useEffect(() => {
    if (!lightboxSrc) return;
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
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Schedy — left: grid of 6 screenshots, right: info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-glow hover:border-white/12 transition-colors duration-300 overflow-hidden">
              <div className="flex flex-col md:flex-row md:min-h-0">
                <div className="md:w-[min(42%,320px)] shrink-0 bg-white/[0.03] p-4 md:p-5 flex flex-col justify-center">
                  <div className="grid grid-cols-3 gap-2 md:gap-2.5 max-w-[280px] mx-auto md:max-w-none">
                    {schedyScreenshots.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setLightboxSrc(src)}
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
                  <p className="mt-3 text-zinc-500 text-sm leading-relaxed">
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
            <Card className="glass-glow hover:border-white/12 transition-colors duration-300 h-full">
              <CardContent className="p-6 md:p-8">
                <span className="text-accent text-xs font-medium tracking-wide uppercase">
                  {t("kadextarTag")}
                </span>
                <h3 className="mt-2 text-xl font-medium text-white">
                  {t("kadextarTitle")}
                </h3>
                <p className="mt-3 text-zinc-500 text-sm leading-relaxed">
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
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={t("schedyTitle")}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] max-w-[min(90vw,360px)] aspect-[9/19] w-full"
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
          </motion.div>
        )}
      </AnimatePresence>
    </CinematicSection>
  );
}
