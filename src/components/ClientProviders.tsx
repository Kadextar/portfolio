"use client";

import { useState, useEffect, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { LoadingScreen } from "./LoadingScreen";
import { PageTransition } from "./PageTransition";
import { DynamicBackground, WebGLBackground } from "./background";
import { CustomCursor } from "./CustomCursor";
import { AmbientAudio } from "./AmbientAudio";
import { LocaleTransitionContext } from "./LocaleTransitionContext";

const localeTransitionTransition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1] as const,
};

const slideDistance = 10;

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();
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
      <WebGLBackground />
      <DynamicBackground />
      <CustomCursor />
      <AmbientAudio />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div
            key={locale}
            initial={
              isEntering
                ? { opacity: 0, x: slideDistance }
                : { opacity: 1, x: 0 }
            }
            animate={
              isExiting
                ? { opacity: 0, x: -slideDistance }
                : { opacity: 1, x: 0 }
            }
            exit={{ opacity: 0 }}
            transition={localeTransitionTransition}
            onAnimationComplete={hasLocaleTransition ? handleAnimationComplete : undefined}
          >
            <PageTransition>{children}</PageTransition>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="noise-overlay" aria-hidden />
    </>
  );
}
