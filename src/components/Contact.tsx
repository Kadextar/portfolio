"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CinematicSection } from "@/components/effects/CinematicSection";

export function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  };

  return (
    <CinematicSection id="contact" depthScale={0.015} parallaxY={8}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-accent text-xs font-medium tracking-[0.28em] uppercase mb-4">
            {t("label")}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-white">
            {t("title")}
          </h2>
          <p className="mt-4 text-zinc-500 max-w-xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="glass-glow border-white/10 hover:border-white/15 transition-colors duration-300">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-zinc-400 mb-2"
                    >
                      {t("name")}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder={t("placeholderName")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-zinc-400 mb-2"
                    >
                      {t("email")}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={t("placeholderEmail")}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-zinc-400 mb-2"
                  >
                    {t("subject")}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder={t("placeholderSubject")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-zinc-400 mb-2"
                  >
                    {t("message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="flex w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-colors resize-none"
                    placeholder={t("placeholderMessage")}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  size="lg"
                  className="btn-glow transition-shadow duration-300"
                >
                  {status === "idle" && t("send")}
                  {status === "sending" && t("sending")}
                  {status === "sent" && t("sent")}
                </Button>
              </form>

              <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-8 justify-center">
                <a
                  href="mailto:contact@example.com"
                  className="text-zinc-400 hover:text-accent transition-colors text-sm"
                >
                  contact@example.com
                </a>
                <a
                  href="#"
                  className="text-zinc-400 hover:text-accent transition-colors text-sm"
                >
                  {t("linkedin")}
                </a>
                <a
                  href="#"
                  className="text-zinc-400 hover:text-accent transition-colors text-sm"
                >
                  {t("researchgate")}
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </CinematicSection>
  );
}
