import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import './Layout.css';

const navItems = [
  { to: '/individual', icon: LayoutDashboard, label: 'Controle Individual' },
  { to: '/group', icon: Users, label: 'Controle em Grupo' },
  { to: '/education', icon: BookOpen, label: 'Educação Financeira' },
];

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
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon"><item.icon size={18} /></span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
            </NavLink>
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
