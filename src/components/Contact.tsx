"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate form submission - replace with actual API/email service
    setTimeout(() => setStatus("sent"), 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent-gold text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Contact
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Let&apos;s Connect
          </h2>
          <p className="mt-4 text-zinc-500 max-w-xl mx-auto">
            Open to research collaborations, speaking opportunities, and
            industry connections. Universities and organizations welcome.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-400 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/30 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-400 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/30 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-zinc-400 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/30 transition-colors"
                placeholder="Research collaboration, speaking, etc."
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-zinc-400 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/30 transition-colors resize-none"
                placeholder="Tell me about your project or opportunity..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full md:w-auto px-10 py-4 bg-accent-gold text-black font-medium rounded-xl hover:bg-accent-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "idle" && "Send Message"}
              {status === "sending" && "Sending..."}
              {status === "sent" && "Message Sent ✓"}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-8 justify-center">
            <a
              href="mailto:contact@example.com"
              className="text-zinc-400 hover:text-accent-gold transition-colors text-sm"
            >
              contact@example.com
            </a>
            <a
              href="#"
              className="text-zinc-400 hover:text-accent-gold transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-zinc-400 hover:text-accent-gold transition-colors text-sm"
            >
              ResearchGate
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
