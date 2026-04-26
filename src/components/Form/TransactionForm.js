import React, { useState } from 'react';
import './TransactionForm.css';

function TransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    categoria: '',
    tipo: 'Saída' // Valor padrão
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação Estrita: Não permite valor vazio ou negativo
    if (!formData.descricao || !formData.categoria || formData.valor <= 0) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    // Envia os dados para o App.js
    onAddTransaction(formData);

    // Reseta o formulário
    setFormData({ descricao: '', valor: '', categoria: '', tipo: 'Saída' });
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <input 
        name="descricao" 
        placeholder="Descrição" 
        value={formData.descricao} 
        onChange={handleChange} 
      />
      <input 
        name="valor" 
        type="number" 
        placeholder="Valor (R$)" 
        value={formData.valor} 
        onChange={handleChange} 
      />
      <select name="categoria" value={formData.categoria} onChange={handleChange}>
        <option value="">Selecione a Categoria</option>
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Moradia">Moradia</option>
      </select>
      <select name="tipo" value={formData.tipo} onChange={handleChange}>
        <option value="Entrada">Receita (Entrada)</option>
        <option value="Saída">Despesa (Saída)</option>
      </select>
      <button type="submit">Adicionar Transação</button>
    </form>
  );
}

export default TransactionForm;