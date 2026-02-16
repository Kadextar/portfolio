"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useMotionValue, type MotionValue } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionConfig } from "./config";

gsap.registerPlugin(ScrollTrigger);

export type ScrollControllerValue = {
  scrollYProgress: MotionValue<number>;
  lenisRef: React.RefObject<import("lenis").default | null>;
  isReady: boolean;
};

const ScrollControllerContext = createContext<ScrollControllerValue | null>(null);

export function ScrollControllerProvider({ children }: { children: ReactNode }) {
  const scrollYProgress = useMotionValue(0);
  const lenisRef = useRef<import("lenis").default | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const rafIdRef = { current: 0 };
    let lenisInstance: import("lenis").default | null = null;

    const init = async () => {
      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const Lenis = (await import("lenis")).default;
      const lenis = new Lenis({
        duration: reduceMotion ? 0 : motionConfig.lenis.duration,
        easing: motionConfig.lenis.easing,
        orientation: "vertical",
        smoothWheel: !reduceMotion,
      });
      lenisRef.current = lenis;
      lenisInstance = lenis;

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop: () => lenis.scroll,
        getBoundingClientRect: () =>
          ({
            top: 0,
            left: 0,
            width: typeof window !== "undefined" ? window.innerWidth : 0,
            height: typeof window !== "undefined" ? window.innerHeight : 0,
          }) as DOMRect,
      });

      lenis.on("scroll", () => {
        ScrollTrigger.update();
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollYProgress.set(max > 0 ? lenis.scroll / max : 0);
      });

      function raf(time: number) {
        lenis.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }
      rafIdRef.current = requestAnimationFrame(raf);
      setIsReady(true);
    };

    init();

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      lenisInstance?.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
      setIsReady(false);
    };
  }, [scrollYProgress]);

  const value: ScrollControllerValue = {
    scrollYProgress,
    lenisRef,
    isReady,
  };

  return (
    <ScrollControllerContext.Provider value={value}>
      {children}
    </ScrollControllerContext.Provider>
  );
}

export function useScrollController(): ScrollControllerValue {
  const ctx = useContext(ScrollControllerContext);
  const fallbackProgress = useMotionValue(0);
  const fallbackRef = useRef<ScrollControllerValue | null>(null);
  if (!fallbackRef.current) {
    fallbackRef.current = {
      scrollYProgress: fallbackProgress,
      lenisRef: { current: null },
      isReady: false,
    };
  }
  return ctx ?? fallbackRef.current;
}
