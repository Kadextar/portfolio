"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StaggerTextProps = {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "words" | "chars";
  asElement?: "div" | "span";
};

export function StaggerText({
  text,
  className = "",
  stagger = 0.04,
  delay = 0,
  as = "words",
  asElement = "div",
}: StaggerTextProps) {
  const ref = useRef<HTMLDivElement & HTMLSpanElement>(null);
  const items = as === "words" ? text.split(/\s+/) : text.split("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll("[data-stagger-item]");
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [text, stagger, delay, as]);

  const content = (
    <>
      {items.map((item, i) => (
        <span key={i} data-stagger-item className="inline-block overflow-hidden">
          <span className="inline-block">{item}</span>
          {as === "words" && i < items.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </>
  );

  return asElement === "span" ? (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {content}
    </span>
  ) : (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {content}
    </div>
  );
}
