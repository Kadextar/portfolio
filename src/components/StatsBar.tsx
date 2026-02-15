"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";
import { CinematicSection } from "@/components/effects/CinematicSection";

const statItems = [
  {
    type: "counter" as const,
    value: 8,
    suffix: "+",
    labelKey: "publications",
    duration: 1.8,
  },
  {
    type: "counter" as const,
    value: 3,
    suffix: " ",
    suffixKey: "months",
    labelKey: "experience",
    duration: 1.4,
  },
  {
    type: "counter" as const,
    value: 4,
    suffix: "",
    labelKey: "languages",
    duration: 1.2,
  },
  {
    type: "label" as const,
    labelKey: "focus",
  },
];

export function StatsBar() {
  const t = useTranslations("stats");

  return (
    <CinematicSection className="py-20 md:py-24" depthScale={0.01} parallaxY={6}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {statItems.map((stat, i) => (
            <motion.div
              key={stat.type === "counter" ? stat.labelKey : "focus"}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="space-y-2"
            >
              {stat.type === "counter" ? (
                <>
                  <div className="text-2xl md:text-3xl font-display font-normal text-accent tabular-nums">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={
                        stat.suffixKey ? stat.suffix + t(stat.suffixKey) : stat.suffix
                      }
                      duration={stat.duration}
                    />
                  </div>
                  <p className="text-xs md:text-sm text-zinc-500 uppercase tracking-wider">
                    {t(stat.labelKey)}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs md:text-sm font-medium text-accent">
                      <span aria-hidden className="text-base">◇</span>
                      {t(stat.labelKey)}
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
