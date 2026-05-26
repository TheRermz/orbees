import type { ReactNode } from "react";

export interface SubMenu {
  label: string;
  path: string;
  icon: ReactNode;
}

export interface MenuGroup {
  label: string;
  icon: ReactNode;
  basePath: string;
  subMenus: SubMenu[];
}

export interface MainLayoutProps {
  children: ReactNode;
}
