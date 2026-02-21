"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CinematicSection } from "@/components/effects/CinematicSection";

const postImages = [
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2069&auto=format&fit=crop",
];

export function Blog() {
  const t = useTranslations("blog");

  return (
    <CinematicSection id="blog" depthScale={0.015} parallaxY={8}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <div>
            <p className="text-accent text-xs font-medium tracking-[0.28em] uppercase mb-4">
              {t("label")}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-white">
              {t("title")}
            </h2>
            <p className="mt-4 text-zinc-400 max-w-xl">{t("subtitle")}</p>
          </div>
          <a
            href="#"
            className="text-accent text-sm font-medium hover:underline flex items-center gap-2 transition-colors"
          >
            {t("viewAll")}
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {([1, 2, 3] as const).map((i, idx) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              <Card className="glass-glow overflow-hidden group hover:border-white/12 transition-colors duration-300">
                <a href="#">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={postImages[idx]}
                      alt={t(`post${i}Title`)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <span className="text-zinc-400 text-xs">
                      {t(`post${i}Date`)} · {t(`post${i}ReadTime`)} {t("minRead")}
                    </span>
                    <h3 className="mt-2 text-lg font-medium text-white group-hover:text-accent transition-colors duration-200 line-clamp-2">
                      {t(`post${i}Title`)}
                    </h3>
                    <p className="mt-2 text-zinc-400 text-sm line-clamp-2">
                      {t(`post${i}Excerpt`)}
                    </p>
                  </CardContent>
                </a>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
