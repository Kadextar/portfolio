import { setRequestLocale } from "next-intl/server";
import { InfoPageClient } from "./InfoPageClient";

type Props = { params: Promise<{ locale: string }> };

export default async function InfoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <InfoPageClient />
    </div>
  );
}
