import React, { useState } from 'react';
import FormularioQuestionario from './FormularioQuestionario';
import Estatisticas from './Estatisticas';

const CardQuestionario = ({ questionario }) => {
  const [responder, setResponder] = useState(false);
  const [verEstatisticas, setVerEstatisticas] = useState(false);

  if(responder){
    return <FormularioQuestionario questionarioId={questionario.id} voltar={() => setResponder(false)} />;
  }
  if (verEstatisticas) {
    return <Estatisticas questionarioId={questionario.id} voltar={() => setVerEstatisticas(false)} />;
  }

  return (
    <div style={{
    border: '1px solid #ddd',
    padding: '20px',
    marginBottom: '15px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fafafa',
    transition: 'transform 0.2s',
  }}
  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
  >
    <h2 style={{ marginBottom: '10px', color: '#333' }}>{questionario.titulo}</h2>
    <p style={{ color: '#555', marginBottom: '15px' }}>{questionario.descricao}</p>
    
    <button 
      onClick={() => setResponder(true)}
      style={{
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#4caf50',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#45a049'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#4caf50'}
    >
      Responder
    </button>
    
    <button 
      onClick={() => setVerEstatisticas(true)}
      style={{
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#2196f3',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginLeft: '10px',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1e88e5'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2196f3'}
    >
      Ver Estatísticas
    </button>
  </div>
  );
};

export default CardQuestionario;
