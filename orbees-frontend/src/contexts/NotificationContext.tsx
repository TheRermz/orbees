import { createContext } from "react";
import type { NotificationContextData } from "./interface";

export const NotificationContext =
  createContext<NotificationContextData | null>(null);
