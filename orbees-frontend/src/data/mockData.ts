import type { Transaction, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Alimentação', color: '#E74C3C', icon: '🍽️' },
  { id: '2', name: 'Transporte', color: '#2980B9', icon: '🚗' },
  { id: '3', name: 'Moradia', color: '#8E44AD', icon: '🏠' },
  { id: '4', name: 'Saúde', color: '#27AE60', icon: '💊' },
  { id: '5', name: 'Educação', color: '#F39C12', icon: '📚' },
  { id: '6', name: 'Lazer', color: '#16A085', icon: '🎮' },
  { id: '7', name: 'Salário', color: '#27AE60', icon: '💰' },
  { id: '8', name: 'Outros', color: '#95A5A6', icon: '📦' },
];

export const transactions: Transaction[] = [
  // ── Março 2026 ──
  { id: '1',  date: '2026-03-11T14:32:00', description: 'Supermercado Extra',   amount:  -245.80, category: 'Alimentação', type: 'expense' },
  { id: '2',  date: '2026-03-10T08:00:00', description: 'Salário',              amount:  4500.00, category: 'Salário',     type: 'income'  },
  { id: '3',  date: '2026-03-10T20:15:00', description: 'iFood',                amount:   -38.90, category: 'Alimentação', type: 'expense' },
  { id: '4',  date: '2026-03-09T09:47:00', description: 'Uber',                 amount:   -22.50, category: 'Transporte',  type: 'expense' },
  { id: '5',  date: '2026-03-09T07:00:00', description: 'Aluguel',              amount: -1200.00, category: 'Moradia',     type: 'expense' },
  { id: '6',  date: '2026-03-08T11:23:00', description: 'Farmácia',             amount:   -67.30, category: 'Saúde',       type: 'expense' },
  { id: '7',  date: '2026-03-08T22:00:00', description: 'Netflix',              amount:   -39.90, category: 'Lazer',       type: 'expense' },
  { id: '8',  date: '2026-03-07T17:55:00', description: 'Posto de Combustível', amount:  -180.00, category: 'Transporte',  type: 'expense' },
  { id: '9',  date: '2026-03-07T10:00:00', description: 'Curso Online',         amount:   -99.00, category: 'Educação',    type: 'expense' },
  { id: '10', date: '2026-03-06T13:10:00', description: 'Restaurante',          amount:   -85.00, category: 'Alimentação', type: 'expense' },
  { id: '11', date: '2026-03-05T16:30:00', description: 'Freelance',            amount:   800.00, category: 'Outros',      type: 'income'  },
  { id: '12', date: '2026-03-05T07:15:00', description: 'Academia',             amount:   -89.90, category: 'Saúde',       type: 'expense' },
  { id: '13', date: '2026-03-04T19:42:00', description: 'Mercado Livre',        amount:  -156.00, category: 'Outros',      type: 'expense' },
  { id: '14', date: '2026-03-03T08:00:00', description: 'Conta de Luz',         amount:  -145.00, category: 'Moradia',     type: 'expense' },
  { id: '15', date: '2026-03-02T21:30:00', description: 'Cinema',               amount:   -48.00, category: 'Lazer',       type: 'expense' },
  // ── Fevereiro 2026 ──
  { id: '16', date: '2026-02-10T08:00:00', description: 'Salário',              amount:  4500.00, category: 'Salário',     type: 'income'  },
  { id: '17', date: '2026-02-10T09:00:00', description: 'Aluguel',              amount: -1200.00, category: 'Moradia',     type: 'expense' },
  { id: '18', date: '2026-02-12T14:00:00', description: 'Supermercado Extra',   amount:  -288.00, category: 'Alimentação', type: 'expense' },
  { id: '19', date: '2026-02-13T20:00:00', description: 'iFood',                amount:   -42.00, category: 'Alimentação', type: 'expense' },
  { id: '20', date: '2026-02-15T09:00:00', description: 'Uber',                 amount:   -35.00, category: 'Transporte',  type: 'expense' },
  { id: '21', date: '2026-02-15T22:00:00', description: 'Netflix',              amount:   -39.90, category: 'Lazer',       type: 'expense' },
  { id: '22', date: '2026-02-18T11:00:00', description: 'Farmácia',             amount:   -75.00, category: 'Saúde',       type: 'expense' },
  { id: '23', date: '2026-02-20T07:00:00', description: 'Academia',             amount:   -89.90, category: 'Saúde',       type: 'expense' },
  { id: '24', date: '2026-02-22T13:00:00', description: 'Conta de Luz',         amount:  -138.00, category: 'Moradia',     type: 'expense' },
  { id: '25', date: '2026-02-05T10:00:00', description: 'Freelance',            amount:   800.00, category: 'Outros',      type: 'income'  },
  { id: '26', date: '2026-02-25T17:00:00', description: 'Posto de Combustível', amount:  -188.00, category: 'Transporte',  type: 'expense' },
  { id: '27', date: '2026-02-26T19:00:00', description: 'Cinema',               amount:   -56.00, category: 'Lazer',       type: 'expense' },
  // ── Janeiro 2026 ──
  { id: '28', date: '2026-01-10T08:00:00', description: 'Salário',              amount:  4500.00, category: 'Salário',     type: 'income'  },
  { id: '29', date: '2026-01-10T09:00:00', description: 'Aluguel',              amount: -1200.00, category: 'Moradia',     type: 'expense' },
  { id: '30', date: '2026-01-12T14:00:00', description: 'Supermercado Extra',   amount:  -312.00, category: 'Alimentação', type: 'expense' },
  { id: '31', date: '2026-01-13T20:00:00', description: 'iFood',                amount:   -45.00, category: 'Alimentação', type: 'expense' },
  { id: '32', date: '2026-01-15T09:00:00', description: 'Uber',                 amount:   -28.00, category: 'Transporte',  type: 'expense' },
  { id: '33', date: '2026-01-16T07:00:00', description: 'Netflix',              amount:   -39.90, category: 'Lazer',       type: 'expense' },
  { id: '34', date: '2026-01-18T11:00:00', description: 'Academia',             amount:   -89.90, category: 'Saúde',       type: 'expense' },
  { id: '35', date: '2026-01-20T13:00:00', description: 'Conta de Luz',         amount:  -145.00, category: 'Moradia',     type: 'expense' },
  { id: '36', date: '2026-01-22T17:00:00', description: 'Posto de Combustível', amount:  -175.00, category: 'Transporte',  type: 'expense' },
  { id: '37', date: '2026-01-05T10:00:00', description: 'Freelance',            amount:   800.00, category: 'Outros',      type: 'income'  },
  { id: '38', date: '2026-01-25T18:00:00', description: 'Curso Online',         amount:   -99.00, category: 'Educação',    type: 'expense' },
  { id: '39', date: '2026-01-28T20:00:00', description: 'Restaurante',          amount:   -92.00, category: 'Alimentação', type: 'expense' },
];

export const monthlyData = [
  { month: 'Out', receitas: 4800, despesas: 3200 },
  { month: 'Nov', receitas: 5200, despesas: 3800 },
  { month: 'Dez', receitas: 6100, despesas: 5200 },
  { month: 'Jan', receitas: 4500, despesas: 3600 },
  { month: 'Fev', receitas: 5300, despesas: 3900 },
  { month: 'Mar', receitas: 5300, despesas: 2417 },
];

export const categoryExpenses = [
  { name: 'Alimentação', value: 369.70, color: '#E74C3C' },
  { name: 'Moradia',     value: 1345.00, color: '#8E44AD' },
  { name: 'Transporte',  value: 202.50,  color: '#2980B9' },
  { name: 'Saúde',       value: 157.20,  color: '#27AE60' },
  { name: 'Lazer',       value: 87.90,   color: '#16A085' },
  { name: 'Educação',    value: 99.00,   color: '#F39C12' },
  { name: 'Outros',      value: 156.00,  color: '#95A5A6' },
];
