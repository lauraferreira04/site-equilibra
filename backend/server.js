const express = require("express");
const cors = require("cors");   // <- import
const app = express();
const PORT = 5000;

app.use(cors());                // <- habilita CORS
app.use(express.json());

// Rotas

const questionariosRoutes = require('./routes/questionarios');
const respostasRoutes = require('./routes/respostas');
const estatisticasRoutes = require('./routes/estatisticas');

app.use('/questionarios', questionariosRoutes);
app.use('/respostas', respostasRoutes);
app.use('/estatisticas', estatisticasRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));