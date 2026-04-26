import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, ArcElement, BarElement, 
  CategoryScale, LinearScale, Tooltip, Legend 
} from 'chart.js';

// Registro obrigatório dos elementos
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function FinanceChart({ transacoes, entradas, saidas }) {
  
  // Lógica de Agrupamento por Categoria (Exercício 2)
  const categoriasTotais = transacoes
    .filter(t => t.tipo === 'Saída')
    .reduce((acc, t) => {
      acc[t.categoria] = (acc[t.categoria] || 0) + Number(t.valor);
      return acc;
    }, {});

  // Dados para o Gráfico de Rosca
  const doughnutData = {
    labels: Object.keys(categoriasTotais),
    datasets: [{
      data: Object.values(categoriasTotais),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    }]
  };

  // Dados para o Gráfico de Barras (Comparativo)
  const barData = {
    labels: ['Entradas', 'Saídas'],
    datasets: [{
      label: 'Fluxo (R$)',
      data: [entradas, saidas],
      backgroundColor: ['#2ecc71', '#e74c3c'],
    }]
  };

  return (
    <div className="charts-container" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <div style={{ width: '300px' }}>
        <h4>Gastos por Categoria</h4>
        <Doughnut data={doughnutData} />
      </div>
      <div style={{ width: '400px' }}>
        <h4>Comparativo Mensal</h4>
        <Bar data={barData} />
      </div>
    </div>
  );
}

export default FinanceChart;