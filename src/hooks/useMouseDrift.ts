"use client";

import { useEffect, useRef, type RefObject } from "react";
import { motionConfig } from "@/lib/motion";

const { maxPercent, lerp } = motionConfig.cameraDrift;

/**
 * Applies subtle mouse-based parallax (camera drift) to a background container.
 * Updates transform via RAF only — no React re-renders. Very low offset (1–2%).
 * Disabled on coarse pointer (touch) for performance and to avoid gimmick feel.
 */
export function useMouseDrift(
  containerRef: RefObject<HTMLElement | null>
): void {
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const prefersFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!prefersFinePointer) return;

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      target.current = {
        x: (e.clientX / w - 0.5) * 2 * maxPercent,
        y: (e.clientY / h - 0.5) * 2 * maxPercent,
      };
    };

    const tick = () => {
      const el = containerRef.current;
      if (el) {
        current.current = {
          x: current.current.x + (target.current.x - current.current.x) * lerp,
          y: current.current.y + (target.current.y - current.current.y) * lerp,
        };
        el.style.transform = `translate(${current.current.x}%, ${current.current.y}%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
    };
  }, [containerRef]);
}
