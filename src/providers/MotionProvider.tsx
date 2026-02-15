"use client";

import type { ReactNode } from "react";
import { ScrollControllerProvider } from "@/lib/motion/scroll-context";

/**
 * Global Motion Provider: Lenis + GSAP ScrollTrigger + scroll state.
 * Wrap the app once; use useScrollController() for scroll-driven UI.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <ScrollControllerProvider>{children}</ScrollControllerProvider>;
}
