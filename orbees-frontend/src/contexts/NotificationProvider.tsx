import { type ReactNode, useState, useCallback, useEffect } from "react";
import { NotificationContext } from "./NotificationContext";
import type { OrbNotification } from "./interface";

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<OrbNotification[]>([]);

  const addNotification = useCallback(
    (n: Omit<OrbNotification, "id" | "createdAt" | "read">) => {
      setNotifications((prev) => [
        {
          ...n,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          read: false,
        },
        ...prev,
      ]);
    },
    []
  );

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as Omit<
        OrbNotification,
        "id" | "createdAt" | "read"
      >;
      addNotification(detail);
    };
    window.addEventListener("orbees:notification", handler);
    return () => window.removeEventListener("orbees:notification", handler);
  }, [addNotification]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, addNotification, markAllRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
