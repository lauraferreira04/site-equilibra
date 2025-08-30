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
      border: '1px solid #ccc',
      padding: '20px',
      marginBottom: '10px',
      borderRadius: '8px'
    }}>
      <h2>{questionario.titulo}</h2>
      <p>{questionario.descricao}</p>
      <button onClick={() => setResponder(true)}>Responder</button>    
      <button onClick={() => setVerEstatisticas(true)} style={{ marginLeft: '10px' }}>
        Ver Estatísticas
      </button>
    </div>
  );
};

export default CardQuestionario;
