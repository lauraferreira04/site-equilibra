const express = require("express");
const cors = require("cors");   // <- import
const app = express();
const PORT = 5000;

app.use(cors());                // <- habilita CORS

// Rota inicial
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

// Endpoint extra
app.get("/api/hello", (req, res) => {
  res.json({ message: "Olá do backend! 😎" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
