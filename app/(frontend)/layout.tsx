import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./providers/reactqueryprovider";
import { Toaster } from "sonner";
import ThemeProvider from "./components/providers/ThemeProvider";
import AccentProvider from "./components/providers/AccentProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CateringStore",
  description: "everything on your doorstep",
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
