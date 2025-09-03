import { useEffect, useState } from 'react';
import CardQuestionario from './components/CardQuestionario';

function App() {
  const [questionarios, setQuestionarios] = useState([]);

  useEffect(() => {
    fetch('https://site-equilibra.onrender.com/questionarios') // backend na porta 5000
      .then(res => res.json())
      .then(data => setQuestionarios(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header com logo + título */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={`${process.env.PUBLIC_URL}/logo.png`} 
            alt="Logo Equilibra"
            style={{ width: '80px', height: '80px', marginRight: '15px' }}
          />
          Equilibra - Questionários de Saúde Mental
        </h1>
      </header>

      {/* Cards */}
      {questionarios.map(q => (
        <CardQuestionario key={q.id} questionario={q} />
      ))}
    </div>
  );
}

export default App;