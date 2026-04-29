import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Studio Via Mentana – Roma",
  description: "Elegant studio apartment in the heart of Rome. Book your stay and experience the eternal city like a local.",
  keywords: ["studio Roma", "affitto Roma", "Airbnb Roma", "Via Mentana", "appartamento Roma centro"],
  openGraph: {
    title: "Studio Via Mentana – Roma",
    description: "Elegant studio apartment in the heart of Rome.",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
