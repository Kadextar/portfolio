"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

const focusKeys = ["focus1", "focus2", "focus3", "focus4", "focus5"] as const;
const tagKeys = ["tag1", "tag2", "tag3"] as const;

export function About() {
  const t = useTranslations("about");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.25], [24, -12]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.85, 1]);

  return (
    <section ref={ref} id="about" className="py-28 md:py-40 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div style={{ y, opacity }} className="space-y-8">
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-accent text-xs font-medium tracking-[0.28em] uppercase"
            >
              {t("label")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight"
            >
              {t("heading1")}
              <br />
              <span className="text-accent">{t("heading2")}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-zinc-400 leading-relaxed text-lg"
            >
              {t("para1")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-zinc-500 leading-relaxed"
            >
              {t("para2")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {tagKeys.map((key) => (
                <span
                  key={key}
                  className="px-4 py-2 glass rounded-md text-sm text-zinc-400 hover:text-accent transition-colors duration-200"
                >
                  {t(key)}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="glass-glow border-white/10 hover:border-white/15 transition-all duration-300 hover:translate-y-[-2px]">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-lg font-medium text-white mb-6">
                  {t("focusTitle")}
                </h3>
                <ul className="space-y-4">
                  {focusKeys.map((key) => (
                    <li key={key} className="flex items-center gap-3 text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
