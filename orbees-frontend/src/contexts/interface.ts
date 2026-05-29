export interface ToastData {
  type: "success" | "error";
  message: string;
}

export interface ToastContextData {
  showToast: (type: "success" | "error", message: string) => void;
}
