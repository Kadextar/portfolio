"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
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

export function Research() {
  const t = useTranslations("research");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="research" className="py-28 md:py-40 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
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

        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.05 },
            },
          }}
        >
          {publicationKeys.map((key, i) => (
            <motion.div
              key={key}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <Card className="glass-glow hover:border-white/12 transition-all duration-300 group hover:translate-y-[-2px]">
                <CardContent className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <p className="text-accent text-xs font-medium tracking-wider uppercase">
                        {t(`${key}Date`)}
                      </p>
                      <h3 className="mt-2 text-lg md:text-xl font-medium text-white group-hover:text-accent transition-colors duration-200 leading-snug">
                        {t(`${key}Title`)}
                      </h3>
                      <p className="mt-3 text-zinc-500 text-sm line-clamp-2">
                        {t(`${key}Abstract`)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(i)}
                      className="flex-shrink-0 px-5 py-2.5 rounded-md border border-white/15 bg-white/5 text-sm font-medium text-zinc-400 hover:border-accent/30 hover:bg-accent/10 hover:text-accent transition-colors duration-200"
                    >
                      {t("viewAbstract")}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {publicationKeys.map((key, i) => (
        <AbstractModal
          key={key}
          isOpen={openIndex === i}
          onClose={() => setOpenIndex(null)}
          title={t(`${key}Title`)}
          date={t(`${key}Date`)}
          abstract={t(`${key}Abstract`)}
          closeLabel={t("close")}
          abstractLabel={t("abstract")}
        />
      ))}
    </section>
  );
}
