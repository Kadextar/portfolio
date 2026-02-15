"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const itemKeys = ["item1", "item2", "item3"] as const;

export function LeadershipRecognition() {
  const t = useTranslations("leadershipRecognition");

  return (
    <section
      id="leadershipRecognition"
      className="py-28 md:py-40 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <p className="text-accent text-xs font-medium tracking-[0.28em] uppercase mb-4">
            {t("label")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-normal text-white leading-tight tracking-tight">
            {t("title")}
          </h2>
        </motion.div>

        <ul className="space-y-0">
          {itemKeys.map((key, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex gap-6 md:gap-10 py-8 md:py-10 border-b border-white/[0.04] last:border-b-0"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-accent text-sm font-medium">
                {i + 1}
              </span>
              <div>
                <p className="text-lg md:text-xl font-light text-white leading-snug">
                  {t(key)}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
