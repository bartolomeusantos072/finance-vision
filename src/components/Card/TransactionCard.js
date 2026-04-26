import React from 'react';
import { FaArrowUp, FaArrowDown, FaTrash } from 'react-icons/fa';

function TransactionCard({ item, onDelete }) {
  const isEntrada = item.tipo === 'Entrada';

  return (
    <div className="transaction-card" style={{ 
      borderLeft: `5px solid ${isEntrada ? '#2ecc71' : '#e74c3c'}`,
      background: '#fff',
      margin: '10px 0',
      padding: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {isEntrada ? <FaArrowUp color="#2ecc71" /> : <FaArrowDown color="#e74c3c" />}
        <div>
          <p style={{ fontWeight: 'bold', margin: 0 }}>{item.descricao}</p>
          <small style={{ color: '#666' }}>{item.categoria}</small>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontWeight: 'bold', color: isEntrada ? '#2ecc71' : '#e74c3c' }}>
          {isEntrada ? '+' : '-'} R$ {Number(item.valor).toFixed(2)}
        </span>
        <button 
          onClick={() => onDelete(item.id)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc' }}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default TransactionCard;