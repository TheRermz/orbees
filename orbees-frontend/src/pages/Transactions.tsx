import { useState } from 'react';
import { transactions, categories } from '../data/mockData';
import './Transactions.css';

export default function Transactions() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCat, setFilterCat] = useState('all');

  const fmt = (v: number) => Math.abs(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const filtered = transactions.filter(t => {
    const matchSearch = t.description.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || t.type === filterType;
    const matchCat = filterCat === 'all' || t.category === filterCat;
    return matchSearch && matchType && matchCat;
  });

  return (
    <div className="transactions-page">
      <div className="page-header">
        <h1>Transações</h1>
        <p>Histórico completo de movimentações</p>
      </div>

      <div className="filters-bar">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Buscar transação..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="filter-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">Todos os tipos</option>
          <option value="income">Receitas</option>
          <option value="expense">Despesas</option>
        </select>
        <select className="filter-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="all">Todas as categorias</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </div>

      <div className="table-card">
        <table className="tx-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Tipo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(tx => {
              const cat = categories.find(c => c.name === tx.category);
              return (
                <tr key={tx.id}>
                  <td className="date-cell">{new Date(tx.date).toLocaleDateString('pt-BR')}</td>
                  <td className="desc-cell">{tx.description}</td>
                  <td>
                    <span className="cat-badge" style={{ background: cat?.color + '20', color: cat?.color }}>
                      {cat?.icon} {tx.category}
                    </span>
                  </td>
                  <td>
                    <span className={`type-badge ${tx.type}`}>
                      {tx.type === 'income' ? 'Receita' : 'Despesa'}
                    </span>
                  </td>
                  <td className={`amount-cell ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                    {tx.amount > 0 ? '+' : '-'}{fmt(tx.amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty-state">Nenhuma transação encontrada.</div>
        )}
      </div>
    </div>
  );
}
