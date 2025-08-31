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
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Equilibra - Questionários de Saúde Mental</h1>
      {questionarios.map(q => (
        <CardQuestionario key={q.id} questionario={q} />
      ))}
    </div>
  );
}

export default App;
