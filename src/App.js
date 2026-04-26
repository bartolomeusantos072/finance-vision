import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import './App.css';
import TransactionForm from './components/Form/TransactionForm';

function App() {
  // 1. Estado da lista (Lê do LocalStorage ou inicia vazio)
  const [transacoes, setTransacoes] = useState(() => {
    const salvos = localStorage.getItem('finance_data');
    return salvos ? JSON.parse(salvos) : [];
  });

  // 2. Persistência (Salva no navegador sempre que mudar)
  useEffect(() => {
    localStorage.setItem('finance_data', JSON.stringify(transacoes));
  }, [transacoes]);

  // 3. Função para adicionar nova transação
  const addTransaction = (novaTransacao) => {
    const transacaoComId = { ...novaTransacao, id: uuidv4() };
    setTransacoes([transacaoComId, ...transacoes]);
  };

  // 4. Lógica de Agrupamento (O que o Exercício 2 e 3 pedem)
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

      {/* Cards de Resumo Visual */}
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

      {/* Formulário de entrada */}
      <TransactionForm onAddTransaction={addTransaction} />

      {/* O próximo passo será criar o componente de Gráficos aqui abaixo */}
    </div>
  );
}

export default App;