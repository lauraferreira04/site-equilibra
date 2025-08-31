const express = require("express");
const corsOptions = {
  origin: 'https://lauraferreira04.github.io', // front hospedado
  optionsSuccessStatus: 200
};
const app = express();
const PORT = process.env.PORT || 5000;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


app.use(cors(corsOptions));
app.use(express.json());

// Rotas

const questionariosRoutes = require('./routes/questionarios');
const respostasRoutes = require('./routes/respostas');
const estatisticasRoutes = require('./routes/estatisticas');

app.use('/questionarios', questionariosRoutes);
app.use('/respostas', respostasRoutes);
app.use('/estatisticas', estatisticasRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));