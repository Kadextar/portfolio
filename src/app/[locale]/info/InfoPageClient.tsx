"use client";

import { useTranslations } from "next-intl";

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.44-.645 1.44-1.44-.644-1.44-1.44-1.44z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/** Официальное соотношение сторон флагов — 2:1 (ширина : высота) */
const FLAG_VIEWBOX = "0 0 24 12";

function FlagWrap({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-white/[0.06]"
      style={{ width: 32, height: 16 }}
      aria-hidden
    >
      <svg
        viewBox={FLAG_VIEWBOX}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {children}
      </svg>
    </span>
  );
}

/** Каракалпакстан — синяя, жёлтая, зелёная полосы; белые полумесяц и 5 звёзд (офиц. 2:1) */
function FlagKarakalpakstan() {
  return (
    <FlagWrap>
      <rect width="24" height="4" fill="#0099CC" />
      <rect y="4" width="24" height="4" fill="#F4C430" />
      <rect y="8" width="24" height="4" fill="#00A651" />
      <circle cx="4" cy="2" r="1.8" fill="white" />
      <circle cx="4.8" cy="2" r="1.4" fill="#0099CC" />
      {[[8, 1.4], [9.2, 2], [9.2, 2.8], [8, 3.2], [6.8, 2.4]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.3" fill="white" />
      ))}
    </FlagWrap>
  );
}

/** Узбекистан — синяя, белая, зелёная; красные разделители, полумесяц и 12 звёзд (офиц. 2:1) */
function FlagUzbekistan() {
  return (
    <FlagWrap>
      <rect width="24" height="4" fill="#0099CC" />
      <rect y="4" width="24" height="4" fill="white" />
      <rect y="8" width="24" height="4" fill="#00A651" />
      <path fill="none" stroke="#E31E24" strokeWidth="0.25" d="M0 3.8h24M0 4.2h24M0 7.8h24M0 8.2h24" />
      <circle cx="4" cy="2" r="1.8" fill="white" />
      <circle cx="4.8" cy="2" r="1.4" fill="#0099CC" />
      {[[8, 1.4], [9.2, 2], [9.2, 2.8], [8, 3.2], [6.8, 2.4]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.25" fill="white" />
      ))}
    </FlagWrap>
  );
}

/** Казахстан — голубое поле, золотое солнце с 32 лучами, орнамент у древка (офиц. 2:1) */
function FlagKazakhstan() {
  return (
    <FlagWrap>
      <rect width="24" height="12" fill="#00AFCA" />
      <circle cx="10" cy="6" r="2.8" fill="#FEC50C" />
      <circle cx="10" cy="6" r="1.6" fill="#00AFCA" />
      <path fill="#FEC50C" d="M10 3.6l.2.6h.65l-.55.4.2.6-.55-.4-.55.4.2-.6-.55-.4h.65z" />
    </FlagWrap>
  );
}

/** Россия — белая, синяя, красная полосы (офиц. 2:1) */
function FlagRussia() {
  return (
    <FlagWrap>
      <rect width="24" height="4" fill="white" />
      <rect y="4" width="24" height="4" fill="#0039A6" />
      <rect y="8" width="24" height="4" fill="#D52B1E" />
    </FlagWrap>
  );
}

/** Великобритания — Union Jack (офиц. 2:1) */
function FlagUK() {
  return (
    <FlagWrap>
      <rect width="24" height="12" fill="#012169" />
      <path fill="none" stroke="white" strokeWidth="1.4" d="M0 0l24 12M24 0L0 12" />
      <path fill="none" stroke="white" strokeWidth="0.8" d="M12 0v12M0 6h24" />
      <path fill="none" stroke="#C8102E" strokeWidth="0.8" d="M12 0v12M0 6h24" />
      <path fill="none" stroke="#C8102E" strokeWidth="1" d="M0 0l24 12M24 0L0 12" />
    </FlagWrap>
  );
}

type FlagId = "karakalpak" | "uzbek" | "kazakh" | "russian" | "english";

