"use client";

import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

const MAGNETIC_STRENGTH = 0.35;
const SPRING = { stiffness: 400, damping: 25 };

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  as?: "a" | "button";
  href?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function MagneticButton({
  children,
  className = "",
  as: Comp = "button",
  href,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const moveX = (e.clientX - centerX) * MAGNETIC_STRENGTH;
    const moveY = (e.clientY - centerY) * MAGNETIC_STRENGTH;
    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const translate = useMotionTemplate`translate(${x}px, ${y}px)`;

  const content = (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ translate }}
      transition={SPRING}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.span>
  );

  if (Comp === "a" && href !== undefined) {
    return (
      <a href={href} className={className} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={className} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
