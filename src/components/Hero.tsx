"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "linear-gradient(135deg, #0a0a0b 0%, #1a0f05 25%, #0d0a08 50%, #150a03 75%, #0a0a0b 100%)",
            backgroundSize: "400% 400%",
            animation: "gradient-shift 12s ease infinite",
          }}
        />
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#ff7a1a] blur-[120px] -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#ff7a1a] blur-[100px] translate-x-1/2 translate-y-1/2"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-[#ff7a1a] blur-[80px] -translate-x-1/2 -translate-y-1/2"
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.p
            variants={item}
            className="text-[#ff7a1a] text-sm font-medium tracking-[0.3em] uppercase"
          >
            Hospitality & Management Researcher
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white"
          >
            <span className="block">Azamat</span>
            <span className="block text-[#ff7a1a]">Satullaev</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl font-light leading-relaxed"
          >
            Blending strategy, analytics, and technology to shape the future of
            service industries.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg" className="rounded-full">
            <a href="#research">View Research</a>
          </Button>
          <Button asChild variant="glass" size="lg" className="rounded-full">
            <a href="#contact">Get in Touch</a>
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-[#ff7a1a]/80 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
