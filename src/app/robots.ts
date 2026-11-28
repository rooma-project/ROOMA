import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Keep the demo out of search crawlers until launch.
  // This is not authentication or access control.
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
