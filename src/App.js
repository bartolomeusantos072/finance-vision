import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import './App.css';
import TransactionForm from './components/Form/TransactionForm';
// 1. Importar os novos componentes (Certifique-se de que os caminhos estão corretos)
import FinanceChart from './components/Chart/FinanceChart';
import TransactionCard from './components/Card/TransactionCard';

function App() {
  const [transacoes, setTransacoes] = useState(() => {
    const salvos = localStorage.getItem('finance_data');
    return salvos ? JSON.parse(salvos) : [];
  });

  useEffect(() => {
    localStorage.setItem('finance_data', JSON.stringify(transacoes));
  }, [transacoes]);

  const addTransaction = (novaTransacao) => {
    const transacaoComId = { ...novaTransacao, id: uuidv4() };
    setTransacoes([transacaoComId, ...transacoes]);
  };

  // Função para deletar (passaremos para o Card)
  const deleteTransaction = (id) => {
    setTransacoes(transacoes.filter(t => t.id !== id));
  };

  const totalEntradas = transacoes
    .filter(t => t.tipo === 'Entrada')
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const totalSaidas = transacoes
    .filter(t => t.tipo === 'Saída')
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const saldoTotal = totalEntradas - totalSaidas;

  return (
    <div className="container">
      <header>
        <h1>FinanceVision Dashboard</h1>
      </header>

      <section className="resumo">
        <div className="card-resumo">
          <h3>Entradas</h3>
          <p className="valor-entrada">R$ {totalEntradas.toFixed(2)}</p>
        </div>
        <div className="card-resumo">
          <h3>Saídas</h3>
          <p className="valor-saida">R$ {totalSaidas.toFixed(2)}</p>
        </div>
        <div className="card-resumo">
          <h3>Saldo Total</h3>
          <p className={saldoTotal >= 0 ? 'saldo-positivo' : 'saldo-negativo'}>
            R$ {saldoTotal.toFixed(2)}
          </p>
        </div>
      </section>

      <TransactionForm onAddTransaction={addTransaction} />

      {/* 2. Adicionar os Gráficos passando os dados calculados */}
      <FinanceChart 
        transacoes={transacoes} 
        entradas={totalEntradas} 
        saidas={totalSaidas} 
      />

      {/* 3. Adicionar a Lista de Histórico */}
      <div className="historico-lista" style={{ marginTop: '30px' }}>
        <h3>Últimas Transações</h3>
        {transacoes.length === 0 && <p>Nenhuma transação registrada.</p>}
        {transacoes.map((t) => (
          <TransactionCard 
            key={t.id} 
            item={t} 
            onDelete={deleteTransaction} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;