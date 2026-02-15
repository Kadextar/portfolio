"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { gsap } from "gsap";
import { motionConfig } from "@/lib/motion";

const ROTATING_KEYS = ["rotatingWord1", "rotatingWord2", "rotatingWord3", "rotatingWord4"] as const;
const ROTATE_INTERVAL_MS = 3400;

/** Monumental headline — single clamp for scale, tight leading */
const HEADLINE_CLAMP = "clamp(3.25rem, 14vw + 2rem, 11rem)";
const HEADLINE_LEADING = 0.88;

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const rotatingWrapRef = useRef<HTMLDivElement>(null);
  const institutionRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [wordIndex, setWordIndex] = useState(0);
  const [timelineRan, setTimelineRan] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 22 });
  const scrollY = useTransform(scrollYProgress, [0, 0.5], [0, -56]);
  const combinedY = useTransform([smoothY, scrollY], ([sy, s]) => (sy as number) + (s as number));
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [1, 0.97]);

  // GSAP entry timeline — mask-based reveal + staggered entry
  useEffect(() => {
    if (!containerRef.current || timelineRan) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.65 },
          0
        );
      }

      if (line1Ref.current) {
        tl.fromTo(
          line1Ref.current,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.95, ease: "power3.out" },
          0.12
        );
      }
      if (line2Ref.current) {
        tl.fromTo(
          line2Ref.current,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.95, ease: "power3.out" },
          0.22
        );
      }
      if (rotatingWrapRef.current) {
        tl.fromTo(
          rotatingWrapRef.current,
          { opacity: 0, filter: "blur(14px)", y: 8 },
          { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.85 },
          0.5
        );
      }
      if (institutionRef.current) {
        tl.fromTo(
          institutionRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.55 },
          0.9
        );
      }
      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          1.05
        );
      }
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          1.2
        );
      }
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          1.55
        );
      }
    }, containerRef);
    setTimelineRan(true);
    return () => ctx.revert();
  }, [timelineRan]);

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
      mouseX.set(normX * 16);
      mouseY.set(normY * 16);
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
      {/* Ambient orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[12%] left-[8%] w-[min(55vw,420px)] h-[min(55vw,420px)] rounded-full bg-accent/[0.07] blur-[110px] animate-float-slow" />
        <div className="absolute bottom-[18%] right-[6%] w-[min(48vw,380px)] h-[min(48vw,380px)] rounded-full bg-accent/[0.05] blur-[100px] animate-float-slower" />
        <div className="absolute top-[48%] left-[50%] w-[min(38vw,300px)] h-[min(38vw,300px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[85px]" />
      </div>
      <div
        className="absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        ref={containerRef}
        style={{
          x: smoothX,
          y: combinedY,
          opacity,
          scale,
        }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center"
      >
        <p
          ref={subtitleRef}
          className="text-accent text-[11px] font-medium tracking-[0.32em] uppercase mb-8 sm:mb-10 opacity-0"
        >
          {t("subtitle")}
        </p>

        <div
          className="font-display font-normal tracking-tight text-white overflow-hidden"
          style={{
            fontSize: HEADLINE_CLAMP,
            lineHeight: HEADLINE_LEADING,
          }}
        >
          {/* Line 1: first name — mask reveal */}
          <div className="overflow-hidden leading-none">
            <span ref={line1Ref} className="block will-change-transform" style={{ transform: "translateY(100%)" }}>
              {t("titleFirst")}
            </span>
          </div>
          {/* Line 2: last name — mask reveal */}
          <div className="overflow-hidden leading-none">
            <span ref={line2Ref} className="block text-accent will-change-transform" style={{ transform: "translateY(100%)" }}>
              {t("titleLast")}
            </span>
          </div>
          {/* Rotating keyword — blur to sharp + subtle vertical shift */}
          <div ref={rotatingWrapRef} className="mt-2 sm:mt-3 min-h-[1.1em] overflow-hidden opacity-0">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, filter: "blur(12px)", y: 6 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(10px)", y: -4 }}
                transition={{
                  duration: 0.65,
                  ease: motionConfig.ease.default,
                  exit: { duration: 0.35 },
                }}
                className="block text-accent/95 italic font-light"
              >
                {t(ROTATING_KEYS[wordIndex])}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <p
          ref={institutionRef}
          className="mt-10 sm:mt-12 text-zinc-500 text-sm md:text-base font-medium tracking-wide opacity-0"
        >
          {t("institution")}
        </p>

        <p
          ref={taglineRef}
          className="max-w-2xl mx-auto mt-6 text-zinc-400 text-[15px] md:text-base font-light leading-relaxed opacity-0"
        >
          {t("tagline")}
        </p>

        <div
          ref={ctaRef}
          className="mt-24 sm:mt-28 flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0"
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
        </div>

        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-14 left-1/2 -translate-x-1/2 opacity-0"
        >
          <div className="w-6 h-10 rounded-full border border-white/10 flex justify-center pt-2">
            <div className="w-1 h-2 bg-accent/60 rounded-full" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
