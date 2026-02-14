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
    <section id="experience" className="py-24 md:py-32 relative">
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

        <div className="max-w-3xl mx-auto space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-glow hover:border-[#ff7a1a]/20 transition-all duration-500 group">
                <CardContent className="p-8 flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#ff7a1a]/20 flex items-center justify-center group-hover:bg-[#ff7a1a]/30 transition-colors">
                    <span className="text-[#ff7a1a] font-medium text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[#ff7a1a] text-sm font-medium">
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
