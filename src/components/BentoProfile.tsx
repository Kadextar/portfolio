"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";

const focusKeys = ["focus1", "focus2", "focus3", "focus4", "focus5"] as const;
const tagKeys = ["tag1", "tag2", "tag3"] as const;

export function BentoProfile() {
  const tAbout = useTranslations("about");
  const tStats = useTranslations("stats");

  const statItems = [
    {
      value: 8,
      suffix: "+",
      label: tStats("publications"),
      duration: 1.8,
    },
    {
      value: 3,
      suffix: "",
      suffixKey: "months",
      label: tStats("experience"),
      duration: 1.4,
    },
    {
      value: 4,
      suffix: "",
      label: tStats("languages"),
      duration: 1.2,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Bio Bento Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-2 glass-bento p-8 md:p-10 relative overflow-hidden group"
      >
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-accent font-medium tracking-[0.28em] uppercase">
                {tAbout("label")}
              </span>
              <span className="inline-flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
              {tAbout("heading1")}{" "}
              <span className="text-accent italic font-light font-sans tracking-wide">
                {tAbout("heading2")}
              </span>
            </h2>

            <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              {tAbout("para1")}
            </p>
            <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              {tAbout("para2")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-4">
            {tagKeys.map((key) => (
              <span
                key={key}
                className="px-3.5 py-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] text-xs font-light text-zinc-300 hover:text-accent hover:border-accent/30 transition-all duration-300"
              >
                {tAbout(key)}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Bento Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="glass-bento p-8 relative overflow-hidden group flex flex-col justify-between"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-tech/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10 space-y-6 h-full flex flex-col justify-between">
          <div className="space-y-6">
            <span className="text-[10px] text-tech font-medium tracking-[0.28em] uppercase block">
              {tStats("focus")}
            </span>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 gap-6 pt-2">
              {statItems.map((stat, idx) => (
                <div key={idx} className="border-b border-white/[0.04] pb-4 last:border-0 last:pb-0">
                  <div className="text-3xl md:text-4xl font-display font-light text-accent flex items-baseline gap-1">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffixKey ? stat.suffix + " " + tStats(stat.suffixKey) : stat.suffix}
                      duration={stat.duration}
                    />
                  </div>
                  <span className="text-xs font-light text-zinc-400 uppercase tracking-wider block mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-center gap-2 rounded-full border border-tech/25 bg-tech/[0.03] px-3.5 py-2 text-xs font-light text-tech shadow-[0_0_15px_rgba(0,245,255,0.03)]">
              <span aria-hidden className="text-base text-tech animate-spin-slow">✦</span>
              {tStats("focus")}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
