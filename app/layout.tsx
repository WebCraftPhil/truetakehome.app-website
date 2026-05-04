import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://truetakehome.app"),
  // These asset paths are root-relative and assume the app is deployed at the
  // site root. If we ever add a basePath, these should be centralized first.
  title: "TrueTakeHome | See Your Real Etsy Profit",
  description:
    "Find your real Etsy profit after fees, production costs, ads, and tools.",
  keywords: [
    "Etsy profit calculator",
    "Etsy fees",
    "Etsy CSV",
    "seller profit",
    "TrueTakeHome",
  ],
  openGraph: {
    title: "TrueTakeHome | See Your Real Etsy Profit",
    description:
      "Etsy shows you revenue. TrueTakeHome shows what you actually keep.",
    url: "https://truetakehome.app",
    siteName: "TrueTakeHome",
    images: [
      {
        url: "/logo.png",
        width: 1254,
        height: 1254,
        alt: "TrueTakeHome logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrueTakeHome | See Your Real Etsy Profit",
    description:
      "See what you actually kept after Etsy fees, production, ads, and tools.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
