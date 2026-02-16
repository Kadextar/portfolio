"use client";

import Script from "next/script";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const PLAUSIBLE_SCRIPT_URL = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL;

const INLINE_INIT = `
  window.plausible = window.plausible || function() { (plausible.q = plausible.q || []).push(arguments); };
  plausible.init = plausible.init || function(i) { plausible.o = i || {}; };
  plausible.init();
`;

/**
 * Privacy-friendly analytics (Plausible).
 * Option A: set NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL (from Plausible install page) — recommended, passes verification.
 * Option B: set NEXT_PUBLIC_PLAUSIBLE_DOMAIN — standard script (data-domain).
 */
export function Analytics() {
  if (PLAUSIBLE_SCRIPT_URL) {
    return (
      <>
        <Script
          src={PLAUSIBLE_SCRIPT_URL}
          strategy="afterInteractive"
        />
        <script dangerouslySetInnerHTML={{ __html: INLINE_INIT }} />
      </>
    );
  }
  if (!PLAUSIBLE_DOMAIN) return null;

  return (
    <Script
      defer
      data-domain={PLAUSIBLE_DOMAIN}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
