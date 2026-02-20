"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#050506", color: "#fff", fontFamily: "system-ui", padding: 24, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ fontSize: 20, marginBottom: 8 }}>Something went wrong</h1>
        <p style={{ color: "#888", marginBottom: 24 }}>An unexpected error occurred.</p>
        <button
          type="button"
          onClick={reset}
          style={{ padding: "12px 24px", background: "#c9a227", color: "#000", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
