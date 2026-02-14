"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./LoadingScreen";
import { CursorGlow } from "./CursorGlow";
import { PageTransition } from "./PageTransition";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CursorGlow />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <PageTransition key="content">{children}</PageTransition>
        )}
      </AnimatePresence>
    </>
  );
}
