"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type SectionGradientProps = {
  children: React.ReactNode;
  variant?: "warm" | "cool" | "accent" | "neutral";
  className?: string;
  id?: string;
};

const gradients: Record<string, string> = {
  warm:
    "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 122, 26, 0.06) 0%, transparent 50%)",
  cool:
    "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(255, 122, 26, 0.04) 0%, transparent 50%)",
  accent:
    "radial-gradient(ellipse 60% 60% at 80% 20%, rgba(255, 122, 26, 0.05) 0%, transparent 50%)",
  neutral:
    "radial-gradient(ellipse 50% 30% at 20% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)",
};

export function SectionGradient({
  children,
  variant = "neutral",
  className = "",
  id,
}: SectionGradientProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: gradients[variant],
          opacity,
        }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
