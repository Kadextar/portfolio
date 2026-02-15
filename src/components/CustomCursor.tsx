"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], [data-cursor-hover]";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // assume touch until we know

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const cursorSpring = { stiffness: 500, damping: 28 };
  const trailSpring = { stiffness: 150, damping: 20 };

  const x = useSpring(mouseX, cursorSpring);
  const y = useSpring(mouseY, cursorSpring);
  const trailX = useSpring(mouseX, trailSpring);
  const trailY = useSpring(mouseY, trailSpring);

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
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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

    document.body.style.cursor = "none";
    document.body.classList.add("custom-cursor-active");
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.body.style.cursor = "";
      document.body.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [mounted, isTouch, mouseX, mouseY]);

  if (!mounted || isTouch) return null;

  return (
    <>
      {/* Trail — soft, lagging circle */}
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
          className="h-8 w-8 rounded-full bg-accent/20"
          style={{
            boxShadow: "0 0 24px 8px rgba(201, 162, 39, 0.15)",
          }}
        />
      </motion.div>
      {/* Main — amber glow, expands on hover */}
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
          className="block h-2.5 w-2.5 rounded-full bg-accent/90"
          animate={{ scale: isHover ? 2.8 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{
            boxShadow:
              "0 0 12px 4px rgba(201, 162, 39, 0.35), 0 0 28px 10px rgba(201, 162, 39, 0.12)",
          }}
        />
      </motion.div>
    </>
  );
}
