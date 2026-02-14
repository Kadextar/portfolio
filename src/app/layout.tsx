import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yoursite.com"),
  title: "Portfolio | Hospitality Management & Research",
  description:
    "Academic portfolio showcasing research, publications, and experience in Hospitality Management. International perspective with premium standards.",
  keywords: [
    "hospitality management",
    "research",
    "academic portfolio",
    "hotel management",
    "tourism research",
  ],
  authors: [{ name: "Portfolio" }],
  openGraph: {
    title: "Hospitality Management & Research Portfolio",
    description: "Academic portfolio for universities and industry professionals",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#050506] text-zinc-100 min-h-screen`}
      >
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
