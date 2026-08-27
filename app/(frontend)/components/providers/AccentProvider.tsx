"use client";

import { useEffect } from "react";
import { useDashboardSettingsStore } from "@/app/(frontend)/store/dashboardSettingsStore";

export default function AccentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const accentColor = useDashboardSettingsStore(
    (state) => state.accentColor
  );

  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove(
      "accent-default",
      "accent-blue",
      "accent-green",
      "accent-purple"
    );

    html.classList.add(`accent-${accentColor}`);

    return () => {
      html.classList.remove(
        "accent-default",
        "accent-blue",
        "accent-green",
        "accent-purple"
      );
    };
  }, [accentColor]);

  return <>{children}</>;
}