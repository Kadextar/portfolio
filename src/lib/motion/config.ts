/**
 * Centralized motion timing and easing configuration.
 * Single source of truth for durations, delays, and curves.
 */

export const motionConfig = {
  /** Global duration scale (multiply for consistency) */
  duration: {
    instant: 0.15,
    fast: 0.25,
    normal: 0.35,
    slow: 0.5,
    slower: 0.7,
    section: 0.8,
    page: 1,
  },

  /** Stagger steps (seconds between items) */
  stagger: {
    tight: 0.04,
    normal: 0.08,
    loose: 0.12,
  },

  /** Cubic-bezier easings — reuse across Framer and GSAP */
  ease: {
    /** Default smooth out */
    default: [0.22, 1, 0.36, 1] as const,
    /** Snappier */
    out: [0.33, 1, 0.68, 1] as const,
    /** Gentle in-out */
    inOut: [0.65, 0, 0.35, 1] as const,
    /** Ease out expo-like */
    expoOut: [0.16, 1, 0.3, 1] as const,
  },

  /** Lenis smooth scroll options */
  lenis: {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  },

  /** Section reveal defaults (ScrollTrigger) */
  sectionReveal: {
    start: "top 85%",
    end: "bottom 15%",
    y: 40,
    duration: 1,
    ease: "power3.out" as const,
  },
} as const;

export type MotionConfig = typeof motionConfig;
