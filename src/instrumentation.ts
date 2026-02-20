export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (dsn) {
      const Sentry = await import("@sentry/nextjs");
      Sentry.init({
        dsn,
        tracesSampleRate: 0.1,
        environment: process.env.NODE_ENV,
      });
    }
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (dsn) {
      const Sentry = await import("@sentry/nextjs");
      Sentry.init({
        dsn,
        tracesSampleRate: 0.1,
        environment: process.env.NODE_ENV,
      });
    }
  }
}
