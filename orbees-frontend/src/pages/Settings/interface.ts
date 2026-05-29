export type Tab = "profile" | "groups" | "security";

export interface TabsProps {
  onToast: (type: "success" | "error", message: string) => void;
}
