import React, { useEffect, useState } from 'react';

const Estatisticas = ({ questionarioId, voltar }) => {
  const [estatisticas, setEstatisticas] = useState([]);

  useEffect(() => {
    fetch(`https://site-equilibra.onrender.com/estatisticas/${questionarioId}`)
      .then(res => res.json())
      .then(data => {
        console.log('Estatísticas recebidas:', data); 
        setEstatisticas(data);
    })
    .catch(err => console.error(err));
}, [questionarioId]);

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '20px',
      borderRadius: '12px',
      marginTop: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#fafafa'
    }}>
      <h2 style={{ marginBottom: '15px', color: '#333' }}>Estatísticas do Questionário</h2>

      {estatisticas.map((e, i) => (
        <div key={i} style={{ marginBottom: '20px', padding: '10px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <p style={{ fontWeight: 'bold', color: '#444' }}>{e.pergunta}</p>
          {e.tipo === 'escala' && <p>Média: {e.media.toFixed(2)}</p>}
          {e.tipo === 'multipla' && (
            <ul style={{ paddingLeft: '20px' }}>
              {Object.entries(e.contagem).map(([opcao, count]) => (
                <li key={opcao}>{opcao}: {count}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <button 
        onClick={voltar}
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#2196f3',
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1e88e5'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2196f3'}
      >
        Voltar
      </button>
    </div>
  );
};

export default Estatisticas;
