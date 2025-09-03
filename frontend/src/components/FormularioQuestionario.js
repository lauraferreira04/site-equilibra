import React, { useEffect, useState } from 'react';

const FormularioQuestionario = ({ questionarioId, voltar }) => {
  const [perguntas, setPerguntas] = useState([]);
  const [respostas, setRespostas] = useState({});
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    fetch(`https://site-equilibra.onrender.com/questionarios/${questionarioId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data); // para conferir a estrutura que vem do backend
        setPerguntas(data.perguntas || []); // pega o array de perguntas
      })
      .catch(err => console.error(err));
  }, [questionarioId]);

  const handleChange = (perguntaId, valor) => {
    setRespostas(prev => ({ ...prev, [perguntaId]: valor }));
  };

  const validarRespostas = () => {
  const perguntasIds = perguntas.map(p => p.id); // todos os IDs das perguntas
  for (let id of perguntasIds) {
    if (!respostas[id]) {
      return false; // se algum não estiver respondido
    }
  }
    return true; // todas respondidas
  };


  const handleSubmit = () => {
    if (!validarRespostas()) {
      setMensagem("Por favor, responda todas as perguntas antes de enviar.");
      return;
    }

    const payload = {
      questionarioId,
      respostas: Object.entries(respostas).map(([perguntaId, resposta]) => ({
        perguntaId: parseInt(perguntaId),
        resposta
      }))
    };

    fetch(`https://site-equilibra.onrender.com/respostas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.text())
      .then(data => setMensagem(data))
      .catch(err => setMensagem('Erro ao enviar respostas'));
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '20px',
      marginTop: '10px',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#fafafa'
    }}>
      <h2 style={{ marginBottom: '15px', color: '#333' }}>Questionário</h2>

      {perguntas.map(p => (
        <div key={p.id} style={{ marginBottom: '20px', padding: '10px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <p style={{ fontWeight: 'bold', color: '#444' }}>{p.ordem}. {p.texto}</p>

          {p.tipo === 'escala' && (
            <input
              type="number"
              min="1"
              max="5"
              value={respostas[p.id] || ''}
              onChange={e => handleChange(p.id, e.target.value)}
              style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', width: '60px' }}
            />
          )}

          {p.tipo === 'multipla' && p.opcoes &&
            p.opcoes.split(',').map(op => (
              <label key={op} style={{ display: 'block', marginTop: '5px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name={`pergunta-${p.id}`}
                  value={op}
                  checked={respostas[p.id] === op}
                  onChange={() => handleChange(p.id, op)}
                  style={{ marginRight: '8px' }}
                />
                {op}
              </label>
          ))}
        </div>
      ))}

      <button 
        onClick={handleSubmit}
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
        Enviar respostas
      </button>

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
          marginLeft: '10px',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1e88e5'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2196f3'}
      >
        Voltar
      </button>

      {mensagem && <p style={{ marginTop: '10px', color: '#d32f2f', fontWeight: 'bold' }}>{mensagem}</p>}
    </div>
  );
};

export default FormularioQuestionario;
