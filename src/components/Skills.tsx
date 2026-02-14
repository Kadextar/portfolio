"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

const categories = [
  {
    titleKey: "cat1Title",
    icon: "📊",
    skillKeys: ["skill1_1", "skill1_2", "skill1_3", "skill1_4", "skill1_5"],
  },
  {
    titleKey: "cat2Title",
    icon: "🏨",
    skillKeys: ["skill2_1", "skill2_2", "skill2_3", "skill2_4", "skill2_5"],
  },
  {
    titleKey: "cat3Title",
    icon: "🎯",
    skillKeys: ["skill3_1", "skill3_2", "skill3_3", "skill3_4", "skill3_5"],
  },
] as const;

export function Skills() {
  const t = useTranslations("skills");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
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

        <motion.div
          ref={containerRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
          className="grid md:grid-cols-3 gap-8"
        >
          {categories.map((category, i) => (
            <motion.div
              key={category.titleKey}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
            >
              <motion.div
                animate={{
                  scale: hoveredIndex === i ? 1.02 : 1,
                  borderColor:
                    hoveredIndex === i
                      ? "rgba(255, 122, 26, 0.3)"
                      : "rgba(255, 255, 255, 0.1)",
                  boxShadow:
                    hoveredIndex === i
                      ? "0 0 40px rgba(255, 122, 26, 0.15)"
                      : "none",
                }}
                transition={{ duration: 0.3 }}
                className="glass-glow rounded-2xl p-8 h-full"
              >
                <motion.div
                  animate={{ rotate: hoveredIndex === i ? 5 : 0 }}
                  className="text-3xl mb-6"
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-lg font-medium text-[#ff7a1a] mb-6">
                  {t(category.titleKey)}
                </h3>
                <ul className="space-y-3">
                  {category.skillKeys.map((skillKey, j) => (
                    <motion.li
                      key={skillKey}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * j }}
                      className="text-zinc-400 text-sm flex items-center gap-2 group"
                    >
                      <motion.span
                        animate={{
                          scale: hoveredIndex === i ? 1.5 : 1,
                          backgroundColor:
                            hoveredIndex === i
                              ? "rgba(255, 122, 26, 1)"
                              : "rgba(255, 122, 26, 0.6)",
                        }}
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      />
                      {t(skillKey)}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
