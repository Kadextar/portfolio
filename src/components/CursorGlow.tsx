"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const CURSOR_SMOOTH = 0.12;

export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xTarget = useMotionValue(0);
  const yTarget = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      xTarget.set(e.clientX);
      yTarget.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    let raf: number;
    const animate = () => {
      const xVal = x.get();
      const yVal = y.get();
      const xT = xTarget.get();
      const yT = yTarget.get();
      x.set(xVal + (xT - xVal) * CURSOR_SMOOTH);
      y.set(yVal + (yT - yVal) * CURSOR_SMOOTH);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, [x, y, xTarget, yTarget]);

  return (
    <>
      {/* Outer glow */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          left: x,
          top: y,
          x: "-50%",
          y: "-50%",
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle, rgba(255, 122, 26, 0.07) 0%, rgba(255, 122, 26, 0.02) 40%, transparent 70%)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.25 } }}
      />
      {/* Mid glow */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          left: x,
          top: y,
          x: "-50%",
          y: "-50%",
          width: 200,
          height: 200,
          background:
            "radial-gradient(circle, rgba(255, 122, 26, 0.12) 0%, transparent 65%)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
      {/* Inner spot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          left: x,
          top: y,
          x: "-50%",
          y: "-50%",
          width: 72,
          height: 72,
          background:
            "radial-gradient(circle, rgba(255, 122, 26, 0.18) 0%, transparent 70%)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.15 } }}
      />
    </>
  );
}
