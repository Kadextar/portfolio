"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export function ScrollBackground() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0, 0.4, 0.5, 0.4, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ opacity, scale, y }}
        className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#0a0908] to-[#080808]"
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(ellipse 120% 80% at 50% 0%, rgba(201,162,39,0.2) 0%, transparent 50%),
                            radial-gradient(ellipse 80% 120% at 80% 80%, rgba(201,162,39,0.08) 0%, transparent 50%)`,
        }}
      />
    </div>
  );
}
