import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Contact } from "@/components/Contact";

const BASE_URL = "https://azamatsatullaev.com";

const CONTACT_PAGE_JSON_LD = (locale: string) => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact — Azamat Satullaev",
  url: `${BASE_URL}/${locale}/contact`,
  mainEntity: {
    "@type": "Person",
    name: "Azamat Satullaev",
    email: "kadextar@gmail.com",
    sameAs: [
      "https://linkedin.com/in/kadextar",
      "https://t.me/a_satullaev",
      "https://instagram.com/a_satullayev",
      "https://youtube.com/@kadextar",
    ],
  },
});

const CONTACT_BREADCRUMB_JSON_LD = (locale: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${BASE_URL}/${locale}/contact` },
  ],
});

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const url = `${BASE_URL}/${locale}/contact`;
  const titles: Record<string, string> = {
    en: "Contact — Azamat Satullaev",
    ru: "Контакты — Азамат Сатуллаев",
    uz: "Aloqa — Azamat Satullayev",
  };
  const descriptions: Record<string, string> = {
    en: "Get in touch for opportunities and projects.",
    ru: "Связаться по вопросам сотрудничества и проектов.",
    uz: "Loyihalar va hamkorlik uchun bog'laning.",
  };
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    openGraph: { url, title: titles[locale] ?? titles.en, description: descriptions[locale] ?? descriptions.en },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_PAGE_JSON_LD(locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_BREADCRUMB_JSON_LD(locale)) }}
      />
      <Contact />
    </div>
  );
}
