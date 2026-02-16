"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { CinematicSection } from "@/components/effects/CinematicSection";
import { StackIcon, ToolIcon } from "@/components/SkillIcons";

const stackKeys = ["stack1", "stack2", "stack3", "stack4", "stack5", "stack6", "stack7", "stack8", "stack9", "stack10"] as const;
const toolKeys = ["tools1", "tools2", "tools3", "tools4", "tools5", "tools6", "tools7", "tools8"] as const;

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

const cardClass =
  "flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 hover:border-white/15 hover:bg-white/[0.06] transition-colors";

export function Skills() {
  const t = useTranslations("skills");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <CinematicSection id="skills" depthScale={0.015} parallaxY={8}>
      <div className="max-w-7xl mx-auto px-6">
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

        {/* 3-column categories first */}
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
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {categories.map((category, i) => (
            <motion.div
              key={category.titleKey}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
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
                  borderColor:
                    hoveredIndex === i
                      ? "rgba(255, 255, 255, 0.14)"
                      : "rgba(255, 255, 255, 0.08)",
                }}
                transition={{ duration: 0.25 }}
                className="glass-glow rounded-xl p-8 h-full"
              >
                <div className="text-3xl mb-6">
                  {category.icon}
                </div>
                <h3 className="text-lg font-medium text-accent mb-6">
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
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/80 flex-shrink-0" />
                      {t(skillKey)}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stack & tools — after tables, card-style with icons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <section>
            <p className="text-zinc-500 text-xs font-medium tracking-[0.2em] uppercase mb-4">
              {t("stackLabel")}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stackKeys.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className={cardClass}
                >
                  <StackIcon id={key} />
                  <span className="text-zinc-300 text-sm font-medium truncate">
                    {t(key)}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-zinc-500 text-xs font-medium tracking-[0.2em] uppercase mb-4">
              {t("toolsLabel")}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {toolKeys.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.03 }}
                  className={cardClass}
                >
                  <ToolIcon id={key} />
                  <span className="text-zinc-400 text-sm font-medium truncate">
                    {t(key)}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </CinematicSection>
  );
}
