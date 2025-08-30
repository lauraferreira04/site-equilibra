import React, { useState } from 'react';

const EmailPopup = ({ questionarioId }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const enviarEmail = () => {
    fetch('http://localhost:5000/estatisticas/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionarioId, email })
    })
    .then(res => res.text())
    .then(data => setMessage(data))
    .catch(err => setMessage('Erro ao enviar email'));
  };

  return (
    <div style={{
      border: '1px solid #000',
      padding: '10px',
      marginTop: '10px',
      borderRadius: '5px'
    }}>
      <p>Insira seu email para receber as estatísticas:</p>
      <input 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="seu@email.com"
      />
      <button onClick={enviarEmail} style={{ marginLeft: '10px' }}>Enviar</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmailPopup;
