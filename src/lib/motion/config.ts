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

  /** Subtle camera drift (mouse parallax on background only) */
  cameraDrift: {
    maxPercent: 1.2,
    lerp: 0.06,
  },

  /** Cinematic page transition (route/locale change) */
  pageTransition: {
    duration: 1,
    ease: [0.22, 1, 0.36, 1] as const,
    scaleDown: 0.98,
  },

  /** Ambient audio ducking during page/locale transition */
  audioTransition: {
    /** Volume multiplier during transition (0–1), rest is full TARGET_VOLUME */
    duckRatio: 0.4,
    /** Fade down duration (s) when transition starts */
    fadeDownDuration: 0.35,
    /** Fade up duration (s) when transition completes */
    fadeUpDuration: 0.5,
  },

  /** Section reveal defaults (ScrollTrigger) */
  sectionReveal: {
    start: "top 85%",
    end: "bottom 15%",
    y: 40,
    duration: 1,
    ease: "power3.out" as const,
  },

  /** Custom cursor: magnetic pull, glow per section, precise feel */
  cursor: {
    /** Magnetic blend toward element center when over interactive (0 = off) */
    magneticStrength: 0.28,
    /** Margin (px) around interactive element for smooth pull-in */
    magneticMargin: 12,
    /** Spring: main cursor ring — snappier for faster follow */
    cursorSpring: { stiffness: 780, damping: 38 },
    /** Spring: trail glow (softer) */
    trailSpring: { stiffness: 140, damping: 26 },
    /** Spring: inner dot (precise, fast) */
    innerSpring: { stiffness: 920, damping: 42 },
    /** Glow intensity range [min, max] per section (first section = max, last = min) */
    glowRange: [0.7, 1.2],
  },

  /** Scroll-based depth blur when sections leave viewport */
  depthBlur: {
    maxPx: 4,
    /** Progress range for entering (blur 4→0): 0 to inEnd */
    inEnd: 0.22,
    /** Progress range for leaving (blur 0→4): outStart to 1 */
    outStart: 0.78,
  },
} as const;

export type MotionConfig = typeof motionConfig;
