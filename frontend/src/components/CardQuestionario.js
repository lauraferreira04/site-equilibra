import React, { useState } from 'react';
import EmailPopup from './EmailPopup';

const CardQuestionario = ({ questionario }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      marginBottom: '10px',
      borderRadius: '8px'
    }}>
      <h2>{questionario.titulo}</h2>
      <p>{questionario.descricao}</p>
      <button onClick={() => alert('Responder questionário')}>
        Responder
      </button>
      <button onClick={() => setShowPopup(!showPopup)} style={{ marginLeft: '10px' }}>
        Receber Estatísticas
      </button>

      {showPopup && <EmailPopup questionarioId={questionario.id} />}
    </div>
  );
};

export default CardQuestionario;
