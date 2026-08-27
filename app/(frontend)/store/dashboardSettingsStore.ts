import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DashboardSettingsState } from "./types/type";

export const useDashboardSettingsStore =
  create<DashboardSettingsState>()(
    persist(
      (set) => ({
        sidebar: "expanded",
        rememberSidebar: true,
        accentColor: "default",

        setSidebar: (sidebar) =>
          set({ sidebar }),

        setRememberSidebar: (value) =>
          set({ rememberSidebar: value }),

        setAccentColor: (accentColor) =>
          set({ accentColor }),
      }),
      {
        name: "dashboard-settings",
      },
    ),
  );