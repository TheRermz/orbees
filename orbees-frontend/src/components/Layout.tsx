import { useState } from 'react';
import { NavLink, Outlet, useMatch } from 'react-router-dom';
import {
  LayoutDashboard,
  List,
  Tag,
  FolderOpen,
  BookOpen,
  Users,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Calculator,
  FileText,
  Crown,
} from 'lucide-react';
import './Layout.css';

const navStructure = [
  {
    to: '/individual',
    icon: LayoutDashboard,
    label: 'Controle Individual',
    children: [
      { to: '/individual/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/individual/transactions', icon: List, label: 'Transações' },
      { to: '/individual/categories', icon: Tag, label: 'Categorias' },
      { to: '/individual/upload', icon: FolderOpen, label: 'Importar Extrato' },
    ],
  },
  {
    to: '/group',
    icon: Users,
    label: 'Controle em Grupo',
    children: [
      { to: '/group/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/group/transactions', icon: List, label: 'Transações' },
      { to: '/group/categories', icon: Tag, label: 'Categorias' },
      { to: '/group/members', icon: Crown, label: 'Membros' },
    ],
  },
  {
    to: '/education',
    icon: BookOpen,
    label: 'Educação Financeira',
    children: [
      { to: '/education/calculadoras', icon: Calculator, label: 'Calculadoras' },
      { to: '/education/irpf', icon: FileText, label: 'Imposto de Renda' },
      { to: '/education/guias', icon: BookOpen, label: 'Guias Financeiros' },
    ],
  },
];

function NavGroup({ item, collapsed }: { item: typeof navStructure[0]; collapsed: boolean }) {
  const isParentActive = !!useMatch({ path: item.to, end: false });

  return (
    <div className="nav-group">
      <NavLink
        to={item.children.length ? item.children[0].to : item.to}
        className={() => `nav-item nav-parent ${isParentActive ? 'active' : ''}`}
      >
        <span className="nav-icon"><item.icon size={18} /></span>
        {!collapsed && <span className="nav-label">{item.label}</span>}
      </NavLink>

      {!collapsed && isParentActive && item.children.length > 0 && (
        <div className="nav-children">
          {item.children.map(child => (
            <NavLink
              key={child.to}
              to={child.to}
              end
              className={({ isActive }) => `nav-item nav-child ${isActive ? 'active-child' : ''}`}
            >
              <span className="nav-icon"><child.icon size={14} /></span>
              <span className="nav-label">{child.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`layout ${collapsed ? 'collapsed' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-logo">
          {collapsed
            ? <img src="/orbees-branco.png" alt="Orbees" className="logo-collapsed" />
            : <img src="/orbees-branco.png" alt="Orbees" className="logo-full" />
          }
        </div>

        <nav className="sidebar-nav">
          {navStructure.map(item => (
            <NavGroup key={item.to} item={item} collapsed={collapsed} />
          ))}
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="nav-icon"><Settings size={18} /></span>
            {!collapsed && <span className="nav-label">Configurações</span>}
          </NavLink>
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </aside>

      <div className="main-wrapper">
        <header className="header">
          <div className="header-left">
            <h2 className="page-title">Março 2026</h2>
          </div>
          <div className="header-right">
            <button className="header-btn"><Bell size={18} /></button>
            <div className="user-avatar">
              <span>G</span>
            </div>
            <div className="user-info">
              <span className="user-name">Gabriella</span>
              <span className="user-role">Conta Pessoal</span>
            </div>
          </div>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
