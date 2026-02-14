"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const postImages = [
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2069&auto=format&fit=crop",
];

export function Blog() {
  const t = useTranslations("blog");

  return (
    <section id="blog" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-[#ff7a1a] text-sm font-medium tracking-[0.2em] uppercase mb-4">
              {t("label")}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white">
              {t("title")}
            </h2>
            <p className="mt-4 text-zinc-500 max-w-xl">{t("subtitle")}</p>
          </div>
          <a
            href="#"
            className="text-[#ff7a1a] text-sm font-medium hover:underline flex items-center gap-2"
          >
            {t("viewAll")}
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {([1, 2, 3] as const).map((i, idx) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="glass-glow overflow-hidden group hover:border-[#ff7a1a]/20 transition-all duration-500">
                <a href="#">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={postImages[idx]}
                      alt={t(`post${i}Title`)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <span className="text-zinc-500 text-xs">
                      {t(`post${i}Date`)} · {t(`post${i}ReadTime`)} {t("minRead")}
                    </span>
                    <h3 className="mt-2 text-lg font-medium text-white group-hover:text-[#ff7a1a] transition-colors line-clamp-2">
                      {t(`post${i}Title`)}
                    </h3>
                    <p className="mt-2 text-zinc-500 text-sm line-clamp-2">
                      {t(`post${i}Excerpt`)}
                    </p>
                  </CardContent>
                </a>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
