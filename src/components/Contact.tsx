"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
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
          <p className="text-[#ff7a1a] text-sm font-medium tracking-[0.2em] uppercase mb-4">
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
        >
          <Card className="glass-glow border-white/10 hover:border-[#ff7a1a]/20 transition-all duration-500">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-zinc-400 mb-2"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
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
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
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
                  <Input
                    id="subject"
                    name="subject"
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
                    className="flex w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ff7a1a]/50 focus:ring-1 focus:ring-[#ff7a1a]/30 transition-colors resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  size="lg"
                >
                  {status === "idle" && "Send Message"}
                  {status === "sending" && "Sending..."}
                  {status === "sent" && "Message Sent ✓"}
                </Button>
              </form>

              <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-8 justify-center">
                <a
                  href="mailto:contact@example.com"
                  className="text-zinc-400 hover:text-[#ff7a1a] transition-colors text-sm"
                >
                  contact@example.com
                </a>
                <a
                  href="#"
                  className="text-zinc-400 hover:text-[#ff7a1a] transition-colors text-sm"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-zinc-400 hover:text-[#ff7a1a] transition-colors text-sm"
                >
                  ResearchGate
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
