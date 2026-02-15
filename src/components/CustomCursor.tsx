"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleOver = () => setIsHover(true);
    const handleOut = () => setIsHover(false);

    document.body.style.cursor = "none";
    document.body.classList.add("custom-cursor-active");
    document.addEventListener("mousemove", handleMove);
    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      el.addEventListener("mouseover", handleOver);
      el.addEventListener("mouseout", handleOut);
    });

    return () => {
      document.body.style.cursor = "";
      document.body.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove", handleMove);
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.removeEventListener("mouseover", handleOver);
        el.removeEventListener("mouseout", handleOut);
      });
    };
  }, [mounted, x, y]);

  if (!mounted) return null;

  const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9998] h-0 w-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.span
        className="block h-2 w-2 rounded-full bg-white/90"
        animate={{ scale: isHover ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </motion.div>
  );
}
