"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { CinematicSection } from "@/components/effects/CinematicSection";

const experiences = [
  { roleKey: "role1", orgKey: "org1", periodKey: "period1", descKey: "desc1" },
] as const;

export function Experience() {
  const t = useTranslations("experience");

  return (
    <CinematicSection id="experience" depthScale={0.015} parallaxY={8}>
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
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-glow hover:border-white/12 transition-colors duration-300 group">
                <CardContent className="p-8 flex flex-col md:flex-row gap-8 md:gap-10">
                  <div className="flex-shrink-0 md:w-32 text-left">
                    <span className="text-accent text-sm font-medium">
                      {t(exp.periodKey)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 text-left md:border-l border-white/10 md:pl-10">
                    <h3 className="text-xl font-medium text-white">
                      {t(exp.orgKey)}
                    </h3>
                    <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
                      {t(exp.descKey)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
