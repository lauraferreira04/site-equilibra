const express = require("express");
const cors = require("cors");

const corsOptions = {
  origin: 'https://lauraferreira04.github.io', // seu frontend hospedado no GitHub Pages
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
const app = express();
const PORT = process.env.PORT || 5000;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight
app.use(express.json());

// Rotas

const questionariosRoutes = require('./routes/questionarios');
const respostasRoutes = require('./routes/respostas');
const estatisticasRoutes = require('./routes/estatisticas');

app.use('/questionarios', questionariosRoutes);
app.use('/respostas', respostasRoutes);
app.use('/estatisticas', estatisticasRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));