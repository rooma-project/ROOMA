export const siteName = "ROOMA";
export const siteTitle = "ROOMA — Student housing & roommates in Istanbul";
export const siteDescription =
  "Find student accommodation, explore Istanbul neighbourhoods and discover compatible roommates with ROOMA.";

// Set NEXT_PUBLIC_SITE_URL to the actual HTTPS origin when deploying.
// Local development works without any environment variables.
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).origin;
