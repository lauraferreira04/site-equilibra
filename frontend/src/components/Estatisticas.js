import React, { useEffect, useState } from 'react';

const Estatisticas = ({ questionarioId, voltar }) => {
  const [estatisticas, setEstatisticas] = useState([]);

  useEffect(() => {
    fetch(`https://site-equilibra-backend.onrender.com/estatisticas/${questionarioId}`)
      .then(res => res.json())
      .then(data => {
        console.log('Estatísticas recebidas:', data); 
        setEstatisticas(data);
    })
    .catch(err => console.error(err));
}, [questionarioId]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginTop: '10px' }}>
      <h2>Estatísticas do Questionário</h2>
      {estatisticas.map((e, i) => (
        <div key={i} style={{ marginBottom: '15px' }}>
          <p><strong>{e.pergunta}</strong></p>
          {e.tipo === 'escala' && <p>Média: {e.media.toFixed(2)}</p>}
          {e.tipo === 'multipla' && (
            <ul>
              {Object.entries(e.contagem).map(([opcao, count]) => (
                <li key={opcao}>{opcao}: {count}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <button onClick={voltar}>Voltar</button>
    </div>
  );
};

export default Estatisticas;
