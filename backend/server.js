const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração do CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());

// Rotas
const questionariosRoutes = require('./routes/questionarios');
const respostasRoutes = require('./routes/respostas');
const estatisticasRoutes = require('./routes/estatisticas');

// Descomente as rotas quando estiver pronto para usá-las
app.use('/questionarios', questionariosRoutes);
app.use('/respostas', respostasRoutes);
app.use('/estatisticas', estatisticasRoutes);

app.get('/', (req, res) => res.send('Hello World'));

// Rota catch-all para 404 (deve ser a última)
app.use((req, res) => {
  res.status(404).json({
    message: `A URL ${req.originalUrl} não foi encontrada`
  });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Algo deu errado no servidor!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

