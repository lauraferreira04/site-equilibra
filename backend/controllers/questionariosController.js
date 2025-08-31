const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listarQuestionarios = async (req, res) => {
  try {
    const questionarios = await prisma.questionario.findMany(); // pega todos
    res.json(questionarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar questionários' });
  }
};

const listarPerguntas = async (req, res) => {
  const questionarioId = parseInt(req.params.id);
  try {
    const perguntas = await prisma.pergunta.findMany({
      where: { questionarioId: questionarioId },
    });
    res.json(perguntas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar perguntas' });
  }
};

module.exports = { listarQuestionarios, listarPerguntas };
