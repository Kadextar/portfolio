"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const publications = [
  {
    typeKey: "pub1Type",
    titleKey: "pub1Title",
    journalKey: "pub1Journal",
    abstractKey: "pub1Abstract",
    yearKey: "year2024",
  },
  {
    typeKey: "pub2Type",
    titleKey: "pub2Title",
    journalKey: "pub2Journal",
    abstractKey: "pub2Abstract",
    yearKey: "year2024",
  },
  {
    typeKey: "pub3Type",
    titleKey: "pub3Title",
    journalKey: "pub3Journal",
    abstractKey: "pub3Abstract",
    yearKey: "year2023",
  },
] as const;

export function Research() {
  const t = useTranslations("research");

  return (
    <section id="research" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#ff7a1a] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            {t("label")}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            {t("title")}
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="space-y-6">
          {publications.map((pub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="glass-glow hover:border-[#ff7a1a]/20 hover:shadow-glow-orange transition-all duration-500 group">
                <CardContent className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-[#ff7a1a] text-xs font-medium tracking-wider uppercase">
                        {t(pub.typeKey)} · {t(pub.yearKey)}
                      </span>
                      <h3 className="mt-2 text-xl font-medium text-white group-hover:text-[#ff7a1a] transition-colors duration-300">
                        {t(pub.titleKey)}
                      </h3>
                      <p className="mt-1 text-zinc-500 text-sm">
                        {t(pub.journalKey)}
                      </p>
                      <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
                        {t(pub.abstractKey)}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="#">{t("readMore")}</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
