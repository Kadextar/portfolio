import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const baseUrl = "https://azamatsatullaev.com";

const paths = ["", "/info", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path ? ("monthly" as const) : ("weekly" as const),
      priority: path ? 0.8 : 1,
    }))
  );
}
