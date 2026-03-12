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
  { id: '1', date: '2026-03-11', description: 'Supermercado Extra', amount: -245.80, category: 'Alimentação', type: 'expense' },
  { id: '2', date: '2026-03-10', description: 'Salário', amount: 4500.00, category: 'Salário', type: 'income' },
  { id: '3', date: '2026-03-10', description: 'iFood', amount: -38.90, category: 'Alimentação', type: 'expense' },
  { id: '4', date: '2026-03-09', description: 'Uber', amount: -22.50, category: 'Transporte', type: 'expense' },
  { id: '5', date: '2026-03-09', description: 'Aluguel', amount: -1200.00, category: 'Moradia', type: 'expense' },
  { id: '6', date: '2026-03-08', description: 'Farmácia', amount: -67.30, category: 'Saúde', type: 'expense' },
  { id: '7', date: '2026-03-08', description: 'Netflix', amount: -39.90, category: 'Lazer', type: 'expense' },
  { id: '8', date: '2026-03-07', description: 'Posto de Combustível', amount: -180.00, category: 'Transporte', type: 'expense' },
  { id: '9', date: '2026-03-07', description: 'Curso Online', amount: -99.00, category: 'Educação', type: 'expense' },
  { id: '10', date: '2026-03-06', description: 'Restaurante', amount: -85.00, category: 'Alimentação', type: 'expense' },
  { id: '11', date: '2026-03-05', description: 'Freelance', amount: 800.00, category: 'Outros', type: 'income' },
  { id: '12', date: '2026-03-05', description: 'Academia', amount: -89.90, category: 'Saúde', type: 'expense' },
  { id: '13', date: '2026-03-04', description: 'Mercado Livre', amount: -156.00, category: 'Outros', type: 'expense' },
  { id: '14', date: '2026-03-03', description: 'Conta de Luz', amount: -145.00, category: 'Moradia', type: 'expense' },
  { id: '15', date: '2026-03-02', description: 'Cinema', amount: -48.00, category: 'Lazer', type: 'expense' },
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
  { name: 'Moradia', value: 1345.00, color: '#8E44AD' },
  { name: 'Transporte', value: 202.50, color: '#2980B9' },
  { name: 'Saúde', value: 157.20, color: '#27AE60' },
  { name: 'Lazer', value: 87.90, color: '#16A085' },
  { name: 'Educação', value: 99.00, color: '#F39C12' },
  { name: 'Outros', value: 156.00, color: '#95A5A6' },
];
