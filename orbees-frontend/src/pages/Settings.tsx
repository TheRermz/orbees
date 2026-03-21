import { useState, useRef } from 'react';
import {
  User, Users, Lock, Camera, Check, Eye, EyeOff,
  Shield, Crown, LogOut,
} from 'lucide-react';
import './Settings.css';

/* ── localStorage helpers (same key as Layout) ─────────── */
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

/* ── Mock group data (single group per user) ────────────── */
const mockCurrentGroup = {
  id: 1,
  name: 'Família Silva',
  role: 'Administrador' as const,
  members: 4,
  createdAt: 'Agosto 2024',
};

/* ════════════════════════════════════════════════════════
   TABS
════════════════════════════════════════════════════════ */
const TABS = [
  { id: 'perfil',    label: 'Perfil',    icon: User  },
  { id: 'grupos',    label: 'Grupos',    icon: Users },
  { id: 'seguranca', label: 'Segurança', icon: Lock  },
];

export default function Settings() {
  const [tab, setTab] = useState<'perfil' | 'grupos' | 'seguranca'>('perfil');

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Configurações</h1>
        <p>Gerencie seu perfil, grupos e segurança da conta</p>
      </div>

      <div className="settings-layout">
        {/* Sidebar */}
        <nav className="settings-nav">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`settings-nav-btn${tab === t.id ? ' active' : ''}`}
              onClick={() => setTab(t.id as typeof tab)}
            >
              <t.icon size={16} />
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="settings-content">
          {tab === 'perfil'    && <TabPerfil />}
          {tab === 'grupos'    && <TabGrupos />}
          {tab === 'seguranca' && <TabSeguranca />}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   TAB: PERFIL
