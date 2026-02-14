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

  const y = useTransform(scrollYProgress, [0, 0.3], [80, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.6, 1]);

  return (
    <section ref={ref} id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y, opacity }} className="space-y-6">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#ff7a1a] text-sm font-medium tracking-[0.2em] uppercase"
            >
              {t("label")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl md:text-5xl font-light text-white leading-tight"
            >
              {t("heading1")}
              <br />
              <span className="text-[#ff7a1a]">{t("heading2")}</span>
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
                  className="px-4 py-2 glass-glow rounded-full text-sm text-zinc-300 hover:border-[#ff7a1a]/30 hover:text-[#ff7a1a] transition-all duration-300"
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
            <Card className="glass-glow border-white/10 hover:border-[#ff7a1a]/20 hover:shadow-glow-orange transition-all duration-500">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-lg font-medium text-white mb-6">
                  {t("focusTitle")}
                </h3>
                <ul className="space-y-4">
                  {focusKeys.map((key, i) => (
                    <li key={key} className="flex items-center gap-3 text-zinc-400 group">
                      <span className="w-2 h-2 rounded-full bg-[#ff7a1a] flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
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
