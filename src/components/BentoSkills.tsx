"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { StackIcon, ToolIcon } from "@/components/SkillIcons";

const stackKeys = ["stack1", "stack2", "stack3", "stack4", "stack5", "stack6", "stack7", "stack8", "stack9", "stack10"] as const;
const toolKeys = ["tools1", "tools2", "tools3", "tools4", "tools5", "tools6", "tools7", "tools8"] as const;

const categories = [
  {
    titleKey: "cat1Title",
    icon: "📊",
    color: "group-hover:border-accent/30 group-hover:shadow-gold-glow",
    accentColor: "bg-accent/80",
    skillKeys: ["skill1_1", "skill1_2", "skill1_3", "skill1_4", "skill1_5"],
  },
  {
    titleKey: "cat2Title",
    icon: "🏨",
    color: "group-hover:border-tech/30 group-hover:shadow-cyan-glow",
    accentColor: "bg-tech/85",
    skillKeys: ["skill2_1", "skill2_2", "skill2_3", "skill2_4", "skill2_5"],
  },
  {
    titleKey: "cat3Title",
    icon: "🎯",
    color: "group-hover:border-accent/30 group-hover:shadow-gold-glow",
    accentColor: "bg-accent/80",
    skillKeys: ["skill3_1", "skill3_2", "skill3_3", "skill3_4", "skill3_5"],
  },
] as const;

export function BentoSkills() {
  const t = useTranslations("skills");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* 3 Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.titleKey}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`glass-bento p-6 relative overflow-hidden group flex flex-col justify-between min-h-[300px] border border-white/[0.04] transition-all duration-500 ${cat.color}`}
          >
            {/* Soft backdrop radial glow */}
            <div className={`absolute top-0 right-0 w-[120px] h-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${idx === 1 ? "bg-tech/5" : "bg-accent/5"} blur-[40px]`} />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-[8px] text-zinc-500 font-mono tracking-widest">[0{idx + 1}]</span>
              </div>

              <h4 className="text-base font-display text-white font-normal group-hover:text-accent transition-colors duration-300">
                {t(cat.titleKey)}
              </h4>

              <ul className="space-y-2.5 pt-2">
                {cat.skillKeys.map((skillKey, sIdx) => (
                  <motion.li
                    key={skillKey}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sIdx * 0.05 + 0.1 }}
                    className="text-xs font-light text-zinc-400 flex items-center gap-2 group/item hover:text-zinc-200 transition-colors"
                  >
                    <span className={`w-1 h-1 rounded-full flex-shrink-0 transition-transform duration-300 group-hover/item:scale-125 ${cat.accentColor}`} />
                    {t(skillKey)}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack & Platforms Grid */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="glass-bento p-8 relative overflow-hidden group border border-white/[0.04]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stacks */}
          <div className="space-y-4">
            <span className="text-[10px] text-accent font-medium tracking-[0.2em] uppercase block border-b border-white/[0.04] pb-2">
              {t("stackLabel")}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {stackKeys.map((key) => (
                <div
                  key={key}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:border-accent/20 hover:bg-accent/[0.02] p-3 text-center transition-all duration-300 hover:shadow-gold-glow group/stack select-none"
                >
                  <div className="group-hover/stack:scale-110 transition-transform duration-300">
                    <StackIcon id={key} />
                  </div>
                  <span className="text-[10px] font-light text-zinc-400 group-hover/stack:text-zinc-200 transition-colors truncate max-w-full">
                    {t(key)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div className="space-y-4">
            <span className="text-[10px] text-tech font-medium tracking-[0.2em] uppercase block border-b border-white/[0.04] pb-2">
              {t("toolsLabel")}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {toolKeys.map((key) => (
                <div
                  key={key}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:border-tech/20 hover:bg-tech/[0.02] p-3 text-center transition-all duration-300 hover:shadow-cyan-glow group/tool select-none"
                >
                  <div className="group-hover/tool:scale-110 transition-transform duration-300">
                    <ToolIcon id={key} />
                  </div>
                  <span className="text-[10px] font-light text-zinc-400 group-hover/tool:text-zinc-200 transition-colors truncate max-w-full">
                    {t(key)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
