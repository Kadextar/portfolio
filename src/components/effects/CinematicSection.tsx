"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type CinematicSectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Slight scale (depth) as section enters. 0 = off */
  depthScale?: number;
  /** Parallax Y factor (positive = content moves up slower). 0 = off */
  parallaxY?: number;
};

/**
 * Wraps content in a section with scroll-driven opacity morph, optional depth (scale)
 * and parallax. No borders or visual separation — for continuous flow.
 */
export function CinematicSection({
  children,
  id,
  className = "",
  depthScale = 0.02,
  parallaxY = 12,
}: CinematicSectionProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15, 0.85, 0.9, 1],
    [0.5, 0.85, 1, 1, 0.85, 0.5]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [1 - depthScale, 1, 1, 1, 1 - depthScale * 0.5]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [parallaxY, 0, 0, 0, -parallaxY * 0.5]
  );

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity }}
      className={`relative overflow-hidden py-24 md:py-36 ${className}`.trim()}
    >
      <motion.div
        style={{ scale, y: parallaxY ? y : undefined }}
        className="relative z-10 w-full"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
