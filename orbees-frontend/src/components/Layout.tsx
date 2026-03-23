import { useState, useRef, useEffect } from 'react';
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
  Compass,
  Lightbulb,
  Briefcase,
  Crown,
  Camera,
  Check,
  X,
} from 'lucide-react';
import './Layout.css';
import { loadNotifications, markAllRead, addNotification, unreadCount, type ONotification } from '../utils/notifications';
import { transactions } from '../data/mockData';

/* ── USER PROFILE (localStorage) ─────────────────────── */
function loadProfile() {
  try {
    const raw = localStorage.getItem('orbees_profile');
    if (raw) return JSON.parse(raw) as { name: string; photo: string | null };
  } catch { /* */ }
  return { name: 'Gabriella', photo: null };
}
function saveProfile(p: { name: string; photo: string | null }) {
  localStorage.setItem('orbees_profile', JSON.stringify(p));
}

/* ── NAV STRUCTURE ────────────────────────────────────── */
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
      { to: '/education/inicio',       icon: Compass,    label: 'Início' },
      { to: '/education/fundamentos',  icon: Lightbulb,  label: 'Fundamentos' },
      { to: '/education/direitos',      icon: Briefcase,  label: 'Direitos e Tributos' },
      { to: '/education/calculadoras', icon: Calculator, label: 'Calculadoras' },
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

/* ── PROFILE EDIT POPOVER ─────────────────────────────── */
function ProfilePopover({
  profile,
  onSave,
  onClose,
}: {
  profile: { name: string; photo: string | null };
  onSave: (p: { name: string; photo: string | null }) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(profile.name);
  const [photo, setPhoto] = useState<string | null>(profile.photo);
  const fileRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  /* close on outside click */
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleSave() {
    if (!name.trim()) return;
    onSave({ name: name.trim(), photo });
    onClose();
  }

  const initial = name.trim().charAt(0).toUpperCase() || 'U';

  return (
    <div className="profile-popover" ref={popoverRef}>
      <div className="profile-popover-header">
        <span>Editar perfil</span>
        <button className="profile-popover-close" onClick={onClose}><X size={14} /></button>
      </div>

      {/* Avatar edit */}
      <div className="profile-avatar-edit">
        <div className="profile-avatar-preview">
          {photo
            ? <img src={photo} alt="Foto de perfil" />
            : <span>{initial}</span>
          }
          <button
            className="profile-avatar-camera"
            onClick={() => fileRef.current?.click()}
            title="Alterar foto"
          >
            <Camera size={14} />
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handlePhoto}
        />
        <div className="profile-avatar-hint">
          <span>Foto de perfil</span>
          <button
            className="profile-photo-btn"
            onClick={() => fileRef.current?.click()}
          >
            Alterar foto
          </button>
          {photo && (
            <button
              className="profile-photo-remove"
              onClick={() => setPhoto(null)}
            >
              Remover
            </button>
          )}
        </div>
      </div>

      {/* Name field */}
      <div className="profile-field">
        <label>Nome</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Seu nome"
          className="profile-input"
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          autoFocus
        />
      </div>

      <div className="profile-role-row">
        <span className="profile-role-badge">Conta Pessoal</span>
      </div>

      <div className="profile-actions">
        <button className="profile-cancel" onClick={onClose}>Cancelar</button>
        <button className="profile-save" onClick={handleSave} disabled={!name.trim()}>
          <Check size={14} /> Salvar
        </button>
      </div>
    </div>
  );
}

/* ── NOTIFICATION PANEL ───────────────────────────────── */
function NotificationPanel({ onClose }: { onClose: () => void }) {
  const [notifs, setNotifs] = useState<ONotification[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    markAllRead();
    setNotifs(loadNotifications());
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const icons: Record<string, string> = { download: '⬇', warning: '⚠', info: 'ℹ' };

  return (
    <div className="notif-panel" ref={panelRef}>
      <div className="notif-panel-header">
        <span>Notificações</span>
        <button className="notif-close" onClick={onClose}><X size={14} /></button>
      </div>
      {notifs.length === 0 ? (
        <div className="notif-empty">Nenhuma notificação no momento.</div>
      ) : (
        <div className="notif-list">
          {notifs.map(n => (
            <div key={n.id} className={`notif-item notif-${n.type}`}>
              <div className="notif-item-top">
                <span className="notif-icon">{icons[n.type]}</span>
                <div className="notif-body">
                  <div className="notif-title">{n.title}</div>
                  <div className="notif-msg">{n.message}</div>
                  {n.href && (
                    <a href={n.href} download={n.filename} className="notif-dl-link">
                      Baixar {n.filename}
                    </a>
                  )}
                  <div className="notif-time">{new Date(n.createdAt).toLocaleString('pt-BR')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── MAIN LAYOUT ──────────────────────────────────────── */
export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [profile, setProfile] = useState(loadProfile);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [badge, setBadge] = useState(unreadCount);

  // listen for new notifications
  useEffect(() => {
    const handler = () => setBadge(unreadCount());
    window.addEventListener('orbees:notification', handler);
    return () => window.removeEventListener('orbees:notification', handler);
  }, []);

  // check 7 days without import
  useEffect(() => {
    const lastDate = transactions.map(t => t.date).sort().at(-1) ?? '';
    if (!lastDate) return;
    const diffDays = Math.floor((Date.now() - new Date(lastDate).getTime()) / 86400000);
    if (diffDays >= 7) {
      const already = loadNotifications().some(n => n.title === 'Extrato desatualizado');
      if (!already) {
        addNotification({
          type: 'warning',
          title: 'Extrato desatualizado',
          message: `Nenhum dado importado nos últimos ${diffDays} dias. Acesse "Importar Extrato" para atualizar suas transações.`,
        });
      }
    }
  }, []);

  function handleSave(p: { name: string; photo: string | null }) {
    setProfile(p);
    saveProfile(p);
  }

  const initial = profile.name.charAt(0).toUpperCase();

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
          <div className="header-left" />
          <div className="header-right">
            <div className="notif-btn-wrap">
              <button
                className="header-btn"
                onClick={() => { setShowNotif(v => !v); setShowProfile(false); setBadge(0); }}
              >
                <Bell size={18} />
                {badge > 0 && <span className="notif-badge">{badge}</span>}
              </button>
              {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} />}
            </div>

            {/* Clickable user area */}
            <div className="user-area" onClick={() => setShowProfile(v => !v)}>
              <div className="user-avatar">
                {profile.photo
                  ? <img src={profile.photo} alt="Foto de perfil" className="user-avatar-img" />
                  : <span>{initial}</span>
                }
              </div>
              <div className="user-info">
                <span className="user-name">{profile.name}</span>
                <span className="user-role">Conta Pessoal</span>
              </div>
            </div>

            {showProfile && (
              <ProfilePopover
                profile={profile}
                onSave={handleSave}
                onClose={() => setShowProfile(false)}
              />
            )}
          </div>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
