"use client";

import { motion } from "framer-motion";

const defaultContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const defaultItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

type StaggerRevealProps = {
  children: React.ReactNode;
  className?: string;
  container?: typeof defaultContainer;
  item?: typeof defaultItem;
  as?: keyof typeof motion;
};

export function StaggerReveal({
  children,
  className = "",
  container = defaultContainer,
  item = defaultItem,
  as: Component = "div",
}: StaggerRevealProps) {
  const MotionComp = motion[Component] as typeof motion.div;
  return (
    <MotionComp
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </MotionComp>
  );
}

export const staggerItem = defaultItem;
