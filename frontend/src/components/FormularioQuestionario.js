import React, { useEffect, useState } from 'react';

const FormularioQuestionario = ({ questionarioId, voltar }) => {
  const [perguntas, setPerguntas] = useState([]);
  const [respostas, setRespostas] = useState({});
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
  fetch(`https://site-equilibra-backend.onrender.com/questionarios/${questionarioId}`)
      .then(res => res.json())
      .then(data => setPerguntas(data))
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

    fetch(`https://site-equilibra-backend.onrender.com/respostas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.text())
      .then(data => setMensagem(data))
      .catch(err => setMensagem('Erro ao enviar respostas'));
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '10px', borderRadius: '8px' }}>
      <h2>Questionário</h2>

      {perguntas.map(p => (
        <div key={p.id} style={{ marginBottom: '15px' }}>
          <p>{p.ordem}. {p.texto}</p>

          {p.tipo === 'escala' && (
            <input
              type="number"
              min="1"
              max="5"
              value={respostas[p.id] || ''}
              onChange={e => handleChange(p.id, e.target.value)}
            />
          )}

          {p.tipo === 'multipla' && p.opcoes && 
            p.opcoes.map(op => (
              <label key={op} style={{ display: 'block' }}>
                <input
                  type="radio"
                  name={`pergunta-${p.id}`}
                  value={op}
                  checked={respostas[p.id] === op}
                  onChange={() => handleChange(p.id, op)}
                />
                {op}
              </label>
          ))}

        </div>
      ))}

      <button onClick={handleSubmit}>Enviar respostas</button>
      <button onClick={voltar} style={{ marginLeft: '10px' }}>Voltar</button>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default FormularioQuestionario;
