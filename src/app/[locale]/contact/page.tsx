import { setRequestLocale } from "next-intl/server";
import { Contact } from "@/components/Contact";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <Contact />
    </div>
  );
}
