import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="register-page">
      {/* LEFT — white */}
      <div className="register-left">
        <img src="/LOGOTIPO.png" alt="Orbees" className="brand-logo" />
        <div className="register-hero">
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
      <div className="register-right">
        <div className="register-form-card">
          <h2>Criar conta</h2>
          <p className="form-subtitle">Bem-vindo ao Orbees!</p>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-field">
              <label>Nome Completo</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" className="form-input" required />
            </div>
            <div className="form-field">
              <label>E-mail</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="form-input" required />
            </div>
            <div className="form-field">
              <label>Senha</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="form-input" required />
            </div>
            <div className="form-field">
              <label>Confirmar Senha</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="form-input" required />
            </div>
            <button type="submit" className="register-btn">Cadastrar →</button>
          </form>

          <p className="login-link">Já tem conta? <a href="/login">Entrar</a></p>
        </div>
      </div>
    </div>
  );
}
