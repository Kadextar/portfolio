"use client";

import { useState, useEffect, useContext, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { LoadingScreen } from "./LoadingScreen";
import { PageTransition } from "./PageTransition";
import { DynamicBackground, WebGLBackground } from "./background";
import { CustomCursor } from "./CustomCursor";
import { LocaleTransitionContext } from "./LocaleTransitionContext";
import { motionConfig } from "@/lib/motion";
import { useMouseDrift } from "@/hooks/useMouseDrift";

const { pageTransition } = motionConfig;
const scaleDown = pageTransition.scaleDown ?? 0.98;

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();
  const backgroundDriftRef = useRef<HTMLDivElement>(null);
  useMouseDrift(backgroundDriftRef);
  const ctx = useContext(LocaleTransitionContext);
  const isExiting = ctx?.isExiting ?? false;
  const isEntering = ctx?.isEntering ?? false;
  const onExitComplete = ctx?.onExitComplete;
  const onEnterComplete = ctx?.onEnterComplete;
  const hasLocaleTransition = ctx?.hasProvider ?? false;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    if (isExiting && onExitComplete) onExitComplete();
    else if (isEntering && onEnterComplete) onEnterComplete();
  };

  return (
    <>
      {/* Background layer with subtle mouse parallax (camera drift) — background only */}
      <div
        ref={backgroundDriftRef}
        className="fixed inset-0 -z-20 overflow-hidden"
        style={{ willChange: "transform" }}
        aria-hidden
      >
        <div className="absolute inset-0">
          <WebGLBackground absolute />
        </div>
        <div className="absolute inset-0 z-10">
          <DynamicBackground absolute />
        </div>
      </div>
      <CustomCursor />
      {/* Cinematic overlay: fade to dark on exit, fade out on enter — no white flash */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[9990] bg-[#0a0a0a]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isExiting ? 1 : isEntering ? 0 : 0,
        }}
        transition={{ duration: pageTransition.duration, ease: pageTransition.ease }}
        aria-hidden
      />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div
            key={locale}
            initial={
              isEntering
                ? { opacity: 0, scale: scaleDown }
                : { opacity: 1, scale: 1 }
            }
            animate={
              isExiting
                ? { opacity: 0, scale: scaleDown }
                : { opacity: 1, scale: 1 }
            }
            exit={{ opacity: 0, scale: scaleDown }}
            transition={{ duration: pageTransition.duration, ease: pageTransition.ease }}
            onAnimationComplete={hasLocaleTransition ? handleAnimationComplete : undefined}
            className="relative z-10"
          >
            <PageTransition>{children}</PageTransition>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="noise-overlay print:hidden" aria-hidden />
    </>
  );
}
