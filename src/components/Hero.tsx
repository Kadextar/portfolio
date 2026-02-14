"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #080808 0%, #0c0b08 40%, #080808 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.p
            variants={item}
            className="text-accent text-xs font-medium tracking-[0.28em] uppercase"
          >
            {t("subtitle")}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white"
          >
            <span className="block">{t("titleFirst")}</span>
            <span className="block text-accent">{t("titleLast")}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-zinc-500 text-sm md:text-base font-medium tracking-wide"
          >
            {t("institution")}
          </motion.p>

          <motion.p
            variants={item}
            className="max-w-2xl mx-auto text-zinc-400 text-base md:text-lg font-light leading-relaxed"
          >
            {t("tagline")}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#research"
            className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-10 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-light"
          >
            {t("viewResearch")}
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/15 bg-white/5 px-10 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/10"
          >
            {t("getInTouch")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border border-white/15 flex justify-center pt-2">
            <div className="w-1 h-2 bg-accent/70 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
