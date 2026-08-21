"use client";

import { useEffect } from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import FCMInitializer from "../admin/dashboard/(components)/FCMInitializer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.classList.add("public-scrollbar");

    return () => {
      document.documentElement.classList.remove("public-scrollbar");
    };
  }, []);

  return (
    <div className="w-full">
      <FCMInitializer />
      <Header />

      <main className="w-full min-h-screen">
        {children}
      </main>

      <Footer />
    </div>
  );
}