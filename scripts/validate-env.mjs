#!/usr/bin/env node
/**
 * Validates env vars at build time. Optional vars are checked for format when set.
 * Add required vars here and throw to fail the build when missing.
 */

const optional = {
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: (v) =>
    typeof v === "string" && v.length > 0 && !v.startsWith("http"),
  NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL: (v) => {
    if (typeof v !== "string" || !v.startsWith("http")) return false;
    try {
      new URL(v);
      return true;
    } catch {
      return false;
    }
  },
  NEXT_PUBLIC_SENTRY_DSN: (v) =>
    typeof v === "string" && (v === "" || v.startsWith("https://")),
  SENTRY_DSN: (v) =>
    typeof v === "string" && (v === "" || v.startsWith("https://")),
};

function validate() {
  for (const [key, fn] of Object.entries(optional)) {
    const value = process.env[key];
    if (value !== undefined && value !== "" && !fn(value)) {
      console.error(`Invalid ${key}: value must pass format check.`);
      process.exit(1);
    }
  }
}

validate();
