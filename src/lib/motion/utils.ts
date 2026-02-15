/**
 * Animation utilities: variant builders, stagger helpers, shared types.
 * Uses motionConfig for timing — no magic numbers.
 */

import type { Variants } from "framer-motion";
import { motionConfig } from "./config";

const { duration, ease, stagger } = motionConfig;

/** Fade + optional Y offset — for section/block reveals */
export function fadeInUp(
  overrides?: Partial<{ duration: number; delay: number; y: number; opacity: number }>
): Variants {
  const d = overrides?.duration ?? duration.normal;
  const delay = overrides?.delay ?? 0;
  const y = overrides?.y ?? 24;
  const opacity = overrides?.opacity ?? 0;
  return {
    hidden: { opacity, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: d, delay, ease: ease.default },
    },
  };
}

/** Fade only */
export function fadeIn(overrides?: Partial<{ duration: number; delay: number }>): Variants {
  const d = overrides?.duration ?? duration.normal;
  const delay = overrides?.delay ?? 0;
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: d, delay, ease: ease.default } },
  };
}

/** Stagger container — use with staggerChildren on parent */
export function staggerContainer(
  staggerStep: number = stagger.normal,
  delayChildren: number = 0
) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerStep,
        delayChildren,
      },
    },
  };
}

/** Default transition object for Framer Motion */
export const defaultTransition = {
  duration: duration.normal,
  ease: ease.default,
};

/** Spring preset — subtle, for UI */
export const springSubtle = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

/** Spring preset — softer trail/follow */
export const springSoft = {
  type: "spring" as const,
  stiffness: 150,
  damping: 22,
};

/** Section trigger defaults for GSAP ScrollTrigger — use with motionConfig.sectionReveal */
export const sectionTriggerDefaults = {
  start: "top 85%" as const,
  end: "bottom 15%" as const,
  toggleActions: "play none none none" as const,
};
