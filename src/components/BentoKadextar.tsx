"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaYoutube, FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { trackEvent, PlausibleEvents } from "@/lib/plausible";

export function BentoKadextar() {
  const t = useTranslations("projects");

  const socialLinks = [
    {
      name: t("telegram"),
      icon: FaTelegramPlane,
      href: "https://t.me/a_satullaev",
      color: "hover:text-[#00f5ff]/90 hover:border-[#00f5ff]/20 hover:bg-[#00f5ff]/5",
      shadow: "hover:shadow-cyan-glow",
    },
    {
      name: t("instagram"),
      icon: FaInstagram,
      href: "https://instagram.com/a_satullayev",
      color: "hover:text-[#ff007f]/90 hover:border-[#ff007f]/20 hover:bg-[#ff007f]/5",
      shadow: "hover:shadow-[0_0_20px_rgba(255,0,127,0.12)]",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-bento p-8 relative overflow-hidden group min-h-[480px] flex flex-col justify-between"
    >
      {/* Background glow */}
      <div className="absolute bottom-[5%] left-[5%] w-[200px] h-[200px] rounded-full bg-accent/5 blur-[70px] group-hover:bg-accent/8 transition-colors duration-700 pointer-events-none" />

      <div className="space-y-6 relative z-10">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20 shadow-[0_0_15px_rgba(229,196,131,0.08)] font-display font-medium text-base">
            K
          </span>
          <div>
            <span className="text-[10px] text-accent font-medium tracking-[0.2em] uppercase block">
              {t("kadextarTag")}
            </span>
            <h3 className="text-2xl font-display text-white font-normal mt-0.5">
              {t("kadextarTitle")}
            </h3>
          </div>
        </div>

        <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base">
          {t("kadextarDesc")}
        </p>

        <div className="space-y-4 pt-2">
          <div className="text-xs font-light text-zinc-400">
            <span className="text-accent font-medium block uppercase tracking-wider mb-1">{t("roleLabel")}</span>
            <p className="text-zinc-300 font-light leading-relaxed">{t("kadextarRole")}</p>
          </div>
          <div className="text-xs font-light text-zinc-400">
            <span className="text-tech/95 font-medium block uppercase tracking-wider mb-1">{t("outcomeLabel")}</span>
            <p className="text-zinc-300 font-light leading-relaxed">{t("kadextarOutcome")}</p>
          </div>
        </div>
      </div>

      {/* Social CTAs (Bottom) */}
      <div className="space-y-4 pt-6 relative z-10">
        {/* YouTube Subscribe Box */}
        <a
          href="https://youtube.com/@kadextar"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("youtube_subscribe")}
          className="flex items-center justify-between rounded-xl bg-red-950/20 border border-red-900/10 hover:border-red-500/30 p-4 transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(239,68,68,0.12)] group/yt"
        >
          <div className="flex items-center gap-3">
            <FaYoutube className="text-2xl text-red-500 group-hover/yt:scale-110 transition-transform duration-300" />
            <div className="text-left">
              <span className="text-[9px] text-zinc-400 block uppercase tracking-wider leading-none">YouTube Channel</span>
              <span className="text-xs font-light text-zinc-200 mt-0.5 block">Productivity & Education</span>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-sans font-medium text-[10px] uppercase tracking-wider group-hover/yt:bg-red-500 transition-colors">
            {t("watchYouTube").split(" ")[0]}
          </span>
        </a>

        {/* Telegram & Instagram Horizontal Grid */}
        <div className="grid grid-cols-2 gap-3">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-xl bg-white/[0.02] border border-white/[0.05] py-3 text-xs font-light text-zinc-300 shadow-sm transition-all duration-300 ${social.color} ${social.shadow} group/link`}
            >
              <social.icon className="text-sm group-hover/link:scale-110 transition-transform duration-300" />
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
