import { setRequestLocale } from "next-intl/server";
import { Contact } from "@/components/Contact";

const BASE_URL = "https://azamatsatullaev.com";

const CONTACT_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact — Azamat Satullaev",
  url: `${BASE_URL}/contact`,
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
};

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_PAGE_JSON_LD) }}
      />
      <Contact />
    </div>
  );
}
