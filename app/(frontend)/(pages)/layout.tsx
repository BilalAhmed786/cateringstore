"use client";

import { useEffect } from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

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
      <Header />

      <main className="w-full min-h-screen">
        {children}
      </main>

      <Footer />
    </div>
  );
}