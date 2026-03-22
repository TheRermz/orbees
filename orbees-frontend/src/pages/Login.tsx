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
            <div className="form-divider">ou</div>
            <button type="button" className="demo-btn" onClick={() => navigate('/dashboard')}>
              Entrar como demo
            </button>
          </form>

          <p className="register-link">Não tem conta? <a href="#">Cadastre-se grátis</a></p>
        </div>
      </div>
    </div>
  );
}
