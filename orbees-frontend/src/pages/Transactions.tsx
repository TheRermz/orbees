import React, { useState } from 'react';
import {
  UtensilsCrossed, Car, Home, Pill, BookOpen, Gamepad2, Banknote, Package,
  ShoppingCart, ShoppingBag, Coffee, Apple, Milk, Sandwich, Wine, Building,
  Building2, Lightbulb, Wrench, Hammer, Bed, Sofa, Lamp, Bus, Plane, Train,
  Bike, Fuel, Truck, Ship, Heart, Activity, Stethoscope, Dumbbell, Baby, Eye,
  DollarSign, CreditCard, PiggyBank, Wallet, TrendingUp, Receipt, Coins,
  GraduationCap, Pencil, School, Backpack, Music, Film, Headphones, Camera,
  Tv, Star, Smartphone, Laptop, Monitor, Wifi, Briefcase, Users, BarChart2,
  Globe, Gift, Scissors, Shirt, Palette, TreePine, Sun, Zap, Cat, Dog,
  Flower2, Tag, Pizza, Search, Download, ArrowUpCircle, ArrowDownCircle, Wallet2,
} from 'lucide-react';
import { transactions, categories } from '../data/mockData';
import './Transactions.css';

const ICON_MAP: Record<string, React.ElementType> = {
  ShoppingCart, ShoppingBag, UtensilsCrossed, Coffee, Pizza, Apple,
  Milk, Sandwich, Wine, Home, Building, Building2, Lightbulb, Wrench,
  Hammer, Bed, Sofa, Lamp, Car, Bus, Plane, Train, Bike, Fuel, Truck,
  Ship, Heart, Activity, Pill, Stethoscope, Dumbbell, Baby, Eye,
  DollarSign, CreditCard, Banknote, PiggyBank, Wallet, TrendingUp,
  Receipt, Coins, BookOpen, GraduationCap, Pencil, School, Backpack,
  Music, Film, Gamepad2, Headphones, Camera, Tv, Star,
  Smartphone, Laptop, Monitor, Wifi, Briefcase, Users, BarChart2,
  Globe, Package, Gift, Scissors, Shirt, Palette, TreePine, Sun,
  Zap, Cat, Dog, Flower2, Tag,
};

const NAME_TO_ICON: Record<string, string> = {
  'Alimentação': 'UtensilsCrossed',
  'Transporte': 'Car',
  'Moradia': 'Home',
  'Saúde': 'Pill',
  'Educação': 'BookOpen',
  'Lazer': 'Gamepad2',
  'Salário': 'Banknote',
  'Outros': 'Package',
};

export default function Transactions() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCat, setFilterCat] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const fmt = (v: number) => Math.abs(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const filtered = transactions.filter(t => {
    const matchSearch = t.description.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || t.type === filterType;
    const matchCat = filterCat === 'all' || t.category === filterCat;
    const matchFrom = !dateFrom || t.date >= dateFrom;
    const matchTo = !dateTo || t.date <= dateTo;
    return matchSearch && matchType && matchCat && matchFrom && matchTo;
  });

  const totalIncome = filtered.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalExpense = filtered.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const balance = totalIncome - totalExpense;

  const handleExport = () => {
    const header = 'Data,Descrição,Categoria,Tipo,Valor';
    const rows = filtered.map(t =>
      `${t.date},"${t.description}",${t.category},${t.type === 'income' ? 'Receita' : 'Despesa'},${t.amount}`
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'transacoes.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="transactions-page">
      <div className="page-header">
        <div>
          <h1>Transações</h1>
          <p>Histórico completo de movimentações</p>
        </div>
        <button className="export-btn" onClick={handleExport}>
          <Download size={15} /> Exportar CSV
        </button>
      </div>

      {/* Summary */}
      <div className="tx-summary">
        <div className="tx-summary-card income">
          <div className="tx-summary-icon"><ArrowUpCircle size={20} /></div>
          <div>
            <span className="tx-summary-label">Receitas</span>
            <span className="tx-summary-value">{fmt(totalIncome)}</span>
          </div>
        </div>
        <div className="tx-summary-card expense">
          <div className="tx-summary-icon"><ArrowDownCircle size={20} /></div>
          <div>
            <span className="tx-summary-label">Despesas</span>
            <span className="tx-summary-value">{fmt(totalExpense)}</span>
          </div>
        </div>
        <div className={`tx-summary-card balance ${balance >= 0 ? 'positive' : 'negative'}`}>
          <div className="tx-summary-icon"><Wallet2 size={20} /></div>
          <div>
            <span className="tx-summary-label">Saldo</span>
            <span className="tx-summary-value">{balance >= 0 ? '+' : '-'}{fmt(balance)}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-wrapper">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar transação..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="filter-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">Todos os tipos</option>
          <option value="income">Receitas</option>
          <option value="expense">Despesas</option>
        </select>
        <select className="filter-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="all">Todas as categorias</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <div className="date-range">
          <input type="date" className="date-input" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          <span className="date-sep">até</span>
          <input type="date" className="date-input" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </div>
      </div>

      {/* Transaction list */}
      <div className="tx-list-card">
        {filtered.length === 0 ? (
          <div className="empty-state">Nenhuma transação encontrada.</div>
        ) : (
          <div className="tx-list">
            {filtered.map((tx, i) => {
              const cat = categories.find(c => c.name === tx.category);
              const iconKey = NAME_TO_ICON[tx.category] ?? 'Tag';
              const CatIcon = ICON_MAP[iconKey] ?? Tag;
              const color = cat?.color ?? '#888';
              const isIncome = tx.amount > 0;
              return (
                <div key={tx.id} className={`tx-row ${i < filtered.length - 1 ? 'bordered' : ''}`}>
                  <div className="tx-row-icon" style={{ background: color + '18', color }}>
                    <CatIcon size={18} />
                  </div>
                  <div className="tx-row-main">
                    <span className="tx-row-desc">{tx.description}</span>
                    <span className="cat-badge" style={{ background: color + '18', color }}>
                      <span className="cat-badge-icon" style={{ background: color }}>
                        <CatIcon size={11} color="white" />
                      </span>
                      {tx.category}
                    </span>
                  </div>
                  <div className="tx-row-right">
                    <span className={`tx-row-amount ${isIncome ? 'positive' : 'negative'}`}>
                      {isIncome ? '+' : '-'}{fmt(tx.amount)}
                    </span>
                    <span className="tx-row-date">
                      {new Date(tx.date).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
