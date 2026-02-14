import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ClientProviders } from "@/components/ClientProviders";

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
  metadataBase: new URL("https://azamatsatullaev.com"),
  title: "Azamat Satullaev | Hospitality & Management Researcher",
  description:
    "Blending strategy, analytics, and technology to shape the future of service industries. Academic portfolio showcasing research, publications, and hospitality experience.",
  keywords: [
    "Azamat Satullaev",
    "hospitality management",
    "research",
    "academic portfolio",
    "hotel management",
    "tourism research",
    "service industries",
  ],
  authors: [{ name: "Azamat Satullaev" }],
  openGraph: {
    title: "Azamat Satullaev | Hospitality & Management Researcher",
    description:
      "Blending strategy, analytics, and technology to shape the future of service industries.",
  },
  robots: {
    index: true,
    follow: true,
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
        <ClientProviders>
          <main className="relative">{children}</main>
        </ClientProviders>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
