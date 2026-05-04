import type { Metadata } from "next";
import "./globals.css";

const siteUrl = new URL("https://truetakehome.app");
const assetUrl = (path: string) => new URL(path, siteUrl).toString();

export const metadata: Metadata = {
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
    url: siteUrl.toString(),
    siteName: "TrueTakeHome",
    images: [
      {
        url: assetUrl("/logo.png"),
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
    images: [assetUrl("/logo.png")],
  },
  icons: {
    icon: assetUrl("/favicon.png"),
    apple: assetUrl("/favicon.png"),
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
