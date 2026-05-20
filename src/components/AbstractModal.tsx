"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

type AbstractModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  date: string;
  abstract: string;
  closeLabel: string;
  abstractLabel: string;
};

export function AbstractModal({
  isOpen,
  onClose,
  title,
  date,
  abstract,
  closeLabel,
  abstractLabel,
}: AbstractModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
            aria-hidden
          />

          {/* Slide-over Side Drawer Container */}
          <div
            className="fixed inset-y-0 right-0 z-[101] w-full max-w-xl flex pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
          >
            <motion.div
              initial={{ x: "100%", opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.9 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="pointer-events-auto w-full h-full flex flex-col bg-[#030303]/95 border-l border-white/10 shadow-[-10px_0_50px_rgba(0,0,0,0.8)] backdrop-blur-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Premium Gold Accent Top Border */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent via-tech to-accent/50 z-20" />

              {/* Drawer Header */}
              <div className="flex items-center justify-between gap-4 p-6 border-b border-white/[0.06] pt-8">
                <span className="text-[10px] text-accent font-medium tracking-[0.25em] uppercase">
                  {abstractLabel}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300 group"
                  aria-label={closeLabel}
                >
                  <FiX className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin">
                <div className="space-y-2">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider block">
                    Publication Date: <span className="text-zinc-300 font-sans font-light">{date}</span>
                  </span>
                  <h2
                    id="drawer-title"
                    className="text-2xl md:text-3xl font-display font-light text-white leading-tight"
                  >
                    {title}
                  </h2>
                </div>

                <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-transparent" />

                <div className="space-y-4">
                  <span className="text-[10px] text-tech font-medium tracking-widest uppercase block">
                    Abstract Synopsis
                  </span>
                  <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed text-justify">
                    {abstract}
                  </p>
                </div>

                {/* Nice visual addition to academic papers */}
                <div className="p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] space-y-3 mt-6">
                  <span className="text-[9px] text-accent font-medium tracking-wider uppercase block">
                    Research Impact & Field
                  </span>
                  <p className="text-zinc-500 text-xs font-light leading-relaxed">
                    This scholarly paper contributes to the regional and international dialogue on policy-making, strategic business analysis, and digital integration in Central Asian developing markets.
                  </p>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 md:p-8 border-t border-white/[0.06] flex items-center justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs font-light text-zinc-300 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                >
                  {closeLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
