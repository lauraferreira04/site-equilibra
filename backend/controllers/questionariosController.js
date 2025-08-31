const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os questionários
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
    const questionario = await prisma.questionario.findUnique({
      where: { id: questionarioId },
      include: { perguntas: true }  // inclui as perguntas
    });

    if (!questionario) {
      return res.status(404).json({ erro: 'Questionário não encontrado' });
    }

    res.json(questionario); // envia questionário completo com perguntas
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar perguntas' });
  }
};

module.exports = { listarQuestionarios, listarPerguntas };