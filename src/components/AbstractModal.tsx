"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            aria-modal
            aria-labelledby="modal-title"
            role="dialog"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden glass-strong border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 p-6 border-b border-white/10">
                <span className="text-accent text-xs font-medium tracking-wider uppercase">
                  {abstractLabel}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label={closeLabel}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <p className="text-zinc-500 text-sm font-medium">{date}</p>
                <h2
                  id="modal-title"
                  className="text-xl md:text-2xl font-medium text-white leading-snug"
                >
                  {title}
                </h2>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  {abstract}
                </p>
              </div>
              <div className="p-6 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full md:w-auto px-6 py-3 rounded-md border border-white/20 bg-white/5 text-sm font-medium text-white hover:border-accent/30 hover:bg-accent/10 hover:text-accent transition-colors"
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
