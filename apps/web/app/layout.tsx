import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { getClientConfig } from "@/lib/config";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getClientConfig();
  const primary = config.properties[0];
  const title = `${config.brandName} – Roma`;
  const description = primary?.description?.body["en"] ?? config.brandName;

  return {
    title,
    description,
    keywords: [config.brandName, "Airbnb Roma", ...config.properties.map((p) => p.id)],
    openGraph: {
      title,
      description: primary?.hero.subtitle["en"] ?? description,
      locale: "it_IT",
      type: "website",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
