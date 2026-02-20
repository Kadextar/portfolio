"use client";

import { useEffect } from "react";

const HINTS: { rel: string; href: string; crossOrigin?: string }[] = [
  { rel: "preconnect", href: "https://plausible.io" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
];

/**
 * Injects preconnect link tags for Plausible and Google Fonts (faster first request).
 * Runs on client to avoid hydration; links are optional enhancement.
 */
export function ResourceHints() {
  useEffect(() => {
    for (const { rel, href, crossOrigin } of HINTS) {
      if (document.querySelector(`link[rel="${rel}"][href="${href}"]`)) continue;
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      if (crossOrigin) link.setAttribute("crossorigin", crossOrigin);
      document.head.appendChild(link);
    }
  }, []);
  return null;
}
