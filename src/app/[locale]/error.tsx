"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050506] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-accent text-xs font-medium tracking-[0.28em] uppercase mb-3">
        Error
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-normal text-white mb-2">
        {t("title")}
      </h1>
      <p className="text-zinc-500 text-sm mb-8 max-w-sm">
        {t("description")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-[#050506]"
        >
          {t("cta")}
        </button>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 px-8 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-[#050506]"
        >
          {t("home")}
        </Link>
      </div>
    </div>
  );
}
