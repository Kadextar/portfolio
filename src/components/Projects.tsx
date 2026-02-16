"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { CinematicSection } from "@/components/effects/CinematicSection";

const projectKeys = ["schedy", "kadextar"] as const;

export function Projects() {
  const t = useTranslations("projects");

  return (
    <CinematicSection id="projects" depthScale={0.015} parallaxY={8}>
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projectKeys.map((key, idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              <Card className="glass-glow group hover:border-white/12 transition-colors duration-300 h-full">
                <CardContent className="p-8">
                  <span className="text-accent text-xs font-medium tracking-wide uppercase">
                    {t(`${key}Tag`)}
                  </span>
                  <h3 className="mt-2 text-xl font-medium text-white group-hover:text-accent transition-colors duration-200">
                    {t(`${key}Title`)}
                  </h3>
                  <p className="mt-4 text-zinc-500 text-sm leading-relaxed">
                    {t(`${key}Desc`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
