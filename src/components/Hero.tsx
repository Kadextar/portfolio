"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const ROTATING_KEYS = ["rotatingWord1", "rotatingWord2", "rotatingWord3", "rotatingWord4"] as const;
const ROTATE_INTERVAL_MS = 2800;

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_KEYS.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const y = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.98]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-[min(60vw,480px)] h-[min(60vw,480px)] rounded-full bg-accent/[0.06] blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[20%] right-[5%] w-[min(50vw,400px)] h-[min(50vw,400px)] rounded-full bg-accent/[0.04] blur-[90px] animate-float-slower" />
        <div className="absolute top-[50%] left-[50%] w-[min(40vw,320px)] h-[min(40vw,320px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[80px]" />
      </div>
      <div
        className="absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-accent text-xs font-medium tracking-[0.3em] uppercase mb-8"
        >
          {t("subtitle")}
        </motion.p>

        <div className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-white leading-[0.95]">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {t("titleFirst")}
          </motion.span>
          <span className="block text-accent">{t("titleLast")}</span>
          <span className="block mt-2 min-h-[1.1em] inline-block overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="block text-accent/90 italic font-light"
              >
                {t(ROTATING_KEYS[wordIndex])}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-zinc-500 text-sm md:text-base font-medium tracking-wide"
        >
          {t("institution")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="max-w-2xl mx-auto mt-6 text-zinc-400 text-base md:text-lg font-light leading-relaxed"
        >
          {t("tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#research"
            className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-10 text-sm font-medium text-accent-foreground transition-all duration-300 hover:bg-accent-light hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("viewResearch")}
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/15 bg-white/5 px-10 text-sm font-medium text-white transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("getInTouch")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border border-white/10 flex justify-center pt-2">
            <div className="w-1 h-2 bg-accent/60 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
