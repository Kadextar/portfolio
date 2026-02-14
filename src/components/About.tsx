"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p className="text-accent-gold text-sm font-medium tracking-[0.2em] uppercase">
              About Me
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-tight">
              Academic Excellence
              <br />
              <span className="text-zinc-400">Meeting Industry Insight</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed text-lg">
              I am a dedicated Hospitality Management & Research student with a
              passion for understanding the intersection of luxury service,
              sustainable tourism, and operational excellence. My work bridges
              academic rigor with real-world hospitality challenges.
            </p>
            <p className="text-zinc-500 leading-relaxed">
              With an international perspective and commitment to evidence-based
              practices, I aim to contribute to the evolution of hospitality
              standards—from boutique hotels to global tourism ecosystems.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <span className="px-4 py-2 glass rounded-full text-sm text-zinc-300">
                Research-Focused
              </span>
              <span className="px-4 py-2 glass rounded-full text-sm text-zinc-300">
                Industry-Ready
              </span>
              <span className="px-4 py-2 glass rounded-full text-sm text-zinc-300">
                Internationally Minded
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong rounded-3xl p-8 md:p-12"
          >
            <h3 className="text-lg font-medium text-white mb-6">
              Key Focus Areas
            </h3>
            <ul className="space-y-4">
              {[
                "Luxury hospitality operations & service design",
                "Sustainable tourism & responsible travel",
                "Guest experience optimization",
                "International hospitality standards",
                "Revenue management & strategic planning",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-zinc-400"
                >
                  <span className="w-2 h-2 rounded-full bg-accent-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
