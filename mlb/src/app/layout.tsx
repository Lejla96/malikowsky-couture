import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MLB Marketplace | Premium Event Planning in Macedonia",
  description:
    "Discover Macedonia's finest event professionals. From weddings to celebrations, find and book the perfect vendors for your special day. A premium digital ecosystem empowering Roma entrepreneurs.",
  keywords: [
    "wedding planning",
    "Macedonia events",
    "Roma businesses",
    "wedding vendors",
    "event marketplace",
    "Skopje wedding",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-ivory-50 text-charcoal-900">
        <Providers>
          <Header />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
