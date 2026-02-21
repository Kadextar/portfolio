import Link from "next/link";

/**
 * Custom 404 — dark theme, minimal, link to home.
 * Shown when route is not found (e.g. /en/unknown-page or invalid path).
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050506] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-3">
        404
      </p>
      <h1 className="font-display text-3xl md:text-4xl font-normal text-white mb-2">
        Страница не найдена
      </h1>
      <p className="text-zinc-400 text-sm mb-8 max-w-sm">
        Page not found. The link may be broken or the page has been moved.
      </p>
      <Link
        href="/en"
        className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-light focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-[#050506]"
      >
        На главную / Home
      </Link>
    </div>
  );
}
