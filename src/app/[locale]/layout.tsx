import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ClientProviders } from "@/components/ClientProviders";
import { LocaleSync } from "@/components/LocaleSync";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const BASE_URL = "https://azamatsatullaev.com";
const LOCALES_META = ["en", "ru", "uz"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Azamat Satullaev | Hospitality & Management Researcher",
    ru: "Азамат Сатуллаев | Исследователь в сфере гостеприимства и менеджмента",
    uz: "Azamat Satullayev | Mehmondo'stlik va menejment tadqiqotchisi",
  };
  const descriptions: Record<string, string> = {
    en: "Blending strategy, analytics, and technology to shape the future of service industries.",
    ru: "Стратегия, аналитика и технологии для будущего индустрии услуг.",
    uz: "Strategiya, tahlil va texnologiyalar orqali xizmatlar sanoatining kelajagini shakllantirish.",
  };
  const canonical = `${BASE_URL}/${locale}`;
  const languages: Record<string, string> = {};
  for (const loc of LOCALES_META) {
    languages[loc] = `${BASE_URL}/${loc}`;
  }
  return {
    metadataBase: new URL(BASE_URL),
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      locale: locale === "en" ? "en_US" : locale === "ru" ? "ru_RU" : "uz_UZ",
      url: canonical,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleSync locale={locale} />
      <Navbar />
      <ClientProviders>
        <main className="relative min-h-screen">{children}</main>
      </ClientProviders>
      <Footer />
      <ScrollToTop />
    </NextIntlClientProvider>
  );
}
