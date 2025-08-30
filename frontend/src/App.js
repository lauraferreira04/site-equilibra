import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Frontend React</h1>
      <p>Mensagem do backend: {message || "Carregando..."}</p>
    </div>
  );
}

export default App;
