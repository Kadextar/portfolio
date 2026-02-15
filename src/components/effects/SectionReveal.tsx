"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionConfig, sectionTriggerDefaults } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

const { sectionReveal } = motionConfig;

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  y = sectionReveal.y,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: sectionReveal.duration,
          delay,
          ease: sectionReveal.ease,
          scrollTrigger: {
            trigger: el,
            start: sectionTriggerDefaults.start,
            end: sectionTriggerDefaults.end,
            toggleActions: sectionTriggerDefaults.toggleActions,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
