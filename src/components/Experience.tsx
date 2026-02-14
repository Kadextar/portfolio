"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

const experiences = [
  { roleKey: "role1", orgKey: "org1", periodKey: "period1", descKey: "desc1" },
  { roleKey: "role2", orgKey: "org2", periodKey: "period2", descKey: "desc2" },
  { roleKey: "role3", orgKey: "org3", periodKey: "period3", descKey: "desc3" },
] as const;

export function Experience() {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="section-gradient-accent py-28 md:py-40 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
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
                <CardContent className="p-8 flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-medium text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-accent text-sm font-medium">
                      {t(exp.periodKey)}
                    </span>
                    <h3 className="text-xl font-medium text-white mt-1">
                      {t(exp.roleKey)}
                    </h3>
                    <p className="text-zinc-500 text-sm">{t(exp.orgKey)}</p>
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
    </section>
  );
}
