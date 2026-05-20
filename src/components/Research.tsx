"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { CinematicSection } from "@/components/effects/CinematicSection";
import { AbstractModal } from "@/components/AbstractModal";
import { FiChevronDown, FiBookOpen, FiFileText } from "react-icons/fi";

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

type PublicationKey = typeof publicationKeys[number];

const publicationTags: Record<PublicationKey, string[]> = {
  pub1: ["Economics", "Policy"],
  pub2: ["Hospitality", "Tourism"],
  pub3: ["Education", "Innovation"],
  pub4: ["AI", "Hospitality", "Digitalization"],
  pub5: ["Digitalization", "Hospitality"],
  pub6: ["Hospitality", "Sustainability"],
  pub7: ["Economics", "Investment"],
  pub8: ["Economics", "Policy"],
};

const categoryTranslations: Record<string, Record<string, string>> = {
  en: {
    all: "All Contributions",
    ai: "AI & Digitalization",
    hospitality: "Hospitality & Tourism",
    economics: "Economics & Policy",
    education: "Education & Innovation",
  },
  ru: {
    all: "Все публикации",
    ai: "ИИ и Цифровизация",
    hospitality: "Гостеприимство и Туризм",
    economics: "Экономика и Политика",
    education: "Образование и Инновации",
  },
  uz: {
    all: "Barcha ishlar",
    ai: "AI va Raqamlashtirish",
    hospitality: "Mehmondo'stlik va Turizm",
    economics: "Iqtisodiyot va Siyosat",
    education: "Ta'lim va Innovatsiyalar",
  },
};

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
  const locale = useLocale();
  const [expandedKey, setExpandedKey] = useState<PublicationKey | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Single active modal publication details
  const [activePub, setActivePub] = useState<{
    key: PublicationKey;
    title: string;
    date: string;
    abstract: string;
  } | null>(null);

  const categories = useMemo(() => {
    const tDict = categoryTranslations[locale] || categoryTranslations.en;
    return [
      { id: "all", label: tDict.all, tags: [] },
      { id: "ai", label: tDict.ai, tags: ["AI", "Digitalization"] },
      { id: "hospitality", label: tDict.hospitality, tags: ["Hospitality", "Tourism", "Sustainability"] },
      { id: "economics", label: tDict.economics, tags: ["Economics", "Policy", "Investment"] },
      { id: "education", label: tDict.education, tags: ["Education", "Innovation"] },
    ];
  }, [locale]);

  const sortedAndFilteredKeys = useMemo(() => {
    // 1. Sort by Date descending
    const sorted = [...publicationKeys].sort((a, b) => {
      const dateA = parseDateKey(t(`${a}Date`));
      const dateB = parseDateKey(t(`${b}Date`));
      return dateB - dateA;
    });

    // 2. Filter by Active Category Tags
    if (activeCategory === "all") return sorted;
    const cat = categories.find((c) => c.id === activeCategory);
    if (!cat) return sorted;

    return sorted.filter((key) => {
      const tags = publicationTags[key];
      return tags.some((tag) => cat.tags.includes(tag));
    });
  }, [t, activeCategory, categories]);

  return (
    <CinematicSection id="research" depthScale={0.02} parallaxY={10} className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent text-[10px] font-medium tracking-[0.28em] uppercase mb-4">
            {t("label")}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-white">
            {t("title")}
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm font-light leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Dynamic Category Tag Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedKey(null); // Close accordion on tag switch
                }}
                className={`relative px-4 py-2 rounded-xl text-xs font-light tracking-wide transition-all duration-300 select-none ${
                  isActive
                    ? "text-accent bg-accent/10 border border-accent/20 shadow-gold-glow"
                    : "text-zinc-400 bg-white/[0.01] border border-white/[0.04] hover:text-zinc-200 hover:border-white/[0.08] hover:bg-white/[0.02]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Publication Drawer Accordions */}
        <div className="space-y-4 max-w-4xl mx-auto" role="list">
          <AnimatePresence mode="popLayout">
            {sortedAndFilteredKeys.map((key) => {
              const isExpanded = expandedKey === key;
              const tags = publicationTags[key];
              
              return (
                <motion.div
                  key={key}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isExpanded 
                      ? "border-accent/20 bg-accent/[0.02] shadow-[0_4px_25px_rgba(229,196,131,0.02)]" 
                      : "border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08] hover:bg-white/[0.02]"
                  }`}
                  role="listitem"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedKey(isExpanded ? null : key)}
                    className="w-full flex items-start gap-4 md:gap-6 px-6 py-5 text-left transition-colors duration-200 group"
                    aria-expanded={isExpanded}
                  >
                    <span className="flex-shrink-0 text-accent/80 text-xs font-mono tabular-nums bg-accent/5 border border-accent/10 rounded px-2.5 py-1 mt-0.5">
                      {t(`${key}Date`)}
                    </span>
                    
                    <div className="flex-1 min-w-0 flex flex-col items-start">
                      <span className="font-medium text-white text-sm md:text-base leading-snug group-hover:text-accent transition-colors">
                        {t(`${key}Title`)}
                      </span>
                      
                      {/* Interactive Hashtags */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                          <span key={tag} className="text-[10px] text-zinc-500 font-light hover:text-tech transition-colors">
                            #{tag}
                          </span>
                        ))}
                        {key === "pub4" && (
                          <span className="px-2 py-0.5 rounded text-[8px] uppercase tracking-wider font-medium border border-accent/40 text-accent bg-accent/10">
                            VAK · Peer-reviewed
                          </span>
                        )}
                      </div>
                    </div>

                    <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${
                      isExpanded 
                        ? "border-accent/20 text-accent" 
                        : "border-white/10 text-zinc-400 group-hover:border-white/20 group-hover:text-accent"
                    }`}>
                      <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <FiChevronDown className="w-4 h-4" />
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
                        <div className="px-6 pb-6 pt-0">
                          <div className="pl-6 border-l border-accent/20 space-y-4">
                            <p className="text-zinc-400 text-sm leading-relaxed font-light text-justify">
                              {t(`${key}Abstract`)}
                            </p>
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePub({
                                    key,
                                    title: t(`${key}Title`),
                                    date: t(`${key}Date`),
                                    abstract: t(`${key}Abstract`),
                                  });
                                }}
                                className="inline-flex items-center gap-1.5 text-xs font-light text-accent hover:underline decoration-accent/30 underline-offset-4"
                              >
                                <FiBookOpen className="w-3.5 h-3.5" />
                                {t("viewAbstract")} →
                              </button>
                              {key === "pub4" && (
                                <a
                                  href="#"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-light text-zinc-400 hover:text-accent transition-colors underline decoration-white/10 hover:decoration-accent/30 underline-offset-4"
                                >
                                  <FiFileText className="w-3.5 h-3.5" />
                                  Read article ↗
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* Unified Academic Drawer Overlay */}
      <AbstractModal
        isOpen={activePub !== null}
        onClose={() => setActivePub(null)}
        title={activePub?.title || ""}
        date={activePub?.date || ""}
        abstract={activePub?.abstract || ""}
        closeLabel={t("close")}
        abstractLabel={t("abstract")}
      />
    </CinematicSection>
  );
}
