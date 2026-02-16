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
import { LocaleTransitionProvider } from "@/components/LocaleTransitionContext";
import { MotionProvider } from "@/providers/MotionProvider";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const BASE_URL = "https://azamatsatullaev.com";
const LOCALES_META = ["en", "ru", "uz"] as const;

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Azamat Satullaev",
  url: BASE_URL,
  jobTitle: "Hospitality & Management",
  email: "kadextar@gmail.com",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Samarkand Institute of Economics and Service",
  },
  sameAs: [
    "https://linkedin.com/in/kadextar",
    "https://instagram.com/a_satullayev",
    "https://youtube.com/@kadextar",
    "https://open.spotify.com/user/31wj6kq2rjs5dqcusctsvmofqsye",
  ],
};

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
      type: "website",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
      />
      <LocaleSync locale={locale} />
      <LocaleTransitionProvider>
        <MotionProvider>
          <Navbar />
          <ClientProviders>
            <main className="relative min-h-screen">{children}</main>
          </ClientProviders>
          <Footer />
          <ScrollToTop />
        </MotionProvider>
      </LocaleTransitionProvider>
    </NextIntlClientProvider>
  );
}
