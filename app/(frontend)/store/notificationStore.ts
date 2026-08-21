// dashboard/store/notificationStore.ts

import { create } from "zustand";
import { NotificationStore } from "./types/type";


export const useNotificationStore =
  create<NotificationStore>((set) => ({
    notifications: [],

    addNotification: (notification) =>
      set((state) => ({
        notifications: [
          notification,
          ...state.notifications,
        ],
      })),

    removeNotification: (id) =>
      set((state) => ({
        notifications: state.notifications.filter(
          (notification) =>
            notification.id !== id
        ),
      })),

    clearNotifications: () =>
      set({
        notifications: [],
      }),
  }));