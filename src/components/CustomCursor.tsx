"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { motionConfig } from "@/lib/motion";

/** Interactive elements: links, buttons, form controls, and explicit markers */
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], [role='link'], input, select, textarea, [data-cursor-hover]";
/** Optional: stronger magnetic pull */
const MAGNETIC_SELECTOR = "[data-cursor-magnetic]";
const SECTION_SELECTOR = "section[id]";

const { cursor: cursorConfig } = motionConfig;

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const glowRaw = useMotionValue(1);

  const { cursorSpring, trailSpring, innerSpring, magneticStrength, magneticMargin, glowRange } =
    cursorConfig;

  const x = useSpring(mouseX, cursorSpring);
  const y = useSpring(mouseY, cursorSpring);
  const trailX = useSpring(mouseX, trailSpring);
  const trailY = useSpring(mouseY, trailSpring);
  const innerX = useSpring(mouseX, innerSpring);
  const innerY = useSpring(mouseY, innerSpring);
  const glow = useSpring(glowRaw, { stiffness: 80, damping: 22 });

  const trailShadow = useTransform(
    glow,
    (v) => `0 0 28px 10px rgba(201, 162, 39, ${0.12 * v})`
  );
  const ringShadow = useTransform(
    glow,
    (v) =>
      `0 0 14px 4px rgba(201, 162, 39, ${0.32 * v}), 0 0 32px 12px rgba(201, 162, 39, ${0.08 * v})`
  );

  const checkTouch = useCallback(() => {
    return (
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0)
    );
  }, []);

  useEffect(() => {
    setMounted(true);
    setIsTouch(checkTouch());
  }, [checkTouch]);

  useEffect(() => {
    if (!mounted || isTouch) return;

    const getMagneticStrength = (el: HTMLElement) => {
      return el.matches(MAGNETIC_SELECTOR) ? Math.min(0.45, magneticStrength + 0.12) : magneticStrength;
    };

    const handleMove = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = el?.closest?.(INTERACTIVE_SELECTOR) as HTMLElement | null;

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const margin = magneticMargin;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const halfW = rect.width / 2 + margin;
        const halfH = rect.height / 2 + margin;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const inBounds = Math.abs(dx) <= halfW && Math.abs(dy) <= halfH;
        if (inBounds) {
          const strength = getMagneticStrength(interactive);
          const dist = Math.hypot(dx, dy);
          const maxDist = Math.hypot(halfW, halfH);
          const falloff = maxDist > 0 ? 1 - 0.4 * Math.min(1, dist / maxDist) : 1;
          const blend = strength * falloff;
          mouseX.set(e.clientX * (1 - blend) + cx * blend);
          mouseY.set(e.clientY * (1 - blend) + cy * blend);
        } else {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
        }
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest?.(INTERACTIVE_SELECTOR)) setIsHover(true);
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = (e.relatedTarget as HTMLElement) ?? null;
      if (
        !target?.closest?.(INTERACTIVE_SELECTOR) &&
        !related?.closest?.(INTERACTIVE_SELECTOR)
      ) {
        setIsHover(false);
      }
    };

    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    document.body.style.cursor = "none";
    document.body.classList.add("custom-cursor-active");
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);

    return () => {
      document.body.style.cursor = "";
      document.body.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
    };
  }, [
    mounted,
    isTouch,
    mouseX,
    mouseY,
    magneticStrength,
    magneticMargin,
  ]);

  const sectionRef = useRef<Set<Element>>(new Set());
  const glowRangeMin = glowRange[0];
  const glowRangeMax = glowRange[1];

  useEffect(() => {
    if (!mounted || isTouch || typeof document === "undefined") return;

    const sections = Array.from(document.querySelectorAll(SECTION_SELECTOR));
    if (sections.length === 0) return;

    const maxIndex = sections.length - 1;

    const updateGlow = () => {
      let bestRatio = 0;
      let bestIndex = 0;
      const vh = window.innerHeight;
      sections.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
        const ratio = visible / (rect.height || 1);
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestIndex = idx;
        }
      });
      const t = maxIndex > 0 ? 1 - bestIndex / maxIndex : 1;
      const value = glowRangeMin + t * (glowRangeMax - glowRangeMin);
      glowRaw.set(value);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionRef.current.add(entry.target);
          } else {
            sectionRef.current.delete(entry.target);
          }
        });
        updateGlow();
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: "0px" }
    );

    sections.forEach((s) => observer.observe(s));
    updateGlow();

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateGlow();
        rafId = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      sections.forEach((s) => observer.unobserve(s));
      sectionRef.current.clear();
    };
  }, [mounted, isTouch, glowRaw, glowRangeMin, glowRangeMax]);

  if (!mounted || isTouch) return null;

  const outerScale = isPressed ? (isHover ? 2.2 : 0.82) : isHover ? 2.9 : 1;
  const innerScale = isPressed ? 0.9 : 1;

  return (
    <>
      {/* Trail — soft amber glow, section-driven intensity */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-0 w-0"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-accent/25"
          style={{
            width: 28,
            height: 28,
            boxShadow: trailShadow,
          }}
        />
      </motion.div>

      {/* Outer ring — amber glow, section-driven intensity, expands on hover */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-0 w-0"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.span
          className="block rounded-full bg-accent/85"
          animate={{ scale: outerScale }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          style={{
            width: 10,
            height: 10,
            boxShadow: ringShadow,
          }}
        />
      </motion.div>

      {/* Inner dot — precise, snappier */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-0 w-0"
        style={{
          x: innerX,
          y: innerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.span
          className="block rounded-full bg-white"
          animate={{ scale: innerScale }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            width: 3,
            height: 3,
            boxShadow: "0 0 0 1px rgba(201, 162, 39, 0.2)",
          }}
        />
      </motion.div>
    </>
  );
}
