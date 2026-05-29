import { createContext } from "react";
import type { ToastContextData } from "./interface";

export const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData
);
