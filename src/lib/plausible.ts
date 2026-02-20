/**
 * Plausible custom events. Safe to call even when Plausible is not loaded.
 */
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function trackEvent(eventName: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(eventName, props ? { props } : undefined);
  } catch {
    // ignore
  }
}

export const PlausibleEvents = {
  ResumeClicked: "Resume clicked",
  ContactCTA: "Contact CTA",
  ContactFormSent: "Contact form sent",
  ProjectOpened: "Project opened",
  LanguageSwitched: "Language switched",
} as const;
