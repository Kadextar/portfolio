"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type TextRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-block will-change-transform"
      >
        {children}
      </motion.span>
    </span>
  );
}
