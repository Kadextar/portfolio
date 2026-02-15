"use client";

import { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const MAGNETIC_STRENGTH = 8;

type MagneticNavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function MagneticNavLink({ href, children, className }: MagneticNavLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const moveX = (e.clientX - centerX) / rect.width;
    const moveY = (e.clientY - centerY) / rect.height;
    x.set(moveX * MAGNETIC_STRENGTH);
    y.set(moveY * MAGNETIC_STRENGTH);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("nav-link-underline inline-block", className)}
    >
      {children}
    </motion.a>
  );
}
