"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { CinematicSection } from "@/components/effects/CinematicSection";
import { AbstractModal } from "@/components/AbstractModal";

const publicationKeys = [
  "pub1",
  "pub2",
  "pub3",
  "pub4",
  "pub5",
  "pub6",
  "pub7",
  "pub8",
] as const;

function parseDateKey(dateStr: string): number {
  const parts = dateStr.trim().split(/[.\-/]/).map(Number);
  if (parts.length >= 3) {
    const [d, m, y] = parts;
    return new Date(y, (m || 1) - 1, d || 1).getTime();
  }
  return 0;
}

export function Research() {
  const t = useTranslations("research");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const sortedKeys = useMemo(() => {
    return [...publicationKeys].sort((a, b) => {
      const dateA = parseDateKey(t(`${a}Date`));
      const dateB = parseDateKey(t(`${b}Date`));
      return dateB - dateA;
    });
  }, [t]);

  return (
    <CinematicSection id="research" depthScale={0.02} parallaxY={10}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent text-xs font-medium tracking-[0.28em] uppercase mb-4">
            {t("label")}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-white">
            {t("title")}
          </h2>
          <p className="mt-4 text-zinc-500 max-w-xl mx-auto text-sm">
            {t("subtitle")}
          </p>
        </motion.div>

        <div
          className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]"
          role="list"
        >
          {sortedKeys.map((key, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <motion.div
                key={key}
                initial={false}
                className="border-b border-white/10 last:border-b-0"
                role="listitem"
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                  className="w-full flex items-center gap-4 md:gap-6 px-5 md:px-8 py-5 text-left hover:bg-white/[0.03] transition-colors duration-200 group"
                  aria-expanded={isExpanded}
                >
                  <span className="flex-shrink-0 text-zinc-500 text-xs font-medium tabular-nums w-20">
                    {t(`${key}Date`)}
                  </span>
                  <span className="flex-1 min-w-0 font-medium text-white text-sm md:text-base leading-snug group-hover:text-accent/90 transition-colors line-clamp-2">
                    {t(`${key}Title`)}
                  </span>
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-zinc-500 group-hover:border-white/20 group-hover:text-accent/80 transition-colors">
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-8 pb-6 pt-0">
                        <div className="pl-20 md:pl-24 border-l-2 border-white/10">
                          <p className="pl-5 md:pl-6 text-zinc-400 text-sm leading-relaxed">
                            {t(`${key}Abstract`)}
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalIndex(i);
                            }}
                            className="mt-4 ml-5 md:ml-6 text-xs font-medium text-accent hover:underline"
                          >
                            {t("viewAbstract")} →
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>

      {sortedKeys.map((key, i) => (
        <AbstractModal
          key={key}
          isOpen={modalIndex === i}
          onClose={() => setModalIndex(null)}
          title={t(`${key}Title`)}
          date={t(`${key}Date`)}
          abstract={t(`${key}Abstract`)}
          closeLabel={t("close")}
          abstractLabel={t("abstract")}
        />
      ))}
    </CinematicSection>
  );
}
