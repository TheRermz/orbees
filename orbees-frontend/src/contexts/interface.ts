export interface ToastData {
  type: "success" | "error";
  message: string;
}

export interface ToastContextData {
  showToast: (type: "success" | "error", message: string) => void;
}

export type NotificationType = "download" | "warning" | "info";

export interface OrbNotification {
  id: string;
  type: NotificationType;
  message: string;
  createdAt: Date;
  read: boolean;
  downloadUrl?: string;
  downloadLabel?: string;
}

export interface NotificationContextData {
  notifications: OrbNotification[];
  unreadCount: number;
  addNotification: (
    n: Omit<OrbNotification, "id" | "createdAt" | "read">
  ) => void;
  markAllRead: () => void;
}
