import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Only general discovery pages. Do not list private account routes or demo profiles.
  const paths = ["/", "/rooms", "/map", "/roommates"];

  return paths.map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
