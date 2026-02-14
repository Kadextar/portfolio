"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const projectTagKeys = [
  ["tagResearch", "tagDataAnalysis", "tagUX"],
  ["tagSustainability", "tagFieldResearch", "tagReport"],
  ["tagFramework", "tagStandards", "tagConsulting"],
] as const;

const images = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
];

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="py-24 md:py-32 relative">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {([1, 2, 3] as const).map((i, idx) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="glass-glow overflow-hidden group hover:border-[#ff7a1a]/20 hover:shadow-glow-orange transition-all duration-500">
                <a href="#">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={images[idx]}
                      alt={t(`proj${i}Title`)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-white group-hover:text-[#ff7a1a] transition-colors duration-300">
                      {t(`proj${i}Title`)}
                    </h3>
                    <p className="mt-2 text-zinc-500 text-sm leading-relaxed">
                      {t(`proj${i}Desc`)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {projectTagKeys[idx].map((tagKey) => (
                        <span
                          key={tagKey}
                          className="px-3 py-1 text-xs rounded-full glass text-zinc-400"
                        >
                          {t(tagKey)}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