════════════════════════════════════════════════════════ */
function TabPerfil() {
  const [profile, setProfileState] = useState(loadProfile);
  const [name, setName] = useState(profile.name);
  const [photo, setPhoto] = useState<string | null>(profile.photo);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const initial = name.trim().charAt(0).toUpperCase() || 'U';
  const hasChanges = name.trim() !== profile.name || photo !== profile.photo;

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleSave() {
    if (!name.trim()) return;
    const updated = { name: name.trim(), photo };
    setProfileState(updated);
    saveProfile(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="settings-section">
      <div className="settings-section-title">
        <User size={18} />
        <span>Informações pessoais</span>
      </div>

      {/* Avatar */}
      <div className="profile-edit-row">
        <div className="profile-edit-avatar">
          {photo
            ? <img src={photo} alt="Foto de perfil" />
            : <span>{initial}</span>
          }
          <button
            className="profile-edit-camera"
            onClick={() => fileRef.current?.click()}
            title="Alterar foto"
          >
            <Camera size={15} />
          </button>
        </div>

        <div className="profile-edit-info">
          <span className="profile-edit-label">Foto de perfil</span>
          <span className="profile-edit-hint">JPG, PNG ou GIF. Recomendado 256×256px.</span>
          <div className="profile-edit-btns">
            <button className="btn-outline-sm" onClick={() => fileRef.current?.click()}>
              Alterar foto
            </button>
            {photo && (
              <button className="btn-danger-sm" onClick={() => setPhoto(null)}>
                Remover
              </button>
            )}
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhoto} />
      </div>

      {/* Fields */}
      <div className="settings-fields">
        <div className="settings-field">
          <label>Nome completo</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="settings-input"
            placeholder="Seu nome"
          />
        </div>

        <div className="settings-field">
          <label>Tipo de conta</label>
          <div className="settings-badge-row">
            <span className="settings-badge">Conta Pessoal</span>
          </div>
        </div>
      </div>

      <div className="settings-footer">
        {saved && (
          <span className="settings-saved-msg">
            <Check size={13} /> Perfil salvo com sucesso
          </span>
        )}
        <button
          className="btn-primary"
          onClick={handleSave}
          disabled={!hasChanges || !name.trim()}
        >
          Salvar alterações
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   TAB: GRUPOS
════════════════════════════════════════════════════════ */
function TabGrupos() {
  const [group, setGroup] = useState<typeof mockCurrentGroup | null>(mockCurrentGroup);
  const [confirmLeave, setConfirmLeave] = useState(false);

  function handleLeave() {
    setGroup(null);
    setConfirmLeave(false);
  }

  return (
    <div className="settings-section">
      <div className="settings-section-title">
        <Users size={18} />
        <span>Grupo atual</span>
      </div>

      <div className="group-rule-note">
        Cada usuário pode participar de <strong>apenas um grupo</strong> por vez.
        Para entrar em outro grupo, você precisa sair do atual primeiro.
      </div>

      {group ? (
        <>
          <div className="group-card">
            <div className="group-card-left">
              <div className="group-avatar">{group.name.charAt(0)}</div>
              <div className="group-info">
                <span className="group-name">{group.name}</span>
                <span className="group-meta">
                  {group.members} membros · Desde {group.createdAt}
                </span>
              </div>
            </div>
            <div className="group-card-right">
              <span className={`group-role-badge ${group.role === 'Administrador' ? 'admin' : 'member'}`}>
                {group.role === 'Administrador'
                  ? <><Crown size={11} /> Administrador</>
                  : <><Shield size={11} /> Membro</>
                }
              </span>
              {!confirmLeave
                ? (
                  <button className="btn-ghost-sm" onClick={() => setConfirmLeave(true)}>
                    <LogOut size={13} /> Sair do grupo
                  </button>
                ) : (
                  <div className="leave-confirm">
                    <span>Tem certeza?</span>
                    <button className="btn-danger-sm" onClick={handleLeave}>Sim, sair</button>
                    <button className="btn-outline-sm" onClick={() => setConfirmLeave(false)}>Cancelar</button>
                  </div>
                )
              }
            </div>
          </div>

          <div className="group-permissions-info">
            <h4>Suas permissões como <strong>{group.role}</strong></h4>
            {group.role === 'Administrador' ? (
              <ul className="permission-list">
                <li>Convidar novos membros</li>
                <li>Criar e editar categorias</li>
                <li>Incluir e excluir qualquer transação</li>
                <li>Ver todos os dados do grupo</li>
              </ul>
            ) : (
              <ul className="permission-list">
                <li>Visualizar todas as transações</li>
                <li>Incluir novas transações</li>
                <li>Excluir apenas suas próprias transações</li>
              </ul>
            )}
          </div>
        </>
      ) : (
        <div className="group-empty">
          <Users size={36} />
          <p>Você não faz parte de nenhum grupo.</p>
          <span>Peça a um administrador que envie um convite para o seu e-mail.</span>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   TAB: SEGURANÇA
════════════════════════════════════════════════════════ */
function TabSeguranca() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const strength = passwordStrength(next);

  function handleSubmit() {
    setStatus('idle');
    setErrorMsg('');

    if (!current) { setErrorMsg('Informe sua senha atual.'); setStatus('error'); return; }
    if (next.length < 8) { setErrorMsg('A nova senha deve ter ao menos 8 caracteres.'); setStatus('error'); return; }
    if (next !== confirm) { setErrorMsg('As senhas não coincidem.'); setStatus('error'); return; }

    /* Mock: no real backend — just simulate success */
    setStatus('success');
    setCurrent(''); setNext(''); setConfirm('');
    setTimeout(() => setStatus('idle'), 3500);
  }

  return (
    <div className="settings-section">
      <div className="settings-section-title">
        <Lock size={18} />
        <span>Redefinir senha</span>
      </div>

      <div className="settings-fields">
        <div className="settings-field">
          <label>Senha atual</label>
          <div className="password-input-wrap">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={current}
              onChange={e => setCurrent(e.target.value)}
              className="settings-input"
              placeholder="••••••••"
            />
            <button className="password-toggle" onClick={() => setShowCurrent(v => !v)}>
              {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <div className="settings-field">
          <label>Nova senha</label>
          <div className="password-input-wrap">
            <input
              type={showNext ? 'text' : 'password'}
              value={next}
              onChange={e => setNext(e.target.value)}
              className="settings-input"
              placeholder="Mínimo 8 caracteres"
            />
            <button className="password-toggle" onClick={() => setShowNext(v => !v)}>
              {showNext ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {next && (
            <div className="password-strength">
              <div className="strength-bar">
                <div
                  className={`strength-fill ${strength.level}`}
                  style={{ width: `${strength.pct}%` }}
                />
              </div>
              <span className={`strength-label ${strength.level}`}>{strength.label}</span>
            </div>
          )}
        </div>

        <div className="settings-field">
          <label>Confirmar nova senha</label>
          <div className="password-input-wrap">
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="settings-input"
              placeholder="Repita a nova senha"
            />
            <button className="password-toggle" onClick={() => setShowConfirm(v => !v)}>
              {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {confirm && next && confirm !== next && (
            <span className="field-error">As senhas não coincidem</span>
          )}
          {confirm && next && confirm === next && (
            <span className="field-ok"><Check size={12} /> Senhas coincidem</span>
          )}
        </div>
      </div>

      {status === 'error' && (
        <div className="settings-alert error">{errorMsg}</div>
      )}
      {status === 'success' && (
        <div className="settings-alert success">
          <Check size={14} /> Senha alterada com sucesso!
        </div>
      )}

      <div className="settings-footer">
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={!current || !next || !confirm}
        >
          Redefinir senha
        </button>
      </div>

      <div className="security-tips">
        <h4>Dicas de segurança</h4>
        <ul>
          <li>Use pelo menos 8 caracteres com letras, números e símbolos</li>
          <li>Não reutilize senhas de outros serviços</li>
          <li>Troque sua senha regularmente</li>
          <li>Nunca compartilhe sua senha com ninguém</li>
        </ul>
      </div>
    </div>
  );
}

/* ── Password strength helper ───────────────────────────── */
function passwordStrength(pwd: string) {
  if (!pwd) return { level: 'weak', label: '', pct: 0 };
  let score = 0;
  if (pwd.length >= 8)  score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { level: 'weak',   label: 'Fraca',  pct: 25 };
  if (score <= 2) return { level: 'fair',   label: 'Média',  pct: 50 };
  if (score <= 3) return { level: 'good',   label: 'Boa',    pct: 75 };
  return                 { level: 'strong', label: 'Forte',  pct: 100 };
}
