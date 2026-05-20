import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { ResourceHints } from "@/components/ResourceHints";
import { ThemeProvider } from "@/contexts/ThemeContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const LOCALES = ["en", "ru", "uz"] as const;

export const metadata = {
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const localeHeader = headersList.get("x-next-locale") ?? "en";
  const lang = LOCALES.includes(localeHeader as (typeof LOCALES)[number])
    ? localeHeader
    : "en";

  return (
    <html lang={lang} className="dark" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${playfair.variable} font-sans antialiased bg-[#030303] text-zinc-100 min-h-screen`}
        suppressHydrationWarning
      >
        <ResourceHints />
        <Analytics />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
