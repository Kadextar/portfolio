"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const visionKeys = ["vision1", "vision2", "vision3", "vision4"] as const;

export function StrategicVision() {
  const t = useTranslations("strategicVision");

  return (
    <section
      id="strategicVision"
      className="py-32 md:py-44 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24 md:mb-32"
        >
          <p className="text-accent text-xs font-medium tracking-[0.28em] uppercase mb-6">
            {t("label")}
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.1] tracking-tight">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-20 lg:gap-24">
          {visionKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-l border-white/10 pl-8 md:pl-10"
            >
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-white leading-snug">
                {t(key)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
