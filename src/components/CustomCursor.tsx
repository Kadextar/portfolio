"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], [data-cursor-hover]";
const MAGNETIC_STRENGTH = 0.32;

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const cursorSpring = { stiffness: 520, damping: 32 };
  const trailSpring = { stiffness: 120, damping: 22 };
  const innerSpring = { stiffness: 600, damping: 35 };

  const x = useSpring(mouseX, cursorSpring);
  const y = useSpring(mouseY, cursorSpring);
  const trailX = useSpring(mouseX, trailSpring);
  const trailY = useSpring(mouseY, trailSpring);
  const innerX = useSpring(mouseX, innerSpring);
  const innerY = useSpring(mouseY, innerSpring);

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

    const handleMove = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = el?.closest?.(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const blend = MAGNETIC_STRENGTH;
        mouseX.set(e.clientX * (1 - blend) + cx * blend);
        mouseY.set(e.clientY * (1 - blend) + cy * blend);
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
      if (!target?.closest?.(INTERACTIVE_SELECTOR) && !related?.closest?.(INTERACTIVE_SELECTOR)) {
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
  }, [mounted, isTouch, mouseX, mouseY]);

  if (!mounted || isTouch) return null;

  const outerScale = isPressed ? (isHover ? 2.2 : 0.82) : isHover ? 2.9 : 1;
  const innerScale = isPressed ? 0.9 : 1;

  return (
    <>
      {/* Trail — soft amber glow, lagging */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-0 w-0"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className="rounded-full bg-accent/25"
          style={{
            width: 28,
            height: 28,
            boxShadow: "0 0 28px 10px rgba(201, 162, 39, 0.12)",
          }}
        />
      </motion.div>

      {/* Outer ring — amber glow, expands on hover, shrinks on click */}
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
            boxShadow:
              "0 0 14px 4px rgba(201, 162, 39, 0.32), 0 0 32px 12px rgba(201, 162, 39, 0.08)",
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
