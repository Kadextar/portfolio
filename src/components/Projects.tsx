"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CinematicSection } from "@/components/effects/CinematicSection";

export function Projects() {
  const t = useTranslations("projects");

  return (
    <CinematicSection id="projects" depthScale={0.015} parallaxY={8} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-[10px] font-medium tracking-[0.28em] uppercase block mb-3">
            {t("label")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
            {t("title")}
          </h2>
          <p className="mt-3 text-zinc-400 font-light text-sm md:text-base max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Asymmetrical 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Navoi Tourism Project */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass-bento p-8 relative overflow-hidden group flex flex-col md:flex-row gap-6 hover:border-accent/30 transition-all duration-500 hover:shadow-gold-glow"
          >
            {/* Soft decorative glow */}
            <div className="absolute top-0 left-0 w-[140px] h-[140px] rounded-full bg-accent/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Book Mockup Frame */}
            <div className="w-full md:w-[150px] shrink-0 flex justify-center items-center relative z-10">
              <div className="w-[120px] aspect-[3/4.2] rounded-xl overflow-hidden border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.6)] bg-white/5 relative group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="/projects/navoi-tourism-book.png"
                  alt="Navoi Tourism Book"
                  fill
                  className="object-cover pointer-events-none"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                {/* Fallback pattern in case image not found */}
                <div className="absolute inset-0 z-[-1] bg-gradient-to-tr from-accent/20 to-black flex items-center justify-center p-2 text-center text-[8px] text-zinc-500 font-mono">
                  Navoi Book
                </div>
              </div>
            </div>

            {/* Content (Right) */}
            <div className="flex-1 space-y-4 relative z-10 text-left">
              <div>
                <span className="text-[9px] text-accent font-medium tracking-[0.15em] uppercase block">
                  {t("navoiTag")}
                </span>
                <h3 className="text-lg font-display text-white font-normal mt-1 leading-snug">
                  {t("navoiTitle")}
                </h3>
              </div>
              
              <p className="text-zinc-400 font-light text-xs leading-relaxed">
                {t("navoiDesc")}
              </p>

              <div className="space-y-2.5 pt-1 text-[11px] font-light">
                <div>
                  <span className="text-zinc-500 font-medium block uppercase tracking-wider text-[8px]">{t("contextLabel")}</span>
                  <span className="text-zinc-300">{t("navoiProblem")}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium block uppercase tracking-wider text-[8px]">{t("roleLabel")}</span>
                  <span className="text-zinc-300">{t("navoiRole")}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium block uppercase tracking-wider text-[8px]">{t("outcomeLabel")}</span>
                  <span className="text-zinc-300">{t("navoiOutcome")}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SIES 95th Anniversary Book */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="glass-bento p-8 relative overflow-hidden group flex flex-col md:flex-row gap-6 hover:border-accent/30 transition-all duration-500 hover:shadow-gold-glow"
          >
            {/* Soft decorative glow */}
            <div className="absolute top-0 left-0 w-[140px] h-[140px] rounded-full bg-accent/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Book Mockup Frame */}
            <div className="w-full md:w-[150px] shrink-0 flex justify-center items-center relative z-10">
              <div className="w-[120px] aspect-[3/4.2] rounded-xl overflow-hidden border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.6)] bg-white/5 relative group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="/projects/samisi-95.png"
                  alt="SIES 95 Book"
                  fill
                  className="object-cover pointer-events-none"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 z-[-1] bg-gradient-to-tr from-accent/20 to-black flex items-center justify-center p-2 text-center text-[8px] text-zinc-500 font-mono">
                  SIES 95 Book
                </div>
              </div>
            </div>

            {/* Content (Right) */}
            <div className="flex-1 space-y-4 relative z-10 text-left">
              <div>
                <span className="text-[9px] text-accent font-medium tracking-[0.15em] uppercase block">
                  {t("samisiTag")}
                </span>
                <h3 className="text-lg font-display text-white font-normal mt-1 leading-snug">
                  {t("samisiTitle")}
                </h3>
              </div>
              
              <p className="text-zinc-400 font-light text-xs leading-relaxed">
                {t("samisiDesc")}
              </p>

              <div className="space-y-2.5 pt-1 text-[11px] font-light">
                <div>
                  <span className="text-zinc-500 font-medium block uppercase tracking-wider text-[8px]">{t("contextLabel")}</span>
                  <span className="text-zinc-300">{t("samisiProblem")}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium block uppercase tracking-wider text-[8px]">{t("roleLabel")}</span>
                  <span className="text-zinc-300">{t("samisiRole")}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-medium block uppercase tracking-wider text-[8px]">{t("outcomeLabel")}</span>
                  <span className="text-zinc-300">{t("samisiOutcome")}</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </CinematicSection>
  );
}
