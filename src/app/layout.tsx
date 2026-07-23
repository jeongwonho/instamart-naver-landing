import type { Metadata, Viewport } from "next";
import { AttributionTracker } from "@/components/AttributionTracker";
import { MarketingPixels } from "@/components/MarketingPixels";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";
import "./channel-polish.css";

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.headline} | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: siteConfig.name,
    title: `${siteConfig.headline} | ${siteConfig.name}`,
    description: siteConfig.description,
    url: siteConfig.domain,
    images: [
      {
        url: absoluteUrl("/images/instagram-growth-command-center.png"),
        width: 1536,
        height: 1024,
        alt: "SNS 채널 성장 상담 화면",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.headline} | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [absoluteUrl("/images/instagram-growth-command-center.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [organizationSchema(), websiteSchema()];

  return (
    <html lang="ko">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <MarketingPixels />
        <AttributionTracker />
        {children}
      </body>
    </html>
  );
}
