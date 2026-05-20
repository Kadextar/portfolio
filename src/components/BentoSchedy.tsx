"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaApple } from "react-icons/fa";

export function BentoSchedy() {
  const t = useTranslations("projects");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-bento p-8 md:p-10 relative overflow-hidden group min-h-[480px] grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
    >
      {/* Dynamic backdrop neon glow */}
      <div className="absolute top-[10%] right-[10%] w-[250px] h-[250px] rounded-full bg-tech/5 blur-[80px] group-hover:bg-tech/10 transition-colors duration-700 pointer-events-none" />

      {/* Schedy Project Copy (Left) */}
      <div className="md:col-span-7 flex flex-col justify-between h-full space-y-6 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-tech/10 text-tech border border-tech/20 shadow-[0_0_15px_rgba(0,245,255,0.08)] font-display font-medium text-base">
              S
            </span>
            <div>
              <span className="text-[10px] text-tech font-medium tracking-[0.2em] uppercase block">
                {t("schedyTag")}
              </span>
              <h3 className="text-2xl font-display text-white font-normal mt-0.5">
                {t("schedyTitle")}
              </h3>
            </div>
          </div>

          <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
            {t("schedyDesc")}
          </p>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-light text-zinc-400">
              <span className="text-tech/90 font-medium block uppercase tracking-wider mb-1">{t("contextLabel")}</span>
              <p className="text-zinc-300 font-light leading-relaxed">{t("schedyProblem")}</p>
            </div>
            <div className="text-xs font-light text-zinc-400">
              <span className="text-accent font-medium block uppercase tracking-wider mb-1">{t("roleLabel")}</span>
              <p className="text-zinc-300 font-light leading-relaxed">{t("schedyRole")}</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <span className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 hover:border-tech/30 px-6 py-3 text-xs font-light text-white shadow-bento hover:shadow-cyan-glow transition-all duration-300 group/btn select-none">
            <FaApple className="text-base text-tech group-hover/btn:scale-110 transition-transform duration-300" />
            <div className="text-left">
              <span className="text-[8px] text-zinc-400 block uppercase tracking-wider leading-none">Download</span>
              <span className="text-xs font-normal leading-normal">{t("schedyCta")}</span>
            </div>
          </span>
        </div>
      </div>

      {/* Interactive iPhone Simulator (Right) */}
      <div className="md:col-span-5 flex justify-center items-center relative z-10 w-full">
        <div className="w-[200px] h-[400px] rounded-[36px] bg-[#0c0c0d] border-4 border-zinc-800 p-2 relative overflow-hidden shadow-2xl group-hover:border-tech/20 transition-colors duration-500 flex flex-col justify-between">
          
          {/* Dynamic Island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[70px] h-[16px] rounded-full bg-[#000] z-20 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-blue-900/50 absolute right-4" />
          </div>

          {/* App Header */}
          <div className="pt-4 px-1.5 flex items-center justify-between border-b border-white/[0.04] pb-2">
            <span className="text-[9px] font-bold text-white tracking-wide">Schedy</span>
            <span className="text-[8px] font-light text-tech animate-pulse">● AI Sync</span>
          </div>

          {/* Scrolling Agenda Simulator */}
          <div className="flex-1 py-3 px-1 space-y-2 overflow-y-auto no-scrollbar scroll-smooth">
            {/* Calendar Widget */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-2 space-y-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              <span className="text-[7px] text-zinc-400 uppercase tracking-wider block font-light">{"Today's Schedule"}</span>
              <div className="space-y-1">
                <div className="flex items-center justify-between p-1 rounded bg-tech/[0.04] border-l-2 border-tech">
                  <span className="text-[8px] font-light text-zinc-200">10:00 - Macroeconomics</span>
                  <span className="text-[6px] text-tech px-1 rounded bg-tech/10">Room 304</span>
                </div>
                <div className="flex items-center justify-between p-1 rounded bg-accent/[0.04] border-l-2 border-accent">
                  <span className="text-[8px] font-light text-zinc-200">13:30 - Hospitality Law</span>
                  <span className="text-[6px] text-accent px-1 rounded bg-accent/10">Online</span>
                </div>
              </div>
            </div>

            {/* AI assistant Simulator */}
            <div className="rounded-xl bg-tech/[0.03] border border-tech/10 p-2 space-y-1.5 shadow-sm">
              <div className="flex items-center gap-1">
                <span className="text-[7px] text-tech animate-spin-slow">✦</span>
                <span className="text-[7px] text-zinc-400 font-light">Schedy AI Copilot</span>
              </div>
              <div className="text-[7px] text-zinc-300 font-light leading-normal bg-black/40 p-1.5 rounded">
                {"\"Hi Azamat! I analyzed your Hospitality syllabus. Let's schedule study sessions for the 3 research deadlines this month.\""}
              </div>
            </div>

            {/* Progress Circle Widget */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-2 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[7px] text-zinc-400 block font-light">Task Progress</span>
                <span className="text-[9px] font-medium text-white">84% completed</span>
              </div>
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="16" cy="16" r="12" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" fill="transparent" />
                  <circle cx="16" cy="16" r="12" stroke="#00f5ff" strokeWidth="2.5" fill="transparent" strokeDasharray="75" strokeDashoffset="12" className="animate-float" />
                </svg>
                <span className="absolute text-[7px] text-zinc-300 font-medium font-mono">84</span>
              </div>
            </div>
          </div>

          {/* Custom iOS Bottom Home Bar */}
          <div className="w-[80px] h-[3px] rounded-full bg-zinc-700 mx-auto my-1.5" />
        </div>
      </div>
    </motion.div>
  );
}
