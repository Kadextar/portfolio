"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { LoadingScreen } from "./LoadingScreen";
import { PageTransition } from "./PageTransition";
import { ScrollBackground } from "./ScrollBackground";
import { SmoothScroll } from "./SmoothScroll";
import { CustomCursor } from "./CustomCursor";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <ScrollBackground />
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div
            key={locale}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <PageTransition>{children}</PageTransition>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="noise-overlay" aria-hidden />
    </SmoothScroll>
  );
}
