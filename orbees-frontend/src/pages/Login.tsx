import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      {/* LEFT — white */}
      <div className="login-left">
        <img src="/LOGOTIPO.png" alt="Orbees" className="brand-logo" />
        <div className="login-hero">
          <h1>Controle suas finanças <span className="highlight">sem esforço</span></h1>
          <p>Importe seu extrato bancário e tenha uma visão completa da sua vida financeira em segundos.</p>
          <div className="features-list">
            <div className="feature-item"><span className="feature-check">✓</span> Importação automática de OFX e CSV</div>
            <div className="feature-item"><span className="feature-check">✓</span> Categorização inteligente de transações</div>
            <div className="feature-item"><span className="feature-check">✓</span> Controle financeiro individual e em grupo</div>
            <div className="feature-item"><span className="feature-check">✓</span> Educação financeira</div>
          </div>
        </div>
      </div>

      {/* RIGHT — black */}
      <div className="login-right">
        <div className="login-form-card">
          <h2>Entrar na conta</h2>
          <p className="form-subtitle">Bem-vindo de volta!</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-field">
              <label>E-mail</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="form-input" />
            </div>
            <div className="form-field">
              <label>Senha</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="form-input" />
            </div>
            <button type="submit" className="login-btn">Entrar →</button>
          </form>

          <div className="form-divider">ou</div>

          <button type="button" className="google-btn">
            <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Continuar com Google
          </button>

          <p className="register-link">Não tem conta? <a href="/register">Cadastre-se grátis</a></p>
        </div>
      </div>
    </div>
  );
}
