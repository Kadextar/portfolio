"use client";

import { useTranslations } from "next-intl";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { StaggerText } from "@/components/effects/StaggerText";
import { CinematicSection } from "@/components/effects/CinematicSection";

const visionKeys = ["vision1", "vision2", "vision3", "vision4"] as const;

export function StrategicVision() {
  const t = useTranslations("strategicVision");

  return (
    <CinematicSection id="strategicVision" className="py-28 md:py-40" depthScale={0.02} parallaxY={14}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal className="text-center mb-24 md:mb-32" y={28}>
          <p className="text-accent text-xs font-medium tracking-[0.28em] uppercase mb-6">
            {t("label")}
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.1] tracking-tight">
            <StaggerText text={t("title")} as="words" stagger={0.06} asElement="span" className="inline" />
          </h2>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-16 md:gap-20 lg:gap-24">
          {visionKeys.map((key, i) => (
            <SectionReveal key={key} delay={i * 0.08} y={24} className="pl-6 md:pl-8">
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-white leading-snug">
                {t(key)}
              </p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
