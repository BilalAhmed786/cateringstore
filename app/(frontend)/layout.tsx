import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./providers/reactqueryprovider";
import { Toaster } from "sonner";
import ThemeProvider from "./components/providers/ThemeProvider";
import AccentProvider from "./components/providers/AccentProvider";
import StructuredData from "./(pages)/(Home)/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cateringstore.vercel.app"), // Updated to https:// for production security
  title: {
    default: "Premium Catering Services & Hampers | Catering Store",
    template: "%s | Catering Store",
  },
  description:
    "Order high-quality catering packages, menu items, event hampers, and schedule tasting sessions online.",
  keywords: [
    "catering",
    "events",
    "hampers",
    "food delivery",
    "event packages",
    "tasting",
  ],
  authors: [{ name: "Saif Catering Store" }],
  openGraph: {
    title: "Premium Catering Services & Hampers",
    description:
      "Order high-quality catering packages, menu items, event hampers, and schedule tasting sessions online.",
    url: "https://cateringstore.vercel.app",
    siteName: "Catering Store",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Catering Store Preview",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "EvOVZMuw3FVCHLgiL2GaP0farTP6iLJpbneNOMPJckI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2. Place StructuredData inside body so Google parses it globally */}
        <StructuredData />

        <ReactQueryProvider>
          <AccentProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AccentProvider>

          <Toaster position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
