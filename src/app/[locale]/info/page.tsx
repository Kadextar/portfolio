import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { InfoPageClient } from "./InfoPageClient";

const BASE_URL = "https://azamatsatullaev.com";

const INFO_BREADCRUMB_JSON_LD = (locale: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
    { "@type": "ListItem", position: 2, name: "Info", item: `${BASE_URL}/${locale}/info` },
  ],
});

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const url = `${BASE_URL}/${locale}/info`;
  const titles: Record<string, string> = {
    en: "Info — Azamat Satullaev",
    ru: "Инфо — Азамат Сатуллаев",
    uz: "Info — Azamat Satullayev",
  };
  const descriptions: Record<string, string> = {
    en: "About me, experience, and skills.",
    ru: "Обо мне, опыт и навыки.",
    uz: "Men haqimda, tajriba va ko'nikmalar.",
  };
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    openGraph: { url, title: titles[locale] ?? titles.en, description: descriptions[locale] ?? descriptions.en },
  };
}

export default async function InfoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(INFO_BREADCRUMB_JSON_LD(locale)) }}
      />
      <InfoPageClient />
    </div>
  );
}
