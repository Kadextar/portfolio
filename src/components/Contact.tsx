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
  const tInfo = useTranslations("info");
  const [status, setStatus] = useState<"idle" | "opening" | "sent">("idle");
  const RECIPIENT = "kadextar@gmail.com";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("opening");
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value ?? "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "";
    const subject = (form.elements.namedItem("subject") as HTMLInputElement)?.value ?? "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? "";
    const body = [
      name && `Name: ${name}`,
      email && `Email: ${email}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    const mailto = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject || t("placeholderSubject"))}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("sent");
  };

  return (
    <CinematicSection id="contact" depthScale={0.015} parallaxY={8}>
      <div className="max-w-4xl mx-auto px-6 pt-4">
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
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                aria-label={t("title")}
                noValidate
              >
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
                  disabled={status === "opening"}
                  size="lg"
                  className="btn-glow transition-shadow duration-300"
                  aria-busy={status === "opening"}
                  aria-live="polite"
                >
                  {status === "idle" && t("send")}
                  {status === "opening" && t("sending")}
                  {status === "sent" && t("sent")}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-zinc-500 text-xs font-medium tracking-[0.2em] uppercase mb-4 mt-12">
            {tInfo("contactTitle")}
          </p>
          <div className="space-y-3">
            <a
              href={`mailto:${tInfo("email")}`}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-left hover:border-white/15 hover:bg-white/[0.06] transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-[#050506]"
              aria-label={tInfo("labelEmail")}
            >
              <span className="text-zinc-500 text-sm font-medium shrink-0 w-24">{tInfo("labelEmail")}</span>
              <span className="text-zinc-300 text-sm truncate">{tInfo("email")}</span>
            </a>
            <a
              href={`tel:${tInfo("phone").replace(/\s/g, "")}`}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-left hover:border-white/15 hover:bg-white/[0.06] transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-[#050506]"
              aria-label={tInfo("labelPhone")}
            >
              <span className="text-zinc-500 text-sm font-medium shrink-0 w-24">{tInfo("labelPhone")}</span>
              <span className="text-zinc-300 text-sm">{tInfo("phone")}</span>
            </a>
            <a
              href={`https://t.me/${tInfo("telegram").replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-left hover:border-white/15 hover:bg-white/[0.06] transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-[#050506]"
              aria-label={tInfo("labelTelegram")}
            >
              <span className="text-zinc-500 text-sm font-medium shrink-0 w-24">{tInfo("labelTelegram")}</span>
              <span className="text-zinc-300 text-sm">{tInfo("telegram")}</span>
            </a>
            <a
              href={`https://${tInfo("linkedin")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-left hover:border-white/15 hover:bg-white/[0.06] transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-[#050506]"
              aria-label={tInfo("labelLinkedIn")}
            >
              <span className="text-zinc-500 text-sm font-medium shrink-0 w-24">{tInfo("labelLinkedIn")}</span>
              <span className="text-zinc-300 text-sm truncate">{tInfo("linkedin")}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </CinematicSection>
  );
}
