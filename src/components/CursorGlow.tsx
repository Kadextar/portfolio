"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Outer glow - only on desktop */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        animate={{
          x: position.x,
          y: position.y,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          opacity: { duration: 0.2 },
        }}
        style={{
          width: 400,
          height: 400,
          marginLeft: -200,
          marginTop: -200,
          background:
            "radial-gradient(circle, rgba(255, 122, 26, 0.08) 0%, transparent 70%)",
        }}
      />
      {/* Inner spot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        animate={{
          x: position.x,
          y: position.y,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 35,
          stiffness: 300,
          opacity: { duration: 0.2 },
        }}
        style={{
          width: 80,
          height: 80,
          marginLeft: -40,
          marginTop: -40,
          background:
            "radial-gradient(circle, rgba(255, 122, 26, 0.15) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