const LANGUAGE_KEYS: { key: "langKarakalpak" | "langUzbek" | "langKazakh" | "langRussian" | "langEnglish"; levelKey: "levelNative" | "levelC1" | "levelB2"; flag: FlagId }[] = [
  { key: "langKarakalpak", levelKey: "levelNative", flag: "karakalpak" },
  { key: "langUzbek", levelKey: "levelC1", flag: "uzbek" },
  { key: "langKazakh", levelKey: "levelC1", flag: "kazakh" },
  { key: "langRussian", levelKey: "levelC1", flag: "russian" },
  { key: "langEnglish", levelKey: "levelB2", flag: "english" },
];

function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="text-[10px] font-semibold tracking-[0.28em] uppercase text-accent mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function LanguageFlag({ flag }: { flag: FlagId }) {
  switch (flag) {
    case "karakalpak":
      return <FlagKarakalpakstan />;
    case "uzbek":
      return <FlagUzbekistan />;
    case "kazakh":
      return <FlagKazakhstan />;
    case "russian":
      return <FlagRussia />;
    case "english":
      return <FlagUK />;
    default:
      return <FlagKarakalpakstan />;
  }
}

export function InfoPageClient() {
  const t = useTranslations("info");
  const tExp = useTranslations("experience");

  const skillList = t("skills").split(" · ").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <h1 className="text-2xl md:text-3xl font-display font-semibold text-white tracking-tight mb-12">
        {t("title")}
      </h1>

      <div className="space-y-12">
        {/* 1. Обо мне */}
        <Section title={t("aboutTitle")}>
          <p className="text-zinc-400 text-[15px] leading-relaxed">
            {t("aboutText")}
          </p>
        </Section>

        {/* 2. Языки */}
        <Section title={t("languagesTitle")}>
          <ul className="space-y-3">
            {LANGUAGE_KEYS.map(({ key, levelKey, flag }) => (
              <li
                key={key}
                className="flex items-center gap-3 text-zinc-300 text-sm"
              >
                <LanguageFlag flag={flag} />
                <span className="font-medium">{t(key)}</span>
                <span className="text-zinc-400 text-xs">—</span>
                <span className="text-accent/90 text-xs">{t(levelKey)}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* 3. Навыки */}
        <Section title={t("skillsTitle")}>
          <div className="flex flex-wrap gap-2">
            {skillList.map((skill, i) => (
              <span
                key={`${i}-${skill.slice(0, 8)}`}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/10 text-zinc-400 text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        {/* 4. Образование — по строкам */}
        <Section title={t("educationTitle")}>
          <div className="text-zinc-400 text-sm leading-relaxed space-y-1">
            <p className="font-medium text-zinc-300">{t("educationInstitution")}</p>
            <p>{t("educationYear")}</p>
            <p>{t("educationSpecialty")}</p>
          </div>
        </Section>

        {/* 5. Квалификационная практика */}
        <Section title={tExp("title")}>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {t("experienceShort")}
          </p>
        </Section>

        {/* 6. Сертификаты */}
        <Section title={t("certificatesTitle")}>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {t("certificate1")}
          </p>
        </Section>

        {/* 7. Соцсети и каналы */}
        <Section title={t("socialTitle")}>
          <ul className="flex flex-wrap gap-3">
            <li>
              <a
                href="https://open.spotify.com/user/31wj6kq2rjs5dqcusctsvmofqsye?si=aa97ba562a214560"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 text-sm font-medium hover:border-white/20 hover:bg-white/[0.08] hover:text-white transition-colors"
              >
                <SpotifyIcon className="w-5 h-5" />
                {t("spotify")}
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/a_satullayev?utm_source=qr&igsh=djR4NG92czV3NW96"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 text-sm font-medium hover:border-white/20 hover:bg-white/[0.08] hover:text-white transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
                {t("instagram")}
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/@kadextar?si=EEh1XfZVSS2EdceD"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 text-sm font-medium hover:border-white/20 hover:bg-white/[0.08] hover:text-white transition-colors"
              >
                <YouTubeIcon className="w-5 h-5" />
                {t("youtube")}
              </a>
            </li>
          </ul>
        </Section>

      </div>
    </div>
  );
}
