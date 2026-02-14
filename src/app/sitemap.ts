import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const baseUrl = "https://azamatsatullaev.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
  ]);
}
