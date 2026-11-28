import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ToastViewport from "@/components/ui/ToastViewport";
import { siteName, siteTitle, siteDescription, siteUrl } from "@/lib/site";
import "./globals.css";
import "./accessibility.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: siteName,
  // Demo data must not be indexed. Review public and private routes before launch.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ToastViewport />
      </body>
    </html>
  );
}
