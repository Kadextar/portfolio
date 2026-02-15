"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { MagneticButton } from "@/components/effects/MagneticButton";

const ROTATING_KEYS = ["rotatingWord1", "rotatingWord2", "rotatingWord3", "rotatingWord4"] as const;
const ROTATE_INTERVAL_MS = 3200;

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const scrollY = useTransform(scrollYProgress, [0, 0.5], [0, -48]);
  const combinedY = useTransform([smoothY, scrollY], ([sy, s]) => (sy as number) + (s as number));
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [1, 0.98]);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_KEYS.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = (e.clientX - centerX) / (rect.width / 2);
      const normY = (e.clientY - centerY) / (rect.height / 2);
      mouseX.set(normX * 14);
      mouseY.set(normY * 14);
    };
    const handleLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Floating background gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[12%] left-[8%] w-[min(55vw,420px)] h-[min(55vw,420px)] rounded-full bg-accent/[0.07] blur-[110px] animate-float-slow" />
        <div className="absolute bottom-[18%] right-[6%] w-[min(48vw,380px)] h-[min(48vw,380px)] rounded-full bg-accent/[0.05] blur-[100px] animate-float-slower" />
        <div className="absolute top-[48%] left-[50%] w-[min(38vw,300px)] h-[min(38vw,300px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[85px]" />
      </div>
      {/* Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      {/* Hero noise overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        style={{
          x: smoothX,
          y: combinedY,
          opacity,
          scale,
        }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-accent text-[11px] font-medium tracking-[0.32em] uppercase mb-10"
        >
          {t("subtitle")}
        </motion.p>

        <div
          className="font-display font-normal tracking-tight text-white leading-[0.92]"
          style={{
            fontSize: "clamp(2.75rem, 8vw + 2rem, 7.5rem)",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {t("titleFirst")}
          </motion.span>
          <span className="block text-accent">{t("titleLast")}</span>
          <span className="block mt-3 min-h-[1.15em] inline-block overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, filter: "blur(12px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  exit: { duration: 0.4 },
                }}
                className="block text-accent/95 italic font-light"
              >
                {t(ROTATING_KEYS[wordIndex])}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 text-zinc-500 text-sm md:text-base font-medium tracking-wide"
        >
          {t("institution")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-2xl mx-auto mt-6 text-zinc-400 text-[15px] md:text-base font-light leading-relaxed"
        >
          {t("tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-28 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton
            as="a"
            href="#research"
            className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-md bg-accent px-10 text-sm font-medium text-accent-foreground transition-colors duration-300 hover:bg-accent-light"
          >
            {t("viewResearch")}
          </MagneticButton>
          <a
            href="#contact"
            className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-md border border-white/15 bg-white/5 px-10 text-sm font-medium text-white transition-colors duration-300 hover:border-white/25 hover:bg-white/10"
          >
            {t("getInTouch")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15 }}
          className="absolute bottom-14 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border border-white/10 flex justify-center pt-2">
            <div className="w-1 h-2 bg-accent/60 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
