import {
  ArrowLeftRight,
  BookOpen,
  Calculator,
  GraduationCap,
  LayoutDashboard,
  Scale,
  Tag,
  Upload,
  Users,
  Wallet,
} from "lucide-react";
import type { MenuGroup } from "./interface";

export const menuGroups: MenuGroup[] = [
  {
    label: "Controle Individual",
    icon: <Wallet size={16} />,
    basePath: "/individual",
    subMenus: [
      {
        label: "Dashboard",
        path: "/individual/dashboard",
        icon: <LayoutDashboard size={14} />,
      },
      {
        label: "Transações",
        path: "/individual/transactions",
        icon: <ArrowLeftRight size={14} />,
      },
      {
        label: "Categorias",
        path: "/individual/categories",
        icon: <Tag size={14} />,
      },
      {
        label: "Importar Extrato",
        path: "/individual/import",
        icon: <Upload size={14} />,
      },
    ],
  },
  {
    label: "Controle em Grupo",
    icon: <Users size={16} />,
    basePath: "/group",
    subMenus: [
      {
        label: "Dashboard",
        path: "/group/:groupId/dashboard",
        icon: <LayoutDashboard size={14} />,
      },
      {
        label: "Transações",
        path: "/group/:groupId/transactions",
        icon: <ArrowLeftRight size={14} />,
      },
      {
        label: "Categorias",
        path: "/group/:groupId/categories",
        icon: <Tag size={14} />,
      },
      {
        label: "Membros",
        path: "/group/:groupId/members",
        icon: <Users size={14} />,
      },
    ],
  },
  {
    label: "Educação Financeira",
    icon: <GraduationCap size={16} />,
    basePath: "/education",
    subMenus: [
      {
        label: "Início",
        path: "/education/home",
        icon: <BookOpen size={14} />,
      },
      {
        label: "Fundamentos",
        path: "/education/fundamentals",
        icon: <BookOpen size={14} />,
      },
      {
        label: "Direito e Tributos",
        path: "/education/law",
        icon: <Scale size={14} />,
      },
      {
        label: "Calculadoras",
        path: "/education/calculators",
        icon: <Calculator size={14} />,
      },
    ],
  },
];
