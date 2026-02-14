"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image - using Unsplash hospitality/luxury hotel */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury hospitality background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <p className="text-accent-gold text-sm font-medium tracking-[0.3em] uppercase">
            Hospitality Management & Research
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white">
            Shaping the Future
            <br />
            <span className="text-accent-gold">of Hospitality</span>
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-300 text-lg md:text-xl font-light leading-relaxed">
            Academic research meets industry excellence. Bridging theory and
            practice in luxury hospitality, sustainable tourism, and
            international standards.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#research"
            className="px-8 py-4 bg-accent-gold text-black font-medium rounded-full hover:bg-accent-gold-light transition-all duration-300 hover:scale-105"
          >
            View Research
          </a>
          <a
            href="#contact"
            className="px-8 py-4 glass rounded-full font-medium text-white border border-white/20 hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
