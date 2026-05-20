"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { gsap } from "gsap";
import { motionConfig } from "@/lib/motion";
import { trackEvent, PlausibleEvents } from "@/lib/plausible";

const ROTATING_KEYS = ["rotatingWord1", "rotatingWord2", "rotatingWord3", "rotatingWord4"] as const;
const ROTATE_INTERVAL_MS = 3400;

/** На мобиле — мелче, чтобы длинное «Гостеприимство» в одну строку; на десктопе — крупнее */
const HEADLINE_LEADING = 0.88;

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const rotatingWrapRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [wordIndex, setWordIndex] = useState(0);
  const [timelineRan, setTimelineRan] = useState(false);
  const [forceReveal, setForceReveal] = useState(false);
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

  // Fallback: if GSAP doesn’t reveal content (e.g. refs not ready), show after 1.8s
  useEffect(() => {
    const t = setTimeout(() => setForceReveal(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const gsapRevertRef = useRef<(() => void) | null>(null);

  // GSAP entry timeline — mask-based reveal + staggered entry (defer so refs are set)
  useEffect(() => {
    if (timelineRan) return;
    const id = setTimeout(() => {
      if (!containerRef.current || timelineRan) return;
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (subtitleRef.current) {
          tl.fromTo(subtitleRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.65 }, 0);
        }
        if (rotatingWrapRef.current) {
          tl.fromTo(rotatingWrapRef.current, { opacity: 0, filter: "blur(14px)", y: 8 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.95, ease: "power3.out" }, 0.2);
        }
        if (taglineRef.current) {
          tl.fromTo(taglineRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.05);
        }
        if (ctaRef.current) {
          tl.fromTo(ctaRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 1.2);
        }
        if (scrollIndicatorRef.current) {
          tl.fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.55);
        }
      }, containerRef);
      gsapRevertRef.current = () => ctx.revert();
      setTimelineRan(true);
    }, 50);
    return () => {
      clearTimeout(id);
      gsapRevertRef.current?.();
      gsapRevertRef.current = null;
    };
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
      className="relative min-h-screen flex items-center justify-center overflow-x-hidden px-4 sm:px-6"
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[12%] left-[8%] w-[min(55vw,420px)] h-[min(55vw,420px)] rounded-full bg-[#e5c483]/[0.05] blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[18%] right-[6%] w-[min(48vw,380px)] h-[min(48vw,380px)] rounded-full bg-[#00f5ff]/[0.03] blur-[110px] animate-float-slower" />
        <div className="absolute top-[48%] left-[50%] w-[min(38vw,300px)] h-[min(38vw,300px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[85px]" />
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
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
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
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12 text-center min-w-0"
      >
        <p
          ref={subtitleRef}
          className={`text-accent text-[10px] sm:text-xs font-medium tracking-[0.28em] uppercase mb-6 sm:mb-8 break-words ${forceReveal ? "" : "opacity-0"}`}
        >
          {t("subtitle")}
        </p>

        {/* Name explicitly added here */}
        <h1 
          className={`font-display text-5xl sm:text-6xl md:text-7xl text-white font-light tracking-wide mb-8 ${forceReveal ? "" : "opacity-0"}`}
        >
          Azamat Satullaev
        </h1>

        {/* Main headline: одно слово в одну строку (на телефоне — мелче, чтобы не переносилось) */}
        <div
          ref={rotatingWrapRef}
          className={`font-display font-normal tracking-tight min-h-[1.2em] overflow-visible text-[3.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[7rem] ${forceReveal ? "" : "opacity-0"}`}
          style={{ lineHeight: HEADLINE_LEADING }}
        >
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
              className="block text-accent/95 italic font-light whitespace-nowrap drop-shadow-[0_0_20px_rgba(229,196,131,0.15)]"
            >
              {t(ROTATING_KEYS[wordIndex])}
            </motion.span>
          </AnimatePresence>
        </div>

        <p
          ref={taglineRef}
          className={`max-w-2xl mx-auto mt-10 sm:mt-12 text-zinc-400 text-[15px] md:text-base font-light leading-relaxed break-words px-1 ${forceReveal ? "" : "opacity-0"}`}
        >
          {t("tagline")}
        </p>

        <div
          ref={ctaRef}
          className={`mt-16 sm:mt-20 flex flex-col sm:flex-row justify-center items-center gap-4 ${forceReveal ? "" : "opacity-0"}`}
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent(PlausibleEvents.ResumeClicked)}
            className="inline-flex h-12 w-full sm:w-auto min-w-[150px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-10 text-sm font-light text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20"
          >
            {t("resume")}
          </a>
          <Link
            href="/contact"
            onClick={() => trackEvent(PlausibleEvents.ContactCTA)}
            className="inline-flex h-12 w-full sm:w-auto min-w-[150px] items-center justify-center rounded-xl bg-accent px-10 text-sm font-medium text-black transition-all duration-300 shadow-gold-glow hover:bg-accent/80 hover:shadow-[0_0_25px_rgba(229,196,131,0.25)]"
          >
            {t("getInTouch")}
          </Link>
        </div>

        {/* Modified scroll indicator positioning so it doesn't overlap on small screens */}
        <div
          ref={scrollIndicatorRef}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block ${forceReveal ? "" : "opacity-0"}`}
        >
          <div className="w-6 h-10 rounded-full border border-white/10 flex justify-center pt-2">
            <div className="w-1 h-2 bg-accent/60 rounded-full" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
