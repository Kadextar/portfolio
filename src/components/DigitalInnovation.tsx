"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

function SchedyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="6"
        y="8"
        width="36"
        height="34"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.4"
      />
      <path
        d="M6 18h36"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.4"
      />
      <rect x="12" y="24" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.6" />
      <rect x="24" y="24" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.4" />
      <rect x="12" y="34" width="8" height="6" rx="1" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

function KadextarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="4"
        y="8"
        width="40"
        height="32"
        rx="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.4"
      />
      <path
        d="M20 16v16l14-8-14-8z"
        fill="currentColor"
        fillOpacity="0.8"
      />
    </svg>
  );
}

const items = [
  {
    key: "schedy" as const,
    Icon: SchedyIcon,
    titleKey: "schedyTitle",
    tagKey: "schedyTag",
    descKey: "schedyDesc",
  },
  {
    key: "kadextar" as const,
    Icon: KadextarIcon,
    titleKey: "kadextarTitle",
    tagKey: "kadextarTag",
    descKey: "kadextarDesc",
  },
];

export function DigitalInnovation() {
  const t = useTranslations("digitalInnovation");

  return (
    <section
      id="digitalInnovation"
      className="py-28 md:py-40 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <p className="text-accent text-xs font-medium tracking-[0.28em] uppercase mb-4">
            {t("label")}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-white">
            {t("title")}
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
          }}
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.key}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <Card className="glass-glow h-full overflow-hidden group hover:border-white/12 transition-colors duration-300">
                <CardContent className="p-8 md:p-10 flex flex-col h-full">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 border border-white/10 flex items-center justify-center text-accent">
                      <item.Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium tracking-wider text-accent uppercase">
                        {t(item.tagKey)}
                      </span>
                      <h3 className="mt-2 text-xl md:text-2xl font-medium text-white group-hover:text-accent transition-colors duration-200">
                          {t(item.titleKey)}
                        </h3>
                        <p className="mt-4 text-zinc-400 text-sm md:text-base leading-relaxed">
                          {t(item.descKey)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
